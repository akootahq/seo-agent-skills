# Backlink calls, by source

The calls behind each step of `backlinks`, from each provider's own API
reference. Ask before each batch, say how many calls, and never quote
prices or report a response's cost or units.

Run `mkdir -p .agents/data` once before the first call: curl does not
create the folder. Save every raw response there, named with the date
(today's), the source, what it holds and a number. One command per line.
The variables keep the credentials out of the command and out of the chat:
never write the values in their place, never add `-v` or `--trace`, and
never print them.

## Ahrefs

Reference: https://docs.ahrefs.com/llms.txt and the Site Explorer and
Competitive Analysis specs it links.

**Through Ahrefs' MCP server.** List its tools first. They follow the API's
report names (`refdomains`, `all-backlinks`, `broken-backlinks`,
`backlinks-stats` and so on); read each tool's input schema before the
first call. If your agent shows only `search`, `doc` and `exec`, use
`search` with a few words (for example "referring domains"), `doc` for the
operation's inputs, then `exec`. Save what each tool returns in
`.agents/data/` before you use it.

**Through the API.** Every call is a GET to
`https://api.ahrefs.com/v3/site-explorer/<report>` with the key as a bearer
token, the inputs as query parameters, and `select` listing the columns:

```sh
curl -sS -G https://api.ahrefs.com/v3/site-explorer/refdomains -H "Authorization: Bearer $AHREFS_API_KEY" --data-urlencode "target=example.com" --data-urlencode "mode=subdomains" --data-urlencode "select=domain,domain_rating,dofollow_links,links_to_target,first_seen,last_seen" --data-urlencode "order_by=domain_rating:desc" --data-urlencode "limit=100" --data-urlencode "history=live" -o .agents/data/2026-11-24-ahrefs-refdomains-01.json
```

Most calls spend the plan's API units, more for more rows and more columns.
Ask for the columns below and no others, and a `limit` of 100 unless the
user wants more. A 429 means too many requests: wait a minute, once. Any
other error: pass on Ahrefs' message as given.

| Step | Report | Inputs | Columns to select |
| --- | --- | --- | --- |
| 1. The profile | `backlinks-stats` | `target`, `mode=subdomains`, `date` (today, `YYYY-MM-DD`) | none: it returns the counts of live and all-time backlinks and referring domains |
| 2. Referring domains | `refdomains` | `target`, `mode=subdomains`, `history=live`, `order_by=domain_rating:desc`, `limit` | `domain`, `domain_rating`, `dofollow_links`, `links_to_target`, `first_seen`, `last_seen`, `is_spam` |
| 3. New and lost | `refdomains` | the same, with `history=since:<date 90 days ago>` | add `new_links`, `lost_links` |
| 3. The lost links themselves | `all-backlinks` | `target`, `mode=subdomains`, `history=since:<date>`, `limit` | `url_from`, `url_to`, `anchor`, `domain_rating_source`, `first_seen`, `last_seen`, `is_lost`, `lost_reason` |
| 4. Broken backlinks | `broken-backlinks` | `target`, `mode=subdomains`, `aggregation=1_per_domain`, `limit` | `url_from`, `url_to`, `anchor`, `http_code_target`, `domain_rating_source` |
| 5. Link gap | `refdomains` once for the site and once per competitor | as step 2 | `domain`, `domain_rating`, `links_to_target` |

Ahrefs' reference marks its Link Intersect report
(`competitive-analysis/link-intersect-refdomains`) as Enterprise only. On
other plans, compare the referring domain lists from step 5 yourself.

## DataForSEO

Reference: https://docs.dataforseo.com/v3/backlinks/overview/

Every call is a POST to `https://api.dataforseo.com/v3/backlinks/<endpoint>`
with one task in a JSON array. Through DataForSEO's MCP server, use
`api_request` with `method: "POST"`, `path: "/v3/backlinks/<endpoint>"` and
the body as `data`. With the API:

```sh
curl -sS -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" -H "Content-Type: application/json" -X POST https://api.dataforseo.com/v3/backlinks/referring_domains/live -d '[{"target":"example.com","limit":100,"order_by":["rank,desc"],"backlinks_status_type":"live"}]' -o .agents/data/2026-11-24-dataforseo-refdomains-01.json
```

`status_code` 20000 on the response and on `tasks[0]` means it worked;
anything else, pass on the `status_message` as given. The data is in
`tasks[0].result`. Domains go without `https://` or `www.`.

| Step | Endpoint | Body | What to read |
| --- | --- | --- | --- |
| 1. The profile | `summary/live` | `target`, `include_subdomains: true` | `backlinks`, `referring_domains`, `referring_main_domains`, `broken_backlinks`, `broken_pages`, `referring_domains_nofollow`, `rank` |
| 2. Referring domains | `referring_domains/live` | `target`, `limit`, `order_by: ["rank,desc"]`, `backlinks_status_type: "live"` | per domain: `domain`, `rank`, `backlinks`, `first_seen`, `lost_date`, `backlinks_spam_score` |
| 3. New and lost over time | `timeseries_new_lost_summary/live` | `target`, `date_from`, `date_to` (today), `group_range: "month"` | per period: `new_backlinks`, `lost_backlinks`, `new_referring_domains`, `lost_referring_domains` |
| 3. The lost links themselves | `backlinks/live` | `target`, `backlinks_status_type: "lost"`, `mode: "one_per_domain"`, `limit` | `url_from`, `domain_from`, `url_to`, `anchor`, `first_seen`, `last_seen`, `domain_from_rank` |
| 4. Broken backlinks | `backlinks/live` | `target`, `filters: ["is_broken", "=", true]`, `mode: "one_per_domain"`, `limit` | `url_from`, `url_to`, `url_to_status_code`, `anchor`, `domain_from_rank` |
| 5. Link gap | `domain_intersection/live` | `targets` (the competitors, keyed `"1"`, `"2"` and so on, up to 20), `exclude_targets` (the site's domain), `limit`, `order_by: ["1.backlinks,desc"]` | each item's `domain_intersection`: per competitor, the referring domain's `target`, `rank`, `backlinks`, `first_seen` |

`date_from` for the time series is no earlier than 2019-01-30. `rank` is on
DataForSEO's own scale (0 to 1000 by default): compare domains with each
other, never with another provider's rating.

With several competitors in `targets`, `domain_intersection` returns the
domains that link to all of them. For the domains that link to any one of
them, run it once per competitor.

## Bing Webmaster Tools

Free, for the user's own site only. The calls and their rules are in the
`bing-webmaster` skill's reference; in short:

```sh
curl -sS -G https://ssl.bing.com/webmaster/api.svc/json/GetLinkCounts --data-urlencode "siteUrl=https://example.com/" --data-urlencode "page=0" --data-urlencode "apikey=$BING_WEBMASTER_API_KEY" -o .agents/data/bing/2026-11-24-linkcounts-0.json
```

```sh
curl -sS -G https://ssl.bing.com/webmaster/api.svc/json/GetUrlLinks --data-urlencode "siteUrl=https://example.com/" --data-urlencode 'link="https://example.com/guide"' --data-urlencode "page=0" --data-urlencode "apikey=$BING_WEBMASTER_API_KEY" -o .agents/data/bing/2026-11-24-urllinks-01.json
```

`GetLinkCounts` gives the site's pages with inbound links and a count each;
`GetUrlLinks` gives the pages linking to one URL, with the anchor text. Both
return `TotalPages`: page 0 first, and ask before fetching more. Run
`mkdir -p .agents/data/bing` first.
