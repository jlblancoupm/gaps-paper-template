from pathlib import Path
import re, sys

root=Path(__file__).resolve().parents[1]
issues=[]

required=[
    "docs/index.html","docs/styles.css","docs/app.js","LICENSE","paper.yaml",
    "experiments/scripts","paper_figures/scripts","paper_figures/reference"
]
for rel in required:
    if not (root/rel).exists():
        issues.append(f"missing: {rel}")

for p in root.rglob("*"):
    if p.is_file() and p.suffix.lower() in {".html",".js",".md",".yaml",".yml",".toml"}:
        text=p.read_text(encoding="utf-8",errors="ignore")
        if "CHANGE_ME" in text:
            issues.append(f"placeholder CHANGE_ME: {p.relative_to(root)}")

html=(root/"docs/index.html").read_text(encoding="utf-8")
for match in re.finditer(r'<a\b[^>]*href="([^"]+)"[^>]*>',html):
    tag=match.group(0); href=match.group(1)
    if href.startswith("http") and 'target="_blank"' not in tag:
        issues.append(f"external link without target=_blank: {href}")

if issues:
    print("\n".join(f"[!] {x}" for x in issues))
    sys.exit(1)

print("Site validation passed.")
