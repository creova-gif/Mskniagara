import { useEffect, useState } from 'react';
import { sanityClient } from './client';

interface UseSanityQueryResult<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
}

/**
 * Fetches a GROQ query on mount. Content here changes rarely (edited by hand
 * in Studio), so a simple fetch-on-mount is enough — no need for a caching
 * data layer at this site's scale.
 */
export function useSanityQuery<T>(query: string, params: Record<string, unknown> = {}): UseSanityQueryResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    sanityClient
      .fetch<T>(query, params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}
