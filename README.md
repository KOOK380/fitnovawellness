# FitNova Wellness — website (Next.js)

The public website: Next.js 16, pre-rendered and SEO-optimised. The structure follows *Hierarchy.xlsx*, and the design is the FitNova homepage design.

All content comes from the **Laravel API + admin** in [`../fitnova-api`](../fitnova-api/README.md): pages, programs, blog, team, images, menu, footer, SEO and form submissions. Content is edited at `https://api.fitnovawellness.com/admin`, or http://127.0.0.1:8010/admin locally.

| | |
|---|---|
| **Hosting** | Vercel |
| **Content API + admin** | Laravel 13 + Filament on Hostinger, MySQL database |
| **Images** | Uploaded in the admin, stored on Hostinger and served through this site as `/media/...` |
| **Forms** | Booking, callback and guide forms post to `/api/leads/`, which forwards to Laravel. Each enquiry is saved under **Leads** in the admin and emailed to you. If saving fails, WhatsApp opens with the request pre-written. |
| **Live updates** | Saving in the admin calls `/api/revalidate`, and the pages refresh within seconds. |
| **Visitor stats** | `components/Analytics.tsx` sends one tiny cookie-free beacon per page view to `/api/t/`, which forwards to Laravel. It also loads Google Analytics 4 and/or Microsoft Clarity when they are switched on in the admin (Settings › Analytics & Integrations). Those scripts load after the page is interactive, so they don't slow the first paint. |

## Run it on your computer

1. Start the Laravel API first (see `../fitnova-api/README.md`).
2. Then run:
   ```bash
   npm install
   npm run dev                       # http://localhost:3010
   # or the production build:
   npm run build && npm start
   ```

`.env` holds the local settings. `.env.example` lists the three variables needed on Vercel:
- `NEXT_PUBLIC_SITE_URL`
- `CMS_API_URL`
- `REVALIDATE_SECRET` (must match the Laravel `.env`)

## Deploy

See **Go live** in `../fitnova-api/README.md`. Deploy the Laravel API on Hostinger first, then deploy this site on Vercel with the three environment variables.

## SEO built in

- Pages are pre-rendered HTML and re-generated when content changes.
- Each page has its title, meta description, H1, canonical link, and Open Graph and Twitter tags, all editable per page.
- Structured data:
  - **Clinic:** MedicalClinic/LocalBusiness, from Site Settings.
  - **About and Home:** Physician.
  - **Team:** MedicalOrganization.
  - **Program pages:** MedicalWebPage + MedicalCondition + FAQPage.
  - **How It Works:** HowTo.
  - **Blog:** Blog + BlogPosting.
  - **Booking and Contact pages:** ContactPage.
  - **FAQ sections:** FAQPage.
  - **All pages:** BreadcrumbList.
- `/sitemap.xml` is generated from the CMS, so new pages, programs and posts appear automatically. `/robots.txt` blocks `/admin/` and `/api/`.
- URLs end in `/`, as in the Hierarchy sheet.

## Project map

| Path | Contents |
|---|---|
| `components/Blocks.tsx` | How each CMS section renders with the FitNova design |
| `app/(frontend)/` | Public website routes |
| `app/api/revalidate/` | Called by Laravel after content changes |
| `lib/cms.ts` | Reads content from the Laravel API (cached; refreshed on change) |
| `lib/cms-types.ts` | Shape of the API data |
| `lib/seo.ts` | Metadata and structured data |
| `lib/lead.ts` | Form submission |
| `next.config.ts` | `/media/*` and `/api/leads/` are forwarded to Laravel |
