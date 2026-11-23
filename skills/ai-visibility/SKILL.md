---
name: ai-visibility
description: Measure what ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews actually answer about a brand, using real answers collected by Agent Number 10. Shows the share of answers that name or cite the site, by engine and by buyer question, and the questions where it is missing. Use when the user asks whether AI assistants mention or recommend them, wants an AI visibility or AI search baseline, or asks how they show up in ChatGPT, Perplexity or AI Overviews. Needs an Agent Number 10 account.
---

# AI visibility

The audits in this collection check whether assistants *can* read a site.
This skill shows what they actually *answer*, from real answers to the
questions buyers ask. It runs through Agent Number 10's tools (the
`agentnumber10` MCP server).

## 1. Connect

Call `whoami`. If the tool is not available:

- With this collection installed as a Claude Code plugin, the server is already
  configured: run `/mcp`, choose `agentnumber10` and sign in.
- Otherwise add it, then sign in:

  ```sh
  claude mcp add --transport http agentnumber10 https://app.agentnumber10.com/mcp
  ```

  In Codex, Cursor and other agents, add an HTTP MCP server with the same
  address in that agent's MCP settings.

Signing in opens the browser. Creating the account is the user's step; do not
fill in their details.

## 2. Find or add the site

Call `list_sites`. If the domain from `.agents/seo-brand.md` is there, use its
`projectId`.

If it is not:

1. Call `search_markets` with the market from the brand file to get its
   location code.
2. Call `add_site` with the name, domain and location code.
3. It answers that it needs confirmation, because it starts live lookups.
   Tell the user it will measure the site now and that this uses the
   workspace's allowance, then call it again with `confirm: true` only after
   they agree.
4. Follow progress with `get_job_status` until the first reading is in.

## 3. Read the results

- `get_ai_visibility`: the share of measured answers that name or cite the
  site, citations, mentions, average citation position, and the breakdown by
  engine.
- `get_ai_prompts`: the questions measured. Compare them with the buyer
  questions in the brand file and point out any that are missing.

Report:

1. The headline share, with its denominator ("named in 12 of 96 answers").
2. A table by engine: answers measured, named, cited.
3. The questions where the site never appears, which are where to work first.

Quote figures exactly as the tools give them. Do not round them into claims
the data does not make, and do not compare engines whose answer counts differ
without saying so.

## 4. Save the baseline

Append the reading, with its date, to `.agents/audits/ai-visibility-<domain>.md`.
`prove-fix` compares later readings with this one.

## Next steps

- `ai-competitors`: who the assistants name instead.
- `aeo-audit` and `seo-fix`: what to change on the site.
- `prove-fix`: after fixes are live, whether the answers changed.

## Rules

- Tools that run live lookups ask for confirmation. Ask the user every time,
  say how many lookups you will run, and do not run more than they agreed to.
- If a tool says the workspace has reached its plan's limit, pass on its
  message and its link as given.
