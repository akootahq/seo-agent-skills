# Page checks

Run each check on the HTML as fetched, without running JavaScript, and again
on what a browser would show only if the user asks for a rendered check.

| Check | Passes when |
| --- | --- |
| Status | The page returns 200 after at most one redirect |
| Indexable | No `noindex` in `<meta name="robots">` or the `X-Robots-Tag` header, unless the page is meant to stay out of search |
| Canonical | One `<link rel="canonical">` with an absolute URL that returns 200, is not itself redirected, and is this page unless the page is a deliberate duplicate |
| Title | One `<title>`, roughly 30 to 60 characters, unique across the audited pages, leading with what the page is about |
| Meta description | One, 70 to 160 characters, unique across the audited pages |
| H1 | Exactly one, describing the page, not identical on every page |
| Heading order | No level skipped going down (an h2 is not followed directly by an h4) |
| Language | `<html lang="...">` matches the page's language |
| Mobile | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Mixed content | No `http://` images, scripts or styles on an `https://` page |
| Images | Every content image has `alt` text describing it, and `width` and `height` set |
| Internal links | Links to other pages of the site use real `<a href>` links; sampled internal links return 200 without redirecting |
| Open Graph | `og:title`, `og:description` and `og:image` are set, and the image loads |
| Structured data | Every `application/ld+json` block parses as JSON and uses types that match the page (below) |

## Structured data by page type

Check the properties search engines need for each type. Values must match what
the page shows.

| Type | Needs |
| --- | --- |
| `Organization` (home or about page) | `name`, `url`, `logo`, and `sameAs` links to the brand's real profiles |
| `WebSite` (home page) | `name`, `url` |
| `Article` or `BlogPosting` | `headline`, `datePublished`, `dateModified`, `author` with a `name` |
| `Product` | `name`, `image`, `offers` with `price`, `priceCurrency`, `availability` |
| `LocalBusiness` | `name`, `address`, `telephone`, and `openingHours` if the page shows them |
| `BreadcrumbList` | One `ListItem` per level with `position`, `name` and `item` |
| `FAQPage` | Only questions and answers that appear on the page, word for word |

Report a type that is missing where the page clearly needs it (a product page
without `Product`), and a block that does not parse, as separate findings.
