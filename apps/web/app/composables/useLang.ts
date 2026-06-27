import { messages, type Lang } from '~/data/i18n'

/** Глобальный язык интерфейса + переводчик t(). RU по умолчанию, переключение на KK. */
export function useLang() {
  const lang = useState<Lang>('lang', () => 'ru')

  function setLang(l: Lang) {
    lang.value = l
    if (import.meta.client) localStorage.setItem('language', l === 'kk' ? 'KAZ' : 'RUS')
  }
  function toggleLang() {
    setLang(lang.value === 'ru' ? 'kk' : 'ru')
  }

  function t(key: string): string {
    return messages[lang.value][key] ?? messages.ru[key] ?? key
  }

  return { lang, setLang, toggleLang, t }
}
