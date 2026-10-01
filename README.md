# CampusLync

A complete Next.js App Router website for worldwide academic and career support, with specialist London accommodation assistance. Built with TypeScript, Tailwind CSS, Lucide and locally bundled DM Sans / Manrope fonts. The supplied CampusLync logo is preserved at `public/campuslync.png`.

## Run locally

Requires Node.js 20.9 or newer. Install with `npm install`, then run `npm run dev` and open http://localhost:3000. For production, run `npm run build` followed by `npm start`. On Windows PowerShell, use `npm.cmd` if script execution policy blocks npm.ps1.

The scripts use Next.js’s supported Webpack compiler because this Windows environment blocks the native SWC binary; Webpack can use the WebAssembly fallback. Build workers are limited to two to reduce fallback overhead. On a different host these settings remain valid.

## Checks

- `npm run lint` — ESLint and Next.js rules
- `npm run typecheck` — TypeScript
- `npm test` — validation and delivery adapter contracts
- `npm run build` — production compilation and static page generation
- `npx playwright install chromium` then `npm run test:e2e` — browser, responsive, accessibility, navigation, API and form checks (starts the production server if necessary)
- `npm run check:launch` — deliberately fails until launch blockers have been addressed; it is not a build gate.

## Pages and content

The site includes Home, Study, Career, Accommodation, Moving to London, Resources, About, Contact, Privacy, Terms and Academic Integrity, plus a 404 page. Shared service, navigation, resource and FAQ data lives in `src/lib/content.ts`. Reusable components are in `src/components`.

The Resources page includes four downloadable PDF checklists. Regenerate them after changing `scripts/generate-checklists.mjs` with `npm run generate:checklists`.

Set `NEXT_PUBLIC_BOOKING_URL` to a confirmed HTTPS Calendly, Cal.com or other scheduling link to enable calendar booking. Until then, `/book` transparently directs visitors to request a consultation through the support form and does not claim that a time has been reserved.

## Admin dashboard

The protected dashboard is available at `/admin`. It remains disabled until `ADMIN_USERNAME`, `ADMIN_PASSWORD` and a random `ADMIN_SESSION_SECRET` of at least 32 characters are configured. Authentication uses an eight-hour, HTTP-only, same-site signed session cookie. Use platform-level rate limiting and secret management in production.

The dashboard reports the website's actual configuration, resource inventory and integration readiness. It intentionally does not display invented enquiry records. A persistent inbox requires an approved CRM or database, an enquiry delivery adapter and confirmed data-retention rules.

Inner-page photography is downloaded and served locally from `public/images`. Photos are sourced from Pexels under its free-use license: Yan Krukau (Study), Oluwapamilerinayo Ajala (Career), Mikhail Nilov and Ludovic Delot (student life), Kübra Arslaner (Resources), and Pexels contributors for the accommodation and London images. The files are resized WebP assets; source-page records should be retained if images are replaced or redistributed outside this project.

Branded supporting artwork is stored in `public/artwork`. The four transparent WebP families cover global support, academic development, career progression and London living. They were generated specifically for CampusLync with OpenAI's built-in image generation tool using the logo palette, a restrained 2.5D paper-cut editorial style and no embedded text or third-party marks.

Resources are honest coming-soon previews. To publish a resource, add its article route and reviewed content, then change its status to `published`; the ResourceCard already supports published article links. Add new article URLs to sitemap generation. Do not change status without a working article route.

## Enquiry delivery

Delivery is intentionally disabled. The form validates on the client and server; valid requests return HTTP 503 with an explicit “Your enquiry has not been sent” message. The app does not persist or log enquiry content. No fake success response is used.

Implement a server-only provider adapter through the `DeliveryAdapter` interface in `src/lib/enquiry-delivery.ts`, then replace the null adapter. An accepted provider response is required for success. Keep secrets in server environment variables. Agree on the recipient, sender identity, delivery provider and retention rules; document them in the final privacy policy. Add provider-appropriate timeout/retry handling, idempotency and rate limiting before opening submissions. The endpoint already limits body size and validates same-origin browser requests, but these are not a replacement for launch abuse controls.

After enabling delivery, update the FAQ, contact availability text, form footnote, Privacy and Terms to reflect actual operation. Retest success, rejection, timeout, validation and network failures. Never advertise a response time unless the business confirms it.

## Business and SEO configuration

Copy `.env.example` to `.env.local` and provide confirmed values:

- `NEXT_PUBLIC_SITE_URL`: the real public origin, e.g. your confirmed HTTPS domain (no domain is assumed).
- `BUSINESS_LEGAL_NAME`, `BUSINESS_CONTACT_EMAIL`, `BUSINESS_POSTAL_ADDRESS`: reviewed business details.

Without a site URL, the site deliberately emits no canonical URLs, its sitemap is empty and robots disallows indexing. Next.js may warn that it has no metadata base for the generated social image in local builds; configure the domain before production so Open Graph URLs use the real origin. Configure the public URL before building because static metadata and sitemap depend on it. Legal drafts stay noindex until reviewed and finalised.

## Launch requirements

1. Confirm domain, hosting, business identity and public contact arrangements.
2. Implement and test live delivery and abuse protection; configure provider credentials securely.
3. Have the business review all service wording, scope, fees and availability. Complete legal policies with actual processing, consumer and commercial terms, using appropriate professional review.
4. Remove draft labels and update legal metadata only after that review. Update `check-launch.mjs` to reflect completed checks rather than bypassing it.
5. Build and rerun browser checks using production-like configuration. Verify canonical URLs, sitemap, social sharing, HTTPS, request logging and deployed delivery.

No analytics, advertising, CMS, booking system, payment collection, property inventory or third-party partnerships are configured. The site does not send mail, contact external organisations or deploy automatically.

For the privacy review, consult the [ICO’s privacy information checklist](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/), including controller identity, purposes, legal basis, retention, recipients and applicable rights/complaint routes. This is a launch reference, not a claim that the current drafts are legally complete.
