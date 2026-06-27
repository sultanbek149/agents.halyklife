<script setup lang="ts">
import { ArrowRight, Check } from '@lucide/vue'
definePageMeta({ layout: 'blank' })
const { t, lang, setLang } = useLang()
const { setToken, isAuthed } = useAuth()
const route = useRoute()

const token = ref('')
onMounted(() => {
  const q = route.query.token
  if (typeof q === 'string' && q) token.value = q
})

const points = [
  'Структура ветки 1–9 уровней и заработок по ВНД-19-04',
  'Клиенты, договоры, риск-светофор просрочек из INSIS',
  'Задачи, делегирование и распознавание платежей',
]
function enter() {
  if (token.value.trim()) setToken(token.value)
  navigateTo('/home')
}
</script>

<template>
  <div
    class="relative flex min-h-screen flex-wrap items-center justify-center gap-16 px-6 py-12"
    style="background: radial-gradient(120% 90% at 18% 0%, color-mix(in srgb, var(--brand) 16%, var(--background)) 0%, var(--background) 55%)"
  >
    <!-- Переключатель языка -->
    <div class="absolute right-6 top-6 flex rounded-full bg-card/80 p-0.5 text-[12.5px] font-bold shadow-sm backdrop-blur">
      <button class="rounded-full px-3 py-1.5" :class="lang === 'ru' ? 'bg-brand text-white' : 'text-muted-foreground'" @click="setLang('ru')">РУС</button>
      <button class="rounded-full px-3 py-1.5" :class="lang === 'kk' ? 'bg-brand text-white' : 'text-muted-foreground'" @click="setLang('kk')">ҚАЗ</button>
    </div>

    <!-- Маркетинговая колонка -->
    <div class="max-w-[400px] animate-hl-fade">
      <div class="mb-5 flex items-center gap-2.5">
        <span class="grid size-10 place-items-center rounded-xl bg-brand text-[20px] font-extrabold text-white">H</span>
        <span class="text-[15px] font-extrabold text-ink">{{ t('brand') }}</span>
      </div>
      <p class="mb-3 inline-block rounded-full bg-brand-12 px-3 py-1 text-[12px] font-bold text-brand-ink">
        {{ t('intro.kicker') }}
      </p>
      <h1 class="text-[34px] font-extrabold leading-[1.1] tracking-tight text-ink">{{ t('intro.title') }}</h1>
      <p class="mt-3 text-[15px] leading-relaxed text-muted-foreground">{{ t('intro.body') }}</p>

      <ul class="mt-6 space-y-3">
        <li v-for="p in points" :key="p" class="flex items-start gap-3">
          <span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
            <Check :size="13" />
          </span>
          <span class="text-[14px] text-ink">{{ p }}</span>
        </li>
      </ul>

      <!-- Токен агента (опционально: пусто → демо-данные, токен → боевые) -->
      <div class="mt-6">
        <label class="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground">
          JWT-токен агента <span class="font-normal text-muted-foreground/70">— опционально, для боевых данных</span>
        </label>
        <textarea
          v-model="token"
          rows="2"
          placeholder="eyJhbGciOi…  (пусто = демо-данные)"
          class="w-full resize-none rounded-xl border border-line bg-card px-3 py-2 font-mono text-[11px] leading-snug outline-none focus:border-brand/40 focus:ring-2 focus:ring-ring"
        />
        <p v-if="isAuthed && !token" class="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-brand">
          <Check :size="13" /> токен сохранён — кабинет на боевых данных
        </p>
      </div>

      <UiButton size="lg" class="mt-5 h-12 gap-2 rounded-xl px-6 text-[15px] font-bold shadow-[0_8px_22px_rgba(42,166,92,.28)]" @click="enter">
        {{ t('intro.cta') }}
        <ArrowRight :size="18" />
      </UiButton>
      <p class="mt-3 text-[12.5px] text-muted-foreground">{{ t('intro.hint') }}</p>
    </div>

    <!-- Телефон -->
    <div class="animate-hl-slidein">
      <div class="relative h-[600px] w-[300px] rounded-[44px] bg-[#0B1C16] p-3 shadow-[0_30px_70px_-20px_rgba(10,40,30,.5)]">
        <div class="flex h-full flex-col overflow-hidden rounded-[34px] bg-[#F4F6F5]">
          <div class="flex items-center justify-between px-5 pt-4 text-[12px] font-semibold text-ink/70">
            <span>9:41</span><span>Halyk Life</span>
          </div>
          <div class="flex-1 space-y-3 overflow-hidden p-4">
            <!-- Карточка входа в кабинет -->
            <button
              class="w-full rounded-2xl bg-brand p-4 text-left text-white shadow-[0_8px_22px_rgba(42,166,92,.4)]"
              style="animation: hl-fade .6s ease both"
              @click="enter"
            >
              <div class="flex items-center justify-between">
                <span class="text-[13px] font-semibold opacity-90">Кабинет агента</span>
                <span class="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold">NEW</span>
              </div>
              <p class="mt-2 text-[16px] font-extrabold leading-tight">Рабочее место агента</p>
              <p class="mt-1 text-[12px] opacity-90">Структура · оплаты · задачи →</p>
            </button>

            <div class="rounded-2xl bg-card p-4 shadow-sm">
              <p class="text-[13px] font-bold text-ink">Life-Рента+</p>
              <p class="mt-1 text-[11.5px] text-muted-foreground">Накопление с гарантией</p>
              <div class="mt-3 h-1.5 w-full rounded-full bg-soft"><div class="h-full w-2/3 rounded-full bg-brand" /></div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div v-for="i in 4" :key="i" class="rounded-2xl bg-card p-3 shadow-sm">
                <div class="mb-2 size-7 rounded-lg bg-brand-12" />
                <p class="text-[11px] font-semibold text-ink">Продукт {{ i }}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-around border-t border-line bg-card px-2 py-3 text-[10px] text-muted-foreground">
            <span v-for="tab in ['Главная', 'Каталог', 'Кабинет', 'Профиль']" :key="tab">{{ tab }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
