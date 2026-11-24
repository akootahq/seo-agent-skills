# Connect your own Ahrefs account

> New in 0.2.0. Written from Ahrefs' own documentation and not yet run end to end with a real account. If a step doesn't match what you see, [open an issue](https://github.com/akootahq/seo-agent-skills/issues).

Run keyword research, content briefs and the backlink audit on the Ahrefs
account you already have.

## What you get

- Keyword ideas and questions, search volume, difficulty and intent, what a
  domain ranks for, and its organic competitors (`keyword-research`).
- Ahrefs' latest stored results page for a query, and the questions people
  search around it (`content-brief`).
- Referring domains, new and lost links, broken backlinks, and the link gap
  against competitors (`backlinks`).

Each run starts fresh: the raw responses are saved in `.agents/data/` in
your project. AI answers from ChatGPT, Claude, Perplexity and Gemini,
history and rank tracking need [Agent Number 10](agent-number-10.md).

## What it costs you

Your own paid Ahrefs plan. Calls spend the plan's monthly API units, more
for more rows and more columns, so the skills ask for a few columns, ask
before each batch of calls and say how many. Ahrefs offers its MCP server on
paid plans from Lite upward, and API keys on the plans that include API
access: see Ahrefs' pricing page for yours. Ahrefs marks some reports, such
as Link Intersect, as Enterprise only; `backlinks` works without it.

## Set it up

There are two ways in.

### A. Ahrefs' MCP server, with sign-in

- **Claude Code**, as [Ahrefs documents it](https://docs.ahrefs.com/en/mcp/docs/claude-code):

  ```sh
  claude mcp add ahrefs https://api.ahrefs.com/mcp/mcp -t http
  ```

  Start Claude Code, run `/mcp`, choose `ahrefs` and authenticate: log in to
  Ahrefs, choose your workspace and click **Allow**.

- **Codex:** add this to `~/.codex/config.toml`, then run
  `codex mcp login ahrefs`:

  ```toml
  [mcp_servers.ahrefs]
  url = "https://api.ahrefs.com/mcp/mcp"
  ```

- **Cursor:** add this under `mcpServers` in `~/.cursor/mcp.json`, then sign
  in when Cursor asks:

  ```json
  "ahrefs": { "url": "https://api.ahrefs.com/mcp/mcp" }
  ```

Ahrefs documents the Claude Code steps; the Codex and Cursor entries are
each agent's own setup for a remote server with sign-in. If sign-in fails
there, check [Ahrefs' MCP docs](https://docs.ahrefs.com/en/mcp/docs/introduction).

If your agent limits how many tools one server may offer, add only the
groups these skills use to the address:

```text
https://api.ahrefs.com/mcp/mcp?tools=site-explorer-overview,site-explorer-reports,keywords-explorer,serp-overview,subscription-info
```

Ahrefs' older local server, `@ahrefs/mcp`, is archived. Ahrefs says it is
no longer maintained and does not recommend it, so this guide does not set
it up.

### B. The Ahrefs API, with a key

For plans that include API access.

1. As a workspace owner or admin, create a key in Ahrefs under **Account
   settings**, **API keys**
   ([app.ahrefs.com/account/api-keys](https://app.ahrefs.com/account/api-keys)).
   Give it an expiry date, and consider a usage limit on the key.
2. Add it to your shell profile (`~/.zshrc` or `~/.bashrc`), in your own
   editor:

   ```sh
   export AHREFS_API_KEY="your Ahrefs API key"
   ```

   On Windows, add it as a user environment variable instead.
3. Open a new terminal and start your agent from it (or restart Cursor).

The skills call `https://api.ahrefs.com/v3/...` with your key as a bearer
token. This works the same in Claude Code, Codex and Cursor.

## Check it works

Ask your agent to "check my Ahrefs connection". It calls Ahrefs' limits and
usage report, which Ahrefs marks free, and answers "connected" or with
Ahrefs' own error message. It does not repeat your limits or usage. To check
the key variable yourself without showing it:

```sh
test -n "$AHREFS_API_KEY" && echo set || echo "not set"
```

## Where your keys live

- Option A: approving the sign-in creates a key tagged `MCP` in your Ahrefs
  account, and your agent keeps the sign-in token. Workspace admins can
  change that key's monthly limit in **Account settings**, **API keys**.
- Option B: in your shell profile, outside your project. Never paste it into
  the chat; if you do, delete it in Ahrefs and create a new one.

## Disconnect

- **Claude Code:** `/mcp`, then **Clear authentication**; or
  `claude mcp logout ahrefs`, then `claude mcp remove ahrefs`.
- **Codex:** `codex mcp logout ahrefs`, then `codex mcp remove ahrefs`.
- **Cursor:** remove the server in Cursor's MCP settings.
- Option B: delete the `export` line from your shell profile.
- In Ahrefs, **Account settings**, **API keys**: delete the MCP key or the
  API key to end access for good.
