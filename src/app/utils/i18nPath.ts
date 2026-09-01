/**
 * Pure path helpers for the site's URL-based bilingual routing (English at
 * the bare path, French under a `/fr` prefix). No React/router imports here
 * on purpose — LanguageContext.tsx and LocalizedLink.tsx both depend on
 * these, and importing between those two directly would be circular.
 */
export type Language = 'en' | 'fr';

/** True if the given pathname is in the French namespace (`/fr` or `/fr/...`). */
export function isFrenchPath(pathname: string): boolean {
  return pathname === '/fr' || pathname.startsWith('/fr/');
}

/** Strips the `/fr` prefix, if present, returning the bare (English) path. */
export function stripLangPrefix(pathname: string): string {
  if (pathname === '/fr') return '/';
  if (pathname.startsWith('/fr/')) return pathname.slice(3);
  return pathname;
}

/** Routes that are never localized (admin tooling, not visitor-facing content). */
const UNLOCALIZED_PREFIXES = ['/studio'];

/** Rewrites a root-relative path into the given language's namespace. External/hash/mailto/tel links pass through unchanged. */
export function localizePath(to: string, language: Language): string {
  if (!to.startsWith('/') || to.startsWith('//')) return to;
  if (UNLOCALIZED_PREFIXES.some((p) => to === p || to.startsWith(`${p}/`))) return to;

  const bare = stripLangPrefix(to);
  if (language === 'fr') return bare === '/' ? '/fr' : `/fr${bare}`;
  return bare;
}
