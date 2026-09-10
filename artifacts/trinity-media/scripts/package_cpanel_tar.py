import os
import tarfile
from pathlib import Path

root = Path(r'c:\Users\Hussain Jafir\Documents\trinity2')
dist_dir = root / 'artifacts' / 'trinity-media' / 'dist' / 'public'
tar_path = root / 'trinity_media_cpanel.tar'
tar_gz_path = root / 'trinity_media_cpanel.tar.gz'

print(f"Dist dir exists: {dist_dir.exists()}")
print(f"Index html exists: {(dist_dir / 'index.html').exists()}")
print(f".htaccess exists: {(dist_dir / '.htaccess').exists()}")

# Create standard .tar archive
with tarfile.open(tar_path, 'w') as tar:
    for root_folder, dirs, files in os.walk(dist_dir):
        # Include hidden files like .htaccess
        for file in files:
            full_path = Path(root_folder) / file
            rel_path = full_path.relative_to(dist_dir)
            tar.add(full_path, arcname=str(rel_path).replace('\\', '/'))

print(f"Created: {tar_path} ({tar_path.stat().st_size / (1024*1024):.2f} MB)")

# Also create compressed .tar.gz archive
with tarfile.open(tar_gz_path, 'w:gz') as tar_gz:
    for root_folder, dirs, files in os.walk(dist_dir):
        for file in files:
            full_path = Path(root_folder) / file
            rel_path = full_path.relative_to(dist_dir)
            tar_gz.add(full_path, arcname=str(rel_path).replace('\\', '/'))

print(f"Created: {tar_gz_path} ({tar_gz_path.stat().st_size / (1024*1024):.2f} MB)")
