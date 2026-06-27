<script setup lang="ts">
import { ArrowRight, Plus } from '@lucide/vue'
import { kpi, todayItems, tasks, notifications, quickActions, taskStatusLabel, taskStatusTone } from '~/data/demo'
import { formatMoney } from '~/lib/format'
const { t } = useLang()
const { me } = useCabinet()

const toneBg: Record<string, string> = {
  danger: 'bg-danger-soft text-danger',
  amber: 'bg-amber-soft text-amber',
  brand: 'bg-brand-12 text-brand-ink',
  info: 'bg-info-soft text-info',
}
const todayTasks = tasks.filter((x) => ['new', 'overdue', 'progress'].includes(x.status)).slice(0, 3)
const counts = {
  new: tasks.filter((x) => x.status === 'new').length,
  overdue: tasks.filter((x) => x.status === 'overdue').length,
  progress: tasks.filter((x) => x.status === 'progress').length,
}
</script>

<template>
  <div>
    <PageHeader :title="`${t('greeting')}, ${me.first}!`" subtitle="Сводка по вашей структуре">
      <template #actions>
        <UiButton class="gap-2 rounded-xl font-semibold" @click="navigateTo('/tasks')">
          <Plus :size="17" /> {{ t('c.createTask') }}
        </UiButton>
      </template>
    </PageHeader>

    <!-- Сегодня важно -->
    <SectionCard emphasis class="mb-5" :no-pad="true">
      <div class="px-5 pb-5 pt-4">
        <h3 class="mb-3 flex items-center gap-2 text-[15px] font-bold text-white"><AppIcon name="zap" :size="16" /> Сегодня важно</h3>
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="it in todayItems"
            :key="it.id"
            class="rounded-xl bg-white/95 p-3.5 text-left transition hover:bg-white"
            @click="navigateTo(it.to)"
          >
            <div :class="['mb-2 grid size-8 place-items-center rounded-lg', toneBg[it.tone]]"><AppIcon :name="it.icon" :size="16" /></div>
            <p class="text-[13.5px] font-bold leading-tight text-ink">{{ it.title }}</p>
            <p class="mt-1 text-[11.5px] text-muted-foreground">{{ it.sub }}</p>
          </button>
        </div>
      </div>
    </SectionCard>

    <div class="grid gap-5 lg:grid-cols-3">
      <!-- KPI -->
      <SectionCard title="План / факт продаж" :subtitle="kpi.period" class="lg:col-span-1">
        <div class="flex items-center gap-5">
          <ProgressRing :pct="kpi.pct" :size="124">
            <div>
              <div class="text-2xl font-extrabold text-ink">{{ kpi.pct }}%</div>
              <div class="text-[11px] text-muted-foreground">выполнено</div>
            </div>
          </ProgressRing>
          <div class="space-y-3">
            <div>
              <p class="text-[11.5px] text-muted-foreground">План</p>
              <p class="text-[15px] font-bold text-ink">{{ formatMoney(kpi.plan) }}</p>
            </div>
            <div>
              <p class="text-[11.5px] text-muted-foreground">Факт</p>
              <p class="text-[15px] font-bold text-brand">{{ formatMoney(kpi.fact) }}</p>
            </div>
            <span class="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[12px] font-bold text-brand">▲ {{ kpi.delta }}</span>
          </div>
        </div>
      </SectionCard>

      <!-- Уведомления -->
      <SectionCard title="Уведомления" class="lg:col-span-1">
        <template #action>
          <button class="text-[13px] font-semibold text-brand" @click="navigateTo('/messages')">{{ t('c.all2') }}</button>
        </template>
        <ul class="space-y-3">
          <li v-for="n in notifications.slice(0, 3)" :key="n.id" class="flex items-start gap-3">
            <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-soft text-brand"><AppIcon :name="n.icon" :size="16" /></span>
            <div class="min-w-0">
              <p class="truncate text-[13px] font-semibold text-ink">{{ n.title }}</p>
              <p class="line-clamp-2 text-[12px] text-muted-foreground">{{ n.text }}</p>
              <p class="mt-0.5 text-[11px] text-muted-foreground/70">{{ n.time }}</p>
            </div>
          </li>
        </ul>
      </SectionCard>

      <!-- Задачи на сегодня -->
      <SectionCard title="Задачи на сегодня" class="lg:col-span-1">
        <template #action>
          <button class="text-[13px] font-semibold text-brand" @click="navigateTo('/tasks')">{{ t('c.all2') }}</button>
        </template>
        <div class="mb-4 grid grid-cols-3 gap-2">
          <StatTile label="Новые" :value="counts.new" tone="brand" />
          <StatTile label="Просрочены" :value="counts.overdue" tone="danger" />
          <StatTile label="В работе" :value="counts.progress" tone="amber" />
        </div>
        <ul class="space-y-2.5">
          <li v-for="tk in todayTasks" :key="tk.id" class="flex items-center gap-3">
            <PriorityDot :priority="tk.priority" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-[13px] font-semibold text-ink">{{ tk.title }}</p>
              <p class="truncate text-[11.5px] text-muted-foreground">{{ tk.assignee }} · {{ tk.ref }}</p>
            </div>
            <StatusBadge :label="taskStatusLabel(tk.status)" :tone="taskStatusTone[tk.status]" />
          </li>
        </ul>
      </SectionCard>
    </div>

    <div class="mt-5 grid gap-5 lg:grid-cols-3">
      <!-- Оплаты на ближайшие дни -->
      <SectionCard title="Оплаты на ближайшие дни" class="lg:col-span-2">
        <template #action>
          <button class="text-[13px] font-semibold text-brand" @click="navigateTo('/payments')">{{ t('c.all2') }}</button>
        </template>
        <ul class="divide-y divide-line">
          <li v-for="r in [{ c: 'Құрманалин Әлібек', p: 'KAR106271223E001', a: 10000, d: '01.07' }, { c: 'Иванов Иван', p: 'AUP115300620E027', a: 25000, d: '05.07' }, { c: 'Серікова Аружан', p: 'SHY200410522E113', a: 15500, d: '20.07' }]" :key="r.p" class="flex items-center justify-between gap-3 py-2.5">
            <div class="min-w-0">
              <p class="truncate text-[13px] font-semibold text-ink">{{ r.c }}</p>
              <p class="truncate font-mono text-[11.5px] text-muted-foreground">{{ r.p }}</p>
            </div>
            <div class="text-right">
              <p class="text-[13.5px] font-bold text-ink">{{ formatMoney(r.a) }}</p>
              <p class="text-[11.5px] text-muted-foreground">до {{ r.d }}</p>
            </div>
          </li>
        </ul>
      </SectionCard>

      <!-- Быстрые действия -->
      <SectionCard title="Быстрые действия" class="lg:col-span-1">
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="q in quickActions"
            :key="q.id"
            class="flex flex-col items-start gap-2 rounded-xl border border-line bg-soft/60 p-3.5 text-left transition hover:border-brand/30 hover:bg-brand-12"
            @click="navigateTo(q.to)"
          >
            <span class="grid size-9 place-items-center rounded-lg bg-brand-12 text-brand"><AppIcon :name="q.icon" :size="18" /></span>
            <span class="text-[12.5px] font-semibold text-ink">{{ q.label }}</span>
          </button>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
