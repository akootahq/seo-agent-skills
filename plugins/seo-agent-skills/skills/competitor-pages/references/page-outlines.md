# Comparison page outlines

Write the headings and text in the site's language. The outlines give the
parts and their order, not the words.

## "x vs y"

1. **Title and h1**: the comparison as buyers phrase it, plus what decides it
   (for example, the product names and the main difference).
2. **The short answer** (40 to 80 words): who should choose which, and why,
   in a paragraph that makes sense on its own.
3. **Disclosure**: one sentence saying the page is written by the maker of
   one of the products.
4. **Comparison table**, in HTML:
   - a caption with the date the competitor's details were checked;
   - one row per thing buyers weigh (from the buyer questions and both
     products' own feature and pricing pages);
   - one column per product;
   - a source note in every competitor cell, linking to the sources list;
   - "not stated publicly" where a source has nothing, never a guess.
5. **Where the competitor is the better choice**: specific, sourced, and
   confirmed with the user.
6. **Where the user's product is the better choice**: specific, from the
   user's own pages.
7. **Who should choose which**: by situation (team size, the job to be done,
   the platform they use), not by a score.
8. **Pricing**: each product's prices as published, with currency, billing
   period, the market shown, the date checked and a link to the pricing page.
   "On request" where the page gives no price.
9. **Switching** (only if it applies): real steps, such as an import or an
   export the products document.
10. **Sources**: every source, with its checked-on date.
11. **Last checked** date, visible, and the same as `dateModified`.

## "alternatives to x"

1. **Title and h1**: alternatives to the product, as buyers phrase it.
2. **The short answer**: the main alternatives and who each suits, in one
   paragraph.
3. **Disclosure**, as above.
4. **Why people look elsewhere**: only reasons with a public source (the
   product's own pricing or changelog) or from the user's customer
   conversations, which the user confirms.
5. **The alternatives**: several real ones, not only the user's product. For
   each, a sourced summary, who it suits, and a link to its site.
6. **Comparison table**: the same rules as above, every cell sourced and
   dated.
7. **Sources** and **last checked** date.

## The claims ledger

Keep it at the end of each draft. It is the evidence for every claim, and the
list to check again when the page is refreshed.

| Claim on the page | Product | Source URL | Quoted from the source | Checked on | How read |
| --- | --- | --- | --- | --- | --- |
| Offers a free plan | competitor-one | https://competitor-one.com/pricing | the words exactly as the page writes them | YYYY-MM-DD | served HTML |
| Price of the entry plan | competitor-one | https://competitor-one.com/pricing | the price exactly as shown, with currency and period | YYYY-MM-DD | read in a browser |
| Exports to CSV | example | https://example.com/docs/export | the words exactly as the page writes them | YYYY-MM-DD | served HTML |

A claim with no row in the ledger does not go on the page.

## Structured data for the user's own product

Fill each value from what the page shows. Leave out any property the page
does not state, rather than guessing it.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://example.com/compare/competitor-one#page",
      "name": "the page title",
      "url": "https://example.com/compare/competitor-one",
      "dateModified": "YYYY-MM-DD",
      "publisher": { "@id": "https://example.com/#organization" },
      "about": { "@id": "https://example.com/#product" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://example.com/#product",
      "name": "Example",
      "url": "https://example.com/",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web"
    }
  ]
}
```

The `publisher` points at the site's `Organization` by its `@id`. If the page
does not already carry that `Organization` item (many sites add it to every
page in a shared layout), add it to the `@graph`.

Add `offers` to the product only with the price and currency the page shows.
Describe the competitor in the page text only: no `Product`,
`SoftwareApplication`, `Offer`, `Review` or `AggregateRating` for them.
