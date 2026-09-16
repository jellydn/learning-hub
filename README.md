# Learn³ — Learning Hub

A local-first personal learning dashboard for three ongoing learning tracks:

- Web App Security Learning
- Executive Communication
- Train My First LLM

## Features

- Three structured learning curricula
- Bite-sized 15–20 minute lessons
- Hands-on application exercise for every lesson
- Continue-learning flow
- Local progress persistence (`localStorage`)
- Global lesson search
- Teach Me topic routing
- Active-recall review queue
- Responsive desktop/mobile UI
- Zero backend and zero runtime dependencies
- Automatic GitHub Pages deployment

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Content model

The initial release intentionally keeps content in `app.js` so the app can run as a dependency-free static site. A future version can move lessons into Markdown/MDX while preserving the same curriculum model.

## Deployment

Every push to `main` runs `.github/workflows/pages.yml` and deploys the repository as a GitHub Pages artifact. In repository Settings → Pages, set **Source** to **GitHub Actions** if it is not already enabled.
