# Ahrefs, on the user's own account

Serves `keyword-research` and `content-brief` (keywords, what a domain
ranks for, organic competitors, the results page) and `backlinks`
(referring domains, new and lost links, broken backlinks). Calls spend the
monthly API units of the user's Ahrefs plan. Two ways in:

- **Ahrefs' MCP server**, at `https://api.ahrefs.com/mcp/mcp`, with sign-in
  in the browser. Ahrefs offers it on paid plans from Lite upward.
- **The Ahrefs API (v3)**, with a key, on the plans that include API access.

Ahrefs' older local server, `@ahrefs/mcp`
(https://github.com/ahrefs/ahrefs-mcp-server), is archived. Ahrefs says it is
no longer maintained, works only with API v3 keys and not with MCP keys, and
does not recommend it. Do not set it up.

## The MCP server, with sign-in

- **Claude Code**, as Ahrefs documents it: add the server, run `/mcp`,
  choose `ahrefs`, authenticate, log in to Ahrefs, choose the workspace and
  click **Allow**.

  ```sh
  claude mcp add ahrefs https://api.ahrefs.com/mcp/mcp -t http
  ```

- **Codex:** add it to `~/.codex/config.toml`, then sign in with
  `codex mcp login ahrefs`.

  ```toml
  [mcp_servers.ahrefs]
  url = "https://api.ahrefs.com/mcp/mcp"
  ```

- **Cursor:** add `"ahrefs": { "url": "https://api.ahrefs.com/mcp/mcp" }`
  under `mcpServers` in `~/.cursor/mcp.json`, then sign in when Cursor asks.

Ahrefs documents the Claude Code steps; the Codex and Cursor entries are each
agent's own setup for a remote server with sign-in. If sign-in fails there,
check Ahrefs' docs (https://docs.ahrefs.com/en/mcp/docs/introduction).

Approving the sign-in adds a key tagged `MCP` to the Ahrefs account, with a
monthly unit limit that workspace admins can change in **Account settings**,
**API keys**. Ahrefs also lets the user create an MCP key by hand for an
agent that cannot sign in; for how that agent sends it, check Ahrefs' docs.

**When the agent caps the number of tools.** The server offers many tools.
Its address takes a `tools` parameter that limits them to named groups. For
these skills:

```text
https://api.ahrefs.com/mcp/mcp?tools=site-explorer-overview,site-explorer-reports,keywords-explorer,serp-overview,subscription-info
```

Ahrefs rejects a group name it does not know, with `invalid tool category`.

## The API, with a key

1. A workspace owner or admin creates a key in **Account settings**, **API
   keys** (https://app.ahrefs.com/account/api-keys), with an expiry date.
   Ahrefs suggests setting a usage limit on the key.
2. The user puts it in `AHREFS_API_KEY` in their shell profile (see "Setting
   a variable" in the skill):

   ```sh
   export AHREFS_API_KEY="the Ahrefs API key"
   ```

3. Restart the agent. The skills call `https://api.ahrefs.com/v3/...` with
   the header `Authorization: Bearer $AHREFS_API_KEY`.

## Check

- **MCP server:** list its tools (`/mcp`), then call the subscription
  limits tool (`limits-and-usage`; Ahrefs' reference marks it free).
- **API:** check the variable, run `mkdir -p .agents/data` once, then make
  the same free call:

  ```sh
  test -n "$AHREFS_API_KEY" && echo set || echo "not set"
  ```

  ```sh
  curl -sS -H "Authorization: Bearer $AHREFS_API_KEY" https://api.ahrefs.com/v3/subscription-info/limits-and-usage -o .agents/data/ahrefs-limits.json
  ```

A JSON answer with the limits means connected: say "connected" and nothing
else from it, no limits or usage. An error: pass on Ahrefs' message as
given.

## Disconnect

- **Claude Code:** `/mcp`, then **Clear authentication**; or
  `claude mcp logout ahrefs`, then `claude mcp remove ahrefs`.
- **Codex:** `codex mcp logout ahrefs`, then `codex mcp remove ahrefs`.
- **Cursor:** remove the server in Cursor's MCP settings.
- **API:** delete the `export` line from the shell profile.
- In Ahrefs, **Account settings**, **API keys**: delete the MCP key or the
  API key to end access for good.
