# Contributing

Thanks for helping. This file is the standard the skills are held to, for
everyone including the maintainers.

## Set up

```sh
git config core.hooksPath .githooks   # the checks below, before each commit
node scripts/validate.mjs             # front matter, length, links, manifests
bin/guard.sh                          # private text and commit format
```

To try a change, load the folder as a plugin in Claude Code:

```sh
claude --plugin-dir plugins/seo-agent-skills
```

The plugin lives in `plugins/seo-agent-skills/`: its manifest, icon,
README and the skills. That folder is what people install and what the
Claude plugin directory reviews. The repository's own checks (`bin/`,
`scripts/`, `.githooks/`) stay outside it, and `skills.sh.json` tells the
skills CLI where the skills are.

## What is checked, and where

| Check | Before each commit | In CI |
| --- | --- | --- |
| Private text, internal ticket ids, tool attribution (`bin/guard.sh`) | staged files and the message | every file and every commit message |
| Commit message format | yes | yes |
| Skill front matter, length, links, manifests (`scripts/validate.mjs`) | yes | yes |
| Secrets in the history (gitleaks) | | yes |

A failing check is fixed, not skipped. Never commit with `--no-verify`.

## How changes are accepted

- Open an issue before a large change or a new skill, so we can agree on the
  approach before you spend time on it. Small fixes can go straight to a pull
  request.
- Run the changed skill on a real site before opening the pull request, and
  put what it produced in the description.
- You must understand, and have run, every line you submit, however it was
  written. Pull requests that were not tried, that change text the author
  cannot explain, or that arrive in bulk are closed with a short note.
- The maintainer makes the final call. Decisions and the reasons for them are
  written in the issue or pull request, not in private.
- Issues and pull requests get a first reply within a week. Security reports
  get one within three working days (see SECURITY.md).
- Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Commits

```
type(scope): what changes, in the imperative

Why it changes, wrapped at 72 characters. What was wrong or missing,
and anything a reviewer would not see from the diff.
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
  `build`, `ci`, `chore`, `revert`.
- **Scopes:** the skill's name (`seo-audit`, `seo-fix`), or `readme`,
  `plugin`, `ci`, `deps`.
- **First line:** a command, in lower case after the colon ("add", not
  "added" or "adds"), with no full stop, saying what changes for the person
  using the skill: `fix(seo-audit): stop flagging valid JSON-LD graphs`.
  Aim for 50 characters; 72 is the limit.
- **Body:** a blank line after the first line, then what changed and why,
  wrapped at 72 characters. A long URL may run over.
- One logical change per commit. No tool attribution lines (`Co-Authored-By`
  for tools, `AI-Assisted`, `Generated with ...`) and no internal ticket ids.
- The author is a real person committing with their GitHub noreply address,
  so no personal email is published.

## Branches, pull requests, releases

- `main` is always releasable. Work happens on short-lived branches named
  `type/short-description`.
- Every change reaches `main` through a pull request that CI has passed, and
  is squash-merged with a title that follows the commit format. `main` is
  never force-pushed.
- Versions follow semantic versioning and live in the plugin's
  `.claude-plugin/plugin.json` and the root `.claude-plugin/marketplace.json`;
  `scripts/validate.mjs` fails when they differ, or when `CHANGELOG.md` has
  no entry for the version.
- A release is a pull request that bumps the version in both files and adds
  its `CHANGELOG.md` entry, written for the people using the skills. Merging
  it releases it: the Release workflow creates the GitHub release `vX.Y.Z` at
  that commit, with the entry as its notes. A merge that does not change the
  version releases nothing.
- If a release stops half way, run the Release workflow by hand from the
  Actions tab; it skips a version that is already released.

## Rules the skills keep

**Honesty**
- A skill reports only what it fetched or a tool returned, with the evidence.
  It says when a check could not run instead of guessing.
- No invented numbers: no estimated traffic, rankings or revenue.
- The README and the skills claim only what they do today.

**Safety**
- The audit skills read public pages only. They never log in or submit forms.
- A skill that changes a site works on a branch and asks before pushing.
- A skill that runs a paid lookup asks first, every time.

**Privacy**
- Every service a skill sends data to is listed under "Your data" in the
  README, with what is sent.

**Format**
- Each skill is a folder in `plugins/seo-agent-skills/skills/` with a
  `SKILL.md` that follows the Agent Skills format: `name` equal to the
  folder, a `description` that says what it does and when to use it, under
  500 lines. Detail goes in its `references/` folder.
- The `description` names the skill that fits better for nearby requests,
  and ends with a sentence that starts "Use when the user asks". A new skill
  or a changed description comes with its requests in
  [tests/triggers.md](tests/triggers.md): at least three it must answer,
  and the neighbours' requests it must leave alone.
- A new data source gets a guide in `docs/connect/` (what you get, what it
  costs you, the setup for each agent, the check, where the key lives, how
  to disconnect) and a row in the README's "Connect your data" table.
- Plain words, straight quotes, no long dashes.

## Licence

The skills are MIT licensed. By contributing you agree that your contribution
is licensed the same way.
