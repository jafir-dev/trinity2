import os
from pathlib import Path
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

base = Path(r'c:\Users\Hussain Jafir\Downloads\Trinity Media\trinity2\Images\New Images')

for folder in sorted(base.iterdir()):
    if not folder.is_dir():
        continue
    files = [f for f in folder.iterdir() if f.is_file() and not f.name.startswith('.')]
    print(f"\n=============================")
    print(f"FOLDER: {folder.name} ({len(files)} files)")
    print(f"=============================")
    for f in sorted(files)[:6]:
        try:
            with Image.open(f) as im:
                print(f"  {f.name} | format={im.format} | size={im.size} | mode={im.mode}")
        except Exception as e:
            print(f"  {f.name} | ERROR: {e}")
