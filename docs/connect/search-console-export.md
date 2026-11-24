# Use a Search Console export

> New in 0.2.0. Written from Google's own documentation and not yet run end to end with a real account. If a step doesn't match what you see, [open an issue](https://github.com/akootahq/seo-agent-skills/issues).

Your Google Search Console data, from a file you download. No account
beyond Search Console itself, and nothing is sent anywhere.

## What you get

- Your top queries and pages with clicks, impressions, click-through rate
  and position, what changed between two periods, the pages losing clicks,
  and quick wins (`search-console`).
- The pages losing clicks, so they are refreshed first (`content-refresh`).
- What people already find you for, as a starting point for
  `keyword-research` and `content-brief`.

Google has no official MCP server for Search Console. An export is the free
path; live data, Google's index checks for each URL and history need
[Agent Number 10](agent-number-10.md).

## What it costs you

Free.

## Set it up

The same for Claude Code, Codex and Cursor:

1. Open [Google Search Console](https://search.google.com/search-console),
   then **Performance**.
2. Set the date range. The last 3 months is a good start. To see what
   changed page by page, choose **Compare** and two equal periods.
3. Choose **Export**, then **Download CSV**. It downloads a ZIP with
   `Queries.csv`, `Pages.csv`, `Countries.csv`, `Devices.csv`, `Dates.csv`
   and others.
4. Unzip it into `.agents/data/search-console/` in your project:

   ```sh
   mkdir -p .agents/data/search-console
   unzip -o ~/Downloads/<the export>.zip -d .agents/data/search-console/
   ```

   Or tell your agent where the download is, and it runs these for you.

## Check it works

Ask your agent "what does my Search Console export say?". It lists the CSV
files it found and the date range they cover, and asks you for the range if
the files do not say.

## Where your data lives

In `.agents/data/search-console/` in your project. It is your own search
data: on a public repository, add `.agents/data/` to `.gitignore`.

## Disconnect

Delete the folder `.agents/data/search-console/`. Nothing else holds the
data.
