import type { Theme } from '~/stores/ui'

/** Тонкая обёртка над Pinia-стором UI (тема). По умолчанию — чёрная. Тип Theme — из ~/stores/ui. */
export function useTheme() {
  const store = useUiStore()
  const { theme } = storeToRefs(store)

  /** Мгновенно — для инициализации при загрузке. */
  function apply(value: Theme) {
    store.setTheme(value)
  }

  /** Плавное переключение в обе стороны — кроссфейд через View Transitions API. */
  function toggle() {
    const next: Theme = store.theme === 'dark' ? 'light' : 'dark'
    const reduce =
      import.meta.client && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    // @ts-expect-error — startViewTransition есть не во всех браузерах
    if (import.meta.client && !reduce && document.startViewTransition) {
      // @ts-expect-error
      document.startViewTransition(() => store.setTheme(next))
    } else {
      store.setTheme(next)
    }
  }

  return { theme, apply, set: store.setTheme, toggle }
}
