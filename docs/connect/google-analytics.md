# Connect Google Analytics, through Google's own MCP server

> New in 0.2.0. Written from Google's own documentation and not yet run end to end with a real account. If a step doesn't match what you see, [open an issue](https://github.com/akootahq/seo-agent-skills/issues).

Read your Google Analytics 4 reports with Google's official Analytics MCP
server, `analytics-mcp`
([googleanalytics/google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp),
on PyPI as `analytics-mcp`). It runs on your machine and signs in with your
own Google account.

## What you get

- Organic search visits and the landing pages they start on, beside your
  Search Console clicks (`search-console`).
- The landing pages losing organic visits, so they are refreshed first
  (`content-refresh`).
- Visits for the client update (`client-report`).

The server is read-only unless it is started with `--allow-write`, which
these skills never need. If your Agent Number 10 project already has
Analytics connected, the skills use that instead, and you need none of
this.

Google has no official MCP server for Search Console. For Search Console
data, use [Agent Number 10](agent-number-10.md) or a
[Search Console export](search-console-export.md).

## What it costs you

Nothing to pay: the server is open source, and it uses your own Google
account and your own Google Cloud project. Its reports count against
Google's Analytics API quotas for your property.

## Set it up

You need:

- [pipx](https://pipx.pypa.io/stable/#install-pipx), with Python 3.10 or
  later;
- the [Google Cloud CLI](https://docs.cloud.google.com/sdk/docs/install)
  (`gcloud`);
- a Google account that can read your site's Analytics property.

Then:

1. In a Google Cloud project, enable the
   [Google Analytics Admin API](https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com)
   and the
   [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com).
2. In the same project, create an OAuth client for a desktop app and
   download its JSON file ([Google's help](https://support.google.com/cloud/answer/15549257)).
   Keep the file outside your project.
3. Sign in with Application Default Credentials and the Analytics read-only
   scope:

   ```sh
   gcloud auth application-default login --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform --client-id-file=PATH_TO_CLIENT_JSON
   ```

   Your browser opens. When it finishes, `gcloud` prints
   `Credentials saved to file: [PATH_TO_CREDENTIALS_JSON]`. Copy that path.
4. Add the server, with that path and your Google Cloud project ID:

   - **Claude Code**, as Google documents it:

     ```sh
     claude mcp add analytics-mcp --scope user -e "GOOGLE_APPLICATION_CREDENTIALS=PATH_TO_CREDENTIALS_JSON" -e "GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID" -- pipx run analytics-mcp
     ```

   - **Codex**, in `~/.codex/config.toml`:

     ```toml
     [mcp_servers.analytics-mcp]
     command = "pipx"
     args = ["run", "analytics-mcp"]
     env = { GOOGLE_APPLICATION_CREDENTIALS = "PATH_TO_CREDENTIALS_JSON", GOOGLE_CLOUD_PROJECT = "YOUR_PROJECT_ID" }
     ```

   - **Cursor**, in `~/.cursor/mcp.json`:

     ```json
     {
       "mcpServers": {
         "analytics-mcp": {
           "command": "pipx",
           "args": ["run", "analytics-mcp"],
           "env": {
             "GOOGLE_APPLICATION_CREDENTIALS": "PATH_TO_CREDENTIALS_JSON",
             "GOOGLE_CLOUD_PROJECT": "YOUR_PROJECT_ID"
           }
         }
       }
     }
     ```

5. Restart your agent.

On macOS, if calls fail with `Failed to resolve analyticsadmin.googleapis.com`
while that address resolves in your terminal, Google's
[troubleshooting guide](https://github.com/googleanalytics/google-analytics-mcp/blob/main/TROUBLESHOOTING.md)
adds `GRPC_DNS_RESOLVER=native` to the server's environment.

## Check it works

Ask your agent to "check my Google Analytics connection". It calls
`get_account_summaries`, names the property that matches your site, and
asks you to confirm it. It uses that property's numeric ID (not the `G-`
measurement ID) from then on.

## Where your keys live

The agent settings hold only a file path and a project ID, which are not
secrets. The credentials file they point to holds your Google sign-in: it
stays where `gcloud` saved it, outside your project, and the skills never
open or print it.

## Disconnect

- **Claude Code:** `claude mcp remove analytics-mcp`.
- **Codex:** `codex mcp remove analytics-mcp`.
- **Cursor:** remove the server in Cursor's MCP settings.
- To withdraw the sign-in itself, run
  `gcloud auth application-default revoke`. It revokes the credentials and
  deletes the local file, so anything else on your machine that uses them
  stops working too.
