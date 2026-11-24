# Connect your own DataForSEO account

> New in 0.2.0. Written from DataForSEO's own documentation and not yet run end to end with a real account. If a step doesn't match what you see, [open an issue](https://github.com/akootahq/seo-agent-skills/issues).

Run the keyword, search results, Maps and backlink skills on the DataForSEO
account you already have.

## What you get

- Keyword ideas, search volume, difficulty and intent, what a domain ranks
  for, and its organic competitors (`keyword-research`).
- The live Google results page for a query, with People Also Ask and the AI
  Overview's text where Google shows them (`content-brief`).
- Your Google Business Profile and Maps results across an area
  (`local-seo`).
- Referring domains, new and lost links, the link gap against competitors
  and broken backlinks, from DataForSEO's Backlinks API (`backlinks`).

Each run starts fresh: the raw responses are saved in `.agents/data/` in
your project, and nothing else is kept. AI answers from ChatGPT, Claude,
Perplexity and Gemini, history and rank tracking need
[Agent Number 10](agent-number-10.md).

## What it costs you

Your own paid DataForSEO account. Every call is billed to it, so the skills
ask before each batch of calls and say how many.

## Set it up

There are three ways in, all with the same account. Pick one.

### A. DataForSEO's hosted MCP server, with sign-in

No keys to handle: you sign in to DataForSEO in your browser.

- **Claude Code:**

  ```sh
  claude mcp add --transport http dataforseo https://mcp.dataforseo.com/v3/mcp
  ```

  Then run `/mcp`, choose `dataforseo` and sign in.

- **Codex:** add this to `~/.codex/config.toml`, then run
  `codex mcp login dataforseo`:

  ```toml
  [mcp_servers.dataforseo]
  url = "https://mcp.dataforseo.com/v3/mcp"
  ```

- **Cursor:** add this under `mcpServers` in `~/.cursor/mcp.json`, then sign
  in when Cursor asks:

  ```json
  "dataforseo": { "url": "https://mcp.dataforseo.com/v3/mcp" }
  ```

### B. DataForSEO's local MCP server, with your API login

The official server, `dataforseo-mcp-server`
([dataforseo/mcp-server-typescript](https://github.com/dataforseo/mcp-server-typescript)),
runs on your machine through `npx`, so you need Node.js.

1. Find your API login and password at
   [app.dataforseo.com/api-access](https://app.dataforseo.com/api-access).
   They are not your website password.
2. Add them to your shell profile (`~/.zshrc` or `~/.bashrc`), in your own
   editor:

   ```sh
   export DATAFORSEO_LOGIN="your API login"
   export DATAFORSEO_PASSWORD="your API password"
   ```

   On Windows, add them as user environment variables instead.
3. Add the server. It reads the two variables by name, so your config holds
   no secret:

   - **Claude Code:**

     ```sh
     claude mcp add --env 'DATAFORSEO_LOGIN=${DATAFORSEO_LOGIN}' --env 'DATAFORSEO_PASSWORD=${DATAFORSEO_PASSWORD}' --transport stdio dataforseo -- npx dataforseo-mcp-server@latest
     ```

   - **Codex**, in `~/.codex/config.toml`:

     ```toml
     [mcp_servers.dataforseo]
     command = "npx"
     args = ["dataforseo-mcp-server@latest"]
     env_vars = ["DATAFORSEO_LOGIN", "DATAFORSEO_PASSWORD"]
     ```

   - **Cursor**, in `~/.cursor/mcp.json`:

     ```json
     {
       "mcpServers": {
         "dataforseo": {
           "command": "npx",
           "args": ["dataforseo-mcp-server@latest"],
           "env": {
             "DATAFORSEO_LOGIN": "${env:DATAFORSEO_LOGIN}",
             "DATAFORSEO_PASSWORD": "${env:DATAFORSEO_PASSWORD}"
           }
         }
       }
     }
     ```

4. Open a new terminal and start your agent from it (or restart Cursor).

### C. The API directly, with your API login

No server: the skills call DataForSEO's API with `curl`, in any agent that
can run commands. Do steps 1, 2 and 4 of option B, and skip step 3.

## Check it works

Ask your agent to "check my DataForSEO connection". It makes one free call,
the list of locations and languages, and answers "connected" or with
DataForSEO's own error message. To check the variables yourself without
showing them:

```sh
test -n "$DATAFORSEO_LOGIN" && test -n "$DATAFORSEO_PASSWORD" && echo set || echo "not set"
```

## Where your keys live

- Option A: nowhere you handle. Your agent keeps the sign-in token.
- Options B and C: in your shell profile, outside your project. The agent
  config holds only the variable names. Never paste the login or password
  into the chat; if you do, change the password at DataForSEO.

## Disconnect

- **Claude Code:** `claude mcp remove dataforseo`.
- **Codex:** `codex mcp logout dataforseo` (option A), then
  `codex mcp remove dataforseo`.
- **Cursor:** remove the server in Cursor's MCP settings.
- Options B and C: delete the two `export` lines from your shell profile.
- To end access everywhere, change your API password at
  [app.dataforseo.com/api-access](https://app.dataforseo.com/api-access).
