ALTER TABLE games ADD CONSTRAINT games_slug_key UNIQUE (slug);
ALTER TABLE games ADD CONSTRAINT games_url_key UNIQUE (url);

CREATE INDEX games_url_idx ON games (url);
CREATE INDEX games_slug_idx ON games (slug);
