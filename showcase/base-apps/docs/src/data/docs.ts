/**
 * Inline text in blocks supports two markers:
 * - `code` (backticks) renders inline code
 * - [[Key]] renders a keyboard key, e.g. [[Ctrl]]+[[C]]
 */
export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export const PACKAGE_MANAGERS: PackageManager[] = ['npm', 'pnpm', 'yarn'];

export type CalloutVariant = 'note' | 'warning' | 'danger';

export interface Param {
  name: string;
  type: string;
  default: string;
  description: string;
}

export type Block =
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'callout'; variant: CalloutVariant; title: string; text: string }
  | { type: 'params'; label: string; rows: Param[] }
  | { type: 'steps'; items: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'tabs'; label: string; commands: Record<PackageManager, string> };

export type GroupId = 'getting-started' | 'guides' | 'api-reference' | 'resources';

export interface DocPage {
  group: GroupId;
  slug: string;
  title: string;
  description: string;
  body: Block[];
}

export interface DocGroup {
  id: GroupId;
  label: string;
  description: string;
}

export const groups: DocGroup[] = [
  {
    id: 'getting-started',
    label: 'Getting started',
    description: 'Install the CLI and run your first cached task in a few minutes.',
  },
  {
    id: 'guides',
    label: 'Guides',
    description: 'Configure tasks, tune the cache and run Ferrule in continuous integration.',
  },
  {
    id: 'api-reference',
    label: 'API reference',
    description: 'Every command, flag and programmatic interface, with types and defaults.',
  },
  {
    id: 'resources',
    label: 'Resources',
    description: 'Troubleshooting, answers to common questions and upgrade notes.',
  },
];

const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: 'npm install --save-dev ferrule',
  pnpm: 'pnpm add --save-dev ferrule',
  yarn: 'yarn add --dev ferrule',
};

export const pages: DocPage[] = [
  {
    group: 'getting-started',
    slug: 'introduction',
    title: 'Introduction',
    description: 'What Ferrule is and when to use it.',
    body: [
      {
        type: 'paragraph',
        text: 'Ferrule is a command-line task runner for JavaScript and TypeScript repositories. It runs the scripts you already have, in the right order, and skips the ones whose inputs have not changed since the last run.',
      },
      { type: 'heading', level: 2, id: 'why-ferrule', text: 'Why Ferrule' },
      {
        type: 'paragraph',
        text: 'Most repositories grow a pile of scripts that depend on each other in ways only a few people remember. Ferrule writes those dependencies down in one file, `ferrule.config.json`, and uses them to decide what to run.',
      },
      {
        type: 'list',
        items: [
          'Runs independent tasks in parallel and dependent tasks in order.',
          'Caches task output by hashing inputs, so unchanged work is restored instead of repeated.',
          'Works with the package manager and scripts you already use.',
        ],
      },
      { type: 'heading', level: 2, id: 'how-it-works', text: 'How it works' },
      {
        type: 'paragraph',
        text: 'Each task declares its command, the files it reads and the files it writes. Before running a task, Ferrule hashes its inputs. If the hash matches a previous run, the outputs are restored from the cache and the command is skipped.',
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'No daemon',
        text: 'Ferrule does not run in the background. Every command starts, does its work and exits.',
      },
      { type: 'heading', level: 2, id: 'next-steps', text: 'Next steps' },
      {
        type: 'paragraph',
        text: 'Continue with the installation guide, or jump to the quick start if Ferrule is already in your project.',
      },
    ],
  },
  {
    group: 'getting-started',
    slug: 'installation',
    title: 'Installation',
    description: 'Add the Ferrule CLI to a project and check that it works.',
    body: [
      {
        type: 'paragraph',
        text: 'Ferrule is distributed as a single package. Install it as a development dependency of your project so every contributor and every CI run uses the same version.',
      },
      { type: 'heading', level: 2, id: 'requirements', text: 'Requirements' },
      {
        type: 'list',
        items: [
          'Node.js 20 or later. Check with `node --version`.',
          'A package manager: npm, pnpm or yarn.',
          'Git, if you want Ferrule to ignore files listed in `.gitignore` when hashing.',
        ],
      },
      { type: 'heading', level: 2, id: 'install-the-cli', text: 'Install the CLI' },
      {
        type: 'paragraph',
        text: 'Run the command for your package manager from the root of your repository.',
      },
      { type: 'tabs', label: 'Package manager', commands: INSTALL_COMMANDS },
      {
        type: 'callout',
        variant: 'note',
        title: 'Workspaces',
        text: 'In a monorepo, install Ferrule once at the root. It finds the packages in your workspace on its own.',
      },
      { type: 'heading', level: 3, id: 'global-install', text: 'Global install' },
      {
        type: 'paragraph',
        text: 'A global install is handy for trying Ferrule out, but a project install is recommended for real work because it pins the version.',
      },
      { type: 'code', language: 'bash', code: 'npm install --global ferrule' },
      { type: 'heading', level: 2, id: 'verify-the-installation', text: 'Verify the installation' },
      {
        type: 'steps',
        items: [
          'Open a terminal in your repository.',
          'Run `npx ferrule --version`. It prints the installed version, for example `3.2.0`.',
          'Run `npx ferrule doctor` to check your Node.js version and cache directory.',
          'If both commands succeed, continue with the quick start.',
        ],
      },
      { type: 'code', language: 'bash', code: '$ npx ferrule doctor\n✓ Node.js 22.4.0\n✓ Cache directory .ferrule/cache is writable\n✓ No config file yet. Run `ferrule init` to create one.' },
      { type: 'heading', level: 2, id: 'shell-completion', text: 'Shell completion' },
      {
        type: 'paragraph',
        text: 'Ferrule can complete task names in bash, zsh and fish. Add the completion script to your shell profile, then press [[Tab]] after `ferrule run` to see the available tasks.',
      },
      { type: 'code', language: 'bash', code: 'ferrule completion zsh >> ~/.zshrc' },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Restart your shell',
        text: 'Completion only takes effect in new terminal sessions. Open a new tab or run `exec $SHELL`.',
      },
      { type: 'heading', level: 2, id: 'uninstalling', text: 'Uninstalling' },
      {
        type: 'paragraph',
        text: 'Remove the package with your package manager. The local cache lives in `.ferrule/` at the root of your repository and can be deleted separately.',
      },
      {
        type: 'callout',
        variant: 'danger',
        title: 'Deleting a shared cache',
        text: 'If `cache.directory` points to a shared location, deleting it removes cached results for every project that uses it.',
      },
    ],
  },
  {
    group: 'getting-started',
    slug: 'quick-start',
    title: 'Quick start',
    description: 'Create a config file and run your first cached task.',
    body: [
      {
        type: 'paragraph',
        text: 'This guide takes an existing project with a `build` script and runs it through Ferrule. It takes about five minutes.',
      },
      { type: 'heading', level: 2, id: 'create-a-config', text: 'Create a config file' },
      { type: 'paragraph', text: 'Run `ferrule init` to generate a config file from the scripts in your `package.json`.' },
      { type: 'tabs', label: 'Package manager', commands: { npm: 'npx ferrule init', pnpm: 'pnpm exec ferrule init', yarn: 'yarn ferrule init' } },
      { type: 'heading', level: 2, id: 'run-a-task', text: 'Run a task' },
      {
        type: 'steps',
        items: [
          'Run `ferrule run build`. The first run executes the command and stores the result.',
          'Run the same command again. Ferrule reports `1 restored, 0 executed`.',
          'Change a source file and run it once more. Only the affected task runs.',
        ],
      },
      { type: 'heading', level: 2, id: 'watch-mode', text: 'Watch mode' },
      {
        type: 'paragraph',
        text: 'Add `--watch` to rerun tasks when their inputs change. Press [[r]] to rerun everything and [[q]] to quit.',
      },
    ],
  },
  {
    group: 'guides',
    slug: 'configuration',
    title: 'Configuration',
    description: 'A complete reference for ferrule.config.json, environment variables and profiles.',
    body: [
      {
        type: 'paragraph',
        text: 'Ferrule reads its settings from a single JSON file at the root of your repository. This page lists every option, its type and its default value. Options you leave out use their defaults.',
      },
      { type: 'heading', level: 2, id: 'config-file', text: 'The config file' },
      {
        type: 'paragraph',
        text: 'Ferrule looks for `ferrule.config.json` in the current directory and then in each parent directory until it finds one. Pass `--config <path>` to use a different file.',
      },
      {
        type: 'code',
        language: 'json',
        code: '{\n  "$schema": "https://example.com/ferrule/schema.json",\n  "concurrency": 4,\n  "tasks": {\n    "build": {\n      "command": "tsc -p tsconfig.json",\n      "inputs": ["src/**/*.ts", "tsconfig.json"],\n      "outputs": ["dist/**"]\n    },\n    "test": {\n      "command": "vitest run",\n      "dependsOn": ["build"]\n    }\n  }\n}',
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'Editor support',
        text: 'The `$schema` line gives you completion and inline documentation in most editors. It is optional.',
      },
      { type: 'heading', level: 2, id: 'top-level-options', text: 'Top-level options' },
      {
        type: 'params',
        label: 'Top-level options',
        rows: [
          { name: 'tasks', type: 'Record<string, Task>', default: '{}', description: 'The tasks Ferrule can run, keyed by name.' },
          { name: 'concurrency', type: 'number', default: 'CPU cores − 1', description: 'How many tasks may run at the same time.' },
          { name: 'cache', type: 'CacheOptions', default: 'see below', description: 'Where and how task results are stored.' },
          { name: 'profiles', type: 'Record<string, Profile>', default: '{}', description: 'Named sets of overrides, selected with `--profile`.' },
          { name: 'logLevel', type: '"silent" | "info" | "debug"', default: '"info"', description: 'How much Ferrule prints while running.' },
        ],
      },
      { type: 'heading', level: 3, id: 'task-options', text: 'Task options' },
      { type: 'paragraph', text: 'Each entry in `tasks` accepts the following keys. Only `command` is required.' },
      {
        type: 'params',
        label: 'Task options',
        rows: [
          { name: 'command', type: 'string', default: '—', description: 'The shell command to run.' },
          { name: 'inputs', type: 'string[]', default: '["**/*"]', description: 'Globs of files that affect the result. Changes to these files invalidate the cache.' },
          { name: 'outputs', type: 'string[]', default: '[]', description: 'Globs of files the task writes. They are stored and restored with the cache entry.' },
          { name: 'dependsOn', type: 'string[]', default: '[]', description: 'Tasks that must finish before this one starts.' },
          { name: 'env', type: 'string[]', default: '[]', description: 'Environment variables included in the cache key.' },
          { name: 'cache', type: 'boolean', default: 'true', description: 'Set to `false` for tasks with side effects, such as deploys.' },
        ],
      },
      { type: 'heading', level: 3, id: 'cache-options', text: 'Cache options' },
      {
        type: 'params',
        label: 'Cache options',
        rows: [
          { name: 'directory', type: 'string', default: '".ferrule/cache"', description: 'Where cache entries are written, relative to the config file.' },
          { name: 'maxSize', type: 'string', default: '"5GB"', description: 'The oldest entries are removed when the cache grows past this size.' },
          { name: 'remote', type: 'string | null', default: 'null', description: 'The address of a shared remote cache.' },
          { name: 'timeout', type: 'number', default: '10000', description: 'Milliseconds to wait for the remote cache before falling back to the local one.' },
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Outputs outside the project',
        text: 'Output globs that point outside the repository are ignored. Ferrule never restores files above the directory that holds the config file.',
      },
      { type: 'heading', level: 2, id: 'environment-variables', text: 'Environment variables' },
      { type: 'paragraph', text: 'Environment variables override the matching options in the config file. They are useful in CI, where editing the file is inconvenient.' },
      {
        type: 'params',
        label: 'Environment variables',
        rows: [
          { name: 'FERRULE_CONCURRENCY', type: 'number', default: '—', description: 'Overrides `concurrency`.' },
          { name: 'FERRULE_CACHE_DIR', type: 'string', default: '—', description: 'Overrides `cache.directory`.' },
          { name: 'FERRULE_LOG_LEVEL', type: 'string', default: '—', description: 'Overrides `logLevel`.' },
          { name: 'FERRULE_NO_COLOR', type: 'boolean', default: 'false', description: 'Disables colored output.' },
        ],
      },
      { type: 'heading', level: 2, id: 'profiles', text: 'Profiles' },
      {
        type: 'paragraph',
        text: 'A profile is a named set of overrides. Select one with `--profile ci`. A profile can extend another profile with the `extends` key.',
      },
      {
        type: 'code',
        language: 'json',
        code: '{\n  "profiles": {\n    "ci": {\n      "concurrency": 2,\n      "logLevel": "debug"\n    },\n    "release": {\n      "extends": "ci",\n      "cache": { "remote": null }\n    }\n  }\n}',
      },
      { type: 'heading', level: 2, id: 'watch-mode-shortcuts', text: 'Watch mode shortcuts' },
      {
        type: 'paragraph',
        text: 'While `ferrule run --watch` is active, press [[r]] to rerun all tasks, [[f]] to filter tasks by name, [[c]] to clear the screen and [[q]] or [[Ctrl]]+[[C]] to quit.',
      },
      { type: 'heading', level: 2, id: 'validating-your-config', text: 'Validating your config' },
      {
        type: 'steps',
        items: [
          'Run `ferrule doctor`. It reads the config file and reports unknown keys and invalid values.',
          'Run `ferrule list` to see every task and its dependencies as Ferrule understands them.',
          'Run `ferrule run <task> --dry-run` to print the execution plan without running anything.',
        ],
      },
      {
        type: 'callout',
        variant: 'danger',
        title: 'Disabling the cache for everything',
        text: 'Setting `"cache": false` at the top level turns off caching for every task, including the ones that are safe to cache. Prefer disabling it per task.',
      },
      { type: 'heading', level: 2, id: 'related-options', text: 'Related options' },
      {
        type: 'paragraph',
        text: 'Command-line flags take precedence over both the config file and environment variables. See the CLI commands reference for the full list.',
      },
    ],
  },
  {
    group: 'guides',
    slug: 'caching',
    title: 'Caching',
    description: 'How the cache key is computed and how to share a cache.',
    body: [
      { type: 'paragraph', text: 'The cache is what makes Ferrule fast. This guide explains what goes into a cache key and how to share results between machines.' },
      { type: 'heading', level: 2, id: 'cache-keys', text: 'Cache keys' },
      {
        type: 'list',
        items: [
          'The contents of every file matched by `inputs`.',
          'The task command and its resolved dependencies.',
          'The values of the variables listed in `env`.',
        ],
      },
      { type: 'heading', level: 2, id: 'remote-cache', text: 'Remote cache' },
      { type: 'paragraph', text: 'Set `cache.remote` to share results across your team and CI. Reads fall back to the local cache when the remote is unavailable.' },
      { type: 'code', language: 'bash', code: 'FERRULE_CACHE_REMOTE=https://cache.example.com ferrule run build' },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Secrets in outputs',
        text: 'Anything a task writes to its outputs is uploaded to the remote cache. Never list files that contain secrets.',
      },
    ],
  },
  {
    group: 'guides',
    slug: 'running-in-ci',
    title: 'Running in CI',
    description: 'Use Ferrule in a continuous integration pipeline.',
    body: [
      { type: 'paragraph', text: 'Ferrule works in any CI system that can run Node.js. The steps below are the same everywhere.' },
      { type: 'heading', level: 2, id: 'pipeline-steps', text: 'Pipeline steps' },
      {
        type: 'steps',
        items: [
          'Install dependencies with your package manager.',
          'Restore the `.ferrule/cache` directory from the previous run, if your CI supports caching directories.',
          'Run `ferrule run build test --profile ci`.',
          'Save the `.ferrule/cache` directory for the next run.',
        ],
      },
      { type: 'heading', level: 2, id: 'exit-codes', text: 'Exit codes' },
      { type: 'paragraph', text: 'Ferrule exits with `0` when every task succeeds, `1` when a task fails and `2` when the config file is invalid.' },
    ],
  },
  {
    group: 'api-reference',
    slug: 'cli-commands',
    title: 'CLI commands',
    description: 'Every command the ferrule binary accepts.',
    body: [
      { type: 'paragraph', text: 'Run `ferrule help <command>` for the same information in your terminal.' },
      { type: 'heading', level: 2, id: 'commands', text: 'Commands' },
      {
        type: 'params',
        label: 'Commands',
        rows: [
          { name: 'run <tasks…>', type: 'command', default: '—', description: 'Run one or more tasks and their dependencies.' },
          { name: 'list', type: 'command', default: '—', description: 'Print every task and its dependencies.' },
          { name: 'init', type: 'command', default: '—', description: 'Create a config file from the scripts in `package.json`.' },
          { name: 'doctor', type: 'command', default: '—', description: 'Check the environment and the config file.' },
          { name: 'cache clean', type: 'command', default: '—', description: 'Delete the local cache.' },
        ],
      },
      { type: 'heading', level: 2, id: 'global-flags', text: 'Global flags' },
      {
        type: 'params',
        label: 'Global flags',
        rows: [
          { name: '--config', type: 'string', default: 'auto', description: 'Path to the config file.' },
          { name: '--profile', type: 'string', default: '—', description: 'Profile to apply.' },
          { name: '--dry-run', type: 'boolean', default: 'false', description: 'Print the plan without running anything.' },
        ],
      },
    ],
  },
  {
    group: 'api-reference',
    slug: 'task-api',
    title: 'Task API',
    description: 'Run Ferrule tasks from your own scripts.',
    body: [
      { type: 'paragraph', text: 'The `ferrule` package exports a small programmatic interface for scripts that need more control than the CLI offers.' },
      { type: 'heading', level: 2, id: 'run-tasks', text: 'runTasks()' },
      {
        type: 'code',
        language: 'ts',
        code: "import { runTasks } from 'ferrule';\n\nconst result = await runTasks(['build', 'test'], { profile: 'ci' });\nconsole.log(`${result.restored} restored, ${result.executed} executed`);",
      },
      { type: 'heading', level: 3, id: 'run-tasks-options', text: 'Options' },
      {
        type: 'params',
        label: 'runTasks options',
        rows: [
          { name: 'profile', type: 'string', default: 'undefined', description: 'Profile to apply.' },
          { name: 'cwd', type: 'string', default: 'process.cwd()', description: 'Directory to start looking for the config file.' },
          { name: 'signal', type: 'AbortSignal', default: 'undefined', description: 'Cancels the run when aborted.' },
        ],
      },
    ],
  },
  {
    group: 'api-reference',
    slug: 'plugin-api',
    title: 'Plugin API',
    description: 'Add custom task types and cache backends.',
    body: [
      { type: 'paragraph', text: 'Plugins are plain modules that export a `definePlugin` call. List them in the `plugins` array of your config file.' },
      { type: 'heading', level: 2, id: 'define-plugin', text: 'definePlugin()' },
      {
        type: 'code',
        language: 'ts',
        code: "import { definePlugin } from 'ferrule/plugin';\n\nexport default definePlugin({\n  name: 'timing',\n  afterTask(task, result) {\n    console.log(`${task.name} took ${result.durationMs} ms`);\n  },\n});",
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'Stability',
        text: 'The plugin API follows semantic versioning. Hooks are only removed in major releases.',
      },
    ],
  },
  {
    group: 'resources',
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fixes for the problems people run into most often.',
    body: [
      { type: 'heading', level: 2, id: 'task-always-runs', text: 'A task always runs, even when nothing changed' },
      { type: 'paragraph', text: 'An input glob probably matches a file the task writes itself, such as a log file. Run `ferrule run <task> --explain` to see which input changed.' },
      { type: 'heading', level: 2, id: 'outputs-missing', text: 'Restored outputs are missing' },
      { type: 'paragraph', text: 'Check that `outputs` covers every file the task writes. Files outside the listed globs are not stored.' },
    ],
  },
  {
    group: 'resources',
    slug: 'faq',
    title: 'FAQ',
    description: 'Short answers to common questions.',
    body: [
      { type: 'heading', level: 2, id: 'replace-scripts', text: 'Does Ferrule replace my package.json scripts?' },
      { type: 'paragraph', text: 'No. Tasks usually call your existing scripts. You can keep running them directly whenever you like.' },
      { type: 'heading', level: 2, id: 'other-languages', text: 'Can I use it outside JavaScript projects?' },
      { type: 'paragraph', text: 'Yes. A task command can be any shell command. Ferrule only needs Node.js to run itself.' },
    ],
  },
  {
    group: 'resources',
    slug: 'migrating-from-v2',
    title: 'Migrating from v2',
    description: 'Upgrade a project from Ferrule 2.x to 3.x.',
    body: [
      { type: 'paragraph', text: 'Version 3 replaces the `.ferrulerc` file with `ferrule.config.json` and requires Node.js 20 or later.' },
      { type: 'heading', level: 2, id: 'upgrade-steps', text: 'Upgrade steps' },
      {
        type: 'steps',
        items: [
          'Upgrade the package to the latest 3.x release.',
          'Run `ferrule migrate` to convert your old config file.',
          'Run `ferrule doctor` and fix anything it reports.',
        ],
      },
      { type: 'tabs', label: 'Package manager', commands: { npm: 'npm install --save-dev ferrule@3', pnpm: 'pnpm add --save-dev ferrule@3', yarn: 'yarn add --dev ferrule@3' } },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Cache format',
        text: 'The cache format changed in version 3. The first run after upgrading executes every task once.',
      },
    ],
  },
];

export function pagePath(page: Pick<DocPage, 'group' | 'slug'>): string {
  return `/docs/${page.group}/${page.slug}`;
}

export function findPage(group: string | undefined, slug: string | undefined): DocPage | undefined {
  return pages.find((page) => page.group === group && page.slug === slug);
}

export function findGroup(id: GroupId): DocGroup {
  const group = groups.find((item) => item.id === id);
  if (!group) throw new Error(`Unknown group: ${id}`);
  return group;
}

export function pagesInGroup(id: GroupId): DocPage[] {
  return pages.filter((page) => page.group === id);
}

/** Previous and next pages in sidebar order, across groups. */
export function getAdjacentPages(page: DocPage): { prev?: DocPage; next?: DocPage } {
  const index = pages.indexOf(page);
  return { prev: pages[index - 1], next: pages[index + 1] };
}

export function searchPages(query: string): DocPage[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return pages.filter((page) => page.title.toLowerCase().includes(needle));
}

export type HeadingBlock = Extract<Block, { type: 'heading' }>;

export function getHeadings(blocks: Block[]): HeadingBlock[] {
  return blocks.filter((block): block is HeadingBlock => block.type === 'heading');
}

export const QUICK_START_CODE = 'npm install --save-dev ferrule\nnpx ferrule init\nnpx ferrule run build';
