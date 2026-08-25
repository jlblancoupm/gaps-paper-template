# GAPS Paper Template

Reusable companion-site template for GAPS research publications.

The goal is not to reproduce the PDF in HTML. A companion site should help a reader understand, inspect, reproduce and remember the contribution.

## Default principles

- publication-first design inspired by the GAPS-UPM visual language;
- GAPS header/footer and institutional links ready by default;
- KaTeX for mathematical notation;
- all external links open in a new tab;
- authors are plain text unless a verified profile URL is provided;
- `experiments/scripts/` generates numerical experiment outputs;
- `paper_figures/scripts/` reproduces the **exact figures used in the paper**;
- interactive material is separate from published evidence;
- every interactive visual should be labelled as one of:
  - `exact`
  - `precomputed`
  - `interpolated`
  - `conceptual`
- citation formats: Plain text, BibTeX and RIS;
- BibTeX should be LaTeX-safe:
  - accents such as `Guti{\'e}rrez`;
  - preserve required capitalization with braces, e.g. `{GOTHAM}`, `{NF}`.

## Create a new paper site

```bash
python scripts/new_paper.py --slug my-paper-2027 --title "My Paper Title" --venue "ICASSP 2027"
```

This creates a ready-to-edit project folder under `build/`.

For a GitHub-hosted paper site, the intended deployment is:

```text
https://<github-user>.github.io/<repository-name>/
```

and GitHub Pages should publish `/docs` from `main`.

## Local preview

```bash
python preview_web.py
```

Open `http://127.0.0.1:8000/`.

## Repository structure

```text
gaps-paper-template/
├── paper.yaml
├── docs/
├── shared/
├── experiments/
│   └── scripts/
├── paper_figures/
│   ├── scripts/
│   ├── reference/
│   └── generated/
├── scripts/
│   ├── new_paper.py
│   └── validate_site.py
└── examples/
    └── gotham_nf_seminal/
```

## What belongs where?

`docs/`
: Public GitHub Pages companion site.

`experiments/scripts/`
: Numerical experiments. No paper layout code.

`paper_figures/scripts/`
: Scripts that render the exact publication figures from validated outputs.

`paper_figures/reference/`
: Canonical assets used in the submitted/accepted paper.

`docs/interactive/`
: Web interaction. It may explain or explore beyond the paper, but its provenance must be explicit.

## License

The template software is MIT-licensed.

Papers, publication figures, datasets and scientific content created with this template may have separate licenses. Do not assume the MIT license covers them.
