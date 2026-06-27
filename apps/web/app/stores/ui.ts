import { defineStore } from 'pinia'
import { messages, type Lang } from '~/data/i18n'

export type Theme = 'light' | 'dark'

/** UI-состояние: язык, тема, мобильное меню. */
export const useUiStore = defineStore('ui', () => {
  const lang = ref<Lang>('ru')
  const theme = ref<Theme>('dark')
  const sidebarOpen = ref(false)

  function t(key: string): string {
    return messages[lang.value][key] ?? messages.ru[key] ?? key
  }

  function setLang(l: Lang) {
    lang.value = l
    if (import.meta.client) localStorage.setItem('language', l === 'kk' ? 'KAZ' : 'RUS')
  }
  function toggleLang() {
    setLang(lang.value === 'ru' ? 'kk' : 'ru')
  }

  function setTheme(v: Theme) {
    theme.value = v
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', v === 'dark')
      localStorage.setItem('theme', v)
    }
  }

  function openSidebar() {
    sidebarOpen.value = true
  }
  function closeSidebar() {
    sidebarOpen.value = false
  }
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  return {
    lang, theme, sidebarOpen,
    t, setLang, toggleLang, setTheme, openSidebar, closeSidebar, toggleSidebar,
  }
})
