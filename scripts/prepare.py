import json, pathlib, re, html, hashlib, requests, concurrent.futures
from PIL import Image
from io import BytesIO
from bs4 import BeautifulSoup, NavigableString
from urllib.parse import urlparse, urljoin
ROOT=pathlib.Path(__file__).resolve().parent.parent
pages=json.loads((ROOT/'source/content.json').read_text(encoding='utf8'))
assets={}
def valid_image(src):
    return src and 'website-files.com' in src and not re.search(r'logo|icon|arrow|close|vector|menta|\.svg|x_icon',src,re.I)
for p in pages:
    for i in p['images']:
        if valid_image(i['src']): assets[i['src']]='/images/'+hashlib.sha1(i['src'].encode()).hexdigest()[:12]+'.webp'
def fetch(item):
    url,path=item
    try:
        target=ROOT/'public'/path.lstrip('/')
        if not target.exists():
            old=target.with_suffix('.'+urlparse(url).path.rsplit('.',1)[-1])
            if old.exists(): data=old.read_bytes()
            else:
                r=requests.get(url,timeout=30);r.raise_for_status();data=r.content
            im=Image.open(BytesIO(data));im.thumbnail((1600,1600));im.save(target,'WEBP',quality=84)
        return None
    except Exception as e: return (url,str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
    errors=[x for x in pool.map(fetch,assets.items()) if x]
print('Assets',len(assets),'errors',errors)
def link(href):
    if href.startswith('https://www.rudanroofing.com'): return href.replace('https://www.rudanroofing.com','') or '/'
    return href
def clean_text(t): return re.sub(r'\s+',' ',t.replace('\u200d','').replace('\u200b','')).strip()
def safe_rich(node):
    copy=BeautifulSoup(str(node),'html.parser')
    for n in copy.select('script,style,iframe,form,input,button'): n.decompose()
    for n in copy.find_all(True):
        if n.name=='h1': n.name='h2'
        attrs={}
        if n.name=='a':
            href=link(n.get('href',''))
            if href.startswith(('https://','http://','/','#','mailto:','tel:')): attrs['href']=href
        if n.name=='img':
            src=n.get('src','');attrs={'src':assets.get(src,src),'alt':n.get('alt','Roofing product detail'),'loading':'lazy'}
        n.attrs=attrs
    return str(copy)
def extract(node):
    out=[]
    def walk(n):
        if isinstance(n,NavigableString):
            t=clean_text(str(n))
            if len(t)>2 and not all(0xE000<=ord(c)<=0xF8FF for c in t): out.append({'type':'p','text':t})
            return
        if n.name in ['script','style','form','button','input','select','svg','noscript']: return
        if 'w-richtext' in n.get('class',[]) or n.name=='table':
            out.append({'type':'rich','html':safe_rich(n),'text':clean_text(n.get_text(' ',strip=True))});return
        if n.name in ['h1','h2','h3','h4','h5','h6','p','li']:
            t=clean_text(n.get_text(' ',strip=True))
            if t:out.append({'type':n.name,'text':t})
            return
        if n.name=='a' and n.get_text(strip=True):
            out.append({'type':'a','text':clean_text(n.get_text(' ',strip=True)),'href':link(n.get('href','#'))});return
        for child in n.children:walk(child)
    walk(node)
    seen=set();result=[]
    for b in out:
        t=b.get('text','')
        if t in seen or t in ['-','+','Quick Look','Sale','No items found.','This product is out of stock.','Product is not available in this quantity.','/ sqft'] or not t:continue
        seen.add(t);result.append(b)
    return result
system=['/search','/coming-soon','/checkout','/paypal-checkout','/order-confirmation']
result=[]
for p in pages:
    if p['path'] in system:continue
    s=BeautifulSoup((ROOT/'source'/((p['path'].strip('/') or 'home').replace('/','__')+'.html')).read_text(encoding='utf8'),'html.parser')
    options=[]
    if p['path'].startswith('/product/'):
        for select in s.select('select:not([name])'):
            values=[clean_text(o.get_text()) for o in select.select('option')]
            if values:options.append({'label':values[0].replace('Select ','').strip(),'values':values[1:]})
    videos=[]
    for script in s.select('.w-lightbox script'):
        try:
            for item in json.loads(script.get_text()).get('items',[]):
                url=item.get('url','')
                if item.get('type')=='video' and url.startswith('https://'):videos.append(url)
        except (json.JSONDecodeError,TypeError):pass
    for n in s.select('.w-nav,.side-bar-modal-window,.footer-2,.footer-bottom-wrapper-2,script,style,noscript,.w-commerce-commercecartwrapper,form'):n.decompose()
    sections=[];imgs=[]
    for n in s.body.children:
        if not getattr(n,'name',None):continue
        classes=n.get('class',[])
        if 'without-space' in classes and 'no-padding-left-right' in classes:continue
        blocks=extract(n)
        if blocks:sections.append(blocks)
        for i in n.select('img[src]'):
            src=i.get('src')
            if src in assets and assets[src] not in imgs:imgs.append(assets[src])
    h=s.find('h1')
    name=clean_text(h.get_text(' ',strip=True)) if h else p['title'].split('|')[0].strip()
    links=[]; seen=set()
    for a in s.select('a[href]'):
        href=link(a['href']); txt=clean_text(a.get_text(' ',strip=True))
        if href not in seen and txt and (href.startswith('/') or any(x in href for x in ['.pdf','youtube','youtu.be'])):
            links.append({'href':href,'text':txt});seen.add(href)
    result.append({'path':p['path'],'title':name,'seoTitle':p['title'],'description':p['description'],'sections':sections,'images':imgs,'links':links,'source':p['url'],'options':options,'videos':list(dict.fromkeys(videos))})
(ROOT/'src').mkdir(exist_ok=True)
(ROOT/'src/content.json').write_text(json.dumps(result,ensure_ascii=False),encoding='utf8')
(ROOT/'public/content').mkdir(exist_ok=True)
for page in result:
    (ROOT/'public/content'/((page['path'].strip('/') or 'home').replace('/','__')+'.json')).write_text(json.dumps(page,ensure_ascii=False),encoding='utf8')
(ROOT/'src/catalog.json').write_text(json.dumps([{k:v for k,v in p.items() if k not in ['sections','options','videos']} for p in result],ensure_ascii=False),encoding='utf8')
(ROOT/'source/asset-map.json').write_text(json.dumps(assets,indent=2),encoding='utf8')
(ROOT/'public/sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>https://www.rudanroofing.com'+path+'</loc></url>' for path in [p['path'] for p in result]+['/areas','/roofing-guide','/site-map'])+'</urlset>',encoding='utf8')
print('Prepared',len(result),'content pages')
