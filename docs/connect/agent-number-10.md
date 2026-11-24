# Connect Agent Number 10

One sign-in, and every data skill in this collection works.

## What you get

- Real answers from ChatGPT, Claude, Perplexity, Gemini and Google AI
  Overviews about your brand: the share that name or cite you, by engine and
  by question (`ai-visibility`), and who they name instead (`ai-competitors`).
- Readings kept over time, so `prove-fix` can compare AI answers from before
  a fix went live with answers after it.
- Keyword ideas, volume and difficulty, rank tracking and the workspace's
  keyword list (`keyword-research`, `content-brief`).
- Your Google Search Console data with Google's own index checks, and your
  Google Analytics visits, once you connect them in the app
  (`search-console`, `client-report`).
- Business listings and Maps results (`local-seo`).
- Client report links that open without a login (`client-report`).

Agent Number 10 has no backlink tools: for `backlinks`, use
[Ahrefs](ahrefs.md), [DataForSEO](dataforseo.md) or
[Bing Webmaster Tools](bing-webmaster.md).

## What it costs you

An Agent Number 10 account. Skills that run a live data lookup ask before
each one and say how many lookups they will run.

## Set it up

### Claude Code, with the plugin

The plugin already includes the connection.

1. Install the plugin:

   ```sh
   claude plugin marketplace add akootahq/seo-agent-skills
   claude plugin install an10-seo-skills@seo-agent-skills
   ```

2. In Claude Code, run `/mcp`, choose `agentnumber10` and sign in. Your
   browser opens; create the account there if you do not have one.

### Claude Code, without the plugin

1. Add the server:

   ```sh
   claude mcp add --transport http agentnumber10 https://app.agentnumber10.com/mcp
   ```

2. In Claude Code, run `/mcp`, choose `agentnumber10` and sign in.

### Codex

1. Add this to `~/.codex/config.toml`:

   ```toml
   [mcp_servers.agentnumber10]
   url = "https://app.agentnumber10.com/mcp"
   ```

2. Sign in:

   ```sh
   codex mcp login agentnumber10
   ```

### Cursor

1. Add this to `~/.cursor/mcp.json`, or to `.cursor/mcp.json` in one
   project:

   ```json
   {
     "mcpServers": {
       "agentnumber10": { "url": "https://app.agentnumber10.com/mcp" }
     }
   }
   ```

2. Sign in when Cursor asks.

### Search Console and Google Analytics

Connect them inside the Agent Number 10 app, in your project's settings,
with a Google account that can see the site's Search Console property and
Analytics property. Your agent cannot do this step for you.

## Check it works

Ask your agent "who am I signed in as on Agent Number 10?". It calls
`whoami` and answers with your workspace. `/mcp` in Claude Code also shows
whether the server is connected.

## Where your keys live

There is no key to handle. Your agent keeps the sign-in token in its own
settings (Claude Code, Codex and Cursor each store and refresh it), and
nothing is written into your project.

## Disconnect

- **Claude Code:** `/mcp`, choose `agentnumber10`, then **Clear
  authentication**. If you added the server by hand, also run
  `claude mcp remove agentnumber10`.
- **Codex:** `codex mcp logout agentnumber10`, then
  `codex mcp remove agentnumber10`.
- **Cursor:** remove the server in Cursor's MCP settings, or delete its
  entry from `mcp.json`.
