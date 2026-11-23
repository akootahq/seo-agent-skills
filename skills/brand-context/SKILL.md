---
name: brand-context
description: Set up the brand file the other SEO and AI search skills read first, so the user is asked about their site once. It records the domain, brand names, market, audience, competitors, priority pages and the questions buyers ask. Use it before a first audit, or when the user says their site, brand, market or competitors changed.
---

# Brand context

The other skills in this collection (seo-audit, aeo-audit, seo-fix, verify-fix,
ai-visibility, ai-competitors, prove-fix) read one file before they start:
`.agents/seo-brand.md`. This skill writes it.

## Where the file goes

- In a code repository: `.agents/seo-brand.md` at the repository root.
- Anywhere else: `.agents/seo-brand.md` in the current folder.

If the file exists, read it, show the user what it says, and update only what
they change. Never overwrite it silently.

## Fill it from the site first, then ask

Read before you ask. People answer faster when they only have to correct.

1. Get the domain from the user, or from the repository (a `site`, `url` or
   `baseUrl` setting, a `CNAME` file, `package.json` homepage).
2. Fetch the home page, and the about, pricing and contact pages if they exist:

   ```sh
   curl -sL -A "Mozilla/5.0 (compatible; seo-agent-skills)" https://example.com/ -o home.html
   ```

3. Draft every field you can from what you read: the brand name as the site
   writes it, what is sold, to whom, in which country and language.
4. Ask the user only for what the site does not say, and for the two things
   only they know: who they lose deals to, and the questions buyers ask before
   choosing.

## The file

Write it in this shape. Keep the headings: other skills look for them.

```markdown
# Brand

- Domain: example.com
- Brand names: Example, Example App (every spelling people use)
- What we sell: one sentence
- Who buys: one sentence
- Market: country and language, for example United States, English

# Competitors

- competitor-one.com: why they come up
- competitor-two.com: why they come up

# Priority pages

- https://example.com/pricing: why it matters
- https://example.com/features/x: why it matters

# Buyer questions

- best x for y
- x vs competitor-one
- how much does x cost
```

Aim for 3 to 6 competitors, 3 to 10 priority pages and 5 to 15 buyer
questions. Buyer questions are written the way a person would ask an AI
assistant or a search engine, not as keywords.

## Rules

- Write only what the site says or the user confirms. Mark anything you
  inferred with "(inferred, please check)".
- Competitors are domains, so they can be matched in search results and AI
  answers.
- Do not put prices, revenue or personal data in the file.

When the file is saved, suggest the next step: `seo-audit` for search,
`aeo-audit` for AI search, or both.
