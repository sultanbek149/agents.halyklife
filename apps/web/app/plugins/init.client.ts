/** При старте подтягиваем боевой профиль агента (если задан токен). */
export default defineNuxtPlugin(async () => {
  const store = useCabinetStore()
  await store.loadMe()
})
