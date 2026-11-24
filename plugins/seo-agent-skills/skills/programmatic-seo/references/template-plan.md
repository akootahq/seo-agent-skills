# Template plan and sample check

## The plan file

Save it as `.agents/drafts/pseo-<name>-plan.md`, in this shape. `seo-fix`
builds the template from it, and the sample check tests against it.

```markdown
# Plan: integration pages

- Page type: one page per integration
- Question each page answers: "does example work with <app>, and how"
- Evidence of demand: buyer questions in the brand file; support requests
  the user named
- Dataset: integrations table, 212 rows, changes weekly
- Rows that earn a page: 64 (setup steps written, at least one documented
  use case); the rest stay on the hub list only
- URL pattern: /integrations/<app-slug>

## Fields

| Field | Example (real row) | Source | Unique or shared | Required | Changes |
| --- | --- | --- | --- | --- | --- |
| app_name | the name as the row has it | integrations table | unique | yes | rarely |
| setup_steps | the row's steps | docs team | unique | yes | monthly |
| use_cases | the row's use cases | product team | unique | yes | monthly |
| plans_included | the plans the row lists | pricing data | shared | yes | rarely |
| updated_at | the row's change date | integrations table | unique | yes | each change |

## Template rules

| Part | Rule |
| --- | --- |
| Title | "<app_name> integration: <first use case>" |
| Meta description | built from app_name and use_cases |
| h1 | as the title, without the brand |
| Sections | setup steps; use cases; plans; related integrations |
| Structured data | WebPage with dateModified = updated_at |
| Canonical | self |
| Index | indexable when the row earns a page; otherwise not generated |
| Sitemap | pages that are generated; lastmod = updated_at |
| Hub | /integrations lists every row, paginated with links |
| Related links | three integrations in the same category |
| Not found | an unknown slug returns 404 |

## Rollout

- Batch 1: the 20 rows with the most data
- Check after publishing, then index status after about four weeks
- Batch 2 only if batch 1 passes
```

Every example value in the plan comes from the real dataset. Where the user
has not decided something, write "to decide", not a guess.

## Picking the sample

| Group | How many | Why |
| --- | --- | --- |
| Rows with the most data | 4 | The best case: these should pass |
| Rows with the least data that still get a page | 6 | Where thin pages show up first |
| The newest rows | 3 | Where a pipeline change shows up first |
| A spread from the middle | 5 | The typical page |
| Hub pages | 2 | Linking and pagination |

Say which group each sampled URL belongs to.

## Comparing the content of sampled pages

This works the same way for any language, because it compares text between
the pages instead of judging words.

1. For each page, take the main content (`<main>`, `<article>` or
   `role="main"`, otherwise the body without `<header>`, `<nav>`, `<footer>`
   and `<aside>`) and split it into blocks: headings, paragraphs, list items
   and table rows.
2. In each block, replace the page's own name (as its h1 or its row gives it)
   with `{name}`. Keep a second copy of the block in which every number is
   also replaced, with `{n}`.
3. A block whose second copy appears on more than half the sampled pages is
   **template text**. If its first copies differ between pages, the numbers
   in it are **data values**: count them.
4. What is left is the page's **own text**. Measure it in characters, so the
   result works for languages written without spaces, and as a share of the
   page's main content.
5. Compare pairs too. Two pages whose own text is nearly the same are near
   duplicates, even when neither is template text.

Report, for each sampled page: template text, data values and own text (as a
share of the main content), and one line saying what the own text is (for
example, "the setup steps for this app" or "nothing beyond the name").

Template text is expected on every page of this kind. A page is thin when its
own text and data values are not enough to answer its question; show those
pages side by side, and let the user set the bar.

## Doorway signs

- Pages for places, or for small variants of one service, that differ only
  by the name.
- Every page sends the visitor to the same form or the same page, with nothing
  to do on the page itself.
- More pages for places than the business actually serves or has a presence
  in.

Each sign is evidence, not a verdict. Quote what the pages show.
