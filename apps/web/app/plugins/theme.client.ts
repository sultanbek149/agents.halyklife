/** Инициализация темы из localStorage (по умолчанию — чёрная). */
export default defineNuxtPlugin(() => {
  const { apply } = useTheme()
  const saved = (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'dark'
  apply(saved)
})
