export interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface NotificationGroup {
  id: string;
  title: string;
  description: string;
  settings: NotificationSetting[];
}

export const notificationGroups: NotificationGroup[] = [
  {
    id: 'email',
    title: 'Email',
    description: 'Messages sent to your account email address.',
    settings: [
      {
        id: 'email-product-updates',
        label: 'Product updates',
        description: 'News about new features and improvements.',
        enabled: true,
      },
      {
        id: 'email-weekly-summary',
        label: 'Weekly summary',
        description: 'A short digest of activity every Monday morning.',
        enabled: false,
      },
      {
        id: 'email-security-alerts',
        label: 'Security alerts',
        description: 'Sign-ins from new devices and password changes.',
        enabled: true,
      },
    ],
  },
  {
    id: 'push',
    title: 'Push notifications',
    description: 'Alerts delivered to your signed-in browsers and devices.',
    settings: [
      {
        id: 'push-mentions',
        label: 'Mentions',
        description: 'When someone mentions you in a comment.',
        enabled: true,
      },
      {
        id: 'push-comments',
        label: 'Comments',
        description: 'Replies on items you created or follow.',
        enabled: false,
      },
      {
        id: 'push-reminders',
        label: 'Reminders',
        description: 'Due dates and reminders you have set.',
        enabled: false,
      },
    ],
  },
];
