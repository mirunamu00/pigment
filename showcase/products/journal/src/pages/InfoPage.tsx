import { Link, useParams } from 'react-router';
import { NewsletterForm } from '../components/Newsletter';
import { useTitle } from '../useTitle';
import { NotFound } from './NotFound';

interface Info {
  title: string;
  kicker: string;
  lede: string;
  sections: Array<{ heading: string; text: string[] }>;
  newsletter?: boolean;
}

const pages: Record<string, Info> = {
  newsletters: {
    kicker: 'Newsletters',
    title: 'Halfpenny in your inbox',
    lede: 'Two free newsletters, written by the people who edit the magazine. No tracking pixels, no third-party ads.',
    newsletter: true,
    sections: [
      { heading: 'The Weekender — every Thursday', text: ['Bea Lindqvist’s pick of the weekend: gigs, markets, openings, talks and the one thing you should book today. Around 21,000 readers.'] },
      { heading: 'The Long Read — first Sunday of the month', text: ['One long story from the magazine, sent in full, with a note from the editor on how it came together. Members also get the audio version.'] },
    ],
  },
  'sign-in': {
    kicker: 'Members',
    title: 'Sign in',
    lede: 'Members sign in with a link sent to their email — there is no password to remember.',
    sections: [
      { heading: 'Not a member yet?', text: ['Membership starts at £5 a month and pays for everything you read here. Every member gets the print annual, early listings and members’ evenings.'] },
      { heading: 'Trouble signing in?', text: ['Email members@halfpenny.example and a real person will reply within one working day.'] },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Get in touch',
    lede: 'We read everything that comes in, though we cannot always reply to every message.',
    sections: [
      { heading: 'Newsroom', text: ['Tips, stories and press releases: desk@halfpenny.example. For listings, send details at least ten days ahead to listings@halfpenny.example.'] },
      { heading: 'Our office', text: ['4 Printworks Yard, Alder Street, Calder. We are in most weekdays from 9.30am; please email before visiting.'] },
      { heading: 'Corrections', text: ['If we have got something wrong, tell us at corrections@halfpenny.example. Our corrections policy is published on its own page.'] },
    ],
  },
  pitch: {
    kicker: 'Contributors',
    title: 'Pitch us a story',
    lede: 'We commission around a third of the magazine from freelance writers and photographers, and we pay on publication.',
    sections: [
      { heading: 'What we are looking for', text: ['Stories about Calder that nobody else is telling: a place, a person, a fight, a change. We like reporting more than opinion and specifics more than trends.'] },
      { heading: 'How to pitch', text: ['A short paragraph on the story, why now, and why you. Send it to the section editor by email. We reply to every pitch within two weeks.'] },
      { heading: 'Rates', text: ['£250 for a reported feature up to 1,500 words; £450 for a long-read; £60 for a review. Photography rates on request.'] },
    ],
  },
  advertise: {
    kicker: 'Partnerships',
    title: 'Advertise with Halfpenny',
    lede: 'We carry a small number of ads from independent Calder businesses. We never sell space next to reviews.',
    sections: [
      { heading: 'Who reads us', text: ['Around 140,000 readers a month, two thirds of them in the city. 21,000 newsletter subscribers. 3,400 paying members.'] },
      { heading: 'Get in touch', text: ['Email partners@halfpenny.example for our rate card. We reply within three working days.'] },
    ],
  },
  corrections: {
    kicker: 'Standards',
    title: 'Corrections',
    lede: 'When we get something wrong we fix it, say so at the foot of the story, and list it here.',
    sections: [
      { heading: '19 October 2026', text: ['“The record shops, ranked” gave the wrong closing time for Groove Cellar on Sundays. It closes at 4pm, not 5pm.'] },
      { heading: '2 October 2026', text: ['“Linden Room: breakfast in the old print works” said the print works closed in 1989. It closed in 1991.'] },
    ],
  },
  privacy: {
    kicker: 'The small print',
    title: 'Privacy',
    lede: 'We collect as little about you as we can, and we never sell it.',
    sections: [
      { heading: 'What we keep', text: ['If you subscribe or join, your email address and, for members, your billing details, which are held by our payment provider. We use privacy-friendly analytics that do not set cookies.'] },
      { heading: 'Your rights', text: ['You can ask to see, change or delete anything we hold about you by emailing privacy@halfpenny.example.'] },
    ],
  },
  terms: {
    kicker: 'The small print',
    title: 'Terms',
    lede: 'The short version: please don’t republish our stories without asking.',
    sections: [
      { heading: 'Using our work', text: ['You are welcome to quote a few lines with a link. For anything more, email desk@halfpenny.example.'] },
      { heading: 'Membership', text: ['Memberships renew automatically and can be cancelled at any time from your account. Yearly memberships are refunded pro rata.'] },
    ],
  },
  accessibility: {
    kicker: 'The small print',
    title: 'Accessibility',
    lede: 'Halfpenny should work for everyone, on any device, with any assistive technology.',
    sections: [
      { heading: 'What we do', text: ['Every photograph carries a text description. The site can be used entirely from a keyboard and respects your system’s text size.'] },
      { heading: 'Tell us', text: ['If something does not work for you, email access@halfpenny.example and we will fix it.'] },
    ],
  },
};

export function InfoPage() {
  const { page = '' } = useParams();
  const info = pages[page];
  useTitle(info?.title ?? 'Page not found');
  if (!info) return <NotFound />;
  return (
    <div className="container page-pad">
      <div className="info-page">
        <p className="kicker">{info.kicker}</p>
        <h1 className="display">{info.title}</h1>
        <p className="lede">{info.lede}</p>
        {info.sections.map((s) => (
          <section key={s.heading} className="info-page__section">
            <h2>{s.heading}</h2>
            {s.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </section>
        ))}
        {info.newsletter ? (
          <div className="info-page__signup">
            <NewsletterForm testPrefix="page-newsletter" variant="footer" />
          </div>
        ) : null}
        <p className="info-page__back">
          <Link to="/">← Back to the front page</Link>
        </p>
      </div>
    </div>
  );
}
