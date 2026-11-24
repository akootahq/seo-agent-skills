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
curl -sS -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" -H "Content-Type: application/json" -X POST https://api.dataforseo.com/v3/serp/google/organic/live/advanced -d '[{"keyword":"best running shoes for flat feet","location_code":2840,"language_code":"en","depth":10}]' -o .agents/data/2026-11-24-serp-01.json
```

**With treg's API:** the same body, at the same path after `/v3/`:

```sh
curl -sS -H "x-treg-token: $TREG_TOKEN" -H "Content-Type: application/json" -X POST https://treg.to/call/dataforseo/serp/google/organic/live/advanced -d '[{"keyword":"best running shoes for flat feet","location_code":2840,"language_code":"en","depth":10}]' -o .agents/data/2026-11-24-serp-01.json
```

- One command per line, as above. The variables keep the credentials out of
  the command and out of the chat: never write the values in their place,
  and never print them.
- A query with an apostrophe breaks the single quotes. Write the body to a
  file instead, for example `.agents/data/2026-11-24-serp-01-request.json`,
  and pass `-d @.agents/data/2026-11-24-serp-01-request.json`.
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
  and the bids): they describe search ads, not organic results.

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
| `serp/google/organic/live/advanced` | `keyword` (the query), `location_code`, `language_code`, `depth: 10`, `device` (`mobile` if most searchers use phones) | `item_types`: the features on the page. `items`, by `type`: `organic` (position `rank_group`, `domain`, `url`, `title`, `description`); `people_also_ask` (each question); `ai_overview` (its text and the sources it links), where Google shows them |
| `dataforseo_labs/google/keyword_ideas/live` | `keywords` (the query), `location_code`, `language_code`, `limit: 50`, `closely_variants: true` (phrases that contain the query) | `items`: `keyword`, `keyword_info.search_volume`, `search_intent_info.main_intent` |
| `keywords_data/google_ads/search_volume/live` | `keywords` (the query and its close variants), `location_code`, `language_code` | each keyword's search volume and monthly searches |
| `dataforseo_labs/google/bulk_keyword_difficulty/live` | `keywords`, `location_code`, `language_code` | each keyword's difficulty, 0 to 100 |
| `dataforseo_labs/google/ranked_keywords/live` (optional) | `target` (the site's domain, without `https://`), `location_code`, `language_code`, `limit` | whether the site ranks for the query, with its position and the URL |

The People Also Ask questions and the AI Overview are what Google showed for
this query, in this market, on this date. Quote them as that, with the date,
and keep quotes short.

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
curl -sS -G https://api.ahrefs.com/v3/serp-overview/serp-overview -H "Authorization: Bearer $AHREFS_API_KEY" --data-urlencode "keyword=best running shoes for flat feet" --data-urlencode "country=us" --data-urlencode "top_positions=10" --data-urlencode "select=position,url,title,type,domain_rating,update_date" -o .agents/data/2026-11-24-ahrefs-serp-01.json
```

A 429 means too many requests: wait a minute, once. Any other error: pass on
Ahrefs' message as given, and do not retry in a loop.

| Report | Inputs | Columns to select |
| --- | --- | --- |
| `serp-overview/serp-overview` | `keyword` (the query), `country`, `top_positions=10` | `position`, `url`, `title`, `type`, `domain_rating`, `update_date` |
| `keywords-explorer/matching-terms` | `keywords` (the query), `country`, `limit=50`, `terms=questions` for questions | `keyword`, `volume`, `difficulty`, `intents` |
| `keywords-explorer/overview` | `keywords` (the query and its close variants, comma-separated), `country` | `keyword`, `volume`, `difficulty`, `intents` |
| `site-explorer/organic-keywords` (optional) | `target` (the site's domain), `mode=subdomains`, `country`, `date` (today, `YYYY-MM-DD`), `limit` | `keyword`, `best_position`, `best_position_url` |

`country` is the two-letter code in lower case (`us`, `gb`, `de`). The
results page is the one Ahrefs stored on its `update_date`, in that
country: quote it as that, with the date.
