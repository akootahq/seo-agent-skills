# Freshness signals

## Where dates live

| Signal | Where | Read it as |
| --- | --- | --- |
| Visible published or updated date | The page text near the h1 or at the end of the article | What readers see; the one that matters most |
| `<time datetime="...">` | The HTML around a visible date | The machine-readable form of that date |
| `datePublished`, `dateModified` | `Article`, `BlogPosting`, `WebPage` structured data | What the page declares to search engines |
| `article:published_time`, `article:modified_time` | `<meta property="...">` tags | The same, for link previews |
| `Last-Modified` | HTTP response header | Often the deploy time, not a content change |
| `<lastmod>` | The sitemap entry for the page | Often the build time; trust it only if it differs between pages |

The visible date and `dateModified` should be the same day. A `Last-Modified`
header or `lastmod` that is newer than both is normal (a deploy changes it)
and is not a finding by itself.

## Reading dates in any language

- Read the date as the page writes it, in its own language and format. Day
  and month order differ between countries: `03/04/2025` is 3 April in much
  of the world and 4 March in the United States. When the page's language or
  market does not settle it, say the date is ambiguous rather than guess.
- Some pages use another calendar. Thai pages often give Buddhist Era years,
  543 years ahead of the Gregorian year (2568 is 2025). Japanese pages may
  give era years. Convert before comparing with today.
- Some languages write numbers with their own digits (Arabic-Indic, Persian,
  Devanagari). Read them as numbers.
- Prefer the `datetime` attribute or structured data when the visible text is
  unclear; they use ISO 8601 (`2025-03-12`).

## Statistics and claims

For each number presented as a current fact, record:

| Field | Example |
| --- | --- |
| Page | https://example.com/guides/hiring |
| Sentence | quoted exactly from the page |
| Source | the link the page gives, or "none" |
| Source date | the date the source shows, or "not stated" |
| Link status | 200, 404, could not check |

"Needs a fresh source" means one of: no source, a source older than the window
agreed with the user, a source whose link is broken, or a source that no
longer says what the page claims. Never write a replacement number.

## Superseded names and prices

- Build today's reference from the pricing and product pages: each plan or
  product name exactly as written, and each price with its currency and
  billing period.
- Search the audited pages for those names, for the retired names the user
  gave, and for amounts next to a currency symbol or code.
- A mismatch is a finding only where the page presents it as current. Pages
  that are dated records (release notes, announcements, changelogs, history)
  keep their old names and prices.

## Expired offers and events

| Signal | Finding when |
| --- | --- |
| `Event` `startDate` or `endDate` | In the past, and the page still invites people to attend or book |
| `Offer` `priceValidUntil` | In the past; Google may not show the product snippet |
| A deadline or end date in the text | In the past, and the page still promotes the offer |
| `unavailable_after` in robots meta or `X-Robots-Tag` | In the past while the page is meant to rank: it drops out of search |
