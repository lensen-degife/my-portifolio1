export function useLenis() {
  return typeof window !== 'undefined' ? window.__lenis : null;
}
