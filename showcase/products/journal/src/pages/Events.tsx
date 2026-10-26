import { useState } from 'react';
import { Link } from 'react-router';
import { ClockIcon, PinIcon } from '../components/Icons';
import { eventCategories, eventDays, events, type EventCategory } from '../data/events';
import { useTitle } from '../useTitle';

export function Events() {
  useTitle('Listings');
  const [category, setCategory] = useState<EventCategory | 'All'>('All');
  const [picksOnly, setPicksOnly] = useState(false);

  const filtered = events.filter((e) => (category === 'All' || e.category === category) && (!picksOnly || e.pick));

  const reset = () => {
    setCategory('All');
    setPicksOnly(false);
  };

  return (
    <>
      <header className="section-header">
        <div className="container">
          <p className="kicker">Listings</p>
          <h1 className="section-header__title">What’s on in Calder</h1>
          <p className="section-header__intro">
            Thursday 29 October – Sunday 1 November. Every event is checked by our listings desk, and our picks are the ones
            we are going to ourselves.
          </p>
          <p className="meta">
            <span>
              Compiled by <span className="meta__author">Bea Lindqvist</span>
            </span>
            <span aria-hidden>·</span>
            <span>Updated Monday 26 October</span>
          </p>
        </div>
      </header>

      <div className="container events-page">
        <div className="events-toolbar">
          <div className="chips" role="group" aria-label="Filter by category">
            {(['All', ...eventCategories] as Array<EventCategory | 'All'>).map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                data-testid={`event-filter-${c.toLowerCase()}`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="toggle" data-testid="event-picks-only">
            <input type="checkbox" checked={picksOnly} onChange={(e) => setPicksOnly(e.target.checked)} />
            <span className="toggle__track" aria-hidden />
            <span>Halfpenny picks only</span>
          </label>
        </div>

        <p className="events-count" aria-live="polite" data-testid="events-count">
          {filtered.length} {filtered.length === 1 ? 'event' : 'events'}
          {category !== 'All' ? ` in ${category.toLowerCase()}` : ''} over four days
        </p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">Nothing matches those filters this weekend.</p>
            <button type="button" className="button button--secondary" onClick={reset}>
              Show all events
            </button>
          </div>
        ) : null}

        {eventDays.map((day) => {
          const list = filtered.filter((e) => e.day === day.id);
          if (list.length === 0) return null;
          return (
            <section key={day.id} className="event-day" aria-labelledby={`day-${day.id}`}>
              <h2 id={`day-${day.id}`} className="event-day__heading">
                <span className="event-day__name">{day.label}</span>
                <span className="event-day__date">{day.date}</span>
              </h2>
              <ul className="event-list">
                {list.map((e) => (
                  <li key={e.id} className="event-row">
                    <p className="event-row__time">
                      <ClockIcon size={15} />
                      {e.time}
                    </p>
                    <div className="event-row__main">
                      <p className="event-row__tags">
                        <span className="tag">{e.category}</span>
                        {e.pick ? <span className="tag tag--pick">Halfpenny pick</span> : null}
                      </p>
                      <h3 className="event-row__title">{e.title}</h3>
                      <p className="event-row__blurb">{e.blurb}</p>
                      <p className="event-row__venue">
                        <PinIcon size={15} />
                        {e.venue}, {e.area}
                      </p>
                    </div>
                    <p className="event-row__price">{e.price}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <aside className="submit-event">
          <div>
            <h2 className="submit-event__title">Running something?</h2>
            <p>Listings are free. Send us the details at least ten days ahead and we’ll consider it for the guide.</p>
          </div>
          <Link to="/contact" className="button button--secondary">
            Submit an event
          </Link>
        </aside>
      </div>
    </>
  );
}
