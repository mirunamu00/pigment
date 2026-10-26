import { Link } from 'react-router';
import { sections } from '../data/stories';
import { Logo } from './Logo';
import { NewsletterForm } from './Newsletter';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <Logo size="small" />
          <p>
            Halfpenny is an independent magazine about Calder, funded by its readers and owned by nobody else. Published
            online every weekday since 2019.
          </p>
          <div className="site-footer__signup">
            <h2 className="site-footer__heading">Get the Weekender</h2>
            <NewsletterForm testPrefix="footer-newsletter" variant="footer" />
          </div>
        </div>
        <nav aria-label="Sections" className="site-footer__col">
          <h2 className="site-footer__heading">Sections</h2>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <Link to={`/section/${s.id}`}>{s.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/events">Listings</Link>
            </li>
            <li>
              <Link to="/stories/saturday-at-the-pell-street-flea">Photo essays</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Halfpenny" className="site-footer__col">
          <h2 className="site-footer__heading">Halfpenny</h2>
          <ul>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/about#membership">Membership</Link>
            </li>
            <li>
              <Link to="/newsletters">Newsletters</Link>
            </li>
            <li>
              <Link to="/pitch">Pitch us a story</Link>
            </li>
            <li>
              <Link to="/advertise">Advertise</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Legal" className="site-footer__col">
          <h2 className="site-footer__heading">The small print</h2>
          <ul>
            <li>
              <Link to="/corrections">Corrections</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <div className="site-footer__base">
        <p>© 2026 Halfpenny Media CIC. Registered in England, no. 11893204. 4 Printworks Yard, Calder.</p>
        <p>Photography in this issue is public domain (CC0). Credits on each caption.</p>
        </div>
      </div>
    </footer>
  );
}
