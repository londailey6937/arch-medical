-- ============================================================
-- CMS CONTENT TABLES
-- Stores structured website content for the 510kbridge.com
-- marketing site across EN / CN / KO languages.
-- ============================================================

-- Sections: one row per content block per language
CREATE TABLE IF NOT EXISTS cms_sections (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page        TEXT NOT NULL DEFAULT 'home',
  section_key TEXT NOT NULL,
  lang        TEXT NOT NULL CHECK (lang IN ('en', 'cn', 'ko')),
  sort_order  INTEGER NOT NULL DEFAULT 0,
  content     JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_by  TEXT,
  UNIQUE (page, section_key, lang)
);

CREATE INDEX IF NOT EXISTS idx_cms_sections_page_lang
  ON cms_sections (page, lang);

ALTER TABLE cms_sections ENABLE ROW LEVEL SECURITY;

-- Anyone can read (public website pulls content at build time)
DO $do$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'cms_sections' AND policyname = 'Public read cms_sections'
  ) THEN
    CREATE POLICY "Public read cms_sections"
      ON cms_sections FOR SELECT USING (true);
  END IF;
END $do$;

-- Only authenticated users can modify
DO $do$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'cms_sections' AND policyname = 'Auth users manage cms_sections'
  ) THEN
    CREATE POLICY "Auth users manage cms_sections"
      ON cms_sections FOR ALL
      USING (auth.role() IN ('authenticated', 'service_role'));
  END IF;
END $do$;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_cms_sections_updated_at()
RETURNS TRIGGER AS $fn$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$fn$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cms_sections_updated_at ON cms_sections;
CREATE TRIGGER cms_sections_updated_at
  BEFORE UPDATE ON cms_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_cms_sections_updated_at();

-- Publish log: tracks when content was last built & deployed
CREATE TABLE IF NOT EXISTS cms_publish_log (
  id           SERIAL PRIMARY KEY,
  published_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  published_by TEXT,
  commit_sha   TEXT,
  notes        TEXT
);

ALTER TABLE cms_publish_log ENABLE ROW LEVEL SECURITY;

DO $do$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'cms_publish_log' AND policyname = 'Public read cms_publish_log'
  ) THEN
    CREATE POLICY "Public read cms_publish_log"
      ON cms_publish_log FOR SELECT USING (true);
  END IF;
END $do$;

DO $do$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'cms_publish_log' AND policyname = 'Auth users manage cms_publish_log'
  ) THEN
    CREATE POLICY "Auth users manage cms_publish_log"
      ON cms_publish_log FOR ALL
      USING (auth.role() IN ('authenticated', 'service_role'));
  END IF;
END $do$;
