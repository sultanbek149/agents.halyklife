/** Тонкая обёртка над Pinia-стором UI (мобильное меню). */
export function useSidebar() {
  const store = useUiStore()
  const { sidebarOpen: open } = storeToRefs(store)
  return { open, toggle: store.toggleSidebar, close: store.closeSidebar }
}
