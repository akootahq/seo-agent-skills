# treg

treg (https://treg.to) is a third-party relay that runs DataForSEO calls
from a prepaid balance with treg, so the user needs no DataForSEO account.
It serves `keyword-research`, `content-brief` and `local-seo` with the same
data. Calls are billed to the user's treg balance.

## treg's own plugin and skill

treg also has its own Claude Code plugin and a skill for other agents, with
sign-in. Installing them is outside this plugin: the user follows treg's
instructions (https://treg.to/skill.md) or this repository's guide
(https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/treg.md). If treg's tools are already connected, use
them.

## With a token

The token is in the user's account at https://treg.to. The user puts it in
`TREG_TOKEN`, in their shell profile:

```sh
export TREG_TOKEN="the treg token"
```

The data skills then call `https://treg.to/call/dataforseo/<path>` with the
header `x-treg-token: $TREG_TOKEN`, in any agent that can run commands. treg
relays only the DataForSEO paths its catalog lists: any other path answers
404 with the header `X-Treg-Error: 1`. Pass that on as given.

## Check

- treg's own plugin, when installed: list its tools (`/mcp`).
- Token: check it is set, which prints only "set" or "not set":

  ```sh
  test -n "$TREG_TOKEN" && echo set || echo "not set"
  ```

  Make no call just to check: the data skill's first call confirms the
  token, after the user agrees to it. If treg answers 402 with
  `insufficient_balance`, the balance is empty: say so and stop.

## Disconnect

- treg's own plugin or skill: remove it the way it was installed.
- Token: delete the `export` line from the shell profile. To stop the token
  working everywhere, check treg's docs (https://treg.to/skill.md) for how
  to replace it.
