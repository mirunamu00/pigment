import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ClockIcon, PinIcon } from '../components/Icons';
import Img from '../components/Img';
import { useTitle } from '../useTitle';

const PRINCIPLES = [
  {
    title: 'Same farms, every year',
    text: 'Nine of the fourteen producers we buy from have sold to us for three harvests or more. Long relationships let them plan, and let us pay before the crop is picked.',
  },
  {
    title: 'Prices we publish',
    text: 'Every spring we publish what we paid for each coffee, per kilo, at the farm gate and delivered. Last year’s average was £6.82/kg of green coffee.',
  },
  {
    title: 'Quality pays for itself',
    text: 'We pay a premium for every point above 85 on our cupping table, so better coffee means a better price for the people who grew it.',
  },
  {
    title: 'Less, roasted better',
    text: 'Ten coffees at a time, never more. A short list lets us roast each one often enough to get it right.',
  },
];

const TEAM = [
  { name: 'Rosie Calder', role: 'Founder & head roaster' },
  { name: 'Ana Ferreira', role: 'Green coffee buyer' },
  { name: 'Joe Hartley', role: 'Production roaster' },
  { name: 'Dev Mistry', role: 'Bar manager' },
  { name: 'Megan Price', role: 'Subscriptions & customer care' },
  { name: 'Tomasz Nowak', role: 'Packing & dispatch' },
];

const HOURS = [
  ['Monday', 'Roasting, closed'],
  ['Tue – Fri', '8am – 3pm'],
  ['Saturday', '9am – 3pm'],
  ['Sunday', 'Closed'],
];

export default function About() {
  useTitle('Our story — Kiln Street Coffee');
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Our story</span>
          </nav>
          <h1>A roastery in an old cutlery works</h1>
          <p className="lede">
            Kiln Street started in 2017 with a secondhand 5 kg roaster, a lease on half a unit in Kelham Island and a plan to
            sell coffee to the three cafés on our street.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container about-intro">
          <Img name="roastery-machine" className="about-photo-tall" />
          <div className="about-copy">
            <h2>Our story</h2>
            <p>
              Rosie Calder spent eight years behind espresso machines in Leeds and London before deciding she wanted to know
              where the coffee came from. She bought her first roaster at auction, set it up under the arches of a former
              cutlery works on Kiln Street, and roasted on Mondays after her café shifts.
            </p>
            <p>
              The three cafés became nine, then thirty-one. In 2020 we started posting coffee to people at home, and our
              subscription grew faster than anything we had planned for. Today there are six of us, a 12 kg roaster, and
              2,318 subscribers across the UK.
            </p>
            <p>
              We’re still on Kiln Street. The old 5 kg roaster sits by the door; we use it to roast samples on Friday
              afternoons.
            </p>
            <dl className="about-stats">
              <div>
                <dt>Founded</dt>
                <dd>2017</dd>
              </div>
              <div>
                <dt>Roasted last year</dt>
                <dd>41.6 tonnes</dd>
              </div>
              <div>
                <dt>Wholesale partners</dt>
                <dd>31 cafés</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-tinted" aria-labelledby="roastery-title">
        <div className="container roastery-grid">
          <div className="about-copy">
            <p className="eyebrow">The roastery</p>
            <h2 id="roastery-title">Twice a week, 12 kilos at a time</h2>
            <p>
              We roast on Monday and Thursday mornings, starting at 6am. Each batch is 12 kg and takes between 10½ and 14
              minutes depending on the coffee. Joe logs every roast and we cup a sample of each one the following day.
            </p>
            <p>
              Bags are filled and sealed by hand, labelled with the roast date and posted by 4pm. Wholesale orders go out
              in our own van around Sheffield, Rotherham and Chesterfield.
            </p>
          </div>
          <div className="roastery-photos">
            <Img name="roaster-drum" />
            <Img name="beans-sack-open" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sourcing-title" id="sourcing">
        <div className="container">
          <div className="section-head split">
            <div>
              <p className="eyebrow">Sourcing</p>
              <h2 id="sourcing-title">How we buy coffee</h2>
              <p className="lede">
                Green coffee is most of what we spend money on, so it’s where we try hardest to do things properly. Four
                rules we’ve kept since the first sack.
              </p>
            </div>
            <Img name="sacks-origin" className="sourcing-photo" />
          </div>
          <ol className="principles">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title}>
                <span className="principle-number">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tinted" aria-labelledby="team-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The team</p>
            <h2 id="team-title">Six people, one roaster</h2>
          </div>
          <ul className="team">
            {TEAM.map((t) => (
              <li key={t.name}>
                <span className="team-initials" aria-hidden="true">
                  {t.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <span className="muted">{t.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="visit-title" id="visit">
        <div className="container visit">
          <Img name="cafe-counter" className="visit-photo" />
          <div className="visit-card">
            <p className="eyebrow">Visit us</p>
            <h2 id="visit-title">The roastery bar</h2>
            <p>
              Six stools, a filter menu that changes every week and the whole range on the shelf. Come on a Thursday morning
              and you’ll smell the roaster from the end of the street.
            </p>
            <div className="visit-details">
              <div>
                <h3>
                  <PinIcon width={18} height={18} /> Address
                </h3>
                <address>
                  Kiln Street Coffee
                  <br />
                  Unit 4, 61 Kiln Street
                  <br />
                  Kelham Island, Sheffield S3 8RQ
                </address>
                <p className="small muted">
                  12 minutes’ walk from Sheffield station. Tram: Shalesmoor. Bike racks out front.
                </p>
              </div>
              <div>
                <h3>
                  <ClockIcon width={18} height={18} /> Opening hours
                </h3>
                <table className="hours">
                  <tbody>
                    {HOURS.map(([d, h]) => (
                      <tr key={d}>
                        <th scope="row">{d}</th>
                        <td>{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <a className="button button-outline" href="mailto:hello@kilnstreet.coffee?subject=Roastery%20visit">
              Book a group cupping
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
