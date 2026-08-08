export interface LocaleString {
  en: string;
  fr: string;
}

export function pickLocale(value: LocaleString | undefined | null, language: 'en' | 'fr'): string {
  if (!value) return '';
  return language === 'fr' ? value.fr : value.en;
}
