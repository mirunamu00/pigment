# Deploying

Three things go live: the site (with the static API and the remote MCP endpoint) on Vercel, the domain,
and the `pigment-mcp` npm package. Everything below has been checked locally; these are the steps that
need accounts.

## 0. Before the first push

The initial commit still contains `docs/planning/*.docx` (internal, now gitignored). The remote is empty,
so rewrite history before pushing anything:

```bash
git add -A
git commit -m "MCP server, deploy setup, first published system"
# Recreate history as one commit without the planning document:
git checkout --orphan clean && git commit -m "Pigment: platform, harness, MCP server and Margin Notes 1.0.0"
git branch -D main && git branch -m main
git log --all --oneline -- docs/planning   # must print nothing
git push -u origin main
```

## 1. Vercel (site + API + remote MCP)

New project from the GitHub repo:

| Setting | Value |
| --- | --- |
| Root Directory | `apps/web` (keep "Include files outside the root directory" on — content is read from `../../content`) |
| Framework | Next.js (detected) |
| Install / Build | defaults (pnpm is detected from `packageManager`) |
| Node.js | 22.x |
| Env `NEXT_PUBLIC_SITE_URL` | `https://<domain>` |

`NEXT_PUBLIC_MCP_URL` is optional; it defaults to `<site>/mcp`.

After the first deploy, check:

```bash
curl -s https://<domain>/api/v1/design-systems | head
claude mcp add --transport http pigment https://<domain>/mcp   # then /mcp in a new session
```

## 2. Domain

Live: `pigmentui.com` (Vercel project `pigment`; DNS at hosting.kr: A `@` → `76.76.21.21`, CNAME `www` →
`cname.vercel-dns.com.`; www redirects to the apex). For a new domain, add it in Vercel → Domains, set the
DNS records it shows, then change the default in
`packages/content/src/prompts.ts` (`SITE_URL`) to the real domain: the npm package uses that default for
screenshot and spec links, because users don't set environment variables for it.

## 3. npm (`pigment-mcp`)

Published unscoped from a personal npm account (the workspace package is still `@pigment/mcp`; only the
release manifest written by `packages/mcp/scripts/build.ts` uses the public name).

CI publishes with npm trusted publishing (OIDC): no token is stored anywhere. A trusted publisher is set
on an existing package, so the very first version goes up by hand:

1. First release, from your machine:
   ```bash
   npm login
   pnpm --filter @pigment/mcp release:build
   npm publish ./packages/mcp/release --access public
   ```
2. On npmjs.com → `pigment-mcp` → Settings → Trusted Publisher → GitHub Actions: owner `mirunamu00`,
   repository `pigment`, workflow filename `release-mcp.yml`. Then, under Publishing access, choose
   "Require two-factor authentication and disallow tokens".
3. From then on `.github/workflows/release-mcp.yml` publishes `packages/mcp/package.json`'s version on
   every push to `main` when it is not on npm yet (with provenance) and tags `mcp-v<version>`.

From then on, `pnpm harness publish` bumps the MCP package version with every new system, and the next
push to `main` releases it.

Check: `claude mcp add pigment -- npx -y pigment-mcp`, new session, "List the Pigment design systems."

## Local equivalents

| What | Command |
| --- | --- |
| Production build | `cd apps/web && NEXT_DIST_DIR=.next-prod npx next build && NEXT_DIST_DIR=.next-prod npx next start --port 3200` |
| npm package | `pnpm --filter @pigment/mcp release:build && npm pack ./packages/mcp/release --dry-run` |
| Local MCP (built package) | `claude mcp add pigment -- node <repo>/packages/mcp/release/cli.js` |
| Remote MCP locally | `claude mcp add --transport http pigment http://localhost:3000/mcp` |
