import re

with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(r"slug:\s*'([^']+)'(?:.*?title:\s*'([^']+)')?", re.DOTALL)
slugs = re.findall(r"slug:\s*'([^']+)'", text)
titles = re.findall(r"title:\s*'([^']+)'", text)
nums = re.findall(r"num:\s*'([^']+)'", text)

print(f"Total services count: {len(slugs)}")
for n, s, t in zip(nums, slugs, titles):
    print(f"{n}: {s} -> {t}")

