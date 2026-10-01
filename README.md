# Jia Jing Portfolio

Built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Run locally

Use Node.js 22 (run `nvm use` if you use nvm).

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

Inter and Fraunces are bundled in `app/fonts/`, so builds do not need to download fonts.

## Deploy to Vercel

Import the repository with the Next.js framework preset and Node.js 22.x. Use the repository root as the Root Directory and the default build command (`npm run build`). No environment variables are required.

Static assets are tracked in `public/` and referenced from the site root (for example, `/me.jpg` and `/resume.pdf`).
