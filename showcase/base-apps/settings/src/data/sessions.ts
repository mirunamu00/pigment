export interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export const initialSessions: Session[] = [
  { id: 's1', device: 'Chrome on Windows', location: 'New York, US', lastActive: 'Active now', current: true },
  { id: 's2', device: 'Safari on iPhone', location: 'New York, US', lastActive: '2 hours ago', current: false },
  { id: 's3', device: 'Firefox on Ubuntu', location: 'Boston, US', lastActive: '3 days ago', current: false },
  { id: 's4', device: 'Edge on Windows', location: 'Toronto, CA', lastActive: '2 weeks ago', current: false },
];
