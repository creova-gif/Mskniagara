import type { LocaleString } from '../locale';

export interface TimelineEvent {
  _id: string;
  title: LocaleString;
  description?: LocaleString;
  dateValue: string; // ISO date
  time?: string;
  location?: LocaleString;
  locationUrl?: string;
  registration?: LocaleString;
  registrationUrl?: string;
  isFeatured?: boolean;
}

export const timelineEventsQuery = /* groq */ `
*[_type == "timelineEvent"] | order(dateValue asc) {
  _id,
  title,
  description,
  dateValue,
  time,
  location,
  locationUrl,
  registration,
  registrationUrl,
  isFeatured
}`;
