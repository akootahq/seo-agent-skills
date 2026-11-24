# Connect Bing Webmaster Tools

> New in 0.2.0. Written from Microsoft's own documentation and not yet run end to end with a real account. If a step doesn't match what you see, [open an issue](https://github.com/akootahq/seo-agent-skills/issues).

Bing's own data about your site, free, with one key.

## What you get

- The searches and pages that bring you clicks and impressions from Bing,
  your crawl statistics, the URLs Bing could not crawl, one URL's index
  details, the inbound links Bing knows about, and changed URLs submitted to
  Bing when you agree (`bing-webmaster`).
- Bing's queries beside Google's (`search-console`).
- Bing's crawl issues inside the technical audit (`technical-seo`).
- Your own inbound links as Bing sees them (`backlinks`).

## What it costs you

Free. One key covers every site you have verified in Bing Webmaster Tools.

## Set it up

The steps are the same for Claude Code, Codex and Cursor: there is no MCP
server to add. The skills call Microsoft's Bing Webmaster API with `curl`,
reading your key from the environment.

1. Sign in to [Bing Webmaster Tools](https://www.bing.com/webmasters) with
   a Microsoft, Google or Facebook account.
2. Add and verify your site if it is not there yet. Bing can import sites
   you have already verified in Google Search Console.
3. Open **Settings** (top right), then **API Access**. The first time,
   accept the terms, then choose **API Key**.
4. Choose **Generate API Key**. Bing allows one key per user.
5. Add it to your shell profile (`~/.zshrc` or `~/.bashrc`), in your own
   editor:

   ```sh
   export BING_WEBMASTER_API_KEY="your Bing Webmaster API key"
   ```

   On Windows, add it as a user environment variable instead.
6. Open a new terminal and start your agent from it (or restart Cursor).

Bing also supports OAuth 2.0, which Microsoft marks as recommended. It
needs a registered app with a client ID, a client secret and a redirect
address, so these skills use the key. Microsoft's guide:
[Getting access to the Bing Webmaster Tools API](https://learn.microsoft.com/en-us/bingwebmaster/getting-access).

## Check it works

Ask your agent to "check my Bing Webmaster connection". It lists your
verified sites with one free call and answers "connected", with your site
and whether Bing shows it as verified, or with Bing's own error message
(`InvalidApiKey` means the key is wrong or was deleted). To check the
variable yourself without showing it:

```sh
test -n "$BING_WEBMASTER_API_KEY" && echo set || echo "not set"
```

## Where your keys live

In your shell profile, outside your project. The key travels in the address
of each request, so the skills never print the commands with it filled in
and never turn on curl's verbose output. Never paste it into the chat; if
you do, delete it in Bing Webmaster Tools and generate a new one.

## Disconnect

1. Delete the `export` line from your shell profile.
2. In Bing Webmaster Tools, **Settings**, **API Access**: delete the key.
   Everything that uses it stops working, and you can generate a new one
   later.
