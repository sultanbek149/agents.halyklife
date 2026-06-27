<script setup lang="ts">
import { Search, Bell, Menu, Moon, Sun } from '@lucide/vue'
const { t, lang, setLang } = useLang()
const { role, setRole } = useCabinet()
const sidebar = useSidebar()
const { theme, toggle: toggleTheme } = useTheme()
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-3 border-b border-line bg-card px-4 sm:px-6">
    <!-- Гамбургер (моб.) -->
    <button
      class="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-muted-foreground transition hover:text-ink lg:hidden"
      aria-label="Меню"
      @click="sidebar.toggle()"
    >
      <Menu :size="18" />
    </button>

    <!-- Логотип на мобильном (когда сайдбар скрыт) -->
    <img src="/img/logo.png" alt="Halyk Life" class="h-5 w-auto dark:brightness-0 dark:invert lg:hidden" />

    <!-- Поиск -->
    <div class="relative hidden min-w-0 max-w-[420px] flex-1 md:block">
      <Search :size="17" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        :placeholder="t('h.search')"
        class="h-10 w-full rounded-xl border border-line bg-soft pl-10 pr-3 text-[13.5px] outline-none placeholder:text-muted-foreground focus:border-brand/40 focus:ring-2 focus:ring-ring"
      />
    </div>

    <div class="ml-auto flex items-center gap-1.5 sm:gap-2">
      <!-- Роль -->
      <div class="hidden rounded-full bg-soft p-0.5 text-[12.5px] font-semibold sm:flex">
        <button
          class="rounded-full px-3 py-1.5 transition"
          :class="role === 'agent' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'"
          @click="setRole('agent')"
        >
          {{ t('role.agent') }}
        </button>
        <button
          class="rounded-full px-3 py-1.5 transition"
          :class="role === 'leader' ? 'bg-card text-ink shadow-sm' : 'text-muted-foreground'"
          @click="setRole('leader')"
        >
          {{ t('role.leader') }}
        </button>
      </div>

      <!-- Язык -->
      <div class="flex rounded-full bg-soft p-0.5 text-[12px] font-bold">
        <button
          class="rounded-full px-2.5 py-1.5 transition"
          :class="lang === 'ru' ? 'bg-card text-brand shadow-sm' : 'text-muted-foreground'"
          @click="setLang('ru')"
        >
          РУС
        </button>
        <button
          class="rounded-full px-2.5 py-1.5 transition"
          :class="lang === 'kk' ? 'bg-card text-brand shadow-sm' : 'text-muted-foreground'"
          @click="setLang('kk')"
        >
          ҚАЗ
        </button>
      </div>

      <!-- Тема -->
      <button
        class="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-card text-muted-foreground transition hover:text-ink"
        :aria-label="theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'"
        @click="toggleTheme()"
      >
        <Sun v-if="theme === 'dark'" :size="18" />
        <Moon v-else :size="18" />
      </button>

      <!-- Уведомления -->
      <NuxtLink
        to="/messages"
        class="relative grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-card text-muted-foreground transition hover:text-ink"
      >
        <Bell :size="18" />
        <span class="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-card" />
      </NuxtLink>
    </div>
  </header>
</template>
