-- ============================================================
-- BOLÃO DA COPA 2026 — Setup Supabase
-- Cole tudo isso no SQL Editor do Supabase e execute.
-- ============================================================

-- ── Tabelas ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS participants (
  name TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scores (
  match_id  INTEGER PRIMARY KEY,
  home      INTEGER NOT NULL CHECK (home >= 0),
  away      INTEGER NOT NULL CHECK (away >= 0),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guesses (
  match_id         INTEGER NOT NULL,
  participant_name TEXT    NOT NULL REFERENCES participants(name) ON DELETE CASCADE,
  outcome          TEXT    NOT NULL CHECK (outcome IN ('home', 'draw', 'away')),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (match_id, participant_name)
);

-- ── Índices ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS guesses_participant_idx ON guesses(participant_name);
CREATE INDEX IF NOT EXISTS guesses_match_idx       ON guesses(match_id);

-- ── Row Level Security (acesso público sem login) ─────────────

ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores       ENABLE ROW LEVEL SECURITY;
ALTER TABLE guesses      ENABLE ROW LEVEL SECURITY;

-- Participantes
CREATE POLICY "public read participants"  ON participants FOR SELECT USING (true);
CREATE POLICY "public insert participants" ON participants FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete participants" ON participants FOR DELETE USING (true);

-- Placares
CREATE POLICY "public read scores"   ON scores FOR SELECT USING (true);
CREATE POLICY "public upsert scores" ON scores FOR INSERT WITH CHECK (true);
CREATE POLICY "public update scores" ON scores FOR UPDATE USING (true);
CREATE POLICY "public delete scores" ON scores FOR DELETE USING (true);

-- Palpites
CREATE POLICY "public read guesses"   ON guesses FOR SELECT USING (true);
CREATE POLICY "public upsert guesses" ON guesses FOR INSERT WITH CHECK (true);
CREATE POLICY "public update guesses" ON guesses FOR UPDATE USING (true);
CREATE POLICY "public delete guesses" ON guesses FOR DELETE USING (true);

-- ── Trigger updated_at ────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER scores_updated_at  BEFORE UPDATE ON scores  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER guesses_updated_at BEFORE UPDATE ON guesses FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Seed: participantes e placares reais ──────────────────────

INSERT INTO participants (name) VALUES
  ('Pedro Lucas'),
  ('Kayo'),
  ('Bruno')
ON CONFLICT DO NOTHING;

INSERT INTO scores (match_id, home, away) VALUES
  (1, 2, 0),  -- México 2×0 África do Sul
  (2, 2, 1),  -- Coreia do Sul 2×1 Tchéquia
  (3, 1, 1)   -- Canadá 1×1 Bósnia e Herzegovina
ON CONFLICT (match_id) DO UPDATE SET home = EXCLUDED.home, away = EXCLUDED.away;
