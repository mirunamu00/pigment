import { Link } from 'react-router';
import CodeBlock from '../components/CodeBlock';
import { groups, pagePath, pagesInGroup, QUICK_START_CODE } from '../data/docs';
import { TOOL_NAME } from '../data/site';

export default function HomePage() {
  return (
    <div className="home" data-testid="docs-home">
      <header className="home-intro">
        <h1>{TOOL_NAME} documentation</h1>
        <p className="lead">
          {TOOL_NAME} is a command-line task runner for JavaScript and TypeScript repositories. It runs your
          scripts in the right order and skips the ones whose inputs have not changed.
        </p>
        <Link to="/docs/getting-started/installation" className="button button-primary" data-testid="home-get-started">
          Get started
        </Link>
      </header>

      <section className="home-section" aria-labelledby="sections-heading">
        <h2 id="sections-heading">Browse the docs</h2>
        <ul className="section-cards">
          {groups.map((group) => {
            const first = pagesInGroup(group.id)[0];
            return (
              <li key={group.id} className="section-card" data-testid="section-card">
                <h3 className="section-card-title">
                  <Link to={pagePath(first)} className="section-card-link" data-testid="section-card-link">
                    {group.label}
                  </Link>
                </h3>
                <p className="muted">{group.description}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="quick-start-heading" data-testid="home-quick-start">
        <h2 id="quick-start-heading">Quick start</h2>
        <p>Install the CLI, generate a config from your existing scripts and run your first cached build.</p>
        <CodeBlock code={QUICK_START_CODE} language="bash" />
      </section>
    </div>
  );
}
