# Page check detail

## Reading robots.txt for one path

A crawler follows only the most specific group that names its token. If
`Googlebot` has its own group, the `User-agent: *` group no longer applies to
it at all.

- Inside a group, the longest matching rule wins, and `Allow` wins a tie.
- `*` in a path matches any characters; `$` at the end anchors the end of the
  URL.
- A robots.txt that returns 404 (or any 4xx except 429) allows everything.
  One that returns 5xx makes Google stop crawling the site for the first 12
  hours, then use the last good copy for up to 30 days; report it.

Report the group and the rule that decides the result, for example
`User-agent: *` then `Disallow: /pricing`.

## Structured data properties by type

Values must match what the page shows.

| Type | Needs |
| --- | --- |
| `Organization` (home or about page) | `name`, `url`, `logo`, and `sameAs` links to the brand's real profiles |
| `WebSite` (home page) | `name`, `url` |
| `Article` or `BlogPosting` | `headline`, `datePublished`, `dateModified`, `author` with a `name` |
| `Product` | `name`, `image`, `offers` with `price`, `priceCurrency`, `availability` |
| `SoftwareApplication` | `name`, `offers.price` (`0` when the page says it is free). Also check `applicationCategory` and `operatingSystem`; `aggregateRating` or `review` only when the page shows them (Google's software result needs one, but their absence is not a finding) |
| `LocalBusiness` | `name`, `address`, `telephone`, and `openingHoursSpecification` if the page shows opening hours |
| `BreadcrumbList` | One `ListItem` per level with `position`, `name` and `item` |
| `FAQPage` | Only questions and answers that appear on the page, word for word |
| `Event` | `name`, `startDate`, `location`; a past `startDate` on a page that still promotes it is a finding |

Report a type that is missing where the page clearly needs it (a product page
without `Product`), and an item that does not parse, as separate findings.

How each syntax names things:

| Syntax | Item | Type | Property |
| --- | --- | --- | --- |
| JSON-LD | an object in the block, or in its `@graph` list | `@type` | the object's keys |
| Microdata | the element with `itemscope` | `itemtype` | `itemprop` on elements inside it |
| RDFa | the element with `typeof` | `typeof`, read against `vocab` | `property` on elements inside it |

A page can mix syntaxes. Count each item once, and say which syntax it uses.

## Smaller checks

| Check | Passes when |
| --- | --- |
| Language | `<html lang="...">` is set and matches the language the page is written in |
| Mobile | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Mixed content | No `http://` images, scripts or styles on an `https://` page |
| Open Graph | `og:title`, `og:description` and `og:image` are set, and the image loads |
| Charset | `<meta charset="utf-8">` or a `charset` in the `content-type` header |

## The checks table in the report

One row per check, so the reader sees what ran:

| Check | Result | Note |
| --- | --- | --- |
| Status and redirects | pass | 200, no redirect |
| Indexability | pass | no noindex; robots.txt allows `/pricing` |
| Title | fail | 74 characters |
| Structured data | pass | JSON-LD `Organization`, microdata `Product`; no RDFa |
| Rendered check | not run | no browser tool in this agent |
| External links | could not check | 2 of 10 answered 403 |
