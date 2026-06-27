/** Тонкая обёртка над Pinia-стором кабинета (роль/агент). Типы Role/CurrentUser — из ~/stores/cabinet. */
export function useCabinet() {
  const store = useCabinetStore()
  const { role, me, live } = storeToRefs(store)
  return { role, me, live, setRole: store.setRole, loadMe: store.loadMe }
}
