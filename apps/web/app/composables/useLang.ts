/** Тонкая обёртка над Pinia-стором UI (язык + переводчик t()). */
export function useLang() {
  const store = useUiStore()
  const { lang } = storeToRefs(store)
  return { lang, setLang: store.setLang, toggleLang: store.toggleLang, t: store.t }
}
