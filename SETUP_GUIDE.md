# Newsletter System Setup Guide

## 1. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to the SQL Editor in your Supabase dashboard
3. Copy and run the SQL schema from `supabase-schema.sql`
4. Go to Project Settings → API to get your credentials:
   - `SUPABASE_URL` (Project URL)
   - `SUPABASE_ANON_KEY` (anon/public key)

## 2. Set Up Resend (Email Service)

1. Go to [resend.com](https://resend.com) and create an account
2. Create an API key in your dashboard
3. Verify your sender domain (e.g., noreply@voyaflair.com)
4. Get your `RESEND_API_KEY`

## 3. Configure Environment Variables

Create a `.env` file in your project root (this file is already in .gitignore):

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend Configuration
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@voyaflair.com
```

Replace the placeholder values with your actual credentials.

## 4. Install Resend SDK

```bash
npm install resend
```

## 5. Update the API Route

The email integration will be added to `/src/pages/api/subscribe.ts` to send confirmation emails when users subscribe.

## 6. Test the System

1. Start your dev server: `npm run dev`
2. Navigate to your site and test the newsletter form in the footer
3. Check Supabase dashboard to see if subscribers are being added
4. Check Resend dashboard to see if emails are being sent

## Security Notes

- Never commit `.env` to version control
- Use service role keys only in server-side code
- Keep your API keys secure
- The rate limiting is currently in-memory (for production, use Redis)
