// Lightweight in-memory sliding-window rate limiter for public API routes.
//
// Honest limitation: this state lives in the serverless function's own
// memory, so it resets on cold start and isn't shared across concurrent
// instances/regions. It's a real speed bump against casual scripted abuse
// (single-instance, low-traffic site), not a guarantee against a
// distributed attacker. If traffic grows enough to need real protection,
// swap this for @upstash/ratelimit backed by Upstash Redis.
const buckets = new Map<string, number[]>()

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const timestamps = (buckets.get(key) || []).filter((t) => now - t < windowMs)

  if (timestamps.length >= limit) {
    buckets.set(key, timestamps)
    return false
  }

  timestamps.push(now)
  buckets.set(key, timestamps)

  // Bound memory growth — occasionally sweep expired buckets.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k)
    }
  }

  return true
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}
