export type Theme = 'light' | 'dark'

/** Тема интерфейса. По умолчанию — чёрная (как в ../agents). Сохраняется в localStorage. */
export function useTheme() {
  const theme = useState<Theme>('theme', () => 'dark')

  function apply(value: Theme) {
    theme.value = value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', value === 'dark')
      localStorage.setItem('theme', value)
    }
  }
  function toggle() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, apply, toggle }
}
