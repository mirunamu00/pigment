export interface Profile {
  fullName: string;
  email: string;
  jobTitle: string;
  timeZone: string;
  bio: string;
}

export const currentUser = {
  name: 'Jordan Lee',
  initials: 'JL',
  email: 'jordan.lee@example.com',
};

export const initialProfile: Profile = {
  fullName: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  jobTitle: 'Product manager',
  timeZone: 'America/New_York',
  bio: 'Working on planning tools for small teams.',
};

export const timeZones = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (UTC−08:00)' },
  { value: 'America/Chicago', label: 'Central Time (UTC−06:00)' },
  { value: 'America/New_York', label: 'Eastern Time (UTC−05:00)' },
  { value: 'Europe/London', label: 'London (UTC+00:00)' },
  { value: 'Europe/Berlin', label: 'Berlin (UTC+01:00)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (UTC+09:00)' },
];

export const BIO_MAX_LENGTH = 160;
