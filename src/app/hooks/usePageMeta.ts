import { useEffect } from 'react';
import { isFrenchPath, stripLangPrefix } from '../utils/i18nPath';

// Canonical/OG URLs always point at the real production domain, regardless
// of what host is actually serving the page (localhost, a Replit preview,
// a staging deploy) — otherwise search engines could index a throwaway
// preview URL, or every route could report the same canonical as "/".
const PRODUCTION_ORIGIN = 'https://msk-niagara.ca';

function upsertLinkTag(rel: string, hreflang: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Sets the document title, meta description, canonical URL, OG/Twitter URL,
 * and hreflang alternates for the current route.
 *
 * This is a client-rendered SPA with a single static <title>/<meta
 * description>/<link rel="canonical"> in index.html (used as the default
 * for first paint and for crawlers that don't execute JS). Calling this
 * from a page component overrides all of them for the lifetime of that
 * page, so every route reports its own identity instead of every page
 * pointing back at the homepage.
 *
 * Every page exists at two real URLs — bare path (English) and `/fr`-
 * prefixed (French), see App.tsx — so canonical points at whichever one is
 * actually being viewed, and hreflang links tell search engines the other
 * language version exists at its own URL, rather than presenting only one
 * language as though it were the whole site.
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

    const bare = stripLangPrefix(window.location.pathname);
    const enPath = bare;
    const frPath = bare === '/' ? '/fr' : `/fr${bare}`;
    const currentPath = isFrenchPath(window.location.pathname) ? frPath : enPath;

    const canonicalUrl = `${PRODUCTION_ORIGIN}${currentPath}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[name="twitter:url"]')?.setAttribute('content', canonicalUrl);

    const currentLocale = isFrenchPath(window.location.pathname) ? 'fr_CA' : 'en_CA';
    const alternateLocale = currentLocale === 'fr_CA' ? 'en_CA' : 'fr_CA';
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', currentLocale);
    document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content', alternateLocale);

    // Tell search engines the other language version exists, at its own URL.
    upsertLinkTag('alternate', 'en', `${PRODUCTION_ORIGIN}${enPath}`);
    upsertLinkTag('alternate', 'fr', `${PRODUCTION_ORIGIN}${frPath}`);
    upsertLinkTag('alternate', 'x-default', `${PRODUCTION_ORIGIN}${enPath}`);
  }, [title, description]);
}
