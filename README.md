<<<<<<< HEAD
# jia-jing-portfolio
=======
# CS Student Portfolio (Next.js)

A single-page portfolio site styled around a terminal / git-log theme.
Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize

All content lives in `app/page.tsx`:
- Name, role, and intro text near the top of the file
- `projects` array — your repos
- `commits` array — internships, TA roles, etc. (rendered as a git log)
- Package.json-style skills block, further down `page.tsx`
- Contact links at the bottom

Colors and fonts are defined as CSS variables in `app/globals.css` and wired
into `tailwind.config.ts` (`paper`, `surface`, `ink`, `pine`, `sienna`, etc.),
with a dark theme applied automatically via `prefers-color-scheme`.

## Deploy to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset auto-detects as Next.js — no config needed.
4. Deploy.

Or with the CLI:

```bash
npm i -g vercel
vercel
```
>>>>>>> 0894285 (Initial portfolio)
