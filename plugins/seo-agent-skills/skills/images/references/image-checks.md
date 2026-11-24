# Image checks

## Which images to check

Decide this for every image before running any check on it. Go down the table
and stop at the first row that matches.

| The image | Signs in the HTML | Check it? |
| --- | --- | --- |
| A tracking pixel | `width` or `height` of `1` or `0`; `hidden`, `display:none` or `visibility:hidden`; often inside `<noscript>` with a long query string | No |
| A spacer | A tiny transparent image used only for layout | No |
| A lazy-loading placeholder | A tiny `src` (often `data:image/...`) with the real address in `data-src`, `data-srcset` or `data-lazy-src` | Yes: judge the real image |
| Marked decorative | `alt=""`, `role="presentation"` or `role="none"`, `aria-hidden="true"` on it or an element around it | No, unless it is the main product photo or the page's structured data `image` |
| An icon inside a labelled link or button | The `<a>` or `<button>` has visible text or an `aria-label` | No |
| The only content of a link | An `<a>` with the image and no other text (a logo, a linked product photo) | Yes: its alt is the link's text |
| A logo | In the header or footer, often linking to the home page | Yes: the brand name as the site writes it |
| Anything else in the main content | Product photos, article images, charts, screenshots, team photos | Yes |

## Checks for content images

| Check | Passes when |
| --- | --- |
| Alt present | The `alt` attribute is there and not empty |
| Alt describes the image | In the page's language, it says what the image shows; it is not the file name, a URL, only digits, or one generic word for "image" |
| Alt is specific | Different images have different alt text; the page title is not repeated on every image |
| Alt is not stuffed | A short sentence or phrase, not a keyword list; no more than a sentence or two |
| Width and height | Both set, with roughly the image's own aspect ratio, or the image fills a sized container |
| Format | Served as `image/avif` or `image/webp` to a browser `Accept` header, or offered through `<picture>` sources; SVG for logos and icons |
| File size | Reported in bytes; a photo over 200 KB, or more than twice as wide as shown with no smaller `srcset` candidate, is flagged as a rule of thumb |
| Responsive | Large images have a `srcset` with several widths and a `sizes` that matches the layout |
| Likely LCP image | No `loading="lazy"` and no lazy-loading `data-src`; `fetchpriority="high"` or a `<link rel="preload" as="image">` helps |
| Below the fold | `loading="lazy"`, with the real address in `src` |
| Loads | The image URL returns 200 with an image `Content-Type` |
| Crawlable | Its path is not disallowed in the image host's robots.txt |
| Not only a CSS background | Images that matter to search are `<img>` elements, not only `background-image` |
| File name | Words that describe the image, separated by hyphens, not a camera or tool default |

## Reading what you downloaded

- `Content-Type` in the headers file is the format actually served. The file
  extension in the URL can differ: an image service may send WebP for a URL
  ending in `.jpg`.
- `Vary: Accept` in the headers means the server picks the format from the
  `Accept` header, so a request without the browser header can get a
  different file.
- `file .agents/audits/raw/img-home-hero.bin` prints the type and, for JPEG,
  PNG, GIF and WebP, the pixel size. If it does not print a size, say the
  size was not read rather than guessing it.
