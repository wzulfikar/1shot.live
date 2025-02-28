-- Add slug column to games table
ALTER TABLE games ADD COLUMN slug text;

-- Create an index for faster lookups
CREATE INDEX games_slug_idx ON games (slug);
