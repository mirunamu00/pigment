export interface Kpi {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export const kpis: Kpi[] = [
  { id: 'deployments', label: 'Deployments this month', value: '186', change: '+12% vs last month', trend: 'up' },
  { id: 'uptime', label: 'Service uptime', value: '99.94%', change: '+0.03 pts', trend: 'up' },
  { id: 'incidents', label: 'Open incidents', value: '3', change: '−2 since Monday', trend: 'down' },
  { id: 'lead-time', label: 'Median lead time', value: '2.4 days', change: '−0.6 days', trend: 'down' },
];

export interface MonthlyValue {
  month: string;
  value: number;
}

export const deploymentsByMonth: MonthlyValue[] = [
  { month: 'May', value: 118 },
  { month: 'Jun', value: 134 },
  { month: 'Jul', value: 127 },
  { month: 'Aug', value: 152 },
  { month: 'Sep', value: 166 },
  { month: 'Oct', value: 186 },
];

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  { id: 'a1', actor: 'Priya Natarajan', action: 'updated the cutover runbook for', target: 'Apollo Migration', time: '12 minutes ago' },
  { id: 'a2', actor: 'Aisha Bello', action: 'completed "Invoice PDF template" in', target: 'Billing Revamp', time: '1 hour ago' },
  { id: 'a3', actor: 'Tomás Herrera', action: 'paused', target: 'Warehouse Scanner App', time: '3 hours ago' },
  { id: 'a4', actor: 'Lena Okafor', action: 'uploaded checkout-wireframes.fig to', target: 'Mobile Checkout', time: 'Yesterday' },
  { id: 'a5', actor: 'Marcus Lee', action: 'closed incident INC-2291 affecting', target: 'Support Ticket Routing', time: '2 days ago' },
];
