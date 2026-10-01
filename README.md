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

The confirmed CampusLync Calendly link is documented in `.env.example`. Set `NEXT_PUBLIC_BOOKING_URL=https://calendly.com/rajeevjh7665/30min` in each deployment environment to enable calendar booking. If it is omitted, `/book` transparently directs visitors to request a consultation through the support form and does not claim that a time has been reserved.

## Admin dashboard

The protected dashboard is available at `/admin`. It remains disabled until `ADMIN_USERNAME`, `ADMIN_PASSWORD` and a random `ADMIN_SESSION_SECRET` of at least 32 characters are configured. Authentication uses an eight-hour, HTTP-only, same-site signed session cookie. Use platform-level rate limiting and secret management in production.

The dashboard reports the website's actual configuration, resource inventory and integration readiness. When PostgreSQL is connected and migrated it provides a real enquiry inbox, contact details, notification status and workflow states. No sample or invented enquiry records are displayed.

Inner-page photography is downloaded and served locally from `public/images`. Photos are sourced from Pexels under its free-use license: Yan Krukau (Study), Oluwapamilerinayo Ajala (Career), Mikhail Nilov and Ludovic Delot (student life), Kübra Arslaner (Resources), and Pexels contributors for the accommodation and London images. The files are resized WebP assets; source-page records should be retained if images are replaced or redistributed outside this project.

Branded supporting artwork is stored in `public/artwork`. The four transparent WebP families cover global support, academic development, career progression and London living. They were generated specifically for CampusLync with OpenAI's built-in image generation tool using the logo palette, a restrained 2.5D paper-cut editorial style and no embedded text or third-party marks.

Resources are honest coming-soon previews. To publish a resource, add its article route and reviewed content, then change its status to `published`; the ResourceCard already supports published article links. Add new article URLs to sitemap generation. Do not change status without a working article route.

## Database and enquiry delivery

The site supports PostgreSQL persistence through `DATABASE_URL`. Run `npm run db:migrate` once for each new database before accepting enquiries. With no database configured, valid submissions continue to return HTTP 503 and the UI clearly states that nothing was sent or saved.

With a migrated database, the server validates and stores the enquiry before showing success. It does not log message content. The endpoint includes a hidden-field bot trap, same-origin checks, a 24 KB body limit and database-backed rate limiting of five attempts per hashed network identifier per 15-minute window. Configure a unique `RATE_LIMIT_SECRET`; raw IP addresses are not stored in the application database.

Resend email notifications are optional. Configure `RESEND_API_KEY`, `ENQUIRY_NOTIFICATION_TO` and `ENQUIRY_FROM_EMAIL` together. The database remains the source of truth: an email-provider failure is recorded in the admin dashboard without discarding an accepted enquiry. Email requests use an idempotency key and an eight-second timeout.

Set and legally confirm `DATA_RETENTION_DAYS`, then schedule `npm run db:cleanup` with the deployment platform. This removes expired enquiries and old rate-limit rows. `/api/health` returns HTTP 200 only when the configured database is reachable.

## Business and SEO configuration

Copy `.env.example` to `.env.local` and provide confirmed values:

- `NEXT_PUBLIC_SITE_URL`: the real public origin, e.g. your confirmed HTTPS domain (no domain is assumed).
- `BUSINESS_LEGAL_NAME`, `BUSINESS_CONTACT_EMAIL`, `BUSINESS_CONTACT_PHONE`, `BUSINESS_POSTAL_ADDRESS`: reviewed business details.
- `DATABASE_URL`: a pooled PostgreSQL connection URL suitable for the hosting environment.
- `RATE_LIMIT_SECRET`: a random value of at least 32 characters.
- `DATA_RETENTION_DAYS`: the reviewed enquiry-retention period.
- Resend variables: optional internal email notifications.

Without a site URL, the site deliberately emits no canonical URLs, its sitemap is empty and robots disallows indexing. Next.js may warn that it has no metadata base for the generated social image in local builds; configure the domain before production so Open Graph URLs use the real origin. Configure the public URL before building because static metadata and sitemap depend on it. Legal drafts stay noindex until reviewed and finalised.

## Launch requirements

1. Confirm domain, hosting, business identity and public contact arrangements.
2. Create PostgreSQL, configure its pooled connection URL, and run `npm run db:migrate`.
3. Configure the rate-limit secret and optionally a verified Resend sender and recipient.
4. Have the business review all service wording, scope, fees and availability. Complete legal policies with actual processing, consumer and commercial terms, using appropriate professional review.
5. Schedule retention cleanup, set `LEGAL_REVIEW_COMPLETE=true` only after review, and run `npm run check:launch`.
6. Build and rerun browser checks using production-like configuration. Verify canonical URLs, sitemap, social sharing, HTTPS, health checks and deployed delivery.

No analytics, advertising, CMS, payment collection or live property inventory is configured. London accommodation provider relationships are described in the website content, but there is no provider API or property-listing integration. Calendar scheduling and Resend notifications activate only when their complete environment configuration is supplied. The repository does not deploy automatically.

For the privacy review, consult the [ICO’s privacy information checklist](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/), including controller identity, purposes, legal basis, retention, recipients and applicable rights/complaint routes. This is a launch reference, not a claim that the current drafts are legally complete.
