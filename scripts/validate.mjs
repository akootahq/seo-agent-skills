/**
 * Checks the collection before it ships. No dependencies: `node scripts/validate.mjs`.
 *
 * - Every skills/<name>/SKILL.md has front matter with a `name` equal to its
 *   folder (lowercase words joined by hyphens, at most 64 characters) and a
 *   `description` of at most 1,024 characters, as the Agent Skills format
 *   requires.
 * - A SKILL.md stays under 500 lines; detail goes in its references/ folder.
 * - Every relative link in a Markdown file points to a file that exists.
 * - Text uses straight quotes and no long dashes.
 * - The plugin and marketplace manifests parse and agree on the version, and
 *   the marketplace description gives the right number of skills.
 * - CHANGELOG.md has an entry for that version, which the release uses as
 *   its notes.
 * - The licence names its holder.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = join(dirname(new URL(import.meta.url).pathname), "..");
const problems = [];
const fail = (file, message) => problems.push(`${relative(root, file)}: ${message}`);

function markdownFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (entry === "node_modules" || entry === ".git") return [];
    if (statSync(path).isDirectory()) return markdownFiles(path);
    return entry.endsWith(".md") ? [path] : [];
  });
}

function frontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([a-z-]+):\s*(.*)$/);
    if (pair) fields[pair[1]] = pair[2].trim();
  }
  return fields;
}

// Skills.
const skillsDir = join(root, "skills");
const skills = readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory());
for (const skill of skills) {
  const file = join(skillsDir, skill, "SKILL.md");
  if (!existsSync(file)) {
    fail(join(skillsDir, skill), "has no SKILL.md");
    continue;
  }
  const text = readFileSync(file, "utf8");
  const fields = frontMatter(text);
  if (!fields) {
    fail(file, "has no front matter");
    continue;
  }
  if (fields.name !== skill) fail(file, `name "${fields.name}" does not match its folder "${skill}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(skill) || skill.length > 64) {
    fail(file, "the folder name must be lowercase words joined by hyphens, at most 64 characters");
  }
  if (!fields.description) fail(file, "has no description");
  else if (fields.description.length > 1024) {
    fail(file, `description is ${fields.description.length} characters; the limit is 1,024`);
  }
  const lines = text.split("\n").length;
  if (lines >= 500) fail(file, `is ${lines} lines; keep it under 500 and move detail to references/`);
}

// Every Markdown file: links and typography.
for (const file of markdownFiles(root)) {
  const text = readFileSync(file, "utf8");
  for (const [, target] of text.matchAll(/\]\(([^)\s#]+)(?:#[^)]*)?\)/g)) {
    if (/^[a-z]+:/.test(target)) continue;
    if (!existsSync(join(dirname(file), target))) fail(file, `links to ${target}, which does not exist`);
  }
  if (/[–—]/.test(text)) fail(file, "contains a long dash; use a comma, a colon or a full stop");
  if (/[‘’“”]/.test(text)) fail(file, "contains curly quotes; use straight ones");
}

// Manifests.
const plugin = JSON.parse(readFileSync(join(root, ".claude-plugin/plugin.json"), "utf8"));
const market = JSON.parse(readFileSync(join(root, ".claude-plugin/marketplace.json"), "utf8"));
if (plugin.version !== market.metadata?.version) {
  fail(join(root, ".claude-plugin"), `plugin ${plugin.version} and marketplace ${market.metadata?.version} versions differ`);
}
const listed = market.plugins?.[0]?.description ?? "";
if (!listed.startsWith(`${skills.length} skills`)) {
  fail(join(root, ".claude-plugin/marketplace.json"), `the plugin description should start with "${skills.length} skills"`);
}

// Changelog: the release workflow publishes this version's entry as its notes.
const changelog = join(root, "CHANGELOG.md");
const entry = new RegExp(`^## ${plugin.version.replace(/\./g, "\\.")}( |$)`, "m");
if (!existsSync(changelog) || !entry.test(readFileSync(changelog, "utf8"))) {
  fail(changelog, `has no "## ${plugin.version}" entry for the version in .claude-plugin/plugin.json`);
}

// Licence.
if (/\[LEGAL NAME\]/.test(readFileSync(join(root, "LICENSE"), "utf8"))) {
  fail(join(root, "LICENSE"), "still has the [LEGAL NAME] placeholder");
}

if (problems.length > 0) {
  console.error(problems.map((p) => `✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${skills.length} skills checked`);
