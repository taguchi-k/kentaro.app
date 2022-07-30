export function serialize(v: unknown): string {
  if (typeof v === 'undefined') {
    return 'undefined';
  }
  if (typeof v === 'symbol') {
    return 'symbol';
  }
  if (typeof v === 'function') {
    return 'function';
  }
  if (typeof v === 'bigint') {
    return v.toString();
  }
  return JSON.stringify(v);
}
