import shutil
import os
from pathlib import Path

root = Path(r'c:\Users\Hussain Jafir\Documents\trinity2')
dist_dir = root / 'artifacts' / 'trinity-media' / 'dist' / 'public'
zip_out = root / 'trinity_media_cpanel'

print(f"Dist dir exists: {dist_dir.exists()}")
print(f"Index html exists: {(dist_dir / 'index.html').exists()}")
print(f".htaccess exists: {(dist_dir / '.htaccess').exists()}")

# Create zip in root
shutil.make_archive(str(zip_out), 'zip', root_dir=str(dist_dir))
zip_file = root / 'trinity_media_cpanel.zip'
print(f"Created: {zip_file} ({zip_file.stat().st_size / (1024*1024):.2f} MB)")
