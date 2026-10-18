export type ChangeType = 'added' | 'fixed' | 'changed';

export const CHANGE_LABELS: Record<ChangeType, string> = {
  added: 'Added',
  fixed: 'Fixed',
  changed: 'Changed',
};

export interface Release {
  version: string;
  /** Heading id, e.g. v3-2-0 */
  id: string;
  /** ISO date, e.g. 2026-10-06 */
  date: string;
  summary: string;
  changes: { type: ChangeType; text: string }[];
}

/** Newest first. */
export const releases: Release[] = [
  {
    version: 'v3.2.0',
    id: 'v3-2-0',
    date: '2026-10-06',
    summary: 'Watch mode filters, profile inheritance and a faster cache index.',
    changes: [
      { type: 'added', text: 'Press `f` in watch mode to filter the running tasks by name.' },
      { type: 'added', text: 'Profiles can extend another profile with the `extends` key.' },
      { type: 'changed', text: 'The cache index is now written once per run instead of once per task, which makes large runs noticeably faster.' },
      { type: 'fixed', text: '`ferrule list --json` no longer prints a trailing comma when a task has no dependencies.' },
    ],
  },
  {
    version: 'v3.1.1',
    id: 'v3-1-1',
    date: '2026-09-15',
    summary: 'Bug fixes for Windows paths and remote cache timeouts.',
    changes: [
      { type: 'fixed', text: 'Input globs with backslashes are normalized on Windows before hashing.' },
      { type: 'fixed', text: 'A remote cache that does not answer within `cache.timeout` now falls back to the local cache instead of failing the run.' },
    ],
  },
  {
    version: 'v3.1.0',
    id: 'v3-1-0',
    date: '2026-08-27',
    summary: 'The doctor command and per-task environment variables.',
    changes: [
      { type: 'added', text: '`ferrule doctor` checks your config, your cache directory and your Node.js version in one command.' },
      { type: 'added', text: 'Tasks accept an `env` list of variables that are included in the cache key.' },
      { type: 'changed', text: 'The default concurrency is now the number of CPU cores minus one.' },
      { type: 'fixed', text: 'Interrupted runs no longer leave partial entries in the cache.' },
    ],
  },
  {
    version: 'v3.0.0',
    id: 'v3-0-0',
    date: '2026-07-02',
    summary: 'A new config format and the plugin API.',
    changes: [
      { type: 'changed', text: 'The config file is now `ferrule.config.json`. Run `ferrule migrate` to convert an old `.ferrulerc`.' },
      { type: 'added', text: 'The plugin API: register custom task types and cache backends.' },
      { type: 'changed', text: 'Node.js 20 is now the minimum supported version.' },
      { type: 'fixed', text: 'Tasks that write no output files are cached correctly.' },
    ],
  },
  {
    version: 'v2.9.4',
    id: 'v2-9-4',
    date: '2026-05-20',
    summary: 'The last release of the 2.x line.',
    changes: [
      { type: 'fixed', text: 'Colored output is disabled when the terminal does not support it.' },
      { type: 'fixed', text: 'Long task names are no longer cut off in the summary table.' },
    ],
  },
];
