/**
 * Прокси к шлюзу agent-service (обход CORS).
 * Браузер ходит на свой origin: /api/gw/agent/v1/...  →  Nitro форвардит на
 * ${apiUpstream}/agent/v1/... с пробросом Authorization / Accept-Language.
 * Так живой бэкенд доступен из браузера (CORS нет — запрос делает сервер).
 */
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path') || ''
  const config = useRuntimeConfig(event)
  const upstream = (config.apiUpstream as string).replace(/\/$/, '')
  const target = `${upstream}/${path}`

  const method = event.method
  const headers: Record<string, string> = {}
  const auth = getHeader(event, 'authorization')
  if (auth) headers.Authorization = auth
  const lang = getHeader(event, 'accept-language')
  if (lang) headers['Accept-Language'] = lang

  const body =
    method !== 'GET' && method !== 'HEAD' ? await readRawBody(event).catch(() => undefined) : undefined

  try {
    return await $fetch(target, {
      method: method as any,
      query: getQuery(event),
      headers,
      body,
    })
  } catch (e: any) {
    setResponseStatus(event, e?.response?.status || 502)
    return e?.data ?? { success: false, message: 'upstream error' }
  }
})
