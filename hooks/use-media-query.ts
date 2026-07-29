"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a CSS media query currently matches.
 * Useful for conditionally rendering desktop-only interactions
 * (e.g. the future admin dashboard's data tables vs. mobile cards).
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    listener();
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
