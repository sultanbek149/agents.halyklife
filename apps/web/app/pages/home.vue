<script setup lang="ts">
import { Plus } from '@lucide/vue'
import { kpi, todayItems, tasks, notifications, quickActions, structureStats, taskStatusLabel, taskStatusTone } from '~/data/demo'
import { formatMoney, clampPct } from '~/lib/format'
const { t } = useLang()
const { me } = useCabinet()

const overdue = tasks.filter((x) => x.status === 'overdue').length
const todayTasks = tasks.filter((x) => ['new', 'overdue', 'progress'].includes(x.status)).slice(0, 3)
const counts = {
  new: tasks.filter((x) => x.status === 'new').length,
  overdue,
  progress: tasks.filter((x) => x.status === 'progress').length,
}

// Метрики верхней панели
const metrics = [
  { label: 'Полисов за месяц', value: '33', tone: 'ink' },
  { label: 'Агентов в ветке', value: structureStats.agents, tone: 'ink' },
  { label: 'Просрочки', value: overdue, tone: overdue ? 'danger' : 'ink' },
]

// Тон акцентов для «Требует внимания»
const accent: Record<string, { bar: string; chip: string }> = {
  danger: { bar: 'bg-danger', chip: 'bg-danger-soft text-danger' },
  amber: { bar: 'bg-amber', chip: 'bg-amber-soft text-amber' },
  info: { bar: 'bg-info', chip: 'bg-info-soft text-info' },
  brand: { bar: 'bg-brand', chip: 'bg-brand-12 text-brand' },
}
</script>

<template>
  <div>
    <PageHeader :title="`${t('greeting')}, ${me.first}`" :subtitle="`${me.role} · ${me.channel} · период ${kpi.period}`">
      <template #actions>
        <UiButton size="sm" class="h-9 gap-1.5 font-semibold" @click="navigateTo('/tasks')">
          <Plus :size="16" /> {{ t('c.createTask') }}
        </UiButton>
      </template>
    </PageHeader>

    <!-- Верхняя панель: выполнение плана + ключевые метрики -->
    <section class="mb-5 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
      <!-- Выполнение плана -->
      <div class="rounded-xl border border-line bg-card p-5 block-shadow">
        <div class="flex items-center justify-between">
          <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Выполнение плана</p>
          <span class="inline-flex items-center gap-1 rounded-md bg-success-soft px-1.5 py-0.5 text-[11.5px] font-semibold text-brand tabular-nums">▲ {{ kpi.delta }}</span>
        </div>
        <div class="mt-2 flex items-baseline gap-3">
          <span class="text-[34px] font-bold leading-none tracking-tight text-ink tabular-nums">{{ kpi.pct }}%</span>
          <span class="text-[13px] text-muted-foreground tabular-nums">{{ formatMoney(kpi.fact) }} <span class="text-muted-foreground/60">из</span> {{ formatMoney(kpi.plan) }}</span>
        </div>
        <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-soft">
          <div class="h-full rounded-full bg-brand" :style="{ width: `${clampPct(kpi.pct)}%` }" />
        </div>
        <p class="mt-2 text-[12px] text-muted-foreground">До плана осталось <b class="text-ink tabular-nums">{{ formatMoney(4500000 - 3180000) }}</b></p>
      </div>

      <!-- Метрики -->
      <div class="grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-card block-shadow">
        <div v-for="m in metrics" :key="m.label" class="px-4 py-5">
          <p :class="['text-[24px] font-bold leading-none tabular-nums', m.tone === 'danger' ? 'text-danger' : 'text-ink']">{{ m.value }}</p>
          <p class="mt-2 text-[11.5px] leading-tight text-muted-foreground">{{ m.label }}</p>
        </div>
      </div>
    </section>

    <!-- Требует внимания -->
    <SectionCard title="Требует внимания" :no-pad="true" class="mb-5">
      <template #action>
        <span class="rounded-full bg-soft px-2 py-0.5 text-[11px] font-semibold tabular-nums text-muted-foreground">{{ todayItems.length }}</span>
      </template>
      <ul class="grid sm:grid-cols-2">
        <li v-for="(it, i) in todayItems" :key="it.id" :class="['border-line', i % 2 === 0 ? 'sm:border-r' : '', i < todayItems.length - (todayItems.length % 2 === 0 ? 2 : 1) ? 'border-b' : '']">
          <button class="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-soft/40" @click="navigateTo(it.to)">
            <span :class="['h-9 w-[3px] shrink-0 rounded-full', accent[it.tone].bar]" />
            <span :class="['grid size-9 shrink-0 place-items-center rounded-lg', accent[it.tone].chip]"><AppIcon :name="it.icon" :size="17" /></span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-[13.5px] font-semibold text-ink">{{ it.title }}</span>
              <span class="block truncate text-[12px] text-muted-foreground">{{ it.sub }}</span>
            </span>
            <AppIcon name="chevron" :size="16" class="shrink-0 text-muted-foreground/50" />
          </button>
        </li>
      </ul>
    </SectionCard>

    <div class="grid gap-5 lg:grid-cols-3">
      <!-- Задачи -->
      <SectionCard title="Задачи на сегодня" class="lg:col-span-2">
        <template #action>
          <button class="text-[12.5px] font-semibold text-brand hover:underline" @click="navigateTo('/tasks')">{{ t('c.all2') }}</button>
        </template>
        <div class="mb-4 grid grid-cols-3 gap-3">
          <StatTile label="Новые" :value="counts.new" tone="brand" />
          <StatTile label="Просрочены" :value="counts.overdue" tone="danger" />
          <StatTile label="В работе" :value="counts.progress" tone="amber" />
        </div>
        <ul class="divide-y divide-line">
          <li v-for="tk in todayTasks" :key="tk.id" class="flex items-center gap-3 py-2.5">
            <PriorityDot :priority="tk.priority" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-[13px] font-semibold text-ink">{{ tk.title }}</p>
              <p class="truncate text-[11.5px] text-muted-foreground">{{ tk.assignee }} · {{ tk.ref }}</p>
            </div>
            <StatusBadge :label="taskStatusLabel(tk.status)" :tone="taskStatusTone[tk.status]" />
          </li>
        </ul>
      </SectionCard>

      <!-- Уведомления -->
      <SectionCard title="Уведомления" class="lg:col-span-1">
        <template #action>
          <button class="text-[12.5px] font-semibold text-brand hover:underline" @click="navigateTo('/messages')">{{ t('c.all2') }}</button>
        </template>
        <ul class="space-y-3.5">
          <li v-for="n in notifications.slice(0, 4)" :key="n.id" class="flex items-start gap-3">
            <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-soft text-muted-foreground"><AppIcon :name="n.icon" :size="16" /></span>
            <div class="min-w-0">
              <p class="truncate text-[12.5px] font-semibold text-ink">{{ n.title }}</p>
              <p class="line-clamp-2 text-[11.5px] leading-snug text-muted-foreground">{{ n.text }}</p>
              <p class="mt-0.5 text-[10.5px] text-muted-foreground/60">{{ n.time }}</p>
            </div>
          </li>
        </ul>
      </SectionCard>
    </div>

    <div class="mt-5 grid gap-5 lg:grid-cols-3">
      <!-- Ближайшие оплаты -->
      <SectionCard title="Ближайшие оплаты" class="lg:col-span-2">
        <template #action>
          <button class="text-[12.5px] font-semibold text-brand hover:underline" @click="navigateTo('/payments')">{{ t('c.all2') }}</button>
        </template>
        <ul class="divide-y divide-line">
          <li v-for="r in [{ c: 'Құрманалин Әлібек', p: 'KAR106271223E001', a: 10000, d: '01.07' }, { c: 'Иванов Иван', p: 'AUP115300620E027', a: 25000, d: '05.07' }, { c: 'Серікова Аружан', p: 'SHY200410522E113', a: 15500, d: '20.07' }]" :key="r.p" class="flex items-center justify-between gap-3 py-2.5">
            <div class="min-w-0">
              <p class="truncate text-[13px] font-medium text-ink">{{ r.c }}</p>
              <p class="truncate font-mono text-[11px] text-muted-foreground">{{ r.p }}</p>
            </div>
            <div class="shrink-0 text-right">
              <p class="text-[13px] font-semibold tabular-nums text-ink">{{ formatMoney(r.a) }}</p>
              <p class="text-[11px] text-muted-foreground">до {{ r.d }}</p>
            </div>
          </li>
        </ul>
      </SectionCard>

      <!-- Быстрые действия -->
      <SectionCard title="Быстрые действия" class="lg:col-span-1" :no-pad="true">
        <ul class="divide-y divide-line">
          <li v-for="q in quickActions" :key="q.id">
            <button class="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-soft/40" @click="navigateTo(q.to)">
              <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-soft text-muted-foreground"><AppIcon :name="q.icon" :size="16" /></span>
              <span class="flex-1 text-[13px] font-medium text-ink">{{ q.label }}</span>
              <AppIcon name="chevron" :size="15" class="text-muted-foreground/50" />
            </button>
          </li>
        </ul>
      </SectionCard>
    </div>
  </div>
</template>
