import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  // Initialize state with the current match value to prevent rendering with incorrect data.
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    // Return a sensible default for SSR (Server-Side Rendering).
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);

      // Define a listener function to update matches state
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Add event listener
      mediaQueryList.addEventListener('change', listener);

      // Remove event listener on cleanup
      return () => mediaQueryList.removeEventListener('change', listener);
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;
