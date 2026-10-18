import { Fragment } from 'react';

const TOKEN = /(`[^`]+`|\[\[[^\]]+\]\])/g;

/** Renders `code` as inline code and [[Key]] as a keyboard key; everything else as plain text. */
export default function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter((part) => part !== '');
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="inline-code">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('[[') && part.endsWith(']]')) {
          return (
            <kbd key={index} className="kbd" data-testid="kbd">
              {part.slice(2, -2)}
            </kbd>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
