export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const memoryStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Global Rate Limiter Factory
 * In a real production deployment on serverless platforms (Vercel), 
 * this should be backed by a distributed cache like Upstash Redis.
 * For local development, it falls back to an in-memory map.
 */
export function createRateLimiter(options: RateLimitOptions) {
  return async function check(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    
    // In production with Upstash Redis:
    // if (process.env.UPSTASH_REDIS_REST_URL && !process.env.UPSTASH_REDIS_REST_URL.includes("mock")) {
    //   const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
    //   const [response] = await redis.pipeline().incr(identifier).expire(identifier, options.windowMs / 1000).exec();
    //   ... handle response
    // }

    // Development In-Memory Fallback
    const record = memoryStore.get(identifier);
    
    // If no record or window expired
    if (!record || record.resetTime < now) {
      memoryStore.set(identifier, { count: 1, resetTime: now + options.windowMs });
      return { 
        success: true, 
        limit: options.limit, 
        remaining: options.limit - 1, 
        reset: now + options.windowMs 
      };
    }

    // If over limit
    if (record.count >= options.limit) {
      return { 
        success: false, 
        limit: options.limit, 
        remaining: 0, 
        reset: record.resetTime 
      };
    }

    // Increment
    record.count += 1;
    memoryStore.set(identifier, record);

    return { 
      success: true, 
      limit: options.limit, 
      remaining: options.limit - record.count, 
      reset: record.resetTime 
    };
  };
}
