import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — Halfpenny` : 'Halfpenny — Food, design, music and neighbourhoods in Calder';
  }, [title]);
}
