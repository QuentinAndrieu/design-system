#!/usr/bin/env node
// The first face of every stack an app names must be one the app actually loads.
//
// A missing webfont is not an error anywhere in the toolchain — it is a fallback.
// tsc, eslint and `next build` all pass while the type silently changes, so this
// class of bug ships. It has twice: a face named only in tailwind.config's
// `fontFamily` is invisible both to a grep for its @fontsource import and to a
// grep for --font-* call sites, so it reads as dead code and gets dropped.
//
// The DS preset is additive and declares no `fontFamily`, which means an app's own
// tailwind config is the ONLY definition of font-display / -body / -jp. That is
// why this drifts unseen, and why the check lives here, next to the slots.
//
// Only the FIRST family is required to load. The rest of a stack is fallback —
// being absent is the entire point of a fallback, so Georgia and Palatino are not
// findings.
//
//   node scripts/check-fonts.mjs [appDir...]   (default: every sibling app)
//
// Exits non-zero on a finding, so it can gate a build.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Families the browser resolves without anyone shipping a file.
const GENERIC = new Set([
  "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui",
  "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji",
  "fangsong", "-apple-system", "blinkmacsystemfont", "inherit", "initial",
  "unset", "revert", "none",
]);

// Faces the OS provides. Naming one FIRST is a deliberate choice, not a missing
// import. (Only consulted for the first family — fallbacks are never checked.)
const SYSTEM = new Set([
  "impact", "georgia", "times new roman", "times", "arial", "helvetica",
  "helvetica neue", "verdana", "tahoma", "trebuchet ms", "courier new", "courier",
  "menlo", "monaco", "consolas", "sf mono", "segoe ui", "palatino",
  "iowan old style", "hiragino kaku gothic pron", "hiragino sans",
  "hiragino mincho pron", "yu gothic", "yumincho", "yu mincho", "ms gothic",
  "meiryo", "applemyungjo", "apple sd gothic neo", "arial narrow", "arial black",
]);

const walk = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".next" || e === ".git") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const clean = (f) => f.trim().replace(/^['"`]|['"`]$/g, "").trim().toLowerCase();

// A face is "loaded" only if a sheet the app IMPORTS pulls it. Presence in
// node_modules proves nothing: every app has the DS's noto-serif-jp hoisted into
// it, but only the two that import fonts-jp.css actually serve it.
function loadedFaces(appDir, srcText) {
  const faces = new Set();
  const missing = [];

  const familyOf = (slug) => {
    const meta = join(appDir, "node_modules", "@fontsource", slug, "metadata.json");
    if (!existsSync(meta)) return null;
    try {
      return JSON.parse(read(meta)).family.toLowerCase();
    } catch {
      return null;
    }
  };

  const add = (slug) => {
    const fam = familyOf(slug);
    if (fam) faces.add(fam);
    else missing.push(slug);
  };

  // 1. the app's own @fontsource imports
  for (const m of srcText.matchAll(/@fontsource(?:-variable)?\/([a-z0-9-]+)/g)) add(m[1]);

  // 2. whichever DS sheets it imports — they @import fontsource themselves
  const dsStyles = join(appDir, "node_modules", "@quentinandrieu/design-system/dist/styles");
  for (const sheet of ["fonts.css", "fonts-jp.css"]) {
    if (!srcText.includes(`design-system/${sheet}`)) continue;
    for (const m of read(join(dsStyles, sheet)).matchAll(/@fontsource\/([a-z0-9-]+)/g)) add(m[1]);
  }
  return { faces, missing };
}

// A font stack is recognised by SHAPE, not by the property it is assigned to:
// its last element is a generic family. That is the universal convention, and it
// is what lets us see the stacks that live in constants and data
// (`const MONO = 'ui-monospace, …'`, periods.tsx's poster faces) rather than only
// the ones written inline at a `fontFamily:` site. The call sites are mostly
// references anyway (`fontFamily: p.period.fonts.display`), which no static read
// can resolve — so we check the declarations instead, where the literal is.
const looksLikeStack = (s) => {
  const parts = s.split(",");
  return parts.length > 1 && GENERIC.has(clean(parts.at(-1)));
};

// Every place an app can name a face, as candidate stack strings.
function namedStacks(appDir, srcFiles) {
  const hits = [];
  const lineOf = (text, idx) => text.slice(0, idx).split("\n").length;

  for (const file of readdirSync(appDir).filter((f) => /^tailwind\.config\./.test(f))) {
    const full = join(appDir, file);
    const text = stripComments(read(full));
    const block = text.match(/fontFamily:\s*\{[\s\S]*?\n\s*\},/);
    if (!block) continue;
    // key: [ ...values ] — take the array, never the key
    for (const m of block[0].matchAll(/[\w"'-]+\s*:\s*\[([^\]]*)\]/g)) {
      const raw = m[1].replace(/['"`]/g, "").trim();
      if (raw) hits.push({ file: full, line: lineOf(text, block.index + m.index), raw });
    }
  }

  for (const file of srcFiles) {
    const text = read(file);
    if (/\.css$/.test(file)) {
      for (const m of text.matchAll(/(?:font-family|--font-[\w-]*)\s*:\s*([^;}\n]+)/g)) {
        hits.push({ file, line: lineOf(text, m.index), raw: m[1] });
      }
    } else if (/\.tsx?$/.test(file)) {
      // Each delimiter gets its own body: a stack is nearly always a single-quoted
      // string that CONTAINS double-quoted family names ('"DM Serif Display", serif'),
      // so a class excluding both quotes would never match the ones that matter.
      for (const m of text.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g)) {
        const body = m[1] ?? m[2];
        if (body && looksLikeStack(body)) {
          hits.push({ file, line: lineOf(text, m.index), raw: body });
        }
      }
    }
  }
  return hits;
}

function checkApp(appDir) {
  const srcFiles = walk(join(appDir, "src"));
  const srcText = srcFiles.map(read).join("\n");
  const { faces, missing } = loadedFaces(appDir, srcText);
  const findings = [];

  for (const { file, line, raw } of namedStacks(appDir, srcFiles)) {
    if (/var\(\s*--/.test(raw)) continue; // points at a slot — the DS owns it
    const first = clean(raw.split(",")[0]);
    if (!first || first.includes("(") || /^\$|^\{/.test(first)) continue; // interpolated
    if (GENERIC.has(first) || SYSTEM.has(first) || faces.has(first)) continue;
    findings.push({ file: file.replace(`${appDir}/`, ""), line, first, raw: raw.trim() });
  }
  return { findings, faces, missing };
}

const args = process.argv.slice(2);
const apps = args.length
  ? args.map((a) => resolve(a))
  : readdirSync(resolve(DS_ROOT, ".."))
      .map((d) => resolve(DS_ROOT, "..", d))
      .filter(
        (d) => d !== DS_ROOT && existsSync(join(d, "package.json")) && existsSync(join(d, "src"))
      );

let failed = 0;
for (const appDir of apps) {
  const { findings, faces, missing } = checkApp(appDir);
  const name = basename(appDir);
  for (const slug of missing) {
    console.log(`⚠️  ${name} — imports @fontsource/${slug}, which is not installed`);
    failed++;
  }
  if (!findings.length) {
    console.log(`✅ ${name} — ${faces.size} face(s) loaded, every stack resolves`);
    continue;
  }
  failed += findings.length;
  console.log(`❌ ${name}`);
  for (const f of findings) {
    console.log(`   ${f.file}:${f.line}  leads with "${f.first}", which the app never loads`);
    console.log(`      in: ${f.raw}`);
  }
}

if (failed) {
  console.log(
    `\n${failed} problem(s). Either import the @fontsource package in the app's\n` +
      `layout, or point the slot at var(--font-*) so the DS owns the face.`
  );
  process.exit(1);
}
console.log(`\nAll ${apps.length} app(s) clean.`);
