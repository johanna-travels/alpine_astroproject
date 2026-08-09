# Environment variables (local + Netlify)

One `.env` file in the project root drives **local API routes** and can be **uploaded to Netlify** so you do not have to fight the dashboard every time.

## 1. Create your local `.env`

```bash
cp env/secrets.template .env
```

Open `.env` and replace every `PASTE_` value:

| Variable | Where to get it |
|----------|-----------------|
| `SUPABASE_URL` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page (service_role — keep secret) |
| `RESEND_API_KEY` | Resend → API Keys |
| `RESEND_FROM_EMAIL` | Verified sender (e.g. `hello@voyaflair.com`) |
| `NEWSLETTER_ADMIN_SECRET` | Run `openssl rand -hex 32` — any long random string |

Use the **same** `NEWSLETTER_ADMIN_SECRET` in curl:

`Authorization: Bearer <that exact value>`

## 2. Push to Netlify (all contexts)

```bash
npm run env:push-netlify
```

Or manually:

```bash
netlify login
netlify link   # if not linked — project: classy-sprite-09ba2f / voyaflair.com
netlify env:import .env
```

Secrets in `.env` are applied to Netlify; you do **not** need a new deploy for function secrets to update.

## 3. Test newsletter (no emails sent)

```bash
npm run newsletter:dry-run
```

Real send:

```bash
npm run newsletter:send
```

## 4. Local dev with Netlify env

```bash
netlify dev
```

Or plain `npm run dev` — API routes read `.env` from disk via `src/lib/serverEnv.ts`.

## Notes

- `.env` is gitignored — never commit it.
- `netlify.toml` already sets build-only vars (`SITE_URL`, `PUBLIC_GA_MEASUREMENT_ID`, etc.).
- If curl returns `401 Unauthorized`, the Bearer token does not match `NEWSLETTER_ADMIN_SECRET` on Netlify — re-run `npm run env:push-netlify` after fixing `.env`.
