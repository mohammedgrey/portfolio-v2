// Simple in-memory rate limiting storage
// For production, consider using Redis or a database
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 5; // 5 requests per day
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function getUserIdentifier(request: Request): string {
  // Try to get IP from headers (works with most proxies/load balancers)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return forwarded?.split(",")[0] || realIp || "unknown";
}

export function checkRateLimit(userId: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitStore.set(userId, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime };
  }

  if (userLimit.count >= RATE_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: userLimit.resetTime,
    };
  }

  userLimit.count++;
  rateLimitStore.set(userId, userLimit);
  return {
    allowed: true,
    remaining: RATE_LIMIT - userLimit.count,
    resetTime: userLimit.resetTime,
  };
}
