<script setup lang="ts">
import { rating } from '~/data/demo'
import { formatUnits, clampPct } from '~/lib/format'

const maxUnits = Math.max(...rating.map((r) => r.units))
const medalColor = (rank: number) => (rank === 1 ? '#f2b23d' : rank === 2 ? '#9aa8a2' : '#c08457')
const deltaText = (d: number) => (d > 0 ? `▲ +${d}` : d < 0 ? `▼ ${Math.abs(d)}` : '0')
const deltaClass = (d: number) => (d > 0 ? 'text-brand' : d < 0 ? 'text-danger' : 'text-muted-foreground')
</script>

<template>
  <div>
    <PageHeader title="Рейтинг активности" subtitle="Топ агентов вашей ветки за период" />

    <SectionCard :no-pad="true">
      <div class="grid grid-cols-[48px_1.6fr_1.4fr_90px_120px_80px] items-center gap-3 border-b border-line bg-soft/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        <span>#</span><span>Агент</span><span>Единицы</span><span>Сделки</span><span>Актив.%</span><span class="text-right">Δ</span>
      </div>
      <div
        v-for="r in rating"
        :key="r.rank"
        class="grid grid-cols-[48px_1.6fr_1.4fr_90px_120px_80px] items-center gap-3 border-b border-line px-5 py-3 transition last:border-0 hover:bg-soft/40"
      >
        <span class="flex items-center text-[15px] font-extrabold tabular-nums text-muted-foreground">
          <AppIcon v-if="r.rank <= 3" name="medal" :size="20" :style="{ color: medalColor(r.rank) }" />
          <template v-else>{{ r.rank }}</template>
        </span>
        <div class="flex min-w-0 items-center gap-2.5">
          <InitialsAvatar :name="r.name" :size="30" />
          <div class="min-w-0">
            <p class="truncate text-[13.5px] font-semibold text-ink">{{ r.name }}</p>
            <p class="truncate text-[11.5px] text-muted-foreground">{{ r.city }}</p>
          </div>
        </div>
        <div>
          <p class="mb-1 text-[12.5px] font-bold tabular-nums text-ink">{{ formatUnits(r.units) }}</p>
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-soft">
            <div class="h-full rounded-full bg-brand" :style="{ width: `${clampPct((r.units / maxUnits) * 100)}%` }" />
          </div>
        </div>
        <span class="text-[13px] font-semibold tabular-nums text-ink">{{ r.deals }}</span>
        <div class="flex items-center gap-2">
          <span class="w-9 text-[13px] font-semibold tabular-nums text-ink">{{ r.active }}%</span>
          <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-soft">
            <div class="h-full rounded-full bg-info" :style="{ width: `${r.active}%` }" />
          </div>
        </div>
        <span :class="['text-right text-[13px] font-bold tabular-nums', deltaClass(r.delta)]">{{ deltaText(r.delta) }}</span>
      </div>
    </SectionCard>
  </div>
</template>
