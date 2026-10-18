import { Link } from 'react-router';
import NewsletterForm from './NewsletterForm';
import { BRAND, FOOTER_COLUMNS } from '../data/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="container site-footer-inner">
        <div className="footer-brand">
          <p className="footer-brand-name">{BRAND}</p>
          <p className="muted small">Scheduling for teams that would rather be in the meeting than arranging it.</p>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.heading} className="footer-column" aria-label={column.heading} data-testid="footer-column">
            <h2 className="footer-heading">{column.heading}</h2>
            <ul className="footer-links">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link" data-testid="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <NewsletterForm />
      </div>
      <div className="container footer-bottom">
        <p className="muted small">
          {BRAND} is a fictional product made for testing. No meetings were harmed.
        </p>
      </div>
    </footer>
  );
}
