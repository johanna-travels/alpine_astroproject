# Newsletter System Setup Guide

This project uses the **`subscribers`** table in Supabase (see `supabase-schema.sql`).  
Do **not** use an `email_list` table or migrations from other repos.

## 1. Supabase

1. Create or open your project at [supabase.com](https://supabase.com)
2. **SQL Editor** → run `supabase-schema.sql` once
3. If subscribe returns 500 on insert/update, also run `supabase-fix.sql`
4. **Project Settings → API** → copy:
   - `SUPABASE_URL` — Project URL (e.g. `https://YOUR_REF.supabase.co`)
   - `SUPABASE_SERVICE_ROLE_KEY` — **service role** key (server-only, never in client code)

Use your project URL from **Project Settings → API** (same value as `SUPABASE_URL` in Netlify env vars).

The API routes use `getSupabaseAdmin()` with the service role key. The anon key is **not** required.

## 2. Resend

1. [resend.com](https://resend.com) → API key → `RESEND_API_KEY`
2. Add domain `voyaflair.com` and verify DNS (DKIM, SPF, MX on `send`)
3. Set sender: `RESEND_FROM_EMAIL=noreply@yourdomain.com` (must match your verified Resend domain)

## 3. Environment variables

Copy `.env.example` to `.env` for local dev (gitignored):

```env
SUPABASE_URL=https://YOUR_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com

NEWSLETTER_ADMIN_SECRET=your_long_random_secret
```

Set the same variables in **Netlify → Site configuration → Environment variables** (Production + previews if needed).  
After changing secrets, run `npx netlify-cli deploy --prod`.

## 4. API routes

| Route | Purpose |
|-------|---------|
| `GET /api/health/` | Supabase connectivity check |
| `POST /api/subscribe/` | Sign up → `pending` + confirmation email |
| `GET /api/confirm/?token=…` | Double opt-in → `active` |
| `GET /api/subscriber/?token=…` | Subscriber JSON for preferences page |
| `POST /api/preferences/` | Update preferences |
| `GET /api/unsubscribe/?token=…` | Unsubscribe |
| `GET/POST /api/send-newsletter/` | Admin: send article to **active** subscribers (requires `NEWSLETTER_ADMIN_SECRET`) |

## 5. Verify

### Health (production)

```bash
curl -s https://voyaflair.com/api/health/ | python3 -m json.tool
```

Expected:

```json
{
  "ok": true,
  "supabase": {
    "configured": true,
    "host": "YOUR_REF.supabase.co",
    "connected": true,
    "error": null
  }
}
```

### Subscriber flow

1. Footer form → email + consent → `POST /api/subscribe/`
2. Row in `subscribers` with `status: pending`
3. Confirmation email from your `RESEND_FROM_EMAIL` address
4. Click link → `GET /api/confirm/` → `status: active`
5. Admin sends article newsletter manually via `/api/send-newsletter/` (not automatic on deploy)

### Local dev

```bash
npm run dev
```

Test the footer form at `http://localhost:4321`.

## 6. Send newsletter (admin only)

Preview (no emails sent):

```bash
curl -X POST https://voyaflair.com/api/send-newsletter/ \
  -H "Authorization: Bearer YOUR_NEWSLETTER_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"articleSlug":"rhodes-itinerary","dryRun":true}'
```

Real send: same request without `"dryRun":true`.  
Available slugs: `bali-cafes`, `bruges-guide`, `kyoto-itinerary`, `rhodes-itinerary`.

## Security

- Never commit `.env` or service role keys
- `NEWSLETTER_ADMIN_SECRET` protects bulk send
- Rate limiting on subscribe is in-memory (use Redis for high traffic)
- Replies go to `contactEmail` in `src/lib/site.ts`
