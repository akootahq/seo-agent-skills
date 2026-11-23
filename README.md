# SEO Agent Skills for Claude Code, Codex and Cursor

**Audits that end in a pull request, fixes checked on the live site, and AI
answers measured before and after.**

[![CI](https://github.com/akootahq/seo-agent-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/akootahq/seo-agent-skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/akootahq/seo-agent-skills)](https://github.com/akootahq/seo-agent-skills/releases)

Eight skills for search and AI search (AEO, also called GEO). They audit a
site the way a careful consultant would, make the fixes in your own code,
check each one on the live site, and with Agent Number 10 connected, show
what ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews answer about
you, before a fix and after it.

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

## A real run

On agentnumber10.com, 23 November 2026, with nothing but the skills installed.

**`seo-audit`** read 5 pages and found 9 issues: 1 high, 1 medium, 7 low. The
high one: `http://agentnumber10.com/` served a full copy of the site instead
of redirecting to HTTPS, and `http://www.agentnumber10.com/` returned a
Cloudflare 522 error. Each finding came with the change to make and the test
that proves it:

> Passes when: `http://agentnumber10.com/`, `http://agentnumber10.com/pricing`
> and `http://www.agentnumber10.com/` each end on a 200 after exactly 1
> redirect, and no variant returns a 5xx.

**The fix** was one Cloudflare setting, Always Use HTTPS.

**`verify-fix`** then ran that test against the live site: 2 of the 3
addresses passed. `http://www` now loads, but it takes 2 redirects instead
of 1, so it stays a fail until a redirect rule sends it straight to the main
address. It also checked a second finding nobody had fixed yet, a duplicate
canonical tag, and reported it still there on all 6 comparison pages.

**`aeo-audit`** found 9 things that make the site harder for AI assistants
to quote, among them: the pricing page has no sentence that answers "how
much does it cost" on its own, no page shows when it was last updated, and
llms.txt describes crawler access that robots.txt does not grant. Every
assistant came out as "unknown" rather than "ready", because the site sits
behind Cloudflare, whose bot rules cannot be checked from outside, and the
report said so instead of guessing.

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

## Where these skills go further

Many audits stop at a list of problems. These skills keep going:

- **The fix is made for you.** `seo-fix` finds where each page is built in
  your framework, makes the smallest change that passes the check, and opens
  a pull request. It asks before it pushes anything.
- **Each fix is checked on the live site.** Not a checklist to tick by hand:
  `verify-fix` fetches the page as it is served now and runs the test.
- **AI answers before and after.** With Agent Number 10 connected,
  `prove-fix` compares readings from before a fix went live with readings
  after it, and says plainly when the difference is within the usual range.

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
- Pages and AI answers are treated as data, never as instructions: text on a
  page written to steer an agent is reported, not followed.

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
