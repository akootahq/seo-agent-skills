# Bing Webmaster API calls

The calls behind `bing-webmaster`, from Microsoft's Bing Webmaster API
reference (https://learn.microsoft.com/en-us/bingwebmaster/ and the
`IWebmasterApi` method pages it links). The API is free with the user's own
key.

## Making a call

- Base URL: `https://ssl.bing.com/webmaster/api.svc/json/<Method>`.
  Microsoft set the SOAP and POX forms to retire on 31 August 2026 and
  points users to this JSON form.
- The key goes in the `apikey` query parameter. Read methods are GET with
  query parameters; submit methods are POST with a JSON body.
- Run `mkdir -p .agents/data/bing` once before the first call: curl does not
  create the folder.
- Pass every query value with `--data-urlencode`, so addresses are encoded
  for you. `-G` turns those values into the query string of a GET.
- The variable keeps the key out of the command and out of the chat. Never
  write the key in its place, never add `-v` or `--trace` (they print the
  address, key included), and never print the variable.
- One command per line, at most one per second. Name each file with the date
  (today's), what it holds and a number, so a later run does not overwrite
  it.

```sh
curl -sS -G https://ssl.bing.com/webmaster/api.svc/json/GetUserSites --data-urlencode "apikey=$BING_WEBMASTER_API_KEY" -o .agents/data/bing/2026-11-24-sites.json
```

```sh
curl -sS -G https://ssl.bing.com/webmaster/api.svc/json/GetQueryStats --data-urlencode "siteUrl=https://example.com/" --data-urlencode "apikey=$BING_WEBMASTER_API_KEY" -o .agents/data/bing/2026-11-24-queries.json
```

`siteUrl` is the site exactly as `GetUserSites` lists it in `Url`.

**A second address or query.** Microsoft's JSON samples write the second
value of a call (`url`, `page`, `query`, `link`) as a JSON string, inside
double quotes, while `siteUrl` stays plain. Do the same: wrap the value in
single quotes for the shell, with the double quotes inside.

```sh
curl -sS -G https://ssl.bing.com/webmaster/api.svc/json/GetUrlInfo --data-urlencode "siteUrl=https://example.com/" --data-urlencode 'url="https://example.com/pricing"' --data-urlencode "apikey=$BING_WEBMASTER_API_KEY" -o .agents/data/bing/2026-11-24-urlinfo-01.json
```

**Submitting.** A POST, with the key in the address and the body in a file:

```sh
curl -sS -X POST "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=$BING_WEBMASTER_API_KEY" -H "Content-Type: application/json; charset=utf-8" -d @.agents/data/bing/2026-11-24-submit-request.json -o .agents/data/bing/2026-11-24-submit.json
```

with `.agents/data/bing/2026-11-24-submit-request.json` holding:

```json
{
  "siteUrl": "https://example.com/",
  "urlList": ["https://example.com/pricing", "https://example.com/blog/launch"]
}
```

## Reading a response

- The data is under `d`. A list method returns an array there; a single item
  returns an object; a submit returns `{"d":null}` with status 200.
- An error is HTTP 400 with a body such as
  `{"ErrorCode":3,"Message":"InvalidApiKey"}`. Pass on the `Message` as
  given, and do not retry in a loop.
- Dates look like `/Date(1316156400000-0700)/`: milliseconds since 1 January
  1970, then an offset. Convert them to a calendar date before you report.
- Each object has a `__type` field. Leave it out of everything you report.

## The methods

| Method | Parameters | What to read |
| --- | --- | --- |
| `GetUserSites` | none | each site's `Url` and `IsVerified`. The other fields are verification codes: never report them |
| `GetQueryStats` | `siteUrl` | top queries: `Query`, `Impressions`, `Clicks`, `AvgImpressionPosition`, `AvgClickPosition`, `Date`. Microsoft updates it weekly |
| `GetPageStats` | `siteUrl` | top pages, same fields; `Query` holds the page URL. Updated weekly |
| `GetQueryPageStats` | `siteUrl`, `query` | the pages Bing shows for one query, same fields |
| `GetPageQueryStats` | `siteUrl`, `page` | the queries one page is shown for, same fields |
| `GetCrawlStats` | `siteUrl` | one row per day for about the last 6 months: `CrawledPages`, `CrawlErrors`, `InIndex`, `InLinks`, `Code2xx`, `Code301`, `Code302`, `Code4xx`, `Code5xx`, `AllOtherCodes`, `BlockedByRobotsTxt`, `ContainsMalware`, `Date`. Updated daily |
| `GetCrawlIssues` | `siteUrl` | each URL with a problem: `Url`, `HttpCode`, `Issues` (a number, below), `InLinks`. A fixed issue can take a few days to leave the list |
| `GetUrlInfo` | `siteUrl`, `url` | one URL's index details: `HttpStatus`, `LastCrawledDate`, `DiscoveryDate`, `DocumentSize`, `AnchorCount`, `IsPage`, `TotalChildUrlCount`. `url` can also be `domain:example.com` |
| `GetLinkCounts` | `siteUrl`, `page` (0 for the first page of results) | the site's pages that have inbound links: `Links` (each `Url` and `Count`) and `TotalPages` |
| `GetUrlLinks` | `siteUrl`, `link` (one of the site's URLs), `page` | the pages linking to that URL: `Details` (each `Url` and `AnchorText`) and `TotalPages` |
| `GetUrlSubmissionQuota` | `siteUrl` | `DailyQuota` and `MonthlyQuota`: how many URLs can still be submitted |
| `SubmitUrl` | POST body: `siteUrl`, `url` | one URL submitted |
| `SubmitUrlBatch` | POST body: `siteUrl`, `urlList` | up to 500 URLs in one call, within the quota |

For `GetLinkCounts` and `GetUrlLinks`, ask for `page` 0, then 1 and so on
while it is below `TotalPages`. Each page is one call; say how many before
fetching more than the first.

## The crawl issue numbers

`Issues` is a sum of these flags, so one number can stand for several
issues: 36 is 32 + 4, malware and a 4xx.

| Value | Issue |
| --- | --- |
| 0 | None |
| 1 | Code301 |
| 2 | Code302 |
| 4 | Code4xx |
| 8 | Code5xx |
| 16 | BlockedByRobotsTxt |
| 32 | ContainsMalware |
| 64 | ImportantUrlBlockedByRobotsTxt |
| 128 | DnsErrors |
| 256 | TimeOutErrors |
