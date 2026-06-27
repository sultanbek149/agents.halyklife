<script setup lang="ts">
import { ref } from 'vue'
import { awardsCircle1, awardsCircle2 } from '~/data/demo'

const circle = ref('1')
const segments = [
  { value: '1', label: '1-й круг (Прил. 2–3)' },
  { value: '2', label: '2-й круг (Прил. 4)' },
]
function statusTone(s: string): 'green' | 'amber' | 'grey' {
  return s === 'done' ? 'green' : s === 'progress' ? 'amber' : 'grey'
}
</script>

<template>
  <div>
    <PageHeader title="Дополнительные награды" subtitle="Приложения 2–4 ВНД-19-04 — прогресс, ножки, дедлайны" />

    <div class="mb-5">
      <SegmentedTabs v-model="circle" :segments="segments" />
    </div>

    <!-- 1-й круг -->
    <div v-if="circle === '1'" class="grid gap-4 md:grid-cols-2">
      <div v-for="a in awardsCircle1" :key="a.id" class="rounded-2xl border border-line bg-card p-5 block-shadow">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-12 text-brand"><AppIcon :name="a.icon" :size="24" /></span>
            <div>
              <h3 class="text-[16px] font-bold text-ink">{{ a.reward }}</h3>
              <p class="text-[12px] text-muted-foreground">{{ a.achievement }}</p>
            </div>
          </div>
          <StatusBadge :label="a.statusLabel" :tone="statusTone(a.status)" />
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
          <span class="rounded-md bg-soft px-2 py-1 font-medium text-muted-foreground">Стоимость: {{ a.cost }}</span>
          <span class="rounded-md bg-soft px-2 py-1 font-medium text-muted-foreground">Дедлайн: {{ a.deadline }}</span>
          <span v-if="a.legs" class="inline-flex items-center gap-1 rounded-md bg-amber-soft px-2 py-1 font-medium text-amber"><AppIcon name="branch" :size="13" /> {{ a.legs }}</span>
        </div>
        <div class="mt-4">
          <ProgressBar :pct="a.pct" :right="`${a.pct}%`" :color="a.status === 'locked' ? '#9AA8A2' : 'var(--brand)'" />
        </div>
      </div>
    </div>

    <!-- 2-й круг -->
    <div v-else>
      <HintBanner tone="warm" icon="alert" class="mb-4">
        Награды 2-го круга открываются после выполнения 1-го круга.
      </HintBanner>
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="a in awardsCircle2"
          :key="a.id"
          class="relative overflow-hidden rounded-2xl border border-line bg-card p-5 block-shadow"
        >
          <div class="pointer-events-none absolute right-4 top-4 text-muted-foreground/70"><AppIcon name="lock" :size="18" /></div>
          <div class="opacity-75">
            <span class="grid size-12 place-items-center rounded-xl bg-soft text-muted-foreground"><AppIcon :name="a.icon" :size="22" /></span>
            <h3 class="mt-3 text-[15px] font-bold text-ink">{{ a.reward }}</h3>
            <p class="mt-1 text-[12px] text-muted-foreground">{{ a.achievement }}</p>
          </div>
          <div class="mt-4">
            <ProgressBar :pct="a.pct" :right="`${a.pct}%`" color="#9AA8A2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
