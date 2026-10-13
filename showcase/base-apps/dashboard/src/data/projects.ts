export type ProjectStatus = 'active' | 'paused' | 'done';

export interface Task {
  id: string;
  title: string;
  assignee: string;
  done: boolean;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  updated: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  owner: string;
  status: ProjectStatus;
  budget: number;
  dueDate: string;
  description: string;
  tasks: Task[];
  files: ProjectFile[];
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  done: 'Done',
};

export const projects: Project[] = [
  {
    id: 'apollo-migration',
    name: 'Apollo Migration',
    client: 'Internal Platform',
    owner: 'Priya Natarajan',
    status: 'active',
    budget: 240000,
    dueDate: '2026-12-15',
    description:
      'Move the legacy order-processing services onto the shared container platform, retire the old VM fleet, and cut deployment time from hours to minutes.',
    tasks: [
      { id: 't1', title: 'Inventory services running on the VM fleet', assignee: 'Priya Natarajan', done: true },
      { id: 't2', title: 'Containerize the order intake service', assignee: 'Marcus Lee', done: true },
      { id: 't3', title: 'Set up staging cluster with production parity', assignee: 'Dana Whitfield', done: false },
      { id: 't4', title: 'Load test the payment callback path', assignee: 'Marcus Lee', done: false },
      { id: 't5', title: 'Write the cutover runbook', assignee: 'Priya Natarajan', done: false },
      { id: 't6', title: 'Decommission the old VM fleet', assignee: 'Tomás Herrera', done: false },
    ],
    files: [
      { id: 'f1', name: 'service-inventory.xlsx', size: '84 KB', updated: '2026-09-28' },
      { id: 'f2', name: 'cutover-runbook-draft.docx', size: '212 KB', updated: '2026-10-06' },
      { id: 'f3', name: 'cluster-architecture.pdf', size: '1.4 MB', updated: '2026-09-17' },
    ],
  },
  {
    id: 'billing-revamp',
    name: 'Billing Revamp',
    client: 'Finance',
    owner: 'Marcus Lee',
    status: 'active',
    budget: 125000,
    dueDate: '2026-11-30',
    description:
      'Replace the monthly invoicing batch job with usage-based billing, add proration for mid-cycle plan changes, and expose invoices in the customer portal.',
    tasks: [
      { id: 't1', title: 'Define proration rules with Finance', assignee: 'Marcus Lee', done: true },
      { id: 't2', title: 'Build usage aggregation pipeline', assignee: 'Aisha Bello', done: true },
      { id: 't3', title: 'Invoice PDF template', assignee: 'Dana Whitfield', done: true },
      { id: 't4', title: 'Customer portal invoice list', assignee: 'Aisha Bello', done: false },
    ],
    files: [
      { id: 'f1', name: 'proration-rules.md', size: '12 KB', updated: '2026-09-02' },
      { id: 'f2', name: 'invoice-template-v3.pdf', size: '640 KB', updated: '2026-10-01' },
    ],
  },
  {
    id: 'warehouse-scanner',
    name: 'Warehouse Scanner App',
    client: 'Logistics',
    owner: 'Tomás Herrera',
    status: 'paused',
    budget: 68000,
    dueDate: '2027-02-01',
    description:
      'Handheld scanning app for receiving and cycle counts. Paused until the new scanner hardware arrives at the Reno distribution center.',
    tasks: [
      { id: 't1', title: 'Barcode format survey', assignee: 'Tomás Herrera', done: true },
      { id: 't2', title: 'Offline sync prototype', assignee: 'Lena Okafor', done: false },
      { id: 't3', title: 'Pilot with receiving team', assignee: 'Tomás Herrera', done: false },
    ],
    files: [{ id: 'f1', name: 'scanner-requirements.pdf', size: '320 KB', updated: '2026-07-19' }],
  },
  {
    id: 'onboarding-flow',
    name: 'Customer Onboarding Flow',
    client: 'Growth',
    owner: 'Aisha Bello',
    status: 'done',
    budget: 54000,
    dueDate: '2026-08-29',
    description:
      'Redesigned sign-up and first-run experience with guided setup, sample data, and a checklist that tracks activation milestones.',
    tasks: [
      { id: 't1', title: 'Map current drop-off points', assignee: 'Aisha Bello', done: true },
      { id: 't2', title: 'Guided setup wizard', assignee: 'Lena Okafor', done: true },
      { id: 't3', title: 'Activation checklist', assignee: 'Aisha Bello', done: true },
    ],
    files: [
      { id: 'f1', name: 'activation-funnel-q3.csv', size: '48 KB', updated: '2026-09-05' },
      { id: 'f2', name: 'launch-retro-notes.md', size: '9 KB', updated: '2026-09-08' },
    ],
  },
  {
    id: 'data-retention',
    name: 'Data Retention Policy',
    client: 'Legal & Compliance',
    owner: 'Dana Whitfield',
    status: 'paused',
    budget: 18000,
    dueDate: '2027-01-15',
    description:
      'Automate deletion of expired customer records according to the updated retention schedule. Waiting on final sign-off from Legal.',
    tasks: [
      { id: 't1', title: 'Catalogue personal data stores', assignee: 'Dana Whitfield', done: true },
      { id: 't2', title: 'Draft retention schedule', assignee: 'Dana Whitfield', done: false },
    ],
    files: [{ id: 'f1', name: 'retention-schedule-draft.docx', size: '58 KB', updated: '2026-08-14' }],
  },
  {
    id: 'mobile-checkout',
    name: 'Mobile Checkout',
    client: 'E-commerce',
    owner: 'Lena Okafor',
    status: 'active',
    budget: 97000,
    dueDate: '2026-12-01',
    description:
      'Single-page checkout for the mobile web store with saved payment methods, address autocomplete, and clearer error recovery.',
    tasks: [
      { id: 't1', title: 'Address autocomplete integration', assignee: 'Lena Okafor', done: true },
      { id: 't2', title: 'Saved payment methods', assignee: 'Marcus Lee', done: false },
      { id: 't3', title: 'Error recovery copy review', assignee: 'Aisha Bello', done: false },
      { id: 't4', title: 'A/B test against current checkout', assignee: 'Lena Okafor', done: false },
    ],
    files: [{ id: 'f1', name: 'checkout-wireframes.fig', size: '3.2 MB', updated: '2026-09-22' }],
  },
  {
    id: 'vendor-portal',
    name: 'Vendor Portal',
    client: 'Procurement',
    owner: 'Priya Natarajan',
    status: 'active',
    budget: 143000,
    dueDate: '2027-03-31',
    description:
      'Self-service portal where suppliers submit invoices, update banking details, and track payment status without emailing Accounts Payable.',
    tasks: [
      { id: 't1', title: 'Supplier interviews', assignee: 'Priya Natarajan', done: true },
      { id: 't2', title: 'Invoice submission form', assignee: 'Tomás Herrera', done: false },
      { id: 't3', title: 'Bank detail verification flow', assignee: 'Dana Whitfield', done: false },
    ],
    files: [{ id: 'f1', name: 'supplier-interview-notes.md', size: '22 KB', updated: '2026-09-30' }],
  },
  {
    id: 'support-routing',
    name: 'Support Ticket Routing',
    client: 'Customer Support',
    owner: 'Marcus Lee',
    status: 'done',
    budget: 39000,
    dueDate: '2026-07-18',
    description:
      'Route incoming tickets to the right queue based on product area and customer tier, reducing first-response time by a third.',
    tasks: [
      { id: 't1', title: 'Define routing rules', assignee: 'Marcus Lee', done: true },
      { id: 't2', title: 'Tier lookup from CRM', assignee: 'Aisha Bello', done: true },
    ],
    files: [{ id: 'f1', name: 'routing-rules.yaml', size: '4 KB', updated: '2026-07-10' }],
  },
];

export function findProject(id: string | undefined): Project | undefined {
  return projects.find((project) => project.id === id);
}
