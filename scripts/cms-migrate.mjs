#!/usr/bin/env node
// Run the CMS migration via Supabase RPC (service role key required).
// Usage: SUPABASE_SERVICE_KEY=... node scripts/cms-migrate.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://fllqdhvvnqoayugohzld.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY ||
  (() => {
    try {
      const env = readFileSync(join(__dirname, "..", ".env"), "utf-8");
      const m = env.match(/SUPABASE_SERVICE_KEY=(.+)/);
      return m?.[1]?.trim();
    } catch {
      return undefined;
    }
  })();

if (!SUPABASE_KEY) {
  console.error(
    "Set SUPABASE_SERVICE_KEY env var or add it to .env in project root",
  );
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const sql = readFileSync(
  join(
    __dirname,
    "..",
    "supabase",
    "migrations",
    "20260406120000_add_cms_tables.sql",
  ),
  "utf-8",
);

// Split into statements and run each
const statements = sql
  .split(/;\s*\n/)
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith("--"));

console.log(`Running ${statements.length} SQL statements...`);

for (const stmt of statements) {
  const { error } = await sb.rpc("exec_sql", { query: stmt + ";" }).single();
  if (error) {
    // Try direct query via postgrest - fallback
    console.warn(
      `Note: RPC exec_sql not available. Run the migration SQL directly in the Supabase SQL Editor:`,
    );
    console.log(
      `\n--- Copy this SQL to https://supabase.com/dashboard/project/fllqdhvvnqoayugohzld/sql ---\n`,
    );
    console.log(sql);
    console.log(`\n--- End SQL ---\n`);
    process.exit(0);
  }
}

console.log("Migration complete ✓");
