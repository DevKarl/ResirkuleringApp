export const countOccurrences = <T>(
  data: T[] | undefined,
  getKey: (item: T) => string
): Record<string, number> =>
  (data || []).reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
