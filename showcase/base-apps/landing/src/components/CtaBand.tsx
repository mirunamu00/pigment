import { Link } from 'react-router';

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-band-heading" data-testid="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2 id="cta-band-heading">Give your team its time back</h2>
          <p className="muted">Start a 14-day trial. No card needed, and you can invite the whole team.</p>
        </div>
        <div className="cta-actions">
          <Link to="/signup" className="button button-primary button-large" data-testid="cta-band-signup">
            Start free trial
          </Link>
          <Link to="/pricing" className="button button-large" data-testid="cta-band-pricing">
            Compare plans
          </Link>
        </div>
      </div>
    </section>
  );
}
