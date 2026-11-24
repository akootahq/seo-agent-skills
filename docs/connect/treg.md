# Connect treg

> New in 0.2.0. Written from treg's own documentation and not yet run end to end with a real account. If a step doesn't match what you see, [open an issue](https://github.com/akootahq/seo-agent-skills/issues).

[treg](https://treg.to) is a third-party relay that runs DataForSEO calls
from a prepaid treg balance, so you need no DataForSEO account of your own.

## What you get

The same data as [DataForSEO](dataforseo.md) for three skills: keyword
ideas, volume and difficulty (`keyword-research`), the Google results page
for a query (`content-brief`), and business listings and Maps results
(`local-seo`). treg relays only the DataForSEO calls its own catalog lists;
a call it does not list answers with an error, and the skill passes it on.

`backlinks` does not use treg.

## What it costs you

Your own treg account, billed per call from its prepaid balance. The skills
ask before each batch of calls and say how many.

## Set it up

### As a plugin, with sign-in

- **Claude Code:**

  ```text
  /plugin marketplace add superdesigndev/treg
  /plugin install treg@treg
  ```

  Then run `/mcp`, choose `treg` and sign in.

- **Codex, Cursor and other agents:** install treg's own skill, then sign in
  as it describes:

  ```sh
  npx skills add superdesigndev/treg -s treg
  ```

### With a token

1. Copy your token from your account at [treg.to](https://treg.to).
2. Add it to your shell profile (`~/.zshrc` or `~/.bashrc`), in your own
   editor:

   ```sh
   export TREG_TOKEN="your treg token"
   ```

   On Windows, add it as a user environment variable instead.
3. Open a new terminal and start your agent from it (or restart Cursor).

The skills then call `https://treg.to/call/dataforseo/<path>` with your
token in the `x-treg-token` header. This works the same in Claude Code,
Codex and Cursor.

## Check it works

- **Plugin:** `/mcp` lists treg's tools.
- **Token:** check the variable without showing it:

  ```sh
  test -n "$TREG_TOKEN" && echo set || echo "not set"
  ```

  The skill's first real call, which it asks you about, confirms the token.
  If treg answers `insufficient_balance`, the balance is empty.

## Where your keys live

- Plugin: your agent keeps the sign-in.
- Token: in your shell profile, outside your project. Never paste it into
  the chat.

## Disconnect

- **Plugin:** `/plugin uninstall treg@treg` in Claude Code, or
  `npx skills remove treg` for the skill in other agents.
- **Token:** delete the `export` line from your shell profile. To stop the
  token working everywhere, check treg's docs
  ([treg.to/skill.md](https://treg.to/skill.md)) for how to replace it.
