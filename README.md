# SEO Agent Skills for Claude Code, Codex and Cursor

Skills that audit a website for search and AI search, make the fixes in your
code as a pull request, and check each fix on the live site. Connect Agent
Number 10 to see what ChatGPT, Claude, Perplexity, Gemini and Google AI
Overviews answer about you, before a fix and after it.

## Install

With the skills CLI, for Claude Code, Codex, Cursor and other agents that read
`SKILL.md` files:

```sh
npx skills add akootahq/seo-agent-skills
```

As a Claude Code plugin:

```sh
claude plugin marketplace add akootahq/seo-agent-skills
claude plugin install seo-agent-skills@seo-agent-skills
```

Or copy the folders in `skills/` into your agent's skills folder.

## The skills

| Skill | What it does | Needs |
| --- | --- | --- |
| `brand-context` | Writes one brand file the other skills read: domain, market, competitors, priority pages, buyer questions | Nothing |
| `seo-audit` | Technical and on-page audit: indexing, redirects, titles, canonicals, sitemaps, structured data, local, e-commerce, hreflang, and Core Web Vitals with a free Google API key | Nothing |
| `aeo-audit` | Can AI assistants read and quote you: AI crawler access, content without JavaScript, the brand as an entity, answer-ready pages, llms.txt | Nothing |
| `seo-fix` | Makes the fixes in your code, one commit each, and opens a pull request listing the check for every fix | Nothing |
| `verify-fix` | Runs each fix's check on the live site and reports pass or fail with the evidence | Nothing |
| `ai-visibility` | Real answers from ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews: how often they name or cite you, by engine and by question | Agent Number 10 |
| `ai-competitors` | Who the assistants name instead of you, ranked on the same answers | Agent Number 10 |
| `prove-fix` | AI visibility before and after each fix went live | Agent Number 10 |

## How a run goes

Ask your agent in plain words. For example:

1. "Set up the brand file for example.com" (`brand-context`)
2. "Run an SEO audit and an AEO audit" (`seo-audit`, `aeo-audit`)
3. "Measure our AI visibility now, before we change anything" (`ai-visibility`)
4. "Fix the high and medium findings and open a pull request" (`seo-fix`)
5. After the merge and deploy: "Check the fixes are live" (`verify-fix`)
6. Two weeks later: "Did the fixes change what AI answers say?" (`prove-fix`)

Every finding carries a `Passes when` line: the test that proves it is fixed.
The audit writes it, the pull request repeats it, and `verify-fix` runs it.

## How it compares

| | By hand | An agency | SEO software | These skills |
| --- | --- | --- | --- | --- |
| Audit | Hours per site | Weeks | Minutes, as a dashboard | Minutes, as a fix list in your repo |
| Fixes | You make them | They make them, billed | You make them | Made in your code, as a pull request you review |
| Checking a fix is live | By hand | Depends on the agency | Depends on the tool | A pass check for each fix, run on the live site |
| What AI assistants answer about you | Ask them one by one | Depends on the agency | Some tools, on paid plans | Real answers from 5 engines, with Agent Number 10 |
| Before and after a fix | By hand | In a report | Some tools track over time | Readings split at the date each fix went live |
| Cost | Your time | A retainer | A monthly plan | Free; AI answers need an Agent Number 10 account |

## Your data

- The audit and fix skills run in your agent, on your machine. They fetch your
  public pages, and for Core Web Vitals they send page addresses to Google's
  PageSpeed Insights API (set `PAGESPEED_API_KEY` to use your own free key).
  Nothing else leaves your machine.
- The AI answer skills (`ai-visibility`, `ai-competitors`, `prove-fix`) send
  your domain and the questions you track to Agent Number 10, which collects
  the answers.
- Skills that run a paid lookup ask before running it.

## Files the skills write

Everything goes in `.agents/` in your project: the brand file
(`seo-brand.md`), audits and their raw fetches (`audits/`), and the AI
visibility history. Commit it to keep the history, or add `.agents/audits/raw/`
to `.gitignore`.

## Contributing

Issues and pull requests are welcome. [CONTRIBUTING.md](CONTRIBUTING.md) has
the checks and the rules the skills keep; security reports go through
[SECURITY.md](SECURITY.md).

## License

The skills are MIT licensed. The Agent Number 10 name and logo are trademarks
and are not covered by the licence. Made by
[Agent Number 10](https://agentnumber10.com).
