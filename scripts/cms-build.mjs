#!/usr/bin/env node
// ============================================================
// CMS BUILD — Fetches content from Supabase cms_sections and
// injects it into HTML template files to produce final output.
//
//   node scripts/cms-build.mjs           # preview (stdout diff)
//   node scripts/cms-build.mjs --write   # overwrite HTML files
//
// Uses the public anon key (read-only) — no secrets needed.
// ============================================================

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WRITE = process.argv.includes("--write");

const SUPABASE_URL = "https://fllqdhvvnqoayugohzld.supabase.co";
const SUPABASE_ANON = "sb_publishable_mM9VIE_SOUb956b_7UeTzw_n9QaNuiL";
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

// Lang → file mapping
const LANG_FILES = {
  en: "index.html",
  cn: "cn.html",
  ko: "ko.html",
};

// ── HTML renderers ──────────────────────────────────────────

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTiers(items) {
  return items
    .map((t) => {
      const featured = t.featured ? " tier-featured" : "";
      const descHtml = t.description
        ? `\n            <p class="tier-desc">\n              ${esc(t.description)}\n            </p>`
        : "";
      const contextHtml = t.cost_context
        ? `\n            <p class="tier-context">\n              ${esc(t.cost_context)}\n            </p>`
        : "";
      const featuresHtml = t.features
        .map((f) => `              <li>${esc(f)}</li>`)
        .join("\n");
      return `          <div class="tier-card${featured}">
            <div class="tier-label">${esc(t.label)}</div>
            <h3>${esc(t.title)}</h3>
            <p class="tier-price">${esc(t.price)}</p>${descHtml}
            <ul>
${featuresHtml}
            </ul>${contextHtml}
            <a href="#contact" class="btn btn-${t.cta_style}">${esc(t.cta_text)}</a>
          </div>`;
    })
    .join("\n");
}

function renderTestimonials(items) {
  return items
    .map(
      (t) => `          <div class="testimonial-card">
            <p class="testimonial-text">
              "${esc(t.quote)}"
            </p>
            <div class="testimonial-author">
              <strong>${esc(t.author)}</strong>
              <span>${esc(t.subtitle)}</span>
            </div>
          </div>`,
    )
    .join("\n");
}

function renderHighlights(items) {
  return items
    .map(
      (h) => `          <div class="card">
            <div class="card-icon">${h.icon}</div>
            <h3>${esc(h.title)}</h3>
            <p>
              ${esc(h.description)}
            </p>
          </div>`,
    )
    .join("\n");
}

// ── Section replacement ─────────────────────────────────────

/**
 * Replaces the inner content of a <div class="grid-3"> or similar
 * container within a section identified by HTML comment markers.
 *
 * We use marker comments:
 *   <!-- CMS:tiers -->  ...content...  <!-- /CMS:tiers -->
 *
 * If markers don't exist yet, we find the section by its id attribute
 * and known container class, then inject markers for future builds.
 */
function replaceBetweenMarkers(html, key, newContent) {
  const startMarker = `<!-- CMS:${key} -->`;
  const endMarker = `<!-- /CMS:${key} -->`;

  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);

  if (startIdx !== -1 && endIdx !== -1) {
    return (
      html.slice(0, startIdx + startMarker.length) +
      "\n" +
      newContent +
      "\n        " +
      html.slice(endIdx)
    );
  }

  // Markers not found — inject them based on section structure
  return html;
}

/**
 * First-time marker injection: wraps the tier cards, testimonials,
 * and highlights content with CMS markers so future builds can
 * replace them cleanly.
 */
function injectMarkers(html, key, containerClass, sectionId) {
  const startMarker = `<!-- CMS:${key} -->`;
  if (html.includes(startMarker)) return html;

  // Find the section by id
  const sectionRe = new RegExp(
    `(<section[^>]*id="${sectionId}"[^>]*>[\\s\\S]*?<div class="${containerClass}">)\\s*\\n`,
    "m",
  );
  const match = html.match(sectionRe);
  if (!match) {
    console.warn(
      `  ⚠ Could not find #${sectionId} .${containerClass} for marker injection`,
    );
    return html;
  }

  // Find the matching closing </div> for the container
  const containerStart = match.index + match[0].length;
  let depth = 1;
  let i = containerStart;
  while (i < html.length && depth > 0) {
    if (html.slice(i, i + 4) === "<div") depth++;
    if (html.slice(i, i + 6) === "</div>") {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }

  // Wrap the content
  const innerContent = html.slice(containerStart, i).trim();
  const endMarker = `<!-- /CMS:${key} -->`;
  const wrapped = `        ${startMarker}\n${innerContent}\n        ${endMarker}`;

  return html.slice(0, containerStart) + wrapped + "\n" + html.slice(i);
}

// ── Main ────────────────────────────────────────────────────

async function build() {
  // Fetch all CMS content
  const { data: sections, error } = await sb
    .from("cms_sections")
    .select("*")
    .eq("page", "home")
    .order("sort_order");

  if (error) {
    console.error("Failed to fetch cms_sections:", error.message);
    process.exit(1);
  }

  if (!sections || sections.length === 0) {
    console.log("No CMS content found. Run cms-seed.mjs first.");
    process.exit(0);
  }

  // Index by lang+key
  const contentMap = {};
  for (const s of sections) {
    contentMap[`${s.lang}:${s.section_key}`] = s.content;
  }

  for (const [lang, file] of Object.entries(LANG_FILES)) {
    const filePath = join(ROOT, file);
    let html = readFileSync(filePath, "utf-8");
    let changed = false;

    // Inject markers if not present
    html = injectMarkers(html, "tiers", "grid-3", "services");
    html = injectMarkers(
      html,
      "testimonials",
      "testimonial-grid",
      "testimonials",
    );
    html = injectMarkers(html, "highlights", "grid-3", "highlights");

    // Render and replace tiers
    const tiersData = contentMap[`${lang}:tiers`];
    if (tiersData?.items) {
      const rendered = renderTiers(tiersData.items);
      const newHtml = replaceBetweenMarkers(html, "tiers", rendered);
      if (newHtml !== html) {
        html = newHtml;
        changed = true;
      }
    }

    // Render and replace testimonials
    const testData = contentMap[`${lang}:testimonials`];
    if (testData?.items) {
      const rendered = renderTestimonials(testData.items);
      const newHtml = replaceBetweenMarkers(html, "testimonials", rendered);
      if (newHtml !== html) {
        html = newHtml;
        changed = true;
      }
    }

    // Render and replace highlights
    const hlData = contentMap[`${lang}:highlights`];
    if (hlData?.items) {
      const rendered = renderHighlights(hlData.items);
      const newHtml = replaceBetweenMarkers(html, "highlights", rendered);
      if (newHtml !== html) {
        html = newHtml;
        changed = true;
      }
    }

    if (changed) {
      if (WRITE) {
        writeFileSync(filePath, html, "utf-8");
        console.log(`✓ Updated ${file}`);
      } else {
        console.log(`⊕ ${file} has changes (use --write to apply)`);
      }
    } else {
      console.log(`— ${file} unchanged`);
    }
  }
}

build();
