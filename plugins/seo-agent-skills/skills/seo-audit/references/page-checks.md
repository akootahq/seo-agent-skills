# Page checks

Run each check on the HTML as fetched, without running JavaScript, and again
on what a browser would show only if the user asks for a rendered check.

## Before the checks

Two situations make the checks below wrong, so look for them first:

- **The site refused the request.** A 403 or 429, a bot challenge page, or a
  login wall instead of the page. Record "could not check: the site refused
  the request (status 403)" for that page and run no other check on it. A
  refusal of this tool does not mean search engines are refused, so never
  report it as the site's own fault. The owner can confirm what Google sees
  with Search Console's URL Inspection.
- **The content only appears after JavaScript.** The HTML has a root element
  and scripts but almost no visible text. Say so plainly, once, as a finding:
  search engines may index it later, and several AI crawlers never will. Run
  the checks that read the `<head>` (status, indexable, canonical, title, meta
  description, language, viewport) and leave the content checks (headings,
  images, links) for a rendered check instead of reporting an empty page as
  broken.

No check here depends on English words. Run them on pages in any language.

| Check | Passes when |
| --- | --- |
| Status | The page returns 200 after at most one redirect |
| Indexable | No `noindex` in `<meta name="robots">` or the `X-Robots-Tag` header, unless the page is meant to stay out of search |
| Canonical | One `<link rel="canonical">` with an absolute URL that returns 200, is not itself redirected, and is this page unless the page is a deliberate duplicate |
| Title | One `<title>`, roughly 30 to 60 characters, unique across the audited pages, leading with what the page is about |
| Meta description | One, 70 to 160 characters, unique across the audited pages |
| H1 | Exactly one, describing the page, not identical on every page |
| Heading order | No level skipped going down (an h2 is not followed directly by an h4) |
| Language | `<html lang="...">` matches the language of the page's text |
| Mobile | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Mixed content | No `http://` images, scripts or styles on an `https://` page |
| Images | Every content image has `alt` text describing it, and `width` and `height` set. Not content, so skip: tracking pixels (1x1, 0x0 or hidden), spacers, icons inside a link or button that already has a text label, and images marked decorative (`alt=""`, `role="presentation"` or `aria-hidden="true"`). An empty `alt=""` on a decorative image is correct |
| Internal links | Links to other pages of the site use real `<a href>` links; sampled internal links return 200 without redirecting |
| Open Graph | `og:title`, `og:description` and `og:image` are set, and the image loads |
| Structured data | Found in any of its three formats: `application/ld+json` blocks, microdata (`itemscope`, `itemtype`, `itemprop`) and RDFa (`typeof`, `property`). Each JSON-LD block parses as JSON, and the types match the page (below). Say a page has no structured data only after checking all three |

## Structured data by page type

Check the properties search engines need for each type. Values must match what
the page shows.

| Type | Needs |
| --- | --- |
| `Organization` (home or about page) | `name`, `url`, `logo`, and `sameAs` links to the brand's real profiles |
| `WebSite` (home page) | `name`, `url` |
| `Article` or `BlogPosting` | `headline`, `datePublished`, `dateModified`, `author` with a `name` |
| `Product` | `name`, `image`, `offers` with `price`, `priceCurrency`, `availability` |
| `LocalBusiness` | `name`, `address`, `telephone`, and `openingHoursSpecification` if the page shows opening hours |
| `BreadcrumbList` | One `ListItem` per level with `position`, `name` and `item` |
| `FAQPage` | Only questions and answers that appear on the page, word for word |

Report a type that is missing where the page clearly needs it (a product page
without `Product`), and a block that does not parse, as separate findings.
