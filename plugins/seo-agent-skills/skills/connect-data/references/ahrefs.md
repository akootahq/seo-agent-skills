# Ahrefs, on the user's own account

Serves `keyword-research` and `content-brief` (keywords, what a domain
ranks for, organic competitors, the results page) and `backlinks`
(referring domains, new and lost links, broken backlinks). Calls spend the
monthly API units of the user's Ahrefs plan.

## Ahrefs' own MCP server

Ahrefs offers its own MCP server, with sign-in, on paid plans from Lite
upward. Setting it up is outside this plugin: the user follows Ahrefs' docs
(https://docs.ahrefs.com/en/mcp/docs/introduction) or this repository's
guide (https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/ahrefs.md). If it is already connected,
its tools are listed under `/mcp`: use them.

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

- **Ahrefs' own server, when connected:** list its tools (`/mcp`), then
  call the subscription limits tool (`limits-and-usage`; Ahrefs' reference
  marks it free).
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

- **API:** delete the `export` line from the shell profile.
- **Ahrefs' own server:** remove it the way it was added; the guide above
  has the steps.
- In Ahrefs, **Account settings**, **API keys**: delete the MCP key or the
  API key to end access for good.
