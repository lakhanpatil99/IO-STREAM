# Kick To Tech 2.0

Premium frontend for **Kick To Tech** — Pune's student tech community building the bridge between education and employability through workshops, hackathons, mentorship, and industry-grade internships.

Built with the App Router and a clean service/mock boundary so the UI is fully functional today and backend-ready later.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** design tokens (dark teal/cyan identity)
- **Framer Motion** for restrained, purposeful motion
- **lucide-react** icons, **react-hook-form** + **zod** for forms
- Mock service layer (`src/services`) — no backend or secrets required to run

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next lint) |
| `npm run typecheck` | `tsc --noEmit` |

## Environment

This phase runs entirely on mock services — no environment variables are required to build or run. See [`.env.example`](./.env.example) for the documented integration points used by the later backend phase. Never commit real secrets, and never place private keys in `NEXT_PUBLIC_*` variables.

## Project structure

```
src/
  app/            # routes (App Router) + robots.ts + sitemap.ts
  components/     # UI, sections, page-specific components
  config/         # site config (single source of truth)
  data/mock/      # real content wired through the mock service layer
  hooks/          # reusable hooks
  lib/            # utilities (motion, formatting, media)
  services/       # service layer (mock adapters, backend-ready)
  styles/         # global styles + design tokens
public/           # real images, brand, team, events, partners, cert assets
```

## Deployment (Vercel)

Zero-config: import the repository into Vercel and it auto-detects Next.js.

- **Framework preset:** Next.js
- **Build command:** `next build` (default)
- **Output:** `.next` (default)
- **Install command:** `npm install` (default)

No environment variables are required for the current frontend phase.
