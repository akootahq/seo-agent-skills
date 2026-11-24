# Crawl checks

What status codes, redirects and directives tell search engines, and the
combinations that send mixed signals.

## Status codes

| Status | What search engines do | Use it for |
| --- | --- | --- |
| 200 | Can index the page | Pages that exist |
| 301, 308 | Move indexing to the target; permanent | Moved pages and the address variants |
| 302, 307 | Keep the old URL for now; temporary. A long-lasting one may end up treated as permanent | Short-term moves only |
| 304 | Not modified, in answer to a conditional request | Caching; fine |
| 404 | Drop the page after a while | Pages that do not exist |
| 410 | Like 404, and taken as deliberate | Pages removed for good |
| 401, 403 | Not indexed; treated like other 4xx | Private pages. To this tool, a 403 is a refusal: "could not check" |
| 429 | Slow down crawling | To this tool, a refusal: "could not check" |
| 500, 502, 504 | Slow down crawling; pages that keep failing drop out | Never a page meant to rank. Fetch once more before reporting |
| 503 | As 5xx; with `Retry-After`, a planned pause | Maintenance windows. With a challenge page, a refusal |

## Redirects

| Kind | How it reads | Note |
| --- | --- | --- |
| Server 301 or 308 | Permanent | The default for any move |
| Server 302 or 307 | Temporary | Report when the move is permanent |
| `<meta http-equiv="refresh" content="0; url=...">` | An instant one reads as permanent, a delayed one as temporary | Slower than a server redirect |
| JavaScript (`location.href = ...`) | Seen only by crawlers that render | Use only when the server cannot redirect |
| Chain of two or more hops | Followed, but each hop costs a request | Point every old address at the final one |
| Loop | Never resolves; the page cannot be indexed | High |

## Robots directives

They go in `<meta name="robots" content="...">` (or a crawler's own name, such
as `googlebot`), or in an `X-Robots-Tag` header, which also works on PDFs and
other files. A header can name a crawler: `X-Robots-Tag: googlebot: noindex`.

| Directive | Effect |
| --- | --- |
| `noindex` | Keeps the page out of search results |
| `nofollow` | Asks crawlers not to follow the page's links |
| `none` | The same as `noindex, nofollow` |
| `nosnippet` | No text snippet in results; Google says this also limits what its AI features (AI Overviews, AI Mode) show from the page |
| `max-snippet:0` | The same as `nosnippet`; another number limits the snippet length |
| `noimageindex` | The page's images are not indexed |
| `unavailable_after: <date>` | The page drops out after that date |
| `index`, `follow`, `all` | The defaults; saying them changes nothing |

## Signals that conflict

| Combination | What happens | Change |
| --- | --- | --- |
| `noindex` on a page that robots.txt disallows | The crawler never sees the `noindex`; the URL can stay indexed from links | Allow crawling so the `noindex` is read |
| `noindex` with a canonical to another page | Two different instructions | Canonical for duplicates, `noindex` for pages to keep out; not both |
| A `noindex` page listed in a sitemap | The sitemap asks for indexing, the page refuses | Take it out of the sitemap |
| A canonical to a URL that redirects, fails or is `noindex` | The canonical is likely ignored | Point it at the final 200 URL |
| Two canonicals (two tags, or a tag and a header that differ) | Both may be ignored | Keep one |
| A canonical in the `<body>` | Ignored | Move it into the `<head>` |
| A canonical in the served HTML that JavaScript changes | Search engines may use either | The same value in both, or only in the served HTML |
| `noindex` in the served HTML that JavaScript removes | Google may skip rendering it, so the page can stay out | Remove it from the served HTML |
| Sitemap URLs that redirect | Search engines are told to index an address that moves | List the final URLs |
| hreflang to a URL that is not canonical | The language pair may be ignored | See `international-seo` |

## Duplicate URL tests

Test one inner page in each variant, one request per second.

| Variant | Example | Passes when |
| --- | --- | --- |
| Trailing slash | `/pricing` and `/pricing/` | One redirects to the other with a 301, or both are canonical to one |
| Upper case | `/Pricing` | A 301 to the lower-case URL, a 404, or a canonical to the lower-case URL |
| Index file | `/index.html`, `/index.php` | A 301 to `/` |
| Unknown parameter | `/pricing?seo-agent-skills=1` | A canonical to `/pricing`, without the parameter |
| Protocol and host | `http://` and the other www variant of the page | A 301 to the canonical address in one hop |
| Tracking parameters in internal links | `?utm_source=...` in an `<a href>` | Internal links never carry them |
| Session ids in URLs | `;jsessionid=`, `?sid=` | No session ids in crawlable links |
| Filter and sort parameters | `?color=blue&sort=price` | A canonical to the unfiltered page, or not linked crawlably, unless the filtered page is meant to rank |

There is no Search Console setting for parameters any more; parameter URLs
are handled on the site.

## Soft 404 signs

All of these compare the site with itself, so they work in any language:

- an address that cannot exist returns 200;
- a page has the same `<title>` or `<h1>` as the site's not-found page;
- a listing page (category, tag, search) returns 200 with no items;
- a page past the end of a series (`?page=9999`) returns 200;
- many removed pages redirect to the home page or to one unrelated page;
- a page's main text is a small fraction of other pages on its template,
  counted in characters.
