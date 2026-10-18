import { useId, useState } from 'react';

type Answer = 'yes' | 'no';

const THANKS: Record<Answer, string> = {
  yes: 'Thanks for your feedback. Glad it helped.',
  no: 'Thanks for letting us know. We will use this to improve the page.',
};

/** "Was this page helpful?" Remount it per page (key) so each page starts unanswered. */
export default function Feedback() {
  const headingId = useId();
  const [answer, setAnswer] = useState<Answer | null>(null);

  return (
    <section className="feedback" aria-labelledby={headingId} data-testid="feedback">
      <h2 id={headingId} className="feedback-heading">
        Was this page helpful?
      </h2>
      {answer ? (
        <p className="form-success" role="status" data-testid="feedback-thanks">
          {THANKS[answer]}
        </p>
      ) : (
        <div className="feedback-actions">
          <button type="button" className="button" onClick={() => setAnswer('yes')} data-testid="feedback-yes">
            Yes
          </button>
          <button type="button" className="button" onClick={() => setAnswer('no')} data-testid="feedback-no">
            No
          </button>
        </div>
      )}
    </section>
  );
}
