import { useEffect } from 'react';

// Canonical/OG URLs always point at the real production domain, regardless
// of what host is actually serving the page (localhost, a Replit preview,
// a staging deploy) — otherwise search engines could index a throwaway
// preview URL, or every route could report the same canonical as "/".
const PRODUCTION_ORIGIN = 'https://msk-niagara.ca';

/**
 * Sets the document title, meta description, canonical URL, and OG/Twitter
 * URL for the current route.
 *
 * This is a client-rendered SPA with a single static <title>/<meta
 * description>/<link rel="canonical"> in index.html (used as the default
 * for first paint and for crawlers that don't execute JS). Calling this
 * from a page component overrides all of them for the lifetime of that
 * page, so every route reports its own identity instead of every page
 * pointing back at the homepage.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    }

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);

    const canonicalUrl = `${PRODUCTION_ORIGIN}${window.location.pathname}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[name="twitter:url"]')?.setAttribute('content', canonicalUrl);
  }, [title, description]);
}
