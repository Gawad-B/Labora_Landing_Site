import { useEffect, useState } from 'react';

/**
 * Which section the reader is currently in, for marking the nav.
 *
 * Chooses the section whose top is closest to just below the sticky header,
 * rather than trusting `isIntersecting` alone: two sections are on screen at
 * once for most of a scroll, and picking "the first one intersecting" makes the
 * marker jump back and forth at every boundary.
 *
 * Returns an empty string in the hero, where no nav item should be lit.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const read = (): void => {
      // The line the reader is actually reading at, not the top of the window.
      const line = 140;
      let current = '';
      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        const { top, bottom } = node.getBoundingClientRect();
        if (top <= line && bottom > line) {
          current = id;
          break;
        }
      }
      setActive(current);
    };

    read();
    // Passive: this must never delay the scroll it is watching.
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [ids]);

  return active;
}
