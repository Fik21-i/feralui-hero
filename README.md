# feralui-hero

A single-section landing-page hero built with React 19 + Vite 8 + TypeScript, using the
free, MIT-licensed **PullCord** component from [FeralUI](https://feralui.dev/pullcord)
(`npm install pullcord`). Pull (or click / press Enter on) the cord to flip dark/light theme.

Only the hero exists — no navbar, features, pricing or footer. No secrets, env vars or
third-party network requests (fonts are self-hosted via `@fontsource-variable/fraunces`).

## Requirements

Node 22+ (`.node-version` pins `22`; Wrangler 4.152 requires Node >= 22).

## Scripts

| Script                    | What it does                                                  |
| ------------------------- | ------------------------------------------------------------- |
| `npm run dev`             | Vite dev server                                               |
| `npm run check`           | `oxlint` + `tsc -b`                                           |
| `npm run build`           | Typecheck + production build into `dist/`                     |
| `npm run preview`         | Serve `dist/` with Vite                                       |
| `npm run preview:workers` | Local Workers runtime with static assets (`wrangler dev`)     |
| `npm run preview:pages`   | Local Pages runtime (`wrangler pages dev dist`)               |
| `npm run verify:workers`  | Build + `wrangler deploy --dry-run` (no upload)               |
| `npm run deploy:pages`    | Build + `wrangler pages deploy dist --project-name=feralui-hero` |
| `npm run deploy:workers`  | Build + `wrangler deploy`                                     |

The `deploy:*` scripts publish to your Cloudflare account and need `wrangler login` or
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` in your shell/CI. Nothing is stored in the repo.

## Cloudflare Pages (Git integration or direct upload)

- Framework preset: Vite / React
- Build command: `npm run build`
- Build output directory: `dist`
- Env var (optional): `NODE_VERSION=22` (also read from `.node-version`)
- `wrangler.jsonc` has no `pages_build_output_dir`, so Pages ignores it.

## Cloudflare Workers (static assets, Workers Builds or CLI)

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Config: `wrangler.jsonc` — assets-only Worker (no `main`), serving `./dist`,
  `not_found_handling: "404-page"` (serves `404.html` with a real 404 status).
- Bump `compatibility_date` only to a date supported by the installed Wrangler.

## Shared static config (`public/`)

- `_headers` — security headers + strict CSP + immutable cache on `/assets/*`
  (honoured by both Pages and Workers assets).
- `404.html` — same 404 behaviour on both platforms.

## FeralUI component

`PullCord` from `pullcord@0.1.0` (MIT; peer `react >= 18`, dep `motion`). Imported in
`src/App.tsx` together with `pullcord/pullcord.css`. Positioned via `--pullcord-right`,
`--pullcord-z`, `--pullcord-ink` (see `src/index.css` / `src/App.css`).
