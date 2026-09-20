from pathlib import Path
from PIL import Image
import requests,re
ROOT=Path(__file__).resolve().parent.parent
images=ROOT/'public/images'; archive=ROOT/'source/original-images';archive.mkdir(exist_ok=True)
for p in list(images.iterdir()):
    if p.suffix=='.webp':continue
    dest=p.with_suffix('.webp')
    if p.name.startswith('photo-'):
        im=Image.open(p);im.thumbnail((1800,1800));im.save(dest,'WEBP',quality=88)
    if dest.exists() and p.is_file() and p.parent.resolve()==images.resolve():
        if not (archive/p.name).exists():p.replace(archive/p.name)
fonts=ROOT/'public/fonts';fonts.mkdir(exist_ok=True)
css=requests.get('https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:wght@400;500;600;700;800;900&display=swap',timeout=20).text
out=[]
for i,block in enumerate(re.findall(r'@font-face\s*\{[^}]+\}',css)):
    url=re.search(r'url\(([^)]+)\)',block).group(1);ext=url.rsplit('.',1)[-1];name=f'font-{i}.{ext}'
    (fonts/name).write_bytes(requests.get(url,timeout=20).content)
    out.append(block.replace(url,'/fonts/'+name))
(ROOT/'src/fonts.css').write_text('\n'.join(out),encoding='utf8')
print('Optimized image MB',round(sum(p.stat().st_size for p in images.iterdir())/1e6,2))
