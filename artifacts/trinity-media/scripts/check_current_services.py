import re

with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Split into service blocks
pattern = re.compile(r"\{\s*num:\s*'(\d+)',\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)'", re.DOTALL)
for m in pattern.finditer(text):
    num, slug, title = m.groups()
    # find image and images inside this block
    pos = m.start()
    next_pos = text.find('capabilities:', pos)
    block = text[pos:next_pos]
    img_m = re.search(r"image:\s*'([^']+)'", block)
    imgs_m = re.search(r"images:\s*(\[[^\]]+\])", block)
    img = img_m.group(1) if img_m else 'None'
    imgs = imgs_m.group(1).replace('\n', ' ') if imgs_m else 'None'
    print(f"[{num}] {slug} ({title})")
    print(f"     image: {img}")
    print(f"     images: {imgs[:60]}")
