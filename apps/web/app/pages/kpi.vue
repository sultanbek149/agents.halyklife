<script setup lang="ts">
import { periods, topAgents } from '~/data/demo'
import { formatMoney } from '~/lib/format'

const max = Math.max(...periods.flatMap((p) => [p.plan, p.fact]))
const bars = computed(() =>
  periods.map((p) => ({
    month: p.month,
    planH: Math.round((p.plan / max) * 100),
    factH: Math.round((p.fact / max) * 100),
    pct: Math.round((p.fact / p.plan) * 100),
  })),
)

const prev = periods[periods.length - 2]!
const last = periods[periods.length - 1]!
const mom = Math.round(((last.fact - prev.fact) / prev.fact) * 100)
const momUp = mom >= 0

const medalColor = (rank: number) => (rank === 1 ? '#f2b23d' : rank === 2 ? '#9aa8a2' : '#c08457')
</script>

<template>
  <div>
    <PageHeader title="Продажи и KPI" subtitle="Сравнение периодов и динамика ветки" />

    <div class="grid gap-5 lg:grid-cols-3">
      <!-- Сравнение периодов -->
      <SectionCard title="Сравнение периодов" subtitle="План и факт за 6 месяцев" class="lg:col-span-2">
        <template #action>
          <div class="flex items-center gap-4 text-[12px] font-medium text-muted-foreground">
            <span class="flex items-center gap-1.5"><span class="size-2.5 rounded-sm" style="background: #c7d2cc" /> План</span>
            <span class="flex items-center gap-1.5"><span class="size-2.5 rounded-sm bg-brand" /> Факт</span>
          </div>
        </template>

        <div class="flex items-end justify-between gap-3" style="height: 220px">
          <div v-for="b in bars" :key="b.month" class="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span class="text-[11px] font-bold tabular-nums text-brand">{{ b.pct }}%</span>
            <div class="flex h-full w-full items-end justify-center gap-1.5">
              <div class="w-1/2 max-w-[18px] rounded-t-md transition-all" :style="{ height: `${b.planH}%`, background: '#C7D2CC' }" />
              <div class="w-1/2 max-w-[18px] rounded-t-md bg-brand transition-all" :style="{ height: `${b.factH}%` }" />
            </div>
            <span class="text-[12px] font-medium text-muted-foreground">{{ b.month }}</span>
          </div>
        </div>
      </SectionCard>

      <!-- Динамика + Лидеры -->
      <div class="flex flex-col gap-5">
        <SectionCard title="Динамика месяц-к-месяцу">
          <div class="flex items-baseline gap-2">
            <span :class="['text-4xl font-extrabold tabular-nums', momUp ? 'text-brand' : 'text-danger']">
              {{ momUp ? '▲' : '▼' }} {{ Math.abs(mom) }}%
            </span>
          </div>
          <p class="mt-1 text-[12.5px] text-muted-foreground">к предыдущему месяцу</p>
        </SectionCard>

        <SectionCard title="Лидеры ветки">
          <ul class="space-y-3">
            <li v-for="(a, i) in topAgents" :key="a.rank" class="flex items-center gap-3">
              <span class="flex w-6 justify-center text-[13px] font-bold tabular-nums text-muted-foreground">
                <AppIcon v-if="i < 3" name="medal" :size="20" :style="{ color: medalColor(i + 1) }" />
                <template v-else>{{ a.rank }}</template>
              </span>
              <InitialsAvatar :name="a.name" :size="34" />
              <div class="min-w-0 flex-1">
                <p class="truncate text-[13px] font-semibold text-ink">{{ a.name }}</p>
                <p class="truncate text-[11.5px] text-muted-foreground">{{ a.city }}</p>
              </div>
              <span class="text-[13px] font-bold tabular-nums text-ink">{{ formatMoney(a.fee) }}</span>
            </li>
          </ul>
        </SectionCard>
      </div>
    </div>
  </div>
</template>
