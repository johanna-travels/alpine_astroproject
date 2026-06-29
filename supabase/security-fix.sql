-- Run this in Supabase SQL Editor to fix the security linter warning
-- on update_updated_at_column (search_path injection risk).

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
