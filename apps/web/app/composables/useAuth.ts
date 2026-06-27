/** JWT-токен агента (для боевых данных через прокси /api/gw). Хранится в localStorage. */
export function useAuth() {
  const token = useState<string>('auth-token', () =>
    import.meta.client ? localStorage.getItem('token') || '' : '',
  )

  function setToken(value: string) {
    const v = value.trim()
    token.value = v
    if (import.meta.client) {
      if (v) localStorage.setItem('token', v)
      else localStorage.removeItem('token')
      localStorage.setItem('source', 'web')
      if (!localStorage.getItem('language')) localStorage.setItem('language', 'RUS')
    }
  }

  function clear() {
    setToken('')
  }

  const isAuthed = computed(() => !!token.value)
  return { token, setToken, clear, isAuthed }
}
