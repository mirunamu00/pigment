import { Link } from 'react-router';
import { ArrowIcon } from '../components/Icons';
import { Img } from '../components/Img';
import { NewsletterBand } from '../components/Newsletter';
import { Kicker, Meta, StoryCard } from '../components/StoryCard';
import { eventDays, events } from '../data/events';
import { creditLine, photo } from '../data/photos';
import { LONG_READ, latest, mostRead, sections, storiesIn, storyBySlug, storyHref, type Story } from '../data/stories';
import { useTitle } from '../useTitle';

const PHOTO_ESSAY = 'saturday-at-the-pell-street-flea';

export function Home() {
  useTitle('');
  const lead = storyBySlug(LONG_READ)!;
  const photoEssay = storyBySlug(PHOTO_ESSAY)!;
  const rail = latest.filter((s) => s.slug !== LONG_READ && s.slug !== PHOTO_ESSAY).slice(0, 4);
  const longReads = ['the-label-that-pressed-the-city', 'the-stairwells-of-the-housing-trust'].map((s) => storyBySlug(s)!);
  const shown = new Set([LONG_READ, PHOTO_ESSAY, ...rail.map((s) => s.slug), ...longReads.map((s) => s.slug)]);
  const ranked = mostRead.map((slug) => storyBySlug(slug)!);
  const weekend = events.filter((e) => e.pick || e.id === 'e5' || e.id === 'e13');

  return (
    <>
      <section className="container lead" aria-label="Top stories">
        <article className="lead__story">
          <Link to={storyHref(lead)} className="lead__media" tabIndex={-1} aria-hidden>
            <Img name={lead.photo} />
          </Link>
          <div className="lead__body">
            <Kicker story={lead} />
            <h1 className="lead__title">
              <Link to={storyHref(lead)}>{lead.title}</Link>
            </h1>
            <p className="lead__dek">{lead.dek}</p>
            <Meta story={lead} />
          </div>
        </article>
        <aside className="lead__rail" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="rail-heading">
            Latest
          </h2>
          <ol className="rail-list">
            {rail.map((s) => (
              <li key={s.slug}>
                <StoryCard story={s} variant="row" showDek={false} />
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="container" aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="visually-hidden">
          Latest by section
        </h2>
        <div className="section-columns">
          {sections.map((section) => {
            const items = storiesIn(section.id).filter((s) => !shown.has(s.slug));
            const [first, ...rest] = items;
            return (
              <div key={section.id} className="section-column">
                <div className="section-column__head">
                  <h3 className="section-column__title">
                    <Link to={`/section/${section.id}`}>{section.name}</Link>
                  </h3>
                  <Link to={`/section/${section.id}`} className="more-link" aria-label={`More from ${section.name}`}>
                    More <ArrowIcon size={14} />
                  </Link>
                </div>
                {first ? <StoryCard story={first} showSection={false} showDek={false} /> : null}
                <ul className="section-column__list">
                  {rest.slice(0, 2).map((s) => (
                    <li key={s.slug}>
                      <StoryCard story={s} variant="compact" showSection={false} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container split" aria-label="Most read and long reads">
        <div className="most-read">
          <h2 className="rule-heading">Most read this week</h2>
          <ol className="most-read__list">
            {ranked.map((s, i) => (
              <li key={s.slug} className="most-read__item">
                <span className="most-read__num" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <Link to={storyHref(s)} className="most-read__title">
                    {s.title}
                  </Link>
                  <p className="meta">
                    {sections.find((x) => x.id === s.section)?.name} · {s.read} min read
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="long-reads">
          <h2 className="rule-heading">For the weekend: long reads</h2>
          <div className="grid grid--2">
            {longReads.map((s: Story) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="listings-strip" aria-labelledby="weekend-heading">
        <div className="container">
          <div className="strip-head">
            <div>
              <p className="kicker">Listings · 29 October – 1 November</p>
              <h2 id="weekend-heading" className="strip-head__title">
                This weekend in Calder
              </h2>
            </div>
            <Link to="/events" className="button button--secondary">
              All {events.length} listings <ArrowIcon size={14} />
            </Link>
          </div>
          <ul className="listing-cards">
            {weekend.map((e) => {
              const day = eventDays.find((d) => d.id === e.day)!;
              return (
                <li key={e.id} className="listing-card">
                  <p className="listing-card__day">
                    <span>{day.label.slice(0, 3)}</span>
                    <strong>{day.date.split(' ')[0]}</strong>
                    <span>{day.date.split(' ')[1].slice(0, 3)}</span>
                  </p>
                  <div className="listing-card__body">
                    <p className="tag">{e.category}</p>
                    <h3 className="listing-card__title">
                      <Link to="/events">{e.title}</Link>
                    </h3>
                    <p className="listing-card__where">
                      {e.venue} · {e.time}
                    </p>
                    <p className="listing-card__price">{e.price}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="photo-essay" aria-labelledby="photo-essay-heading">
        <div className="container photo-essay__inner">
          <div className="photo-essay__text">
            <p className="kicker kicker--inverse">Photo essay</p>
            <h2 id="photo-essay-heading" className="photo-essay__title">
              <Link to={storyHref(photoEssay)}>{photoEssay.title}</Link>
            </h2>
            <p className="photo-essay__dek">{photoEssay.dek}</p>
            <p className="meta meta--inverse">
              Photographs by {photoEssay.author} · {photoEssay.date}
            </p>
            <Link to={storyHref(photoEssay)} className="button button--inverse">
              View the photo essay <ArrowIcon size={14} />
            </Link>
          </div>
          <div className="photo-essay__mosaic">
            {['hood-flea-crowd', 'hood-flea-table', 'hood-flea-clothes'].map((name, i) => (
              <figure key={name} className={`mosaic__item mosaic__item--${i + 1}`}>
                <Img name={name} />
                {i === 0 ? <figcaption>{creditLine(photo(name))}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
