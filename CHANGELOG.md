# Changelog

Each entry says what changed for the people using the skills. Versions follow
semantic versioning; the skills stay at `0.x` while their files and outputs
settle.

## 0.1.1 (23 November 2026)

- The Claude Code plugin connects to Agent Number 10 at
  `https://app.agentnumber10.com/mcp` directly. It no longer asks for an
  address when you install it. To use your own install instead, add it with
  `claude mcp add --transport http agentnumber10 <your address>/mcp`.

## 0.1.0 (23 November 2026)

The first release: eight skills for search and AI search, for Claude Code,
Codex, Cursor and other agents that read `SKILL.md` files.

Free, and run in your agent with nothing else to install:

- `brand-context` writes one brand file with your market, competitors,
  priority pages and buyer questions. Every other skill reads it, so you are
  asked once.
- `seo-audit` checks indexing, redirects, titles, canonicals, sitemaps,
  structured data, images, internal links, hreflang, local business and
  e-commerce pages, and Core Web Vitals with your own free Google key. Every
  finding has the evidence, the exact change and a `Passes when` test.
- `aeo-audit` checks whether ChatGPT, Claude, Perplexity, Google AI Overviews
  and Copilot can reach and quote you: AI crawler access, content that needs
  JavaScript, the brand as an entity, pages that answer your buyers'
  questions, and llms.txt.
- `seo-fix` makes the fixes in your code, one commit each, and opens a pull
  request that lists the test for every fix. It asks before it pushes. For
  WordPress, Shopify, Wix and other builders it gives the exact steps.
- `verify-fix` runs each fix's test on the live site and reports pass, fail
  or could not check, with what it found.

With an Agent Number 10 account:

- `ai-visibility` shows what ChatGPT, Claude, Perplexity, Gemini and Google AI
  Overviews answer about you, by engine and by question.
- `ai-competitors` shows who they name instead of you, ranked on the same
  answers.
- `prove-fix` compares AI visibility from before a fix went live with after
  it.

Install with `npx skills add akootahq/seo-agent-skills`, or as a Claude Code
plugin with `claude plugin marketplace add akootahq/seo-agent-skills`.
