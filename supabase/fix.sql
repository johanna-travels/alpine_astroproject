-- Run this in Supabase SQL Editor if newsletter subscribe returns 500 errors.
-- Ensures the service role can read/write subscribers (API uses service role key).

GRANT ALL ON TABLE public.subscribers TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Refresh RLS policies for server-side API access
DROP POLICY IF EXISTS "Allow service role full access" ON public.subscribers;

CREATE POLICY "Allow service role full access"
  ON public.subscribers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
