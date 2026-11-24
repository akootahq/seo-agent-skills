# Trigger check

Agents choose a skill from its `description` alone, before they read the
rest of the file. This list is the check that each description is chosen
for its own requests and left alone for its neighbours' requests.

## How to run it

1. Install the skills in a fresh project (see the README).
2. Start a new session for each request, so an earlier answer does not
   steer the choice, and type the request as written.
3. Note which skill the agent loads first. In Claude Code the skill's name
   shows when it loads; in other agents, ask "which skill did you use?".
4. A request under **Triggers** passes when that skill loads. A request
   under **Does not trigger** passes when the named skill loads instead, or
   no skill when none is named.

Run the whole list before a release, and the sections of any skill whose
description changed. When a request fails, change the description, not the
request, and keep it under 1,024 characters, ending with "Use when the user
asks ...". Add new requests here when a user's real request picked the
wrong skill.

## brand-context

Triggers:

- "Set up the brand file for example.com before we audit anything."
- "Our main competitor changed: we now compete with Acme, not Globex. Update the brand context."
- "Record who we sell to and which pages matter most, so you stop asking me."

Does not trigger:

- "Audit example.com for SEO." (`seo-audit`)
- "Which keywords should example.com target?" (`keyword-research`)

## connect-data

Triggers:

- "Connect my DataForSEO account so you can run keyword research."
- "How do I set up my Bing Webmaster API key for these skills?"
- "Which data source does the local SEO skill need, and how do I connect it in Codex?"
- "Disconnect Ahrefs from Cursor."

Does not trigger:

- "Show me my top Bing queries this month." (`bing-webmaster`)
- "Use my Ahrefs account to find keyword ideas for running shoes." (`keyword-research`)
- "What does Search Console say about my traffic?" (`search-console`)
- "Who links to my site?" (`backlinks`)

## seo-audit

Triggers:

- "Run a full SEO audit of example.com."
- "Our site barely ranks for anything. What should we fix first?"
- "Do a site health check on example.com and give me a prioritised fix list."

Does not trigger:

- "Check https://example.com/pricing for SEO problems." (`page-check`)
- "Can ChatGPT and Perplexity read our site?" (`aeo-audit`)
- "Why do half our pages say 'Crawled, currently not indexed'?" (`search-console` or `technical-seo`)
- "Audit only our hreflang tags." (`international-seo`)

## aeo-audit

Triggers:

- "Run an AEO audit on example.com."
- "Can AI assistants crawl and quote our site, or are we blocking them?"
- "Why does ChatGPT never mention us? Check what on our site might cause it."

Does not trigger:

- "How often does ChatGPT recommend us compared with last month?" (`ai-visibility`)
- "Write an llms.txt for our site." (`llms-txt`)
- "Run an SEO audit." (`seo-audit`)

## page-check

Triggers:

- "Check this page before I publish it: https://example.com/blog/new-guide"
- "Why is https://example.com/pricing not ranking?"
- "Quick SEO check of one URL: https://example.com/features"

Does not trigger:

- "Audit the whole site." (`seo-audit`)
- "Add Product schema to our pricing page." (`schema`)

## seo-fix

Triggers:

- "Fix the high and medium findings from the audit and open a pull request."
- "Make those SEO changes in our Next.js code."
- "Apply the fix list in .agents/audits/ to the repo."

Does not trigger:

- "Are the fixes we deployed yesterday live?" (`verify-fix`)
- "Find what is wrong with our SEO." (`seo-audit`)

## verify-fix

Triggers:

- "We deployed the fixes. Check they worked."
- "Is the canonical fix live on the comparison pages?"
- "Before I close this ticket, confirm the redirect fix passes."

Does not trigger:

- "Did our fixes change what AI assistants say about us?" (`prove-fix`)
- "Make the fixes." (`seo-fix`)

## technical-seo

Triggers:

- "Do a technical SEO audit: redirects, canonicals, noindex, sitemaps."
- "Some of our pages dropped out of search. Is it a crawl or indexing problem?"
- "Our robots.txt or sitemap might be wrong. Check it in depth."
- "We have duplicate URLs with tracking parameters. Find them."

Does not trigger:

- "Give me a full SEO audit." (`seo-audit`)
- "Which pages does Google say are indexed?" (`search-console`)
- "What crawl errors does Bing report?" (`bing-webmaster`)
- "Find orphan pages and pages too many clicks deep." (`site-architecture`)

## schema

Triggers:

- "Check our structured data and fix the JSON-LD."
- "Why don't review stars show for our products in Google?"
- "Add FAQ and Organization schema to our homepage."

Does not trigger:

- "Run a full SEO audit." (`seo-audit`)
- "Our name, address and phone differ between Google Maps and the site." (`local-seo`)

## site-architecture

Triggers:

- "Find orphan pages on example.com."
- "Which internal links should we add to help our guides rank?"
- "How many clicks from the homepage are our product pages?"

Does not trigger:

- "Who links to us from other websites?" (`backlinks`)
- "Fix our redirect chains." (`technical-seo`)

## images

Triggers:

- "Audit the alt text on our images."
- "Our images are huge. Which should be WebP or AVIF, and which should lazy load?"
- "Why don't our product images show up in Google Images?"

Does not trigger:

- "Our Core Web Vitals are poor overall." (`seo-audit`)
- "Run a full SEO audit." (`seo-audit`)

## international-seo

Triggers:

- "Check our hreflang between the English and German sites."
- "Google shows our French page to UK searchers. Why?"
- "Do we need x-default on our language versions?"

Does not trigger:

- "Run an SEO audit of our English-only site." (`seo-audit`)
- "Translate our pricing page." (no skill)

## llms-txt

Triggers:

- "Do we need an llms.txt?"
- "Validate our /llms.txt."
- "Generate an llms.txt from our real pages."

Does not trigger:

- "Are AI crawlers blocked by our robots.txt?" (`aeo-audit`)
- "How visible are we in ChatGPT?" (`ai-visibility`)

## content-refresh

Triggers:

- "Which of our blog posts are out of date?"
- "Find stale content with old years in the titles and dead sources."
- "Our older guides lose traffic every month. Which should we update first?"

Does not trigger:

- "Write a brief for a new article on 'best running shoes'." (`content-brief`)
- "Which pages lost the most clicks in Search Console?" (`search-console`)

## competitor-pages

Triggers:

- "Write an 'Acme vs Globex' comparison page for us."
- "We need an 'alternatives to Globex' page."
- "Check our comparison pages for competitor prices that are out of date."

Does not trigger:

- "Who do AI assistants recommend instead of us?" (`ai-competitors`)
- "Who are our competitors in Google?" (`keyword-research`)

## programmatic-seo

Triggers:

- "We want a page for every city we serve, generated from a spreadsheet. Plan it."
- "Check our 5,000 integration pages for thin or duplicate content."
- "Why are our generated location pages not indexed?"

Does not trigger:

- "Write a brief for one landing page." (`content-brief`)
- "Audit our location page for local search." (`local-seo`)

## ai-visibility

Triggers:

- "Do ChatGPT and Perplexity mention us when people ask for a CRM?"
- "Measure our AI visibility now, before we change anything."
- "How do we show up in Google AI Overviews?"

Does not trigger:

- "Who does ChatGPT recommend instead of us?" (`ai-competitors`)
- "Did the fixes change our AI visibility?" (`prove-fix`)
- "Can AI crawlers read our site?" (`aeo-audit`)

## ai-competitors

Triggers:

- "Who do AI assistants recommend instead of us?"
- "Who wins the AI answers for 'best project management tool'?"
- "How do we compare with Acme in ChatGPT's answers?"

Does not trigger:

- "Write a comparison page against Acme." (`competitor-pages`)
- "Which domains outrank us in Google?" (`keyword-research`)

## prove-fix

Triggers:

- "Did our fixes change what AI assistants say about us?"
- "Show me before and after AI visibility for the fixes we shipped on 1 November."
- "I need proof for the client that the AEO work made a difference."

Does not trigger:

- "Is the fix live on the page?" (`verify-fix`)
- "Measure our AI visibility for the first time." (`ai-visibility`)

## search-console

Triggers:

- "What does Search Console say about our clicks this month?"
- "Why did our impressions drop since October?"
- "Find SEO quick wins: queries on page two we could push up."
- "Are our important pages indexed in Google?"

Does not trigger:

- "What are our top Bing queries?" (`bing-webmaster`)
- "Find new keyword ideas for our blog." (`keyword-research`)
- "Connect my Search Console export." (`connect-data`)

## bing-webmaster

Triggers:

- "What do people search on Bing to find us?"
- "Bing isn't indexing our new pricing page. Why?"
- "Submit the pages we changed this week to Bing."
- "What crawl errors does Bing Webmaster Tools report for us?"

Does not trigger:

- "What does Google Search Console say?" (`search-console`)
- "Set up my Bing Webmaster API key." (`connect-data`)
- "Who links to our competitors and not to us?" (`backlinks`)

## keyword-research

Triggers:

- "What keywords should we target for our running shoe store?"
- "Get search volume and difficulty for these 40 keywords."
- "What do we already rank for, and who competes with us for it?"
- "Use my Ahrefs account to find keyword ideas for 'project management'."

Does not trigger:

- "Write a brief for 'best running shoes for flat feet'." (`content-brief`)
- "Which queries bring us clicks today?" (`search-console`)
- "Connect my DataForSEO account." (`connect-data`)

## content-brief

Triggers:

- "Write a content brief for 'how to choose a CRM'."
- "What should our article include to rank for 'best running shoes for flat feet'?"
- "Outline a page that AI assistants would cite for 'what is AEO'."

Does not trigger:

- "Give me a list of keywords to write about." (`keyword-research`)
- "Our 2023 guide is out of date. What should we update?" (`content-refresh`)
- "Write the comparison page Acme vs Globex." (`competitor-pages`)

## backlinks

Triggers:

- "Who links to example.com?"
- "Which sites link to our competitors but not to us?"
- "Find broken backlinks pointing at our old URLs so we can reclaim them."
- "We lost links last month. Which ones, and from where?"

Does not trigger:

- "Which internal links should we add between our pages?" (`site-architecture`)
- "Connect my Ahrefs account." (`connect-data`)
- "Show the inbound links Bing reports, with our Bing queries." (`bing-webmaster`)

## local-seo

Triggers:

- "Why don't we show up in the map pack for 'dentist near me'?"
- "Check our Google Business Profile against our website's address and phone."
- "How do we rank on Google Maps across the city?"

Does not trigger:

- "Add LocalBusiness schema to the contact page." (`schema`)
- "Generate a page for each of our 40 locations." (`programmatic-seo`)

## client-report

Triggers:

- "Make the monthly SEO and AEO report for our client example.com."
- "Send the client a report link they can open without logging in."
- "Turn off the report link we shared with Acme."

Does not trigger:

- "How are we doing in AI search?" (`ai-visibility`)
- "Summarise our Search Console clicks for me." (`search-console`)
