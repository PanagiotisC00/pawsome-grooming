<!-- Update: brief README + SEO notes -->

## Pawsome Grooming Cyprus
Modern, multilingual grooming website and demo admin built on Next.js (App Router), TypeScript, Tailwind, and shadcn/ui.

### Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4, Radix/shadcn UI, lucide-react
- i18n via JSON files in `public/locales` (English, Greek)

### Key routes
- `/` Home, `/services`, `/gallery`, `/booking`, `/contact`
- `/dashboard` Appointments, Clients, Services, Revenue, Gallery (demo)

### Run (Windows PowerShell)
```powershell
pnpm install
pnpm dev   # http://localhost:3000
```
Prod:
```powershell
pnpm build && pnpm start
```

### SEO
- Metadata: canonical, OpenGraph, Twitter, robots (index/follow) configured in `app/layout.tsx`.
- robots.txt: `public/robots.txt` allows crawling and excludes `/dashboard`.
- Set `NEXT_PUBLIC_SITE_URL` in production (e.g., `https://www.pawsomegrooming.cy`) for correct canonical/links.

### Notes
- UI components live in `components/ui/*`. Translations live in `public/locales/*`.