# Your own DataForSEO, treg or Ahrefs account

The calls behind the tables in "With your own DataForSEO or treg account"
and "With your own Ahrefs account". They are billed to the user's own
account: ask before each batch, say how many calls, and never quote prices.
The Ahrefs calls are in the last section.

## Making a call

Every endpoint is a POST under `https://api.dataforseo.com/v3/`, except the
locations list (a GET). One task per request: the body is a JSON array with
one object. The examples use the United States in English (`location_code`
2840, `language_code` "en"); use the codes of the brand file's market.

Run `mkdir -p .agents/data` once before the first call: curl does not create
the folder.

**With an MCP tool** (DataForSEO's or treg's): use the server's tool for the
endpoint. Some servers have one tool per endpoint, named after it (for
example the Labs keyword ideas tool). DataForSEO's current server has one
general tool, `api_request`, that takes `method`, `path` (starting `/v3/`)
and `data` (the body). If unsure which tool matches, list the server's tools
first. Save what the tool returns in `.agents/data/` before you use it.

**With the DataForSEO API:**

```sh
curl -sS -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" -H "Content-Type: application/json" -X POST https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live -d '[{"keywords":["running shoes"],"location_code":2840,"language_code":"en","limit":50}]' -o .agents/data/2026-11-24-ideas-01.json
```

**With treg's API:** the same body, at the same path after `/v3/`:

```sh
curl -sS -H "x-treg-token: $TREG_TOKEN" -H "Content-Type: application/json" -X POST https://treg.to/call/dataforseo/dataforseo_labs/google/keyword_ideas/live -d '[{"keywords":["running shoes"],"location_code":2840,"language_code":"en","limit":50}]' -o .agents/data/2026-11-24-ideas-01.json
```

- One command per line, as above. The variables keep the credentials out of
  the command and out of the chat: never write the values in their place,
  and never print them.
- A keyword with an apostrophe breaks the single quotes. Write the body to a
  file instead, for example `.agents/data/2026-11-24-ideas-01-request.json`,
  and pass `-d @.agents/data/2026-11-24-ideas-01-request.json`.
- Name each file with the date (today's), what it holds and a number, so a
  later run does not overwrite it.

## Reading a response

- `status_code` 20000, at the top and on the task (`tasks[0].status_code`),
  means it worked. Anything else: pass on the `status_message` as given, and
  do not retry in a loop. treg answers 402 with `insufficient_balance` when
  the balance is empty.
- The data is in `tasks[0].result`. The field names below are from
  DataForSEO's documentation of the full response. An MCP tool may return a
  shorter form, so open the saved response and match the fields by meaning
  before you report.
- Every response has a `cost` field. Leave it out of everything you report,
  and never add it up.
- Leave out the advertiser fields (`cpc`, `competition`, `competition_level`
  and the bids), as step 6 says.

## The market

If `.agents/data/locations.json` exists (`connect-data` saves it), read it.
Otherwise fetch the list, a free call on DataForSEO:

```sh
curl -sS -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages -o .agents/data/locations.json
```

Find the brand file's country in it: its `location_code`, and the code of
the market's language.

## The endpoints

| Endpoint | Body | What to read |
| --- | --- | --- |
| `dataforseo_labs/google/keyword_ideas/live` | `keywords` (up to 200 seeds), `location_code`, `language_code`, `limit` (50 unless the user wants more); `closely_variants: true` for phrases that contain the seeds | `items`: `keyword`, `keyword_info.search_volume`, `keyword_info.monthly_searches`, `keyword_properties.keyword_difficulty`, `search_intent_info.main_intent` |
| `dataforseo_labs/google/ranked_keywords/live` | `target` (the domain, without `https://`), `location_code`, `language_code`, `limit` | each keyword with its volume, the domain's position and the URL that ranks |
| `keywords_data/google_ads/search_volume/live` | `keywords` (up to 1,000), `location_code`, `language_code` | each keyword's search volume and monthly searches |
| `dataforseo_labs/google/bulk_keyword_difficulty/live` | `keywords` (up to 1,000), `location_code`, `language_code` | each keyword's difficulty, 0 to 100 |
| `dataforseo_labs/google/competitors_domain/live` | `target`, `location_code`, `language_code`, `limit` | each competing domain, how many of the target's keywords it shares, and its average position |
| `serp/google/organic/live/advanced` | `keyword`, `location_code`, `language_code`, `depth: 10`, `device` | `items`, by `type`: `organic` (position `rank_group`, `domain`, `url`, `title`), and `people_also_ask` and `ai_overview` where Google shows them |

## The figures, by name

Step 6 uses Agent Number 10's names. In these responses they are:

| Step 6 | In the response |
| --- | --- |
| `searchVolume` | `search_volume` (inside `keyword_info` for keyword ideas); `null` means not reported, not zero |
| `difficulty` | `keyword_difficulty`, 0 to 100 |
| `intent` | `search_intent_info.main_intent`, for keyword ideas only |
| `monthlySearches` | `monthly_searches`, one entry per month with `year`, `month` and `search_volume` |

The rules in step 6 apply unchanged.

## Ahrefs

From Ahrefs' API reference (https://docs.ahrefs.com/llms.txt and the
Keywords Explorer, Site Explorer and SERP Overview specs it links).

**With Ahrefs' MCP server:** list its tools first. They follow the report
names below; read each tool's input schema before the first call. If your
agent shows only `search`, `doc` and `exec`, find the report with `search`,
read its inputs with `doc`, and run it with `exec`. Save what each tool
returns in `.agents/data/` before you use it.

**With the API:** every call is a GET to `https://api.ahrefs.com/v3/<tool>/<report>`
with the key as a bearer token and the inputs as query parameters. `select`
lists the columns, and every column costs units on every row, so ask for
the columns below and no others:

```sh
curl -sS -G https://api.ahrefs.com/v3/keywords-explorer/matching-terms -H "Authorization: Bearer $AHREFS_API_KEY" --data-urlencode "keywords=running shoes" --data-urlencode "country=us" --data-urlencode "select=keyword,volume,difficulty,intents,parent_topic" --data-urlencode "order_by=volume:desc" --data-urlencode "limit=50" -o .agents/data/2026-11-24-ahrefs-ideas-01.json
```

A 429 means too many requests: wait a minute, once. Any other error: pass on
Ahrefs' message as given, and do not retry in a loop.

| Report | Inputs | Columns to select |
| --- | --- | --- |
| `keywords-explorer/matching-terms` | `keywords` (the seeds, comma-separated), `country`, `limit` (50 unless the user wants more); `terms=questions` for questions only; `match_mode=phrase` to keep the seed's word order | `keyword`, `volume`, `difficulty`, `intents`, `parent_topic` |
| `keywords-explorer/related-terms` | `keywords`, `country`, `limit` | `keyword`, `volume`, `difficulty`, `intents` |
| `keywords-explorer/overview` | `keywords` (the list, comma-separated), `country` | `keyword`, `volume`, `difficulty`, `intents` |
| `site-explorer/organic-keywords` | `target` (the domain), `mode=subdomains`, `country`, `date` (today, `YYYY-MM-DD`), `limit`, `order_by=best_position:asc` | `keyword`, `volume`, `keyword_difficulty`, `best_position`, `best_position_url` |
| `site-explorer/organic-competitors` | `target`, `mode=subdomains`, `country`, `date` (today), `limit` | `competitor_domain`, `keywords_common`, `keywords_competitor`, `share` |
| `serp-overview/serp-overview` | `keyword`, `country`, `top_positions=10` | `position`, `url`, `title`, `type`, `domain_rating`, `update_date` |

`country` is the two-letter code in lower case (`us`, `gb`, `de`).
`intents` comes back as flags (informational, commercial, transactional,
navigational, branded, local): map them to step 6's intents, and keep more
than one when Ahrefs sets more than one.
