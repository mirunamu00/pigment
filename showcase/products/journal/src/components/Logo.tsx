import { Link } from 'react-router';
import { Mark } from './Icons';

export function Logo({ size = 'large' }: { size?: 'large' | 'small' }) {
  return (
    <Link to="/" className={`logo logo--${size}`} aria-label="Halfpenny, front page">
      <Mark size={size === 'large' ? 34 : 24} />
      <span className="logo__word">Halfpenny</span>
    </Link>
  );
}
