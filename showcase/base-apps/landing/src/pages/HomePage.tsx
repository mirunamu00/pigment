import { Link } from 'react-router';
import CtaBand from '../components/CtaBand';
import FaqList from '../components/FaqList';
import IconPlaceholder from '../components/IconPlaceholder';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { FAQ_ITEMS } from '../data/faq';
import { FEATURES, LOGO_NAMES, STATS, STEPS, TESTIMONIALS } from '../data/site';

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title" data-testid="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Scheduling for teams</p>
            <h1 id="hero-title" className="hero-title" data-testid="hero-title">
              Meetings that book themselves
            </h1>
            <p className="hero-subcopy">
              Hourglade finds the time that works for everyone, sends the invite and the reminders, and keeps every
              calendar in sync. Your team gets back to the work the meeting was about.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="button button-primary button-large" data-testid="hero-primary-cta">
                Start free trial
              </Link>
              <Link to="/#how-it-works" className="button button-large" data-testid="hero-secondary-cta">
                See how it works
              </Link>
            </div>
            <p className="muted small">Free for 14 days. No card needed.</p>
          </div>
          <div className="hero-media" data-testid="hero-image">
            <ImagePlaceholder alt="A week view of a shared team calendar with open booking slots" />
          </div>
        </div>
      </section>

      <section className="logo-strip" aria-labelledby="logo-strip-heading" data-testid="logo-strip">
        <div className="container">
          <h2 id="logo-strip-heading" className="section-label">
            Trusted by teams at
          </h2>
          <ul className="logo-list">
            {LOGO_NAMES.map((name) => (
              <li key={name} className="logo-item" data-testid="logo-item">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="features-heading" data-testid="features">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Features</p>
            <h2 id="features-heading">Everything scheduling needs, nothing it doesn't</h2>
            <p className="muted">Start with a booking page. Add team routing, reminders and limits when you need them.</p>
          </div>
          <ul className="feature-grid">
            {FEATURES.map((feature) => (
              <li key={feature.id} className="feature-card" data-testid="feature-card">
                <IconPlaceholder />
                <h3 className="feature-title">{feature.title}</h3>
                <p className="muted">{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="how-it-works"
        className="section section-muted"
        aria-labelledby="how-heading"
        data-testid="how-it-works"
      >
        <div className="container how-inner">
          <div className="how-intro">
            <p className="eyebrow">How it works</p>
            <h2 id="how-heading">Set up in an afternoon</h2>
            <p className="muted">
              There is nothing to install. Connect a calendar, decide when you can be booked, and share the link.
            </p>
            <Link to="/signup" className="button" data-testid="how-signup">
              Create your link
            </Link>
          </div>
          <ol className="step-list">
            {STEPS.map((step, index) => (
              <li key={step.title} className="step-item" data-testid="step-item">
                <span className="step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="stats-band" aria-labelledby="stats-heading" data-testid="stats">
        <div className="container">
          <h2 id="stats-heading" className="visually-hidden">
            Hourglade in numbers
          </h2>
          <dl className="stat-list">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item" data-testid="stat-item">
                <dt className="stat-label">{stat.label}</dt>
                <dd className="stat-value" data-testid="stat-value">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="testimonials" className="section" aria-labelledby="testimonials-heading" data-testid="testimonials">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Customers</p>
            <h2 id="testimonials-heading">Teams that stopped chasing calendars</h2>
          </div>
          <ul className="testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <li key={item.name} className="testimonial" data-testid="testimonial">
                <figure>
                  <blockquote>
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption>
                    <span className="testimonial-name" data-testid="testimonial-name">
                      {item.name}
                    </span>
                    <span className="muted small">{item.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p>
            <Link to="/customers" data-testid="testimonials-more">
              Read customer stories
            </Link>
          </p>
        </div>
      </section>

      <section id="faq" className="section section-muted" aria-labelledby="faq-heading" data-testid="faq">
        <div className="container container-narrow">
          <div className="section-header">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading">Common questions</h2>
          </div>
          <FaqList items={FAQ_ITEMS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
