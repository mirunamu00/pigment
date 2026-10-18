export const TOOL_NAME = 'Ferrule';
export const CURRENT_VERSION = 'v3.2.0';
/** Placeholder repository address. Never fetched; the header link is plain text styling only. */
export const REPOSITORY_URL = 'https://example.com/ferrule/ferrule';

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
