# Language and region codes

## How a code is built

| Part | Standard | Example | Required |
| --- | --- | --- | --- |
| Language | ISO 639-1, two letters | `de`, `ja`, `pt` | Yes |
| Script | ISO 15924, four letters | `zh-Hant`, `sr-Latn` | No; only for languages written in more than one script |
| Region | ISO 3166-1 alpha-2, two letters | `de-AT`, `pt-BR`, `en-GB` | No |
| `x-default` | Not a language | `x-default` | Recommended, once per set |

Parts are joined with a hyphen, never an underscore. Case does not matter in
hreflang (`en-gb` and `en-GB` are the same). The same codes work in
`<html lang>`. `og:locale` is the exception: Open Graph writes `en_GB`, with
an underscore, and that is correct there.

## Codes that are often wrong

| Written | Problem | Write instead |
| --- | --- | --- |
| `en-UK` | `UK` is not the region code for the United Kingdom | `en-GB` |
| `en_GB` | Underscore | `en-GB` |
| `uk` for the United Kingdom | `uk` is Ukrainian | `en-GB` |
| `ua` | A country (Ukraine), not a language | `uk`, or `uk-UA` |
| `jp` | A country (Japan) | `ja`, or `ja-JP` |
| `cn` | A country (China) | `zh-CN`, or `zh-Hans` |
| `kr` | A country (South Korea) | `ko`, or `ko-KR` |
| `dk` | A country (Denmark) | `da`, or `da-DK` |
| `se` for Swedish | `se` is Northern Sami | `sv`, or `sv-SE` |
| `cz` | A country (Czechia) | `cs`, or `cs-CZ` |
| `gr` | A country (Greece) | `el`, or `el-GR` |
| `be` for Belgium | `be` is Belarusian | `nl-BE`, `fr-BE` |
| `ca` for Canada | `ca` is Catalan | `en-CA`, `fr-CA` |
| `br` for Brazil | `br` is Breton | `pt-BR` |
| `ch` for Switzerland | `ch` is Chamorro | `de-CH`, `fr-CH`, `it-CH` |
| `at`, `us`, `in` | A country alone is not a language | `de-AT`, `en-US`, `en-IN` or `hi-IN` |
| `es-LA` | `LA` is Laos | A version per country (`es-MX`, `es-AR`), or `es` |
| `en-EU` | `EU` is not a country | A version per country, or `en` with `x-default` |
| `eu` for Europe | `eu` is Basque | There is no code for Europe |
| `x-default` on two URLs | One per set | Pick one |

## A complete set, three ways

In the `<head>` of every page in the set, the same list on each:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/pricing">
<link rel="alternate" hreflang="de" href="https://example.com/de/preise">
<link rel="alternate" hreflang="x-default" href="https://example.com/en/pricing">
```

In an HTTP header, for PDFs and other files:

```text
Link: <https://example.com/en/guide.pdf>; rel="alternate"; hreflang="en", <https://example.com/de/leitfaden.pdf>; rel="alternate"; hreflang="de"
```

In the XML sitemap, inside every `<url>` of the set, with
`xmlns:xhtml="http://www.w3.org/1999/xhtml"` on the `<urlset>`:

```xml
<url>
  <loc>https://example.com/de/preise</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/pricing"/>
  <xhtml:link rel="alternate" hreflang="de" href="https://example.com/de/preise"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/en/pricing"/>
</url>
```

Every URL in a set returns 200, is canonical to itself, and lists the same
set back.
