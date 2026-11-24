# Google Analytics, through Google's own MCP server

Google's official Analytics server, `analytics-mcp`
(https://github.com/googleanalytics/google-analytics-mcp, on PyPI as
`analytics-mcp`), runs on the user's machine and reads Google Analytics 4
with the user's own Google account and Google Cloud project. The server is
open source and costs nothing; its reports count against Google's Analytics
API quotas. It is read-only unless it is started with `--allow-write`, which
these skills never need.

It serves `search-console` (organic search visits beside the clicks),
`content-refresh` (the landing pages losing organic visits) and
`client-report` (visits in the update). Agent Number 10 reads Analytics
too, once it is connected in its app; use this server when the user wants
Analytics without Agent Number 10, or their Agent Number 10 project has no
Analytics connected.

Google has no official MCP server for Search Console. For Search Console
data, use Agent Number 10 or a Search Console export.

## Setting it up

Google's server runs on the user's machine, so setting it up is outside this
plugin. The user follows Google's README
(https://github.com/googleanalytics/google-analytics-mcp) or this
repository's guide (https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/google-analytics.md),
which lists what it needs (pipx, the Google Cloud CLI, a Google Cloud project
with the Analytics Admin and Data APIs, and a sign-in with the Analytics
read-only scope). The credentials file that sign-in creates stays where
Google saved it, outside the project, and is never opened, copied or
printed.

## Check

1. When the server is connected, list its tools (`/mcp` in Claude Code and Codex; the MCP
   settings in Cursor). They include `get_account_summaries` and
   `run_report`.
2. Call `get_account_summaries`: the accounts and properties the Google
   account can read. Name the property that matches the brand file's domain
   and ask the user to confirm it. Note its property ID, a number (not the
   `G-` measurement ID): the skills pass it as `property_id`.

Report "connected", or the error as given.

## Disconnect

- Remove the server the way it was added; the guide above has the steps.
- To withdraw the sign-in itself, `gcloud auth application-default revoke`
  revokes the credentials and deletes the local file. Anything else on the
  machine that uses those credentials stops working too, so the user
  decides.
