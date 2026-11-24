# Bing Webmaster Tools

Free, with the user's own key. Serves `bing-webmaster` (Bing's queries and
pages, crawl issues, URL checks, URL submission), `search-console` (Bing's
queries beside Google's), `technical-seo` (Bing's crawl issues) and
`backlinks` (the site's own inbound links). There is no MCP server to add:
the skills call Microsoft's Bing Webmaster API with `curl`, in any agent
that can run commands. One key covers every site the user has verified.

## Get the key

The user does this, in their own browser:

1. Sign in to Bing Webmaster Tools at https://www.bing.com/webmasters, with
   a Microsoft, Google or Facebook account.
2. Add and verify the site, if it is not there yet. Bing Webmaster Tools can
   import sites already verified in Google Search Console.
3. Open **Settings** (top right), then **API Access**. The first time,
   accept the terms, then choose **API Key**.
4. Choose **Generate API Key**. Bing allows one key per user.

## Set it

In the user's shell profile (for example `~/.zshrc` or `~/.bashrc`),
outside the project (see "Setting a variable" in the skill):

```sh
export BING_WEBMASTER_API_KEY="the Bing Webmaster API key"
```

Then a new terminal, and the agent started from it (or Cursor restarted).
The same steps hold for Claude Code, Codex and Cursor, since the skills
read the variable from the environment.

Bing also supports OAuth 2.0, which Microsoft marks as recommended. It
needs a registered app with a client ID, a client secret and a redirect
address. These skills use the key, which needs none of that.

## Check

1. Check the variable, which prints only "set" or "not set":

   ```sh
   test -n "$BING_WEBMASTER_API_KEY" && echo set || echo "not set"
   ```

2. Run `mkdir -p .agents/data/bing` once, then list the user's sites, a
   free call:

   ```sh
   curl -sS -G https://ssl.bing.com/webmaster/api.svc/json/GetUserSites --data-urlencode "apikey=$BING_WEBMASTER_API_KEY" -o .agents/data/bing/sites.json
   ```

3. A list under `d` means connected. Name the site that matches the brand
   file and whether it shows `IsVerified` true. Report nothing else from the
   file: it also holds verification codes. An `InvalidApiKey` message means
   the key is wrong or was deleted.

The key travels in the request address, so never add `-v` or `--trace` to
these commands, and never print the variable.

## Disconnect

- Delete the `export` line from the shell profile.
- In Bing Webmaster Tools, **Settings**, **API Access**: delete the key.
  Everything that uses it stops working, and a new key can be generated.
