import { Link } from 'react-router';
import { sectionById, storyHref, type Story } from '../data/stories';
import { Img } from './Img';

interface Props {
  story: Story;
  variant?: 'card' | 'row' | 'compact' | 'feature';
  showSection?: boolean;
  showDek?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function Kicker({ story, showSection = true }: { story: Story; showSection?: boolean }) {
  const section = sectionById(story.section);
  return (
    <p className="kicker">
      {showSection && section ? (
        <>
          <Link to={`/section/${section.id}`} className="kicker__section">
            {section.name}
          </Link>
          <span className="kicker__sep" aria-hidden>
            /
          </span>
        </>
      ) : null}
      <span>{story.kind}</span>
    </p>
  );
}

export function Meta({ story }: { story: Story }) {
  return (
    <p className="meta">
      <span className="meta__author">{story.author}</span>
      <span aria-hidden>·</span>
      <time dateTime={story.iso}>{story.date}</time>
      <span aria-hidden>·</span>
      <span>{story.read} min read</span>
    </p>
  );
}

export function StoryCard({ story, variant = 'card', showSection = true, showDek = true, headingLevel = 'h3' }: Props) {
  const H = headingLevel;
  return (
    <article className={`story story--${variant}`}>
      {variant !== 'compact' ? (
        <Link to={storyHref(story)} className="story__media" tabIndex={-1} aria-hidden>
          <Img name={story.photo} />
        </Link>
      ) : null}
      <div className="story__body">
        <Kicker story={story} showSection={showSection} />
        <H className="story__title">
          <Link to={storyHref(story)}>{story.title}</Link>
        </H>
        {showDek && variant !== 'compact' ? <p className="story__dek">{story.dek}</p> : null}
        <Meta story={story} />
      </div>
    </article>
  );
}
