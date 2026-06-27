/** Тонкая обёртка над Pinia-стором кабинета (роль/агент). Типы Role/CurrentUser — из ~/stores/cabinet. */
export function useCabinet() {
  const store = useCabinetStore()
  const { role, me } = storeToRefs(store)
  return { role, me, setRole: store.setRole }
}
