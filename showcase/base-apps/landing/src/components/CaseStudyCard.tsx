import { INDUSTRY_LABELS, type CaseStudy } from '../data/customers';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="case-study-card" data-testid="case-study-card">
      <span className="tag-chip" data-testid="case-study-industry">
        {INDUSTRY_LABELS[study.industry]}
      </span>
      <h3 className="case-study-company">{study.company}</h3>
      <p className="case-study-metric" data-testid="case-study-metric">
        {study.metric}
      </p>
      <p className="muted">{study.summary}</p>
    </article>
  );
}
