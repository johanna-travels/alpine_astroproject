-- Subscribers table for newsletter
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed')),
  preferences JSONB DEFAULT '{"updates": true, "promotions": false}'::jsonb,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  confirmation_token TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_status ON subscribers(status);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public subscription)
CREATE POLICY "Allow public insert"
  ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow service role to read/update (for admin operations)
CREATE POLICY "Allow service role full access"
  ON subscribers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
