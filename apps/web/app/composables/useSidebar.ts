/** Состояние мобильного бокового меню (drawer). */
export function useSidebar() {
  const open = useState('sidebar-open', () => false)
  return {
    open,
    toggle: () => (open.value = !open.value),
    close: () => (open.value = false),
  }
}
