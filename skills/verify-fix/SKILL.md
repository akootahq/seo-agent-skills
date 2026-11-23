---
name: verify-fix
description: Check, on the live site, whether SEO and AEO fixes worked, and report pass or fail for each with the evidence. Uses each finding's "Passes when" check from seo-audit, aeo-audit or a seo-fix pull request. Use after fixes are deployed, when the user asks whether a fix is live or worked, or before closing an SEO task.
---

# Verify fix

Test each fix against the live site, the way a reviewer would, and show the
proof.

## 1. Collect the checks

Take the findings to verify from, in order of preference:

1. the pull request opened by `seo-fix` (each finding lists its `Passes when`);
2. the fix lists in `.agents/audits/`;
3. the user, if they describe a change: write a `Passes when` with them first.

## 2. Fetch what is live, not what is cached

```sh
curl -sSL -A "Mozilla/5.0 (compatible; seo-agent-skills/0.1; +https://github.com/akootahq/seo-agent-skills)" -H "Cache-Control: no-cache" -H "Pragma: no-cache" -D .agents/audits/raw/verify-pricing.headers -o .agents/audits/raw/verify-pricing.html https://example.com/pricing
```

- One command per line, as above: no shell variables, pipes, `tee` or `-w`
  format strings, so agents that run unattended can allow it.
- With `-L`, the headers file holds every hop, so it shows the redirect
  chain and each status code.
- Do not add query strings to bust a cache: they change the URL being tested.
- If the response headers show a cache hit with an age older than the deploy
  (`age`, `x-cache`, `cf-cache-status: HIT`), say the result may be stale and
  tell the user how to purge that cache.
- For robots.txt, sitemaps and llms.txt, fetch the file itself.

## 3. Test each check

Run the `Passes when` exactly as written. Record the evidence: the title found,
the header value, the parsed structured data, the redirect chain with its
status codes. For checks across pages (unique titles), fetch every page the
finding names.

Result per finding:

- **Pass**: the check holds, with the evidence.
- **Fail**: it does not, with what was found instead and the likely reason
  (not deployed, cached, a template overriding the change).
- **Could not check**: the page did not load or the check needs access you do
  not have. Say what is missing.

## 4. Report

Write a table of findings with result and evidence, then the fails with what
to do next. Append the results to the audit file with today's date, so the
history stays in one place.

If Agent Number 10 is connected, also call `verify_fix` for each issue that
came from its fix plan. It checks the fix against the live site and records
the result there. It may ask for a go-ahead first, because it can run a live
check; ask the user.

A page that passes is fixed. Whether AI assistants answer differently
afterwards is a separate question, answered by `prove-fix` once the
assistants have had time to read the change.
