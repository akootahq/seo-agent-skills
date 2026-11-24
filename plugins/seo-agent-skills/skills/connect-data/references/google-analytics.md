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

## What the user needs

- pipx (https://pipx.pypa.io/stable/#install-pipx), with Python 3.10 or
  later.
- The Google Cloud CLI, `gcloud` (https://docs.cloud.google.com/sdk/docs/install).
- A Google Cloud project with two APIs enabled: the Google Analytics Admin
  API and the Google Analytics Data API
  (https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com
  and https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com).
- An OAuth client for a desktop app in that project, downloaded as a JSON
  file (Google's help: https://support.google.com/cloud/answer/15549257).
  Keep the file outside the project.
- A Google account that can read the site's Analytics property.

## Set it up

The user runs every step; do not run the sign-in for them.

1. Sign in with Application Default Credentials and the Analytics read-only
   scope, using the downloaded client file:

   ```sh
   gcloud auth application-default login --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform --client-id-file=PATH_TO_CLIENT_JSON
   ```

   It opens the browser. When it finishes it prints `Credentials saved to
   file: [PATH_TO_CREDENTIALS_JSON]`. That path is needed next.

2. Add Google's server with that path and the Google Cloud project ID, as
   Google's README describes
   (https://github.com/googleanalytics/google-analytics-mcp). This
   repository's guide (https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/google-analytics.md)
   has the exact entry for Claude Code, Codex and Cursor.

3. Restart the agent.

The two values are a file path and a project ID, not secrets, so they can
sit in the agent's settings. The credentials file they point to holds the
sign-in: it stays where `gcloud` saved it, outside the project, and is never
opened, copied or printed.

On macOS, if calls fail with `Failed to resolve analyticsadmin.googleapis.com`
while the address resolves in the terminal, Google's troubleshooting guide
adds `GRPC_DNS_RESOLVER=native` to the server's environment.

## Check

1. List the server's tools (`/mcp` in Claude Code and Codex; the MCP
   settings in Cursor). They include `get_account_summaries` and
   `run_report`.
2. Call `get_account_summaries`: the accounts and properties the Google
   account can read. Name the property that matches the brand file's domain
   and ask the user to confirm it. Note its property ID, a number (not the
   `G-` measurement ID): the skills pass it as `property_id`.

Report "connected", or the error as given.

## Disconnect

- **Claude Code:** `claude mcp remove analytics-mcp`.
- **Codex:** `codex mcp remove analytics-mcp`.
- **Cursor:** remove the server in Cursor's MCP settings.
- To withdraw the sign-in itself, `gcloud auth application-default revoke`
  revokes the credentials and deletes the local file. Anything else on the
  machine that uses those credentials stops working too, so the user
  decides.
