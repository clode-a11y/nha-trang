// Caching utility with in-memory storage
// For production with high traffic, add Redis via REDIS_URL env variable
// Install redis package: npm install redis

type CacheValue = {
  data: unknown
  expiresAt: number
}

// In-memory cache
const memoryCache = new Map<string, CacheValue>()

export const cache = {
  /**
   * Get a value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    const cached = memoryCache.get(key)
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data as T
    }
    memoryCache.delete(key)
    return null
  },

  /**
   * Set a value in cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttlSeconds - Time to live in seconds (default: 5 minutes)
   */
  async set(key: string, value: unknown, ttlSeconds: number = 300): Promise<void> {
    memoryCache.set(key, {
      data: value,
      expiresAt: Date.now() + ttlSeconds * 1000
    })
  },

  /**
   * Delete a value from cache
   */
  async del(key: string): Promise<void> {
    memoryCache.delete(key)
  },

  /**
   * Get or set a value with a factory function
   * If cached, returns cached value. Otherwise, calls factory and caches result.
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlSeconds: number = 300
  ): Promise<T> {
    const cached = await this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    const value = await factory()
    await this.set(key, value, ttlSeconds)
    return value
  },

  /**
   * Invalidate cache keys by pattern (prefix match)
   */
  invalidateByPrefix(prefix: string): void {
    for (const key of memoryCache.keys()) {
      if (key.startsWith(prefix)) {
        memoryCache.delete(key)
      }
    }
  },

  /**
   * Clear all cache
   */
  clear(): void {
    memoryCache.clear()
  }
}

// Cache keys constants
export const CACHE_KEYS = {
  VISA_TYPES: 'visa_types',
  FAQS: 'faqs',
  BLOG_POSTS: 'blog_posts',
  SETTINGS: 'settings',
  STATS: 'stats'
} as const

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
  SHORT: 60,          // 1 minute
  MEDIUM: 300,        // 5 minutes
  LONG: 3600,         // 1 hour
  DAY: 86400          // 24 hours
} as const
