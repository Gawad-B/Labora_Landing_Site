import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Two things this is careful about, because both turn a nicety into a bug:
 *
 *   * If `IntersectionObserver` is missing, or the user asks for reduced
 *     motion, the element starts visible and no class is ever applied. Content
 *     that hides itself and then fails to un-hide is worse than no animation.
 *   * It unobserves after the first reveal. Re-animating a section every time
 *     it re-enters the viewport is distracting on a page people scroll up and
 *     down while reading.
 *
 * `delay` staggers members of a grid; keep it small, a few tens of
 * milliseconds, or the last card in a row arrives noticeably late.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (!('IntersectionObserver' in window)) return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // A short delay reads as stagger; a long one reads as a slow page.
          window.setTimeout(() => setShown(true), delay);
          observer.unobserve(entry.target);
        }
      },
      // Start a little before the element reaches the fold, so it has finished
      // arriving by the time it is properly on screen.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, shown]);

  return { ref, className: shown ? 'reveal reveal-in' : 'reveal' };
}
