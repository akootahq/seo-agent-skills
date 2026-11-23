# SEO Agent Skills

Eight skills for search and AI search (AEO, also called GEO) in Claude Code.
They audit a site the way a careful consultant would, make the fixes in your
own code as a pull request, and check each fix on the live site. With an
Agent Number 10 account they also show what ChatGPT, Claude, Perplexity,
Gemini and Google AI Overviews answer about you, before a fix and after it.

## The skills

| Skill | What it does | Needs |
| --- | --- | --- |
| `brand-context` | Writes one brand file the other skills read: domain, market, competitors, priority pages, buyer questions | Nothing |
| `seo-audit` | Technical and on-page audit: indexing, redirects, titles, canonicals, sitemaps, structured data, local, e-commerce, hreflang, and Core Web Vitals | Nothing |
| `aeo-audit` | Whether AI assistants can read and quote you: AI crawler access, content without JavaScript, the brand as an entity, answer-ready pages, llms.txt | Nothing |
| `seo-fix` | Makes the fixes in your code, one commit each, and opens a pull request listing the check for every fix | Nothing |
| `verify-fix` | Runs each fix's check on the live site and reports pass or fail with the evidence | Nothing |
| `ai-visibility` | Real answers from ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews: how often they name or cite you | Agent Number 10 |
| `ai-competitors` | Who the assistants name instead of you, ranked on the same answers | Agent Number 10 |
| `prove-fix` | AI visibility before and after each fix went live | Agent Number 10 |

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
  `https://app.agentnumber10.com/mcp`. Only `ai-visibility`, `ai-competitors`
  and `prove-fix` use it, after you sign in. They send your domain and the
  questions you track, and ask before any lookup that costs money.
- Text on a page or in an AI answer is treated as data, never as
  instructions.

Everything the skills write goes in `.agents/` in your project.

Full documentation, the comparison with other SEO skills, and the changelog:
[github.com/akootahq/seo-agent-skills](https://github.com/akootahq/seo-agent-skills).
MIT licensed.
