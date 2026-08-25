from pathlib import Path
import argparse, shutil, re

parser=argparse.ArgumentParser()
parser.add_argument("--slug",required=True)
parser.add_argument("--title",required=True)
parser.add_argument("--venue",required=True)
args=parser.parse_args()

root=Path(__file__).resolve().parents[1]
out=root/"build"/args.slug

if out.exists():
    raise SystemExit(f"{out} already exists")

for name in ["docs","experiments","paper_figures","shared"]:
    src=root/name
    if src.exists():
        shutil.copytree(src,out/name)

for name in ["LICENSE","preview_web.py","paper.yaml"]:
    shutil.copy2(root/name,out/name)

index=out/"docs/index.html"
txt=index.read_text(encoding="utf-8")
txt=txt.replace("Replace with your paper title",args.title)
txt=txt.replace("CONFERENCE 2027",args.venue.upper())
txt=txt.replace("Conference 2027",args.venue)
index.write_text(txt,encoding="utf-8")

print(f"Created {out}")
