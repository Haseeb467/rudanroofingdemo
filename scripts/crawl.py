import requests, json, re, pathlib, concurrent.futures, urllib.parse
from bs4 import BeautifulSoup
BASE='https://www.rudanroofing.com'
ROOT=pathlib.Path(__file__).resolve().parent.parent
(ROOT/'source').mkdir(exist_ok=True)
(ROOT/'public').mkdir(exist_ok=True)
session=requests.Session()
xml=session.get(BASE+'/sitemap.xml',timeout=30).text
(ROOT/'source/sitemap.xml').write_text(xml,encoding='utf-8')
urls=re.findall(r'<loc>(.*?)</loc>',xml)
def crawl(url):
    try:
        r=session.get(url,timeout=40); r.raise_for_status()
        path=urllib.parse.urlparse(url).path or '/'
        (ROOT/'source'/((path.strip('/') or 'home').replace('/','__')+'.html')).write_text(r.text,encoding='utf-8')
        soup=BeautifulSoup(r.text,'html.parser')
        title=soup.title.get_text(' ',strip=True) if soup.title else path
        desc=soup.find('meta',attrs={'name':'description'})
        images=[{'src':i.get('src'), 'alt':i.get('alt','')} for i in soup.select('img[src]')]
        links=[{'href':a.get('href'),'text':a.get_text(' ',strip=True)} for a in soup.select('a[href]')]
        for n in soup.select('script,style,nav,footer,form,.w-nav,.w-commerce-commercecartwrapper,.footer,.navbar'): n.decompose()
        body=soup.body or soup
        blocks=[]
        for n in body.select('h1,h2,h3,h4,h5,h6,p,li,.w-richtext,table'):
            if n.find_parent(class_='w-richtext'): continue
            t=n.get_text(' ',strip=True)
            if t and t not in [b['text'] for b in blocks]: blocks.append({'tag': n.name,'text': t,'html':str(n) if 'w-richtext' in n.get('class',[]) or n.name=='table' else None})
        return {'path':path,'url':url,'title':title,'description':desc.get('content','') if desc else '', 'blocks':blocks,'images':images,'links':links}
    except Exception as e: return {'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: pages=list(pool.map(crawl,urls))
(ROOT/'source/content.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2),encoding='utf-8')
print('Collected',len(pages),'pages. Errors:',[p for p in pages if 'error' in p])
