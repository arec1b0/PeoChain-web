import { useState, useEffect } from "react";
import { contentService, ContentService } from "@/services/content-service";

export interface UseContentDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useContentData<T>(
  fetcher: (service: ContentService) => Promise<T>,
  dependencies: unknown[] = []
): UseContentDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher(contentService);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error('Content fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Specific hooks for common data
export function useHeroData() {
  return useContentData(service => service.getHeroData());
}

export function useHeroMetrics() {
  return useContentData(service => service.getHeroMetrics());
}

export function useFeatures() {
  return useContentData(service => service.getFeatures());
}

export function useValidatorStats() {
  return useContentData(service => service.getValidatorStats());
}

export function useWhitepaperSections() {
  return useContentData(service => service.getWhitepaperSections());
}