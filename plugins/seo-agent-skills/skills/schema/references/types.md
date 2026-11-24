# Structured data types

Which type each page needs, what each type must hold, and how each value is
written. Values must always match what the page shows.

## Structured data by page type

| The page is | Use | Notes |
| --- | --- | --- |
| The home page | `Organization` (or the most specific `LocalBusiness` subtype for a local business) and `WebSite` | Describe the organisation once, here, with an `@id`; other pages refer to it |
| The about page | The same `Organization`, or `AboutPage` with it as `mainEntity` | Do not describe it a second time with different values |
| The contact page | `Organization` with `contactPoint`, or the `LocalBusiness` | Only the contact details the page shows |
| An article, blog post or news story | `Article`, `BlogPosting` or `NewsArticle`, plus `BreadcrumbList` | One per article page |
| An author or team member page | `ProfilePage` with a `Person` as `mainEntity` | Articles point `author.url` here |
| A product someone can buy | `Product` with an `Offer` | One product per page; variants as several offers, or `ProductGroup` with `hasVariant` |
| A category or listing of many products | `BreadcrumbList`; `CollectionPage` or `ItemList` if wanted | Never one `Product` for the whole list |
| A physical location or store | The most specific `LocalBusiness` subtype (`Dentist`, `Restaurant`, `Store`) | The address of this location, not the head office |
| An event | `Event` | One per event, each with its own date |
| A recipe | `Recipe` | |
| A page built around one video | `VideoObject` | |
| A job opening | `JobPosting` | Remove it, or set `validThrough`, when the job closes |
| Software or an app | `SoftwareApplication` (or `WebApplication`, `MobileApplication`) | Google's result needs a rating or reviews; leave them out if the page shows none |
| Questions and answers the site wrote | `FAQPage` | Only questions and answers on the page, word for word |
| A question users answer, or a forum thread | `QAPage`, or `DiscussionForumPosting` | |
| A service | `Service` with `provider` pointing to the `Organization` | Valid, but no search feature uses it |
| Any page below the top level | `BreadcrumbList` | Matching the breadcrumb people see; with no visible breadcrumb, matching the page's place in the navigation (not a finding) |

## What each type needs

"Needs" holds every property Google's documentation lists as required for the
type's search feature. For `Article` and `Organization`, where it lists none,
it holds the ones this collection checks because snippets and answers use
them. "Also check" holds recommended properties worth adding when the page
shows them.

| Type | Needs | Also check |
| --- | --- | --- |
| `Organization` (home or about page) | `name`, `url`, `logo`, and `sameAs` links to the brand's real profiles | `legalName`, `address`, `contactPoint`, `telephone`, `email`; a `logo` of at least 112 by 112 pixels |
| `WebSite` (home page) | `name`, `url` | `alternateName` |
| `Article`, `BlogPosting`, `NewsArticle` | `headline`, `datePublished`, `dateModified`, `author` with a `name` | `author.url` to a page about the author, `image`, `publisher` |
| `Product` | `name`, `image`, `offers` with `price`, `priceCurrency`, `availability` | `description`, `brand`, `sku` or `gtin`, `hasMerchantReturnPolicy`, `shippingDetails`; `review` and `aggregateRating` only when the page shows them |
| `Offer` | `price`, `priceCurrency` | `availability`, `itemCondition`, `priceValidUntil`, `url` |
| `LocalBusiness` | `name`, `address`, `telephone`, and `openingHoursSpecification` if the page shows opening hours | `url`, `geo`, `image`, `priceRange` |
| `PostalAddress` | As many of `streetAddress`, `addressLocality`, `postalCode`, `addressCountry` as the page shows | `addressRegion` |
| `BreadcrumbList` | One `ListItem` per level with `position`, `name` and `item` (the last level may leave out `item`) | |
| `FAQPage` | `mainEntity` with one `Question` per question, each with `name` and `acceptedAnswer.text`, word for word from the page | |
| `QAPage` | `mainEntity`: a `Question` with `name`, `answerCount`, and `acceptedAnswer` or `suggestedAnswer` with `text` | `author`, `datePublished`, `upvoteCount` |
| `Event` | `name`, `startDate`, `location` (a `Place` with an `address`, or a `VirtualLocation` with a `url`) | `endDate`, `eventStatus`, `eventAttendanceMode`, `image`, `description`, `offers`, `organizer`, `performer` |
| `Recipe` | `name`, `image` | `author`, `datePublished`, `description`, `recipeIngredient`, `recipeInstructions`, `totalTime`, `recipeYield`, `nutrition.calories` |
| `VideoObject` | `name`, `thumbnailUrl`, `uploadDate` | `description`, `duration`, `contentUrl` or `embedUrl` |
| `JobPosting` | `title`, `description`, `datePosted`, `hiringOrganization`, `jobLocation` (for a remote job, `jobLocationType` `TELECOMMUTE` with `applicantLocationRequirements`) | `validThrough`, `employmentType`, `baseSalary`, `identifier`, `directApply` |
| `SoftwareApplication` | `name`, `offers.price` (`0` when the page says it is free) | `applicationCategory`, `operatingSystem`; `aggregateRating` or `review` only when the page shows them (Google's software result needs one, but their absence is not a finding) |
| `ProfilePage` | `mainEntity`: a `Person` or `Organization` with a `name` | `image`, `sameAs`, `description`, `dateModified` |
| `Person` (as an author) | `name` | `url`, `sameAs`, `jobTitle` |
| `Review` | `author` with a `name`, `reviewRating.ratingValue`, and `itemReviewed` when it is not nested in the item | `datePublished`, `reviewRating.bestRating` |
| `AggregateRating` | `ratingValue`, `ratingCount` or `reviewCount`, and `itemReviewed` when it is not nested in the item | `bestRating`, `worstRating` |

Report a type that is missing where the page clearly needs it (a product page
without `Product`), and a block that does not parse, as separate findings.

## Value formats

| Property | Write it as | Not as |
| --- | --- | --- |
| Dates (`datePublished`, `dateModified`, `startDate`, `uploadDate`, `datePosted`) | ISO 8601: `2026-11-24`, or `2026-11-24T09:30:00+01:00` with a time zone | `24/11/2026`, `Nov 24, 2026` |
| `price` | A number with a dot for decimals: `14.90`, `1200` | `€14,90`, `1,200.00`, `from 10` |
| `priceCurrency` | An ISO 4217 code: `EUR`, `USD`, `INR` | `€`, `$`, `euro` |
| `availability` | A schema.org URL: `https://schema.org/InStock`, `OutOfStock`, `PreOrder`, `BackOrder` | `in stock`, `yes` |
| `addressCountry` | An ISO 3166-1 two-letter code: `DE`, `IN` | A country name works, but the code is safer |
| `telephone` | With the country code: `+49 30 1234567` | `030 1234567` |
| `url`, `image`, `logo`, `item`, `sameAs` | Absolute URLs that return 200 | `/images/logo.png` |
| `inLanguage` | The same code as `<html lang>`: `de`, `en-GB` | `German` |
| `duration`, `totalTime`, `cookTime` | ISO 8601 durations: `PT1H30M` | `90 minutes` |
| `ratingValue` | A number between `worstRating` and `bestRating` (1 and 5 unless stated) | `4.5 stars` |
| `@type` and property names | The exact schema.org spelling and case | `Organisation`, `localBusiness` |

## Errors that stop a block being read

- The block is not valid JSON: a trailing comma, a comment, an unescaped
  double quote, typographic quotes instead of straight ones, or two objects
  with no array around them.
- `@context` is missing or misspelled.
- The `<script>` has another type, such as `application/json` or
  `text/json`: only `application/ld+json` is read as JSON-LD.

One more error does not stop the block but garbles it: HTML entities copied
from the page (`&amp;`, `&quot;`). Inside a `<script>` they are not decoded,
so the value reads `Smith &amp; Sons`. Write the characters themselves.
