<script setup lang="ts">
const emit = defineEmits<{ navigate: [] }>()
const { groups, t } = useNav()
const { me } = useCabinet()
const route = useRoute()
const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <div class="flex h-full flex-col bg-sidebar">
    <!-- Бренд / логотип Halyk Life -->
    <NuxtLink
      to="/home"
      class="flex shrink-0 items-center gap-2.5 border-b border-sidebar-border px-5 py-4"
      @click="emit('navigate')"
    >
      <img src="/img/logo.png" alt="Halyk Life" class="h-6 w-auto dark:brightness-0 dark:invert" />
      <span class="h-5 w-px bg-line" />
      <span class="text-[12px] font-semibold leading-tight text-muted-foreground">{{ t('cabShort') }}</span>
    </NuxtLink>

    <!-- Навигация (свой скролл) -->
    <nav class="min-h-0 flex-1 overflow-y-auto px-3 py-3">
      <div v-for="g in groups" :key="g.titleKey" class="mb-1.5">
        <p class="px-3 pb-1.5 pt-3 text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/70">
          {{ t(g.titleKey) }}
        </p>
        <NuxtLink
          v-for="item in g.items"
          :key="item.to"
          :to="item.to"
          @click="emit('navigate')"
          :class="[
            'group mb-0.5 flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13.5px] transition',
            isActive(item.to)
              ? 'bg-sidebar-accent font-bold text-sidebar-accent-foreground'
              : 'font-medium text-muted-foreground hover:bg-soft hover:text-ink',
          ]"
        >
          <component
            :is="item.icon"
            :size="18"
            :class="isActive(item.to) ? 'text-brand' : 'text-muted-foreground group-hover:text-ink'"
          />
          <span class="flex-1 truncate">{{ t(item.key) }}</span>
          <span
            v-if="item.badge"
            class="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-danger px-1 text-[11px] font-bold text-white tabular-nums"
            >{{ item.badge }}</span
          >
        </NuxtLink>
      </div>
    </nav>

    <!-- Профиль агента -->
    <div class="flex shrink-0 items-center gap-3 border-t border-sidebar-border bg-soft/50 px-4 py-3">
      <InitialsAvatar :text="me.initials" :size="38" solid />
      <div class="min-w-0 leading-tight">
        <p class="truncate text-[13px] font-bold text-ink">{{ me.name }}</p>
        <p class="truncate text-[11.5px] text-muted-foreground">{{ me.role }} · {{ me.channel }}</p>
      </div>
    </div>
  </div>
</template>
