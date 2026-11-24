# Changelog

Each entry says what changed for the people using the skills. Versions follow
semantic versioning; the skills stay at `0.x` while their files and outputs
settle.

## 0.2.2 (24 November 2026)

- The plugin no longer walks you through adding another provider's MCP
  server or plugin (DataForSEO, Ahrefs, treg, Google Analytics). Inside the
  plugin, each source keeps the setup that needs no extra server, an API
  key or token in your environment, and links to the provider's own
  instructions and to the guides in `docs/connect/`, which keep every step.
  A provider's server you have already connected is used as before.

## 0.2.1 (24 November 2026)

- The Claude Code plugin is now named `an10-seo-skills`, because the
  directory found `seo-agent-skills` too close to another listing. Install
  it with `/plugin install an10-seo-skills@seo-agent-skills`. If you
  installed 0.2.0 or earlier as a plugin, uninstall
  `seo-agent-skills@seo-agent-skills` first. Installs through the skills
  CLI are not affected.

## 0.2.0 (24 November 2026)

- 18 new skills, 26 in all. Each audit writes the same fix list as
  `seo-audit`, so `seo-fix` can apply it and `verify-fix` can check it.
  - Focused audits: `technical-seo`, `schema`, `site-architecture`,
    `images`, `international-seo` and `page-check`.
  - Content: `llms-txt`, `content-refresh`, `competitor-pages` and
    `programmatic-seo`. Drafts go in `.agents/drafts/`.
  - With real data: `search-console`, `bing-webmaster`, `keyword-research`,
    `content-brief`, `backlinks`, `local-seo` and `client-report`.
  - `connect-data` connects one data source at a time, with the exact setup
    for Claude Code, Codex and Cursor, checks that it works, and says how to
    disconnect. You type your own keys into your own environment, never into
    the chat.
- Bring your own data: Bing Webmaster Tools (a free key), Google Analytics
  through Google's own MCP server, and Ahrefs (its MCP server or an API key)
  join DataForSEO, treg and the Search Console export. Each source has a
  setup guide in `docs/connect/`.
- Where the data comes from:
  - The page-based skills read only public pages, from your machine.
  - The data skills use Agent Number 10, or your own accounts:
    DataForSEO or treg for `keyword-research`, `content-brief` and
    `local-seo`; Ahrefs for `keyword-research`, `content-brief` and
    `backlinks`; DataForSEO for `backlinks`. The skills ask before every
    batch of calls on your account.
  - `bing-webmaster` runs on a free Bing Webmaster Tools key, which also
    adds Bing's queries to `search-console`, Bing's crawl issues to
    `technical-seo` and your own inbound links to `backlinks`.
  - `search-console` also works from a free Search Console export, and
    reads organic visits from Google Analytics through Google's MCP server.
  - AI answers, history and report links need Agent Number 10.
- The README starts with a three-step quick start and one install line per
  agent, then a table of every data source: what it gives, whether it is free
  or your own paid account, and which skills use it. A FAQ closes it. The
  directory listing is now named Agent Number 10 SEO Skills.
- Every skill's description now says when another skill fits better, and
  `tests/triggers.md` lists the requests each skill must answer and the ones
  it must leave to its neighbours.
- The audits no longer report problems that are not there:
  - A page the site refuses to serve (403, 429, a bot challenge) is "could
    not check", never the site's fault.
  - A page whose content only appears after JavaScript is reported once, in
    plain words, instead of being audited as an empty page.
  - Structured data is found in JSON-LD, microdata and RDFa before a page is
    said to have none.
  - Tracking pixels, spacers and decorative icons are not counted as images
    missing alt text.
  - No check depends on English words.
  - A link or image that answers a quick check (HEAD) with 404, 405 or 501
    is fetched in full before it is called broken: some servers answer the
    quick check with 404 for files that exist.
  - A site with one language, or with no template pages, is reported as
    such instead of getting findings that do not apply.
- Every skill that saves pages creates its folder first. The first download
  failed in a fresh project before.
- Tested on a live site before release. That test removed rules that would
  have flagged a logged-in app's robots.txt, a missing software rating the
  page never shows, and link notes the llms.txt proposal makes optional.

## 0.1.3 (23 November 2026)

- The plugin's listing links to its documentation page, where to get
  support (GitHub issues) and the terms of service, beside the privacy
  policy.

## 0.1.2 (23 November 2026)

- The plugin moved to `plugins/seo-agent-skills/`, with its own README that
  lists everything it runs, sends and fetches. The repository's own checks
  stay outside it, as the Claude plugin directory asks. The install commands
  are the same, and `skills.sh.json` tells the skills CLI where the skills
  are.

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
