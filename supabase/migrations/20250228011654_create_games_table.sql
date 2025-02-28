-- Create games table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    images TEXT[],
    category TEXT,
    tags TEXT[],
    author JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON games
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at();

-- Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policy for read access (allow anyone to read)
CREATE POLICY "Allow public read access" ON games
    FOR SELECT
    TO public
    USING (true);

-- Block all other access by default (no insert/update/delete)
CREATE POLICY "Block all other access" ON games
    FOR ALL
    TO public
    USING (false);
