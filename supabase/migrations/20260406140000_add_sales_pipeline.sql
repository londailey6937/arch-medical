-- ============================================================
-- AE SALES PIPELINE — Lead tracking and follow-up management
-- Standalone CRM for account executives at 510kbridge.com
-- ============================================================

-- ── Leads ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT,
  company      TEXT,
  device_type  TEXT,
  message      TEXT,
  source       TEXT NOT NULL DEFAULT 'website',
  stage        TEXT NOT NULL DEFAULT 'new'
                 CHECK (stage IN (
                   'new', 'qualified', 'meeting_scheduled',
                   'proposal_sent', 'negotiation', 'won', 'lost'
                 )),
  assigned_ae  TEXT,
  priority     TEXT NOT NULL DEFAULT 'medium'
                 CHECK (priority IN ('low', 'medium', 'high')),
  estimated_value NUMERIC(12,2),
  lost_reason  TEXT,
  next_follow_up DATE,
  created_at   TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads (stage);
CREATE INDEX IF NOT EXISTS idx_leads_assigned ON leads (assigned_ae);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON leads (next_follow_up);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DO $do$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'leads' AND policyname = 'Auth users manage leads'
  ) THEN
    CREATE POLICY "Auth users manage leads"
      ON leads FOR ALL
      USING (auth.role() IN ('authenticated', 'service_role'));
  END IF;
END $do$;

-- Allow inserts from anon (website contact form)
DO $do$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'leads' AND policyname = 'Anon can insert leads'
  ) THEN
    CREATE POLICY "Anon can insert leads"
      ON leads FOR INSERT
      WITH CHECK (true);
  END IF;
END $do$;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $fn$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$fn$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();

-- ── Activities ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lead_activities (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id    UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type       TEXT NOT NULL CHECK (type IN (
               'note', 'email_sent', 'email_received',
               'call', 'meeting', 'stage_change', 'follow_up_set'
             )),
  summary    TEXT NOT NULL,
  detail     TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activities_lead ON lead_activities (lead_id);

ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

DO $do$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'lead_activities' AND policyname = 'Auth users manage lead_activities'
  ) THEN
    CREATE POLICY "Auth users manage lead_activities"
      ON lead_activities FOR ALL
      USING (auth.role() IN ('authenticated', 'service_role'));
  END IF;
END $do$;
