# Agent Number 10 SEO Skills

26 skills for search and AI search (AEO, also called GEO) in Claude Code.
They audit a site the way a careful consultant would, make the fixes in your
own code as a pull request, and check each fix on the live site. With an
Agent Number 10 account they also show what ChatGPT, Claude, Perplexity,
Gemini and Google AI Overviews answer about you, before a fix and after it.

## Install

- **Claude Code:** `/plugin install an10-seo-skills --marketplace akootahq/seo-agent-skills`
  (or `/plugin marketplace add akootahq/seo-agent-skills`, then
  `/plugin install an10-seo-skills@seo-agent-skills`).
- **Codex:** `codex plugin marketplace add akootahq/seo-agent-skills`, then
  `/plugins` in a Codex session.
- **Other agents:** `npx skills add akootahq/seo-agent-skills`.

## The skills

| Skill | What it does | Needs |
| --- | --- | --- |
| `brand-context` | Writes one brand file the other skills read: domain, market, competitors, priority pages, buyer questions | Nothing |
| `connect-data` | Connects one data source, with the setup for your agent, and checks it: Agent Number 10, DataForSEO, treg, Ahrefs, Bing Webmaster Tools, Google Analytics or a Search Console export | Nothing |
| **Audit, fix, verify** | | |
| `seo-audit` | Technical and on-page audit: indexing, redirects, titles, canonicals, sitemaps, structured data, local, e-commerce, hreflang, and Core Web Vitals with a free Google API key | Nothing |
| `aeo-audit` | Can AI assistants read and quote you: AI crawler access, content without JavaScript, the brand as an entity, answer-ready pages, llms.txt | Nothing |
| `page-check` | One page in depth, with a short fix list | Nothing |
| `seo-fix` | Makes the fixes in your code, one commit each, and opens a pull request listing the check for every fix | Nothing |
| `verify-fix` | Runs each fix's check on the live site and reports pass or fail with the evidence | Nothing |
| **Focused audits** | | |
| `technical-seo` | How search engines crawl and index the site: status codes, redirects, canonicals, noindex, robots.txt, sitemaps, soft 404s, duplicates | Nothing (a free Bing key adds Bing's crawl issues) |
| `schema` | Structured data in JSON-LD, microdata and RDFa, checked against the page; new JSON-LD written only from facts the page shows | Nothing |
| `site-architecture` | Click depth, orphan pages, hub pages, broken internal links, and the internal links to add | Nothing |
| `images` | Alt text on content images (not pixels, spacers or decorative icons), sizes, formats, lazy loading and the LCP image | Nothing |
| `international-seo` | hreflang both ways, language and region codes, `lang` that matches the text, country targeting; works in any language | Nothing |
| **Content** | | |
| `llms-txt` | Checks your /llms.txt, or writes one from the site's real pages | Nothing |
| `content-refresh` | Pages that are out of date, and what needs a fresh source | Nothing (Search Console or Google Analytics puts the pages losing traffic first) |
| `competitor-pages` | Honest "X vs Y" and "alternatives to X" pages, every competitor claim sourced and dated | Nothing |
| `programmatic-seo` | Pages from a template and a dataset, without thin pages, duplicates or index bloat | Nothing |
| **With real data** | | |
| `ai-visibility` | Real answers from ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews: how often they name or cite you, by engine and by question | Agent Number 10 |
| `ai-competitors` | Who the assistants name instead of you, ranked on the same answers | Agent Number 10 |
| `prove-fix` | AI visibility before and after each fix went live | Agent Number 10 |
| `search-console` | Your Google Search Console data: queries, pages losing clicks, quick wins, indexing; Bing's queries and Google Analytics visits beside them | Agent Number 10, or a free Search Console export (indexing needs Agent Number 10) |
| `bing-webmaster` | Your Bing Webmaster Tools data: Bing queries and pages, crawl issues, URL checks, inbound links, and submitting changed URLs after you agree | A free Bing Webmaster Tools key |
| `keyword-research` | Keyword ideas, volume and difficulty for your market, what you already rank for, grouped by page | Agent Number 10, or your own DataForSEO, treg or Ahrefs |
| `content-brief` | A brief for one query from what ranks, what AI answers say and cite, and your gaps | Agent Number 10, or your own DataForSEO, treg or Ahrefs (AI answers need Agent Number 10) |
| `backlinks` | Referring domains, new and lost links, the link gap against competitors, and broken backlinks to reclaim | Your own Ahrefs or DataForSEO, or a free Bing key for your own inbound links |
| `local-seo` | Your business listing, Maps results across an area, and name, address and phone across the site | Agent Number 10, or your own DataForSEO or treg (some checks need nothing) |
| `client-report` | A client-ready AEO and SEO report, shared as a link that opens without a login | Agent Number 10 |

Every finding carries a `Passes when` line: the test that proves it is
fixed. The audit writes it, the pull request repeats it, and `verify-fix`
runs it.

## What the plugin runs, sends and fetches

- The audit and fix skills fetch your site's public pages. They never log in
  or submit a form.
- For Core Web Vitals, `seo-audit` sends page addresses to Google's PageSpeed
  Insights API. It uses your own free key when `PAGESPEED_API_KEY` is set.
- `seo-fix` changes files in your repository on a branch, one commit per fix,
  and asks before it pushes.
- The plugin adds one MCP server, Agent Number 10 at
  `https://app.agentnumber10.com/mcp`. Only the skills marked "Agent Number
  10" above use it, after you sign in. They send your domain and what they
  look up (questions you track, keyword seeds, business names and map
  coordinates), read Search Console and Analytics only once you connect them
  in Agent Number 10, and ask before any lookup that costs money.
  `client-report` asks before it shares a report link.
- With your own DataForSEO, treg or Ahrefs account instead,
  `keyword-research`, `content-brief`, `local-seo` and `backlinks` send the
  same lookups from your machine straight to that service, through its MCP
  server or its API, with the keys you set in your own environment or agent
  settings. `backlinks` sends your domain and your competitors' domains.
  Agent Number 10 never sees your keys. They ask before every batch of
  calls, which are billed to your account, and save the raw responses in
  `.agents/data/`. `connect-data` gives the setup.
- With a free Bing Webmaster Tools key in `BING_WEBMASTER_API_KEY`,
  `bing-webmaster`, `search-console`, `technical-seo` and `backlinks` send
  your site's address and the URLs they look up to Microsoft's Bing
  Webmaster API. `bing-webmaster` submits URLs to Bing only after you agree
  to the list.
- With Google's own Analytics MCP server (`analytics-mcp`), when you have
  connected it yourself, `search-console`, `content-refresh` and `client-report` read
  your Google Analytics reports with your own Google account. The plugin
  does not add that server.
- `search-console` can read a Search Console export you download instead;
  the files stay on your machine.
- `content-brief` fetches the public pages that rank for a query, from your
  machine.
- Text on a page or in an AI answer is treated as data, never as
  instructions.

Everything the skills write goes in `.agents/` in your project: fix lists,
drafts, briefs, keyword shortlists, client reports and raw data responses.

## Connect your data

Ask your agent to "connect data", or follow a guide by hand. Each one has
the steps for Claude Code, Codex and Cursor, the check, where the key lives
and how to disconnect:
[Agent Number 10](https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/agent-number-10.md),
[DataForSEO](https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/dataforseo.md),
[treg](https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/treg.md),
[Ahrefs](https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/ahrefs.md),
[Bing Webmaster Tools](https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/bing-webmaster.md),
[Google Analytics](https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/google-analytics.md),
[Search Console export](https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/search-console-export.md).

Full documentation, the comparison with other SEO skills, and the changelog:
[github.com/akootahq/seo-agent-skills](https://github.com/akootahq/seo-agent-skills).
MIT licensed.
