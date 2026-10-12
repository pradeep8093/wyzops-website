# WyzOps — website

Marketing site for **WyzOps** — *Build. Integrate. Automate.*

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Geist fonts · lucide icons. No UI framework, no animation library: the sections are Server Components, and one small client island (`SiteEffects`) handles scroll reveals and card hover glows.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # ESLint
npm run typecheck            # TypeScript
```

Requires Node.js 20.9 or newer.

## Launch checklist

These are deliberate placeholders. The site doesn't invent anything you haven't given it.

| What | Where | Notes |
| --- | --- | --- |
| **Production URL** | `NEXT_PUBLIC_SITE_URL` (or `src/content/site.ts`) | Defaults to `https://wyzops.com`. Confirm it. It drives canonical URLs, Open Graph, the sitemap, and robots.txt. |
| **Contact email** | `NEXT_PUBLIC_CONTACT_EMAIL` (or `src/content/site.ts`) | Shows `hello@example.com` (a reserved placeholder domain) until set. |
| **Contact form delivery** | `CONTACT_WEBHOOK_URL` *or* `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | See below. In production the form shows an error until one is configured. |
| **Legal pages** | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Templates with `[bracketed]` placeholders. Have them reviewed, then set `legalPagesAreDrafts: false` in `site.ts` to remove the notice. |
| **Leadership / team profiles** | `src/content/team.ts` | Empty. The biggest trust boost available — add real names, photos, LinkedIn. Profile cards appear in the Team section automatically. |
| **Booking link** | `NEXT_PUBLIC_BOOKING_URL` (or `site.ts`) | Optional Cal.com / Calendly link. "Book a call" buttons appear once set. |
| **Pricing** | `src/content/pricing.ts` | Starting prices set from 2026 market benchmarks (see the file header). Review them; hide the section with `showPricing: false`. |
| **Delivery commitments** | `src/content/home.ts` → `overlap`, `deliveryPoints`, `teamCommitments` | US-hours overlap window, IP ownership, NDAs, USD invoicing, warranty, stable team. Confirm each matches how you operate. |
| **Social links** | `socials` in `src/content/site.ts` | Empty by default. Links appear in the footer and structured data only once you add real ones. |
| **Products** | `src/content/products.ts` | Empty. The section (and its nav link) stays hidden until you add entries — or set `showEmptySections: true` to show a "coming soon" state. |
| **Case studies** | `src/content/case-studies.ts` | Empty and hidden until you add real, client-approved projects. Even one anonymized example helps a lot. |

Copy `.env.example` to `.env.local` for local development.

## Contact form

`src/app/contact/actions.ts` is a Server Action. It validates input (shared rules in `src/lib/contact.ts`), filters bots with a honeypot, and delivers each inquiry using the first option you've configured:

1. **Webhook:** `CONTACT_WEBHOOK_URL` receives a JSON `POST` (`{ type, text, inquiry }`). The `text` field means a Slack incoming webhook works as-is. Zapier, Make, n8n, or your own API also work.
2. **Email via [Resend](https://resend.com):** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (a sender on a domain you've verified). Replies go straight to the person who wrote in.
3. **Development fallback:** with neither set, `npm run dev` logs inquiries to the terminal.

Service cards link to `/contact?type=<project-type>`, which pre-selects the project type in the form. The form also works without JavaScript.

## Editing content

All copy and data live in `src/content/`. Components only handle presentation.

```
src/content/
  site.ts           brand, URL, email, location, booking link, feature flags
  navigation.ts     header + footer links (Products/Pricing appear automatically)
  home.ts           homepage copy: hero, about, AI, team model, delivery model, process, CTA
  services.ts       practices (Integration & Automation, AI Engineering, Product Engineering) + advisory
  pricing.ts        engagement models and starting prices (USD)
  team.ts           leadership profiles (empty for now)
  products.ts       your micro-SaaS products (empty for now)
  case-studies.ts   client work (empty for now)
  contact.ts        form options: help topics, project types, budgets
```

Homepage section order lives in `src/app/page.tsx`; section numbers (01, 02, …) are assigned automatically, so hidden sections never leave gaps.

**Adding a product:** add an object to `products` in `products.ts`, with `name`, `description`, `category`, `status` (`live` | `beta` | `in-development` | `coming-soon`), and optionally `url` and `image`. Put screenshots in `public/products/` (16:10 works best). The grid replaces the placeholder automatically.

**Adding a case study:** the same pattern, in `case-studies.ts`.

**Icons:** content files refer to icons by key (`"workflow"`, `"sparkles"`, …). To add one, import it from `lucide-react` and register it in `src/components/ui/icon.tsx`.

## Project structure

```
src/
  app/
    layout.tsx            fonts, global metadata, navbar/footer, Organization JSON-LD
    page.tsx              homepage
    contact/              contact page + server action
    privacy/, terms/      legal templates
    not-found.tsx         404
    opengraph-image.tsx   generated social card (1200×630)
    icon.svg, apple-icon.tsx, manifest.ts, sitemap.ts, robots.ts
    globals.css           design tokens, utilities, motion
  components/
    layout/               navbar (sticky + mobile menu), footer, legal layout
    sections/             one file per homepage section
    diagrams/             animated SVG system map, AI agent diagram, UI mocks
    ui/                   button, section header, logo, icon
    contact/              contact form
    effects/              SiteEffects (reveals, spotlight, off-screen pausing)
    seo/                  JSON-LD helpers
  content/                all editable copy and data
  lib/                    metadata helper, contact validation, cn()
```

## Design system

Tokens are defined in `src/app/globals.css` (`@theme`):

- **Surfaces:** `canvas` (#05060a), `surface`, `elevated`, `raised`
- **Text:** `fg`, `muted`, `subtle`. All pass WCAG AA on the canvas color.
- **Accents:** `brand-blue`, `brand-violet`, `brand-cyan`, `brand-sky`
- **Utilities:** `container-page`, `eyebrow`, `text-gradient`, `bg-grid`, `bg-dots`, `glass`, `hairline-x`

**Motion:**

- **Scroll reveals:** add `data-reveal`. An optional `--reveal-delay` staggers items.
- **Hover glow:** add `data-spotlight` together with the `spotlight` class.
- **Off-screen pausing:** add `data-anim` to pause looping animations while out of view.
- **Reduced motion:** with `prefers-reduced-motion`, everything renders static.

## SEO

- Per-page titles, descriptions, canonical URLs, and Open Graph/X cards (`src/lib/metadata.ts`)
- Generated OG image, `sitemap.xml`, `robots.txt`, and a web manifest
- JSON-LD:
  - `Organization` and `WebSite` on every page
  - `OfferCatalog` of services on the homepage
  - Contact email and social profiles are added only once they're real

## Deploying

The simplest option is Vercel: import the repo, add the environment variables, and deploy. It also runs on any Node host (`npm run build && npm start`).
