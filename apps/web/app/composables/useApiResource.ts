/**
 * Обёртка для загрузки ресурса из agent-service с graceful-фолбэком на демо-данные.
 * Пока бэкенд недоступен (нет токена/шлюза) — экран рендерится на демо-данных,
 * но контракт вызова уже соответствует ../agent-service.
 *
 * Единый клиент запросов — `~/api` (перенесён из ../agents, подстроен под ../agent-service).
 * Пример:
 *   import { agentServiceApi } from '~/api'
 *   const { data, pending, error } = useApiResource(
 *     async () => (await agentServiceApi.getDashboard()).data,
 *     dashboardDemo,
 *   )
 */
export function useApiResource<T>(
  fetcher: () => Promise<T>,
  fallback: T,
  opts: { immediate?: boolean } = {},
) {
  const data = ref<T>(fallback) as Ref<T>
  const pending = ref(false)
  const error = ref<unknown>(null)

  async function load() {
    pending.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (e) {
      // Бэкенд недоступен — остаёмся на демо-данных (мокап-режим).
      error.value = e
      data.value = fallback
    } finally {
      pending.value = false
    }
  }

  if (opts.immediate !== false && import.meta.client) load()

  return { data, pending, error, load }
}
