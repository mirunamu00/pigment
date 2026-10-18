export type IndustryId = 'healthcare' | 'education' | 'logistics' | 'technology' | 'hospitality';

export const INDUSTRIES: { id: IndustryId; label: string }[] = [
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'technology', label: 'Technology' },
  { id: 'hospitality', label: 'Hospitality' },
];

export const INDUSTRY_LABELS: Record<IndustryId, string> = Object.fromEntries(
  INDUSTRIES.map((industry) => [industry.id, industry.label]),
) as Record<IndustryId, string>;

export interface CaseStudy {
  id: string;
  company: string;
  industry: IndustryId;
  /** The headline result, e.g. "41% fewer no-shows". */
  metric: string;
  summary: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'brightmoor-clinics',
    company: 'Brightmoor Clinics',
    industry: 'healthcare',
    metric: '41% fewer no-shows',
    summary: 'Twelve clinics moved patient intake calls to booking pages with text reminders the day before.',
  },
  {
    id: 'westfold-dental',
    company: 'Westfold Dental',
    industry: 'healthcare',
    metric: '6 hours saved a week',
    summary: 'Front desk staff stopped scheduling by phone for check-ups and now confirm bookings in one click.',
  },
  {
    id: 'copperfield-schools',
    company: 'Copperfield Schools',
    industry: 'education',
    metric: '900 conferences in 3 days',
    summary: 'Parent-teacher conferences across four campuses are booked from a single shared page.',
  },
  {
    id: 'kestrel-freight',
    company: 'Kestrel Freight',
    industry: 'logistics',
    metric: '2x faster dock booking',
    summary: 'Carriers reserve loading dock slots themselves, with buffers that keep the yard from backing up.',
  },
  {
    id: 'vantor-labs',
    company: 'Vantor Labs',
    industry: 'technology',
    metric: '30% more demos held',
    summary: 'Round-robin routing spreads inbound demo requests across eight account executives.',
  },
  {
    id: 'oakline-studio',
    company: 'Oakline Studio',
    industry: 'technology',
    metric: '1 link for every client',
    summary: 'A small design studio replaced a shared inbox with team availability and client booking pages.',
  },
  {
    id: 'saltmarsh-coffee',
    company: 'Saltmarsh Coffee',
    industry: 'hospitality',
    metric: '15 cafes, one rota',
    summary: 'Shift interviews and supplier tastings are booked against each manager’s working hours.',
  },
  {
    id: 'ridgeway-learning',
    company: 'Ridgeway Learning',
    industry: 'education',
    metric: '3,400 tutoring sessions a month',
    summary: 'Students book tutors by subject, and limits keep each tutor’s day from overflowing.',
  },
];

export const FEATURED_QUOTE = {
  quote:
    'Scheduling used to be a job in itself. Now it is a link at the bottom of every email, and the calendar fills up on its own.',
  name: 'Marisol Ortega',
  role: 'Head of patient services, Brightmoor Clinics',
};
