export function isExpired(expiresAt: Date) {
  return expiresAt < new Date();
}
