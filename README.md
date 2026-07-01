This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in (see that file for every key).
Set the same keys in Vercel for production.

- **`/admin` (Google sign-in, Auth.js):** `AUTH_SECRET`, `AUTH_GOOGLE_ID`,
  `AUTH_GOOGLE_SECRET`, optional `ADMIN_EMAIL` (defaults to the owner). Google OAuth
  redirect URI: `<origin>/api/auth/callback/google`.
- **`/admin` funnel tracker:** `DATABASE_URL` (Vercel → Storage → Neon Postgres).
- **Site features:** `GEMINI_API_KEY` (chat), `RESEND_API_KEY` (contact form).

### /admin deployment checklist

The admin dashboard deploys with the site, but stays locked (fails closed) until
these are set in **Vercel → Settings → Environment Variables**:

- [ ] `AUTH_SECRET` — random string. Generate: `openssl rand -base64 33`
- [ ] `AUTH_GOOGLE_ID` — Google OAuth client ID
- [ ] `AUTH_GOOGLE_SECRET` — Google OAuth client secret
- [ ] `ADMIN_EMAIL` — optional; only if the allowed email differs from the default
- [ ] `DATABASE_URL` — provisioned by Vercel → Storage → Neon Postgres
- [ ] Redeploy after setting the above

Google OAuth setup (console.cloud.google.com → Credentials → OAuth client ID →
Web application):

- [ ] Consent screen: External, add your email as a Test user
- [ ] Authorized redirect URIs (must match exactly):
  - `https://<your-domain>/api/auth/callback/google`
  - `http://localhost:3000/api/auth/callback/google`

Only `ADMIN_EMAIL` (default: the owner's Google account) can sign in; every other
account is rejected at the `signIn` callback in `src/auth.ts`.

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
