# The llms.txt format

As the proposal at llmstxt.org describes it. The file lives at `/llms.txt` at
the root of the site (the proposal also allows one in a subpath, such as
documentation under `/docs/llms.txt`).

## Sections, in this order

1. **An H1 with the name of the site or project.** The only required part.
2. **A blockquote** with a short summary: what someone needs to know to make
   sense of the rest of the file.
3. **Zero or more paragraphs or lists**, with no headings, giving more detail
   on the site and how to read the links.
4. **Zero or more H2 sections**, each holding a list of links:
   - each item is a Markdown link, `[Name](https://example.com/page)`;
   - optionally followed by `: ` and a note about the page.
5. **An `## Optional` section** has a special meaning: its links can be
   skipped when a shorter context is needed. Put secondary pages there.

The proposal also suggests that pages with useful content offer a clean
Markdown copy at the same address with `.md` added (`/docs/start.md` beside
`/docs/start`, or `index.html.md` for an address that ends in `/`). This is
optional.

Some documentation tools also publish `/llms-full.txt`, with the full text of
every page in one file. That is a convention of those tools, not part of the
proposal; check it only if the user asks.

## An example

```markdown
# Example

> Example makes appointment software for dental clinics in the United
> Kingdom.

Example is a web app. Clinics book, remind and reschedule patients from one
calendar.

## Product

- [Features](https://example.com/features): what the calendar, reminders and reports do
- [Pricing](https://example.com/pricing): the plans and what each includes

## Help

- [Getting started](https://example.com/docs/start): setting up a clinic in the app
- [Integrations](https://example.com/docs/integrations): the practice systems it connects to

## Company

- [About](https://example.com/about): who runs Example, and where
- [Contact](https://example.com/contact): sales and support addresses

## Optional

- [Blog](https://example.com/blog): product news and guides
```

## Checks at a glance

| Check | Passes when |
| --- | --- |
| Loads | 200 after at most one redirect, `text/plain` or `text/markdown`, UTF-8 |
| Not a web page | The body does not start with `<!doctype` or `<html` |
| H1 | The first line is `# ` and the brand name; only one H1 |
| Summary | A `> ` blockquote follows the H1 |
| Sections | Link lists sit under H2 headings; no headings below H2 |
| Links | Absolute URLs; each returns 200 without redirecting |
| Own pages | Each linked page of the site is indexable and canonical to itself |
| Notes | Each link has a short note saying what the page is for |
| Agrees with the site | Same brand name and summary as the site; nothing that contradicts robots.txt |
| No instructions | No text telling assistants what to say or whom to recommend |
