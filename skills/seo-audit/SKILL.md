---
name: seo-audit
description: Run a full technical and on-page SEO audit of a website and write a prioritised fix list, where every finding has the exact change and a check that proves it is fixed. Covers crawling and indexing, redirects, titles, meta descriptions, headings, canonicals, sitemaps, robots.txt, structured data, Core Web Vitals, images, internal links, hreflang, local and e-commerce pages, and trust signals. Use when the user asks for an SEO audit, a site health check, why a site does not rank or is not indexed, or what to fix first.
---

# SEO audit

Audit a live site the way a careful SEO consultant would, but end with a fix
list another skill can apply (`seo-fix`) and check (`verify-fix`).

Read `.agents/seo-brand.md` first if it exists (see `brand-context`). It gives
the domain, the market and the priority pages. If it does not exist, ask for
the domain and carry on; offer to create the file at the end.

## 1. Fetch politely

Use one user agent for every request, so the site owner can recognise it in
their logs:

```sh
UA="Mozilla/5.0 (compatible; seo-agent-skills/0.1; +https://github.com/akootahq/seo-agent-skills)"
curl -sSL -A "$UA" -o page.html -w "%{http_code} %{url_effective} %{num_redirects}\n" https://example.com/
```

- One request per second at most. Save what you fetch under
  `.agents/audits/raw/` so findings can quote it.
- Read only public pages. Never log in, never submit forms.

## 2. Site-wide checks

1. **Address variants.** Fetch `http://`, `https://`, with and without `www`.
   All four should end on one address, in one redirect.
2. **robots.txt.** It loads with status 200, does not block CSS, JS or pages
   that should rank, and lists the sitemap.
3. **Sitemaps.** Each sitemap in robots.txt (or `/sitemap.xml`) loads, is valid
   XML, and lists pages that return 200, are not `noindex`, and canonicalise to
   themselves. Sample up to 50 URLs.
4. **Pick the pages to audit.** The home page, every priority page from the
   brand file, then a sample from the sitemap across its sections, up to 25
   pages in total. Tell the user which pages you picked and why. They can ask
   for more.

## 3. Page checks

Run every check in [references/page-checks.md](references/page-checks.md) on
each audited page. Then compare across pages: duplicate titles, duplicate
meta descriptions, duplicate H1s, and pages that canonicalise elsewhere.

## 4. Core Web Vitals

For the home page and the two most important priority pages, call Google's
PageSpeed Insights API. Calls without a key share one daily quota with
everyone else and are often refused, so use the user's own key when they have
one (free from the Google Cloud console, in `PAGESPEED_API_KEY`):

```sh
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fexample.com%2F&strategy=mobile&category=performance&key=$PAGESPEED_API_KEY" -o psi-home.json
```

- With no key, try once without `&key=`. If Google answers 429 (quota
  exceeded), do not retry: say Core Web Vitals were not measured, and tell the
  user how to get a key. If Agent Number 10 is connected and measures this
  site, `get_lighthouse` returns its latest Lighthouse results and Core Web
  Vitals per page; say which date they are from.
- Report field data from real Chrome users first (`loadingExperience.metrics`):
  LCP is good at 2.5 s or less, INP at 200 ms or less, CLS at 0.1 or less.
- If there is no field data, say so, and report the lab numbers from
  `lighthouseResult` as lab numbers.
- Name the largest problems Lighthouse lists for each page (render-blocking
  resources, unsized images, large JavaScript), with their estimated savings.

## 5. Checks that depend on the site

Run these only when they apply, and say which ones you ran:

- **Local business** (an address, service areas or opening hours on the site):
  `LocalBusiness` structured data with name, address and telephone that match
  the visible page; the same name, address and phone on every page that shows
  them.
- **E-commerce** (product or category pages): `Product` structured data with
  `offers` (price, currency, availability); category pagination that does not
  canonicalise every page to page 1; out-of-stock pages that still return 200.
- **More than one language or country:** `hreflang` on every version, pointing
  both ways, with valid codes, a self reference and an `x-default`.
- **Articles or a blog:** an author with a name and a page about them, a
  published and an updated date, and `Article` structured data that matches.

## 6. Trust signals

Check that the site has an about page, a contact page, and the policies its
type of business needs (privacy, terms, returns or refunds for shops). Note
reviews or testimonials and whether they say where they come from.

## 7. Write the fix list

Save it as `.agents/audits/seo-<domain>-<YYYY-MM-DD>.md`. Start with a short
summary: pages audited, findings by severity, and the three changes that would
help most. Then one block per finding, highest severity first:

```markdown
### SEO-01 Pages missing a meta description (medium)

- Pages: https://example.com/pricing, https://example.com/about
- Evidence: no `<meta name="description">` in the fetched HTML
- Why it matters: search engines write their own snippet, often from the
  wrong part of the page
- Change: add a description of 120 to 160 characters that says what the page
  offers, different on each page
- Passes when: each page has exactly one meta description, 70 to 160
  characters, and no two audited pages share one
```

Severity:

- **High**: stops pages being crawled, indexed or shown (noindex by mistake,
  blocked in robots.txt, 4xx or 5xx, canonical to the wrong page, redirect
  loops), or affects the whole site.
- **Medium**: weakens how pages rank or show (titles, descriptions, structured
  data errors, slow Core Web Vitals, duplicate content).
- **Low**: polish (alt text, Open Graph, minor heading order).

Every `Passes when` must be something `verify-fix` can test by fetching the
live page. Avoid "improve" or "optimise": say what is there when it is done.

## Rules

- Report only what you fetched. Quote the evidence. If a check could not run
  (a page timed out, the API refused), say so instead of guessing.
- Do not estimate traffic, rankings or revenue. This audit does not measure
  them.
- Do not change anything on the site. Fixing is `seo-fix`.

When the list is saved, offer the next steps: `seo-fix` to make the changes,
and `aeo-audit` if the user also cares about AI answers.
