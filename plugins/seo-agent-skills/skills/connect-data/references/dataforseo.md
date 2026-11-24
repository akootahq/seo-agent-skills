# DataForSEO, on the user's own account

Serves `keyword-research`, `content-brief` and `local-seo` (keyword, Google
results and Google Maps data) and `backlinks` (the Backlinks API). Calls are
billed to the user's DataForSEO account. Three ways in, one account: choose
one with the user.

## The hosted MCP server, with sign-in

No keys to handle: the user signs in to DataForSEO in the browser.

- **Claude Code:** add it, then run `/mcp`, choose `dataforseo` and sign in.

  ```sh
  claude mcp add --transport http dataforseo https://mcp.dataforseo.com/v3/mcp
  ```

- **Codex:** add it to `~/.codex/config.toml`, then sign in with
  `codex mcp login dataforseo`.

  ```toml
  [mcp_servers.dataforseo]
  url = "https://mcp.dataforseo.com/v3/mcp"
  ```

- **Cursor:** add `"dataforseo": { "url": "https://mcp.dataforseo.com/v3/mcp" }`
  under `mcpServers` in `~/.cursor/mcp.json`, then sign in when Cursor asks.

## The local MCP server, with the API login

The official server, `dataforseo-mcp-server`
(https://github.com/dataforseo/mcp-server-typescript), runs on the user's
machine (it needs Node.js) and reads `DATAFORSEO_LOGIN` and
`DATAFORSEO_PASSWORD` from its environment.

1. The user sets the two variables (see "Setting a variable" in the skill).
   The API login and password are at https://app.dataforseo.com/api-access.

   ```sh
   export DATAFORSEO_LOGIN="the API login"
   export DATAFORSEO_PASSWORD="the API password"
   ```

2. Add the server so that it reads the two variables by name. The user
   follows the setup for their agent in DataForSEO's own instructions
   (https://github.com/dataforseo/mcp-server-typescript) or in this
   repository's guide (https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/dataforseo.md),
   which has the exact entry for Claude Code, Codex and Cursor. Never put
   the login or password in the entry itself: it reads them from the
   environment.

3. Restart the agent.

## The API, with the API login

No server: the data skills call the API with `curl`, reading the same two
variables, in any agent that can run commands. The user sets the variables
as above and restarts the agent.

## Check

1. For the local server or the API, check the variables are set. This prints
   only "set" or "not set":

   ```sh
   test -n "$DATAFORSEO_LOGIN" && test -n "$DATAFORSEO_PASSWORD" && echo set || echo "not set"
   ```

2. For an MCP server, list its tools (`/mcp` in Claude Code and Codex; the
   MCP settings in Cursor). The current DataForSEO server has a general
   request tool, `api_request`, beside its documentation tools.
3. A tool list shows the server started, not that the login works. Make one
   free call, the locations list, which the data skills also need:
   - With the MCP server: `api_request` with `method: "GET"` and `path:
     "/v3/dataforseo_labs/locations_and_languages"`.
   - With the API: run `mkdir -p .agents/data` once, then:

     ```sh
     curl -sS -u "$DATAFORSEO_LOGIN:$DATAFORSEO_PASSWORD" https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages -o .agents/data/locations.json
     ```

   A `status_code` of 20000 means connected. Anything else: report its
   `status_message` as given.

The Backlinks API is part of the same account. If a backlinks call answers
that the account cannot use it, pass the message on as given and point the
user to DataForSEO's pricing page.

## Disconnect

- **Hosted server:** `claude mcp remove dataforseo` (Claude Code);
  `codex mcp logout dataforseo`, then `codex mcp remove dataforseo` (Codex);
  remove it in Cursor's MCP settings.
- **Local server or API:** remove the server the same way, and delete the
  two `export` lines from the shell profile.
- To end access for good, change the API password at
  https://app.dataforseo.com/api-access.
