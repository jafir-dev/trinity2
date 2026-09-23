import os
import shutil
from pathlib import Path
from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

SOURCE_BASE = Path(r'C:\Users\Hussain Jafir\Downloads\Trinity Media\trinity2\Images\New Images')
TARGET_BASE = Path(r'C:\Users\Hussain Jafir\Downloads\Trinity Media\trinity2\artifacts\trinity-media\public\images')

# Mapping from Folder name in New Images to service slug
FOLDER_TO_SLUG = {
    'Acrylic Fabrication': 'acrylic-fabrication',
    'Canvas Prints, Photo Frames & Wall Décor': 'canvas-prints-photo-frames-wall-decor',
    'Custom Kiosk Design & Fabrication': 'custom-kiosk-design-fabrication',
    'Event Branding & Activation': 'event-branding-activation',
    'Exhibition Stand Design & Construction': 'exhibition-stand-design-construction',
    'Indoor & Outdoor Signage': 'indoor-outdoor-signage',
    'Interior Fit-Out Solutions': 'interior-fit-out-solutions',
    'LED Neon & Illuminated Signage': 'led-neon-illuminated-signage',
    'Large Format & Digital Printing': 'large-format-digital-printing',
    'Portable display & branding Solutions': 'portable-display-branding-solutions',
    'Retail Display & Point-of-Sale Solutions': 'retail-display-pos-solutions',
    'Shell Scheme Booth Rental & Furniture Rental': 'shell-scheme-booth-furniture-rental',
    'Vehicle Branding & Fleet Graphics': 'vehicle-branding-fleet-graphics',
}

def optimize_and_save(src_file: Path, dest_file: Path, max_dim=1920, quality=85):
    dest_file.parent.mkdir(parents=True, exist_ok=True)
    try:
        with Image.open(src_file) as img:
            # Transpose orientation according to EXIF
            img = ImageOps.exif_transpose(img)
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize if dimensions exceed max_dim
            w, h = img.size
            if max(w, h) > max_dim:
                scale = max_dim / float(max(w, h))
                new_w = int(w * scale)
                new_h = int(h * scale)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            img.save(dest_file, 'JPEG', quality=quality, optimize=True, progressive=True)
            return True
    except Exception as e:
        print(f"Error processing {src_file.name}: {e}")
        return False

def main():
    service_images_map = {}
    
    print("Step 1: Processing images from New Images folders...")
    for folder_name, slug in FOLDER_TO_SLUG.items():
        src_folder = SOURCE_BASE / folder_name
        if not src_folder.exists():
            # Try fuzzy match if Unicode character discrepancy
            for cand in SOURCE_BASE.iterdir():
                if cand.name.startswith(folder_name[:15]):
                    src_folder = cand
                    break
        
        if not src_folder.exists():
            print(f"Warning: folder {folder_name} not found!")
            continue

        dest_dir = TARGET_BASE / 'services' / slug
        dest_dir.mkdir(parents=True, exist_ok=True)
        
        valid_files = [
            f for f in sorted(src_folder.iterdir()) 
            if f.is_file() and not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.heic']
        ]
        
        saved_urls = []
        count = 1
        for f in valid_files:
            dest_name = f"{count:02d}.jpg"
            dest_path = dest_dir / dest_name
            success = optimize_and_save(f, dest_path)
            if success:
                saved_urls.append(f"/images/services/{slug}/{dest_name}")
                count += 1
        
        service_images_map[slug] = saved_urls
        print(f"Processed {slug}: {len(saved_urls)} images saved.")

    print("\nStep 2: Populating complementary services from existing sets...")
    # 07 corrugated-display-forex-stand-solutions
    c07 = service_images_map.get('retail-display-pos-solutions', [])[:8] + service_images_map.get('portable-display-branding-solutions', [])[:4]
    service_images_map['corrugated-display-forex-stand-solutions'] = c07
    
    # 14 custom-fabric-printing-branding
    c14 = service_images_map.get('large-format-digital-printing', [])[:8] + service_images_map.get('event-branding-activation', [])[:4]
    service_images_map['custom-fabric-printing-branding'] = c14
    
    # 16 kitchen-cabinet-wrapping
    c16 = service_images_map.get('interior-fit-out-solutions', [])[:8] + service_images_map.get('large-format-digital-printing', [])[8:12]
    service_images_map['kitchen-cabinet-wrapping'] = c16
    
    # 17 decorative-wallpaper-solutions
    c17 = service_images_map.get('canvas-prints-photo-frames-wall-decor', [])[:8] + service_images_map.get('interior-fit-out-solutions', [])[8:12]
    service_images_map['decorative-wallpaper-solutions'] = c17
    
    # 18 custom-awards-recognition-products
    c18 = service_images_map.get('acrylic-fabrication', [])[:10]
    service_images_map['custom-awards-recognition-products'] = c18
    
    # 19 commercial-offset-printing
    c19 = service_images_map.get('large-format-digital-printing', [])[12:22]
    service_images_map['commercial-offset-printing'] = c19

    print("\nStep 3: Creating portfolio & hero highlights...")
    portfolio_dir = TARGET_BASE / 'portfolio'
    portfolio_dir.mkdir(parents=True, exist_ok=True)
    
    # Pick top images for portfolio
    # 1: Exhibition stand
    if service_images_map.get('exhibition-stand-design-construction'):
        shutil.copy2(TARGET_BASE / 'services' / 'exhibition-stand-design-construction' / '01.jpg', portfolio_dir / 'exhibition-stand.jpg')
    # 2: Retail POS
    if service_images_map.get('retail-display-pos-solutions'):
        shutil.copy2(TARGET_BASE / 'services' / 'retail-display-pos-solutions' / '01.jpg', portfolio_dir / 'retail-display.jpg')
    # 3: Signage LED
    if service_images_map.get('led-neon-illuminated-signage'):
        shutil.copy2(TARGET_BASE / 'services' / 'led-neon-illuminated-signage' / '01.jpg', portfolio_dir / 'led-neon.jpg')
    # 4: Kiosk
    if service_images_map.get('custom-kiosk-design-fabrication'):
        shutil.copy2(TARGET_BASE / 'services' / 'custom-kiosk-design-fabrication' / '01.jpg', portfolio_dir / 'kiosk-fabrication.jpg')
    # 5: Event Branding
    if service_images_map.get('event-branding-activation'):
        shutil.copy2(TARGET_BASE / 'services' / 'event-branding-activation' / '01.jpg', portfolio_dir / 'event-activation.jpg')
    # 6: Vehicle branding
    if service_images_map.get('vehicle-branding-fleet-graphics'):
        shutil.copy2(TARGET_BASE / 'services' / 'vehicle-branding-fleet-graphics' / '01.jpg', portfolio_dir / 'vehicle-branding.jpg')

    # Hero slide images
    hero_dir = TARGET_BASE / 'hero'
    hero_dir.mkdir(parents=True, exist_ok=True)
    if service_images_map.get('exhibition-stand-design-construction'):
        shutil.copy2(TARGET_BASE / 'services' / 'exhibition-stand-design-construction' / '02.jpg', hero_dir / 'hero-slide-1.jpg')
    if service_images_map.get('large-format-digital-printing'):
        shutil.copy2(TARGET_BASE / 'services' / 'large-format-digital-printing' / '01.jpg', hero_dir / 'hero-slide-2.jpg')
    if service_images_map.get('retail-display-pos-solutions'):
        shutil.copy2(TARGET_BASE / 'services' / 'retail-display-pos-solutions' / '03.jpg', hero_dir / 'hero-slide-3.jpg')

    # Save JSON manifest of all images for typescript/data import
    import json
    with open(TARGET_BASE / 'services_manifest.json', 'w', encoding='utf-8') as f:
        json.dump(service_images_map, f, indent=2)
    print("Successfully saved services_manifest.json!")

if __name__ == '__main__':
    main()
