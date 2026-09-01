/**
 * Language-aware drop-in replacements for react-router's `Link` and
 * `useNavigate`.
 *
 * The site is bilingual with real, crawlable URLs per language (English at
 * the bare path, French under a `/fr` prefix — see App.tsx). Every internal
 * link needs to stay within the current language when clicked, or a visitor
 * reading the French site would get silently bounced back to English the
 * moment they click anything. Rather than editing every `<Link to="...">`
 * call site across the app, call sites keep using the exact same `to="/x"`
 * paths they always have — only the import changes, from `react-router` to
 * this file — and localization happens here, once.
 */
import { Link as RouterLink, useNavigate, type LinkProps } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { localizePath } from '../utils/i18nPath';

export function Link({ to, ...props }: LinkProps) {
  const { language } = useLanguage();
  const target = typeof to === 'string' ? localizePath(to, language) : to;
  return <RouterLink to={target} {...props} />;
}

/** Language-aware replacement for react-router's `useNavigate`. */
export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (to: string, options?: { replace?: boolean; state?: unknown }) =>
    navigate(localizePath(to, language), options);
}
