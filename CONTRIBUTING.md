# Contributing

`main` is protected: every change reaches it through a pull request with a green CI. Nobody pushes to
`main` directly — admins included — and its history is never rewritten.

## Flow

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
   ("Compare: show dark-mode screenshots"). The body says what changed, why, and how it was verified.

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
