export type ABVariant = 'A' | 'B';

export function getABVariant(): ABVariant {
  const key = 'ab_variant';
  let v = localStorage.getItem(key) as ABVariant | null;
  if (!v) {
    v = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(key, v);
  }
  return v;
}

export function recordEvent(event: string) {
  const key = 'ab_metrics';
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  data[event] = (data[event] || 0) + 1;
  localStorage.setItem(key, JSON.stringify(data));
}
