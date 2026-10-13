# Contributing

Thanks for helping. Everyone taking part follows the [code of conduct](CODE_OF_CONDUCT.md); security
problems go through the [private report](SECURITY.md), never a public issue.

## Ways to help

| You want to… | Do this |
| --- | --- |
| Report something broken | Open a **Bug report** issue |
| Say an agent's result with a system is off | Open a **Design system feedback** issue, with screenshots |
| Propose a website's look as a new system | Open a **Suggest a design system** issue |
| Suggest an improvement | Open a **Feature request** issue |
| Fix a bug, docs or code | Send a pull request (below) |

Open an issue first for anything bigger than a small fix, so we can agree on the approach before you
spend time on it.

**Design systems are made by the pipeline, not by hand.** A new system or an update to a published one is
written from a measured reference, applied by an agent to four reference apps, evaluated and approved
before it is published (`docs/harness/`). That run needs coding-agent time, so the maintainer runs it —
suggest systems and report problems with them through issues. Pull requests that hand-edit a published
system's folder can't be merged: published versions are immutable, and CI checks it.

## Setup

Node 22+ and pnpm.

```bash
pnpm install
npx playwright install chromium
pnpm dev            # http://localhost:3000
```

## Pull requests

`main` is protected: every change reaches it through a pull request with a green CI. Nobody pushes to
`main` directly — admins included — and its history is never rewritten.

**From a fork** (no write access): fork the repository, branch in your fork with the prefixes below, and
open the PR against `mirunamu00/pigment:main`. CI runs on it; the maintainer reviews and merges.

**With write access**, work on a branch in this repository:

1. **Branch from an up-to-date `main`.**

   ```bash
   git switch main && git pull
   git switch -c feat/compare-dark-mode
   ```

   | Prefix | For |
   | --- | --- |
   | `feat/` | New behavior on the site, MCP server or harness, and new design systems |
   | `fix/` | Bugs, and updates to a published design system |
   | `docs/` | Documentation only |
   | `chore/` | Tooling, CI, dependencies, settings |

2. **Commit, then check locally** before opening the PR:

   ```bash
   pnpm typecheck && pnpm test && pnpm check:content
   ```

3. **Push the branch and open a PR.**

   ```bash
   git push -u origin feat/compare-dark-mode
   gh pr create --fill
   ```

   The PR title becomes the commit message on `main` — write it as one: imperative, specific
   ("Compare: show dark-mode screenshots"). The body follows the PR template: what, why, the issue it closes, how it was verified.

4. **CI must pass.** The `check` job (typecheck, content check, harness, MCP and site tests, MCP package
   build) is required, and the branch must be up to date with `main`. Vercel posts a preview deployment of
   the site on the PR — look at it for any visible change.

5. **Squash and merge.** Only squash merges are allowed, so `main` gets one commit per PR; the branch is
   deleted after the merge.

## What merging to `main` does

- Vercel deploys the site to production (pigmentui.com).
- If `packages/mcp/package.json` changed — `pnpm harness publish` bumps it with every published system —
  the release workflow publishes `pigment-mcp` to npm with provenance.

## Repository settings (for reference)

Branch protection on `main`: pull request required (no approvals required — single maintainer), status
check `check` required and strict, admins included, linear history, no force pushes, no deletion,
conversations resolved. Merge methods: squash only, PR title and body as the commit; branches deleted on
merge.
