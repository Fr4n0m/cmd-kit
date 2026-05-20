const store = new Map<string, number[]>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = store.get(key) ?? [];
  const valid = hits.filter((value) => now - value < windowMs);

  if (valid.length >= limit) {
    store.set(key, valid);
    return false;
  }

  valid.push(now);
  store.set(key, valid);
  return true;
}
