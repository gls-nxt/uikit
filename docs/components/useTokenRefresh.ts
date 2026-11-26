import { useEffect, useState } from 'react';

/** Changes whenever the resolved token values can change: OS colour scheme, or `data-theme` / `data-viewport` on the root. */
export function useTokenRefresh(): number {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const bump = () => setVersion((v) => v + 1);
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', bump);
    const observer = new MutationObserver(bump);
    observer.observe(document.documentElement, {
      attributeFilter: ['data-theme', 'data-viewport'],
    });
    return () => {
      scheme.removeEventListener('change', bump);
      observer.disconnect();
    };
  }, []);

  return version;
}
