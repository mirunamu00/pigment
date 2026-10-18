import { useState } from 'react';
import CaseStudyCard from '../components/CaseStudyCard';
import CtaBand from '../components/CtaBand';
import { CASE_STUDIES, FEATURED_QUOTE, INDUSTRIES, type IndustryId } from '../data/customers';

type IndustryFilter = IndustryId | 'all';

export default function CustomersPage() {
  const [industry, setIndustry] = useState<IndustryFilter>('all');
  const visible = CASE_STUDIES.filter((study) => industry === 'all' || study.industry === industry);
  const filterOptions: { id: IndustryFilter; label: string }[] = [{ id: 'all', label: 'All' }, ...INDUSTRIES];

  return (
    <>
      <section className="section page-hero" aria-labelledby="customers-title">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Customers</p>
            <h1 id="customers-title">Teams that run on Hourglade</h1>
            <p className="muted">Clinics, schools, warehouses and studios use Hourglade to keep their days in order.</p>
          </div>

          <figure className="featured-quote" data-testid="featured-quote">
            <blockquote>
              <p>{FEATURED_QUOTE.quote}</p>
            </blockquote>
            <figcaption>
              <span className="testimonial-name">{FEATURED_QUOTE.name}</span>
              <span className="muted small">{FEATURED_QUOTE.role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="stories-heading" data-testid="case-studies">
        <div className="container">
          <h2 id="stories-heading">Customer stories</h2>
          <div role="group" aria-label="Filter by industry" className="filter-group" data-testid="industry-filter">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="button filter-button"
                aria-pressed={industry === option.id}
                onClick={() => setIndustry(option.id)}
                data-testid={`industry-filter-${option.id}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="muted small" aria-live="polite" data-testid="customer-count">
            Showing {visible.length} of {CASE_STUDIES.length} customers
          </p>
          <ul className="case-study-grid">
            {visible.map((study) => (
              <li key={study.id}>
                <CaseStudyCard study={study} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
