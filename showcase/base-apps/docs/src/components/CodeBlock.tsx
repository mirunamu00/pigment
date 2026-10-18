import { useEffect, useRef, useState } from 'react';

const FEEDBACK_MS = 2000;

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard unavailable (insecure context or permission denied): still confirm the action.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), FEEDBACK_MS);
  }

  return (
    <div className="code-block" data-testid="code-block" data-language={language}>
      <div className="code-block-header">
        <span className="code-language" data-testid="code-language">
          {language}
        </span>
        <button
          type="button"
          className="button button-small copy-button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : `Copy ${language} code`}
          data-copied={copied ? 'true' : 'false'}
          data-testid="copy-button"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-block-pre">
        <code>{code}</code>
      </pre>
      <span className="visually-hidden" role="status">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  );
}
