# DataForSEO, on the user's own account

Serves `keyword-research`, `content-brief` and `local-seo` (keyword, Google
results and Google Maps data) and `backlinks` (the Backlinks API). Calls are
billed to the user's DataForSEO account.

## DataForSEO's own MCP server

DataForSEO also offers its own MCP server, hosted with sign-in or run on the
user's machine. Setting one up is outside this plugin: the user follows
DataForSEO's instructions (https://github.com/dataforseo/mcp-server-typescript)
or this repository's guide (https://github.com/akootahq/seo-agent-skills/blob/main/docs/connect/dataforseo.md).
If one is already connected, its tools are listed under `/mcp`: use them.

## The API, with the API login

No server: the data skills call the API with `curl`, in any agent that can
run commands.

1. The user sets two variables (see "Setting a variable" in the skill). The
   API login and password are at https://app.dataforseo.com/api-access.

   ```sh
   export DATAFORSEO_LOGIN="the API login"
   export DATAFORSEO_PASSWORD="the API password"
   ```

2. Restart the agent.

## Check

1. For the API, check the variables are set. This prints
   only "set" or "not set":

   ```sh
   test -n "$DATAFORSEO_LOGIN" && test -n "$DATAFORSEO_PASSWORD" && echo set || echo "not set"
   ```

2. For DataForSEO's own server, when one is connected, its tools include a
   general request tool, `api_request`.
3. Make one free call, the locations list, which the data skills also need:
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

- **API:** delete the two `export` lines from the shell profile.
- **DataForSEO's own server:** remove it the way it was added; the guide
  above has the steps.
- To end access for good, change the API password at
  https://app.dataforseo.com/api-access.
