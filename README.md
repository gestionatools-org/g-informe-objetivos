# Informe Objetivos

Next.js app for generating 2026 objective reports from a Supabase catalog.
Access is delegated to the GestionaTools Hub SSO.

## Environment Variables

Create a `.env.local` file in the repo root and set:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
HUB_BASE_URL=https://gestionatools.espublico.com
HUB_APP_ID=
HUB_SSO_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----\n
HUB_SSO_ISSUER=https://gestionatools.espublico.com
APP_BASE_URL=
APP_SESSION_SECRET=
GITHUB_TOKEN=
```

Do not prefix any Hub/session variables with `NEXT_PUBLIC_`; they must stay
server-only.

You can copy `.env.example` as a starting point.

## Hub SSO SDK

`@gestionatools-org/hub-sso-core` is installed from GitHub Packages. The repo
uses `.npmrc` to route the `@gestionatools-org` scope to
`https://npm.pkg.github.com`.

Set `GITHUB_TOKEN` with `read:packages` access in local/CI/Vercel so installs
can read the private package. The app verifies Hub SSO v2 tokens with
`HUB_SSO_PUBLIC_KEY`; it must never receive `HUB_SSO_PRIVATE_KEY`.

## Supabase Migrations

Apply these SQL files in order using the Supabase SQL editor:

1. `supabase/migrations/20260729000000_create_catalog_schema.sql`
2. `supabase/migrations/20260729000001_seed_catalog.sql`

The schema enables RLS but intentionally leaves policies pending until the Hub
SSO identity model for Supabase reads/writes is finalized.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000). Without a valid local SSO
session, protected routes redirect to `${HUB_BASE_URL}/sso?app=${HUB_APP_ID}`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
