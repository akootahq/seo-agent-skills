# AI crawlers

The tokens a site's robots.txt can name, grouped by what each one is for.
Blocking a search or user crawler takes the site out of that assistant's
answers. Blocking a training crawler is a choice about model training, and
does not by itself remove the site from answers.

| Token | Operator | Purpose | What it does |
| --- | --- | --- | --- |
| OAI-SearchBot | OpenAI | search | Builds the index ChatGPT search answers from |
| Claude-SearchBot | Anthropic | search | Indexes pages for Claude's web search |
| PerplexityBot | Perplexity | search | Indexes pages Perplexity cites in its answers |
| Googlebot | Google | search | Google Search, including AI Overviews and AI Mode |
| Bingbot | Microsoft | search | Bing, which Copilot and other assistants search through |
| ChatGPT-User | OpenAI | user | Opens a page when a ChatGPT user asks about it |
| Claude-User | Anthropic | user | Opens a page when a Claude user asks about it |
| Perplexity-User | Perplexity | user | Opens a page when a Perplexity user asks about it |
| GPTBot | OpenAI | training | Collects content to train OpenAI's models |
| ClaudeBot | Anthropic | training | Collects content to train Anthropic's models |
| Google-Extended | Google | training | robots.txt switch for Gemini training; Googlebot does the fetching |
| Applebot-Extended | Apple | training | robots.txt switch for Apple's AI training; Applebot does the fetching |
| meta-externalagent | Meta | training | Collects content for Meta's AI models |
| CCBot | Common Crawl | training | Open web archive many models are trained on |
| Bytespider | ByteDance | training | Collects content for ByteDance's models |

## How robots.txt groups work

A crawler follows only the most specific group that names its token. If
`OAI-SearchBot` has its own group, the `User-agent: *` group no longer applies
to it at all. So:

- A site that blocks everything under `*` but has an `OAI-SearchBot` group
  with `Allow: /` is open to OAI-SearchBot.
- A site with `Disallow: /` under `*` and no group for a crawler blocks that
  crawler.
- Inside a group, the longest matching rule wins, and `Allow` wins a tie.

## Which crawlers each assistant needs

| To appear in | Allow at least |
| --- | --- |
| ChatGPT search answers | OAI-SearchBot, ChatGPT-User |
| Claude answers with web search | Claude-SearchBot, Claude-User |
| Perplexity | PerplexityBot, Perplexity-User |
| Google AI Overviews and AI Mode | Googlebot (and the page must be indexable) |
| Microsoft Copilot | Bingbot |

## A robots.txt that allows answers but not training

Offer this only when the user wants to keep training crawlers out. Merge it
with the site's existing rules; do not replace them.

```text
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
Allow: /

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: meta-externalagent
User-agent: CCBot
User-agent: Bytespider
Disallow: /
```
