export type CacheInvalidation<T> = (input: T) => T;

export const cacheInvalidation: CacheInvalidation<string> = (x) => x;
