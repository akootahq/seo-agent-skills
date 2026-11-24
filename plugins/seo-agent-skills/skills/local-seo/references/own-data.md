# Your own DataForSEO or treg account

The calls behind the table in "With your own DataForSEO or treg account".
They are billed to the user's DataForSEO or treg account: ask before each
batch, say how many calls (one per grid point), and never quote prices.

## Making a call

Every endpoint is a POST under `https://api.dataforseo.com/v3/`, except the
locations list (a GET). One task per request: the body is a JSON array with
one object, so a grid of 25 points is 25 requests.

Run `mkdir -p .agents/data` once before the first call: curl does not create
the folder.

**With an MCP tool** (DataForSEO's or treg's): use the server's tool for the
endpoint. Some servers have one tool per endpoint, named after it (for
example the Maps results tool). DataForSEO's current server has one general
tool, `api_request`, that takes `method`, `path` (starting `/v3/`) and
`data` (the body). If unsure which tool matches, list the server's tools
first. Save what the tool returns in `.agents/data/` before you use it.

**With the DataForSEO API:**

```sh
curl -sS -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" -H "Content-Type: application/json" -X POST https://api.dataforseo.com/v3/serp/google/maps/live/advanced -d '[{"keyword":"dentist","location_coordinate":"51.5072000,-0.1276000,17z","language_code":"en","depth":20}]' -o .agents/data/2026-11-24-maps-r0c0.json
```

**With treg's API:** the same body, at the same path after `/v3/`:

```sh
curl -sS -H "x-treg-token: $TREG_TOKEN" -H "Content-Type: application/json" -X POST https://treg.to/call/dataforseo/serp/google/maps/live/advanced -d '[{"keyword":"dentist","location_coordinate":"51.5072000,-0.1276000,17z","language_code":"en","depth":20}]' -o .agents/data/2026-11-24-maps-r0c0.json
```

- One command per line, as above, and at most one per second. The variables
  keep the credentials out of the command and out of the chat: never write
  the values in their place, and never print them.
- A name with an apostrophe breaks the single quotes. Write the body to a
  file instead, for example `.agents/data/2026-11-24-find-01-request.json`,
  and pass `-d @.agents/data/2026-11-24-find-01-request.json`.
- Name each file with the date (today's), what it holds, and the grid row
  and column or a number, so a later run does not overwrite it.

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

## The market

The business profile takes the country's `location_code`. If
`.agents/data/locations.json` exists (`connect-data` saves it), read it.
Otherwise fetch the list, a free call on DataForSEO:

```sh
curl -sS -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages -o .agents/data/locations.json
```

## The endpoints

| Endpoint | Body | What to read |
| --- | --- | --- |
| `serp/google/maps/live/advanced` | `keyword` (the search, or the business name to find it), `location_coordinate` as "latitude,longitude,zoom", `language_code`, `depth: 20` | `items` of type `maps_search` (leave out `maps_paid_item`, the ads): `rank_group` (the position), `title`, `cid`, `place_id`, `address`, `phone`, `url`, `rating.value`, `rating.votes_count`, `category`, `is_claimed`, `latitude`, `longitude`, `local_justifications` (the line Google shows under a result) |
| `business_data/google/my_business_info/live` | `keyword` as `cid:<id>` (or `place_id:<id>`, or the business name), `location_code`, `language_code` | the `google_business_info` item: `title`, `category`, `additional_categories`, `address`, `phone`, `url`, `description`, `is_claimed`, `total_photos`, `rating`, `rating_distribution`, `place_topics` (topics in reviews), `attributes`, `services`, `work_time` (the opening hours), `people_also_search` |

## The grid

Work out each point's coordinates from the business's latitude and longitude
(from the business profile or the Maps result), the grid size `n` (3, 5 or
7) and the spacing `s` in kilometres. Row 0 is the northern edge and column
0 the western edge, as in step 8:

- latitude = centre latitude + ((n - 1) / 2 - row) × s / 111.32
- longitude = centre longitude + (column - (n - 1) / 2) × s / (111.32 ×
  cos(centre latitude))

For example, with n = 5 and s = 1, row 0 is 2 km north of the centre and
column 4 is 2 km east of it.

Keep at most 7 decimals, which is what the endpoint accepts. Use the same
zoom at every point, and on every later run (the endpoint uses `17z` when
none is given). Write each point's coordinates and the zoom in the fix list,
so the next run asks from the same places.

At each point, the business's position is the `rank_group` of the
`maps_search` item whose `cid` is the business's. No such item means it is
not in the top 20 there. The leader is the item with `rank_group` 1. Each
point's saved response already holds the whole order there, with ratings,
review counts and `local_justifications`, so step 8.4 needs no new call.
