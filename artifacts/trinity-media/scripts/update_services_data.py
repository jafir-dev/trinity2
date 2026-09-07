import json
import re

with open('public/images/services_manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# For each service in manifest, update or insert image and images in src/data/services.ts
# Let's see how services are defined in services.ts
for slug, img_list in manifest.items():
    if not img_list:
        continue
    # Let's take up to 12 images for each service
    selected_imgs = img_list[:12]
    cover_img = selected_imgs[0]
    
    # Check if slug exists in content
    slug_pattern = rf"(\s*slug:\s*'{re.escape(slug)}'.*?title:\s*'[^']+'.*?short:\s*'[^']+',)"
    match = re.search(slug_pattern, content, re.DOTALL)
    if not match:
        print(f"Slug not found: {slug}")
        continue

    # Find the block for this service
    start_pos = match.start()
    # Check if image: or images: already exists in this service before overview:
    overview_pos = content.find("overview:", start_pos)
    sub = content[start_pos:overview_pos]
    
    # Construct replacement image and images fields
    img_json_list = ", ".join(f"'{img}'" for img in selected_imgs)
    new_fields = f"\n    image: '{cover_img}',\n    images: [{img_json_list}],"
    
    if "image:" in sub:
        # Replace existing image and images
        sub_new = re.sub(r"\n\s*image:\s*'[^']+',", "", sub)
        sub_new = re.sub(r"\n\s*images:\s*\[[^\]]+\],", "", sub_new)
        # add before overview:
        sub_new = sub_new + new_fields + "\n    "
        content = content[:start_pos] + sub_new + content[overview_pos:]
    else:
        # Add before overview
        sub_new = sub + new_fields + "\n    "
        content = content[:start_pos] + sub_new + content[overview_pos:]

with open('src/data/services.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated src/data/services.ts!")
