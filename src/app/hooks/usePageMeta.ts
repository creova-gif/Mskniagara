import { useEffect } from 'react';

/**
 * Sets the document title and meta description for the current route.
 *
 * This is a client-rendered SPA with a single static <title>/<meta
 * description> in index.html (used as the default for first paint and for
 * crawlers that don't execute JS). Calling this from a page component
 * overrides both for the lifetime of that page, giving every route a
 * distinct, search- and screen-reader-friendly title instead of sharing
 * one generic title across the whole site.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      meta?.setAttribute('content', description);
    }
  }, [title, description]);
}
