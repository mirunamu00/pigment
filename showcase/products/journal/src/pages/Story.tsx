import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { BookmarkIcon, CheckIcon, LinkIcon, MailIcon } from '../components/Icons';
import { Img } from '../components/Img';
import { Kicker, StoryCard } from '../components/StoryCard';
import { creditLine, photo } from '../data/photos';
import { authors, latest, sectionById, storiesIn, storyBySlug, type Block, type Story } from '../data/stories';
import { useTitle } from '../useTitle';
import { NotFound } from './NotFound';

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);
}

function Figure({ name, caption, className }: { name: string; caption: string; className?: string }) {
  return (
    <figure className={`figure ${className ?? ''}`}>
      <Img name={name} />
      <figcaption>
        {caption} <span className="figure__credit">{creditLine(photo(name))}</span>
      </figcaption>
    </figure>
  );
}

function BlockView({ block, first }: { block: Block; first: boolean }) {
  switch (block.type) {
    case 'p':
      return <p className={first ? 'has-dropcap' : undefined}>{block.text}</p>;
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'quote':
      return (
        <blockquote className="pull-quote">
          <p>“{block.text}”</p>
          <cite>— {block.cite}</cite>
        </blockquote>
      );
    case 'photo':
      return <Figure name={block.photo} caption={block.caption} className={block.wide ? 'figure--wide' : 'figure--inline'} />;
  }
}

function ShareRow({ story, position }: { story: Story; position: 'top' | 'bottom' }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
    } catch {
      /* clipboard can be blocked; the confirmation still shows the link is ready */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };
  return (
    <div className={`share-row share-row--${position}`}>
      {position === 'bottom' ? <p className="share-row__label">Share this story</p> : null}
      <ul className="share-row__list">
        <li>
          <button type="button" className="icon-button" onClick={copy} data-testid={`share-copy-${position}`}>
            {copied ? <CheckIcon /> : <LinkIcon />}
            <span>{copied ? 'Link copied' : 'Copy link'}</span>
          </button>
        </li>
        <li>
          <a
            className="icon-button"
            href={`mailto:?subject=${encodeURIComponent(story.title)}&body=${encodeURIComponent('From Halfpenny: ' + story.title)}`}
          >
            <MailIcon />
            <span>Email</span>
          </a>
        </li>
        <li>
          <button
            type="button"
            className="icon-button"
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
            data-testid={`save-story-${position}`}
          >
            <BookmarkIcon />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export function StoryPage() {
  const { slug = '' } = useParams();
  const story = storyBySlug(slug);
  useTitle(story?.title ?? 'Page not found');
  if (!story) return <NotFound />;

  const section = sectionById(story.section)!;
  const author = authors[story.author];
  const related = [
    ...storiesIn(story.section).filter((s) => s.slug !== story.slug),
    ...latest.filter((s) => s.section !== story.section),
  ].slice(0, 3);
  const firstP = story.body.findIndex((b) => b.type === 'p');

  return (
    <article className="article">
      <header className="container article__header">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link to="/">Front page</Link>
          <span aria-hidden>/</span>
          <Link to={`/section/${section.id}`}>{section.name}</Link>
        </nav>
        <Kicker story={story} />
        <h1 className="article__title">{story.title}</h1>
        <p className="article__standfirst">{story.dek}</p>
        <div className="article__byline">
          <span className="avatar" aria-hidden>
            {initials(story.author)}
          </span>
          <div>
            <p className="article__author">
              By <a href="#author">{story.author}</a>
              {author ? <span className="article__role">, {author.role}</span> : null}
            </p>
            <p className="meta">
              <time dateTime={story.iso}>{story.date}</time>
              <span aria-hidden>·</span>
              <span>{story.read} min read</span>
            </p>
          </div>
          <ShareRow story={story} position="top" />
        </div>
      </header>

      <div className="container">
        <Figure name={story.photo} caption={story.caption} className="figure--hero" />
      </div>

      <div className="container article__layout">
        <div className="article__body prose">
          {story.verdict ? (
            <aside className="verdict" aria-label="At a glance">
              <p className="verdict__place">{story.verdict.place}</p>
              <p>{story.verdict.address}</p>
              <p>{story.verdict.price}</p>
              <p className="verdict__rating" aria-label={`Rated ${story.verdict.rating} out of 5`}>
                {'●'.repeat(story.verdict.rating)}
                <span className="verdict__rating-off">{'●'.repeat(5 - story.verdict.rating)}</span>
                <span className="verdict__score">{story.verdict.rating}/5</span>
              </p>
            </aside>
          ) : null}
          {story.body.map((b, i) => (
            <BlockView key={i} block={b} first={i === firstP} />
          ))}
          <p className="article__end" aria-hidden>
            ◐
          </p>

          <ShareRow story={story} position="bottom" />

          <section id="author" className="author-box" aria-label="About the author">
            <span className="avatar avatar--large" aria-hidden>
              {initials(story.author)}
            </span>
            <div>
              <p className="author-box__name">{story.author}</p>
              {author ? (
                <>
                  <p className="author-box__role">{author.role}</p>
                  <p className="author-box__bio">{author.bio}</p>
                </>
              ) : null}
            </div>
          </section>
        </div>

        <aside className="article__aside" aria-label="Membership">
          <div className="member-card">
            <p className="kicker">Reader-funded</p>
            <p className="member-card__title">Halfpenny is paid for by 3,400 members</p>
            <p>No paywall, no billionaire owner. If you read us most weeks, help keep it that way.</p>
            <Link to="/about#membership" className="button button--primary button--block">
              Become a member
            </Link>
          </div>
        </aside>
      </div>

      <section className="related" aria-labelledby="related-heading">
        <div className="container">
          <h2 id="related-heading" className="rule-heading">
            More from {section.name}
          </h2>
          <div className="grid grid--3">
            {related.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
