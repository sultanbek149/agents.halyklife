<script setup lang="ts">
import { ChevronDown, ChevronRight } from '@lucide/vue'
import { tree, structureStats, type TreeNode } from '~/data/demo'
import { formatMoney, clampPct } from '~/lib/format'

const expanded = reactive<Set<string>>(new Set())
function collectIds(n: TreeNode) {
  if (n.kids?.length) {
    expanded.add(n.agId)
    n.kids.forEach(collectIds)
  }
}
collectIds(tree)
const toggle = (id: string) => (expanded.has(id) ? expanded.delete(id) : expanded.add(id))

interface FlatRow { node: TreeNode; depth: number; hasKids: boolean }
const flat = computed<FlatRow[]>(() => {
  const rows: FlatRow[] = []
  const walk = (nodes: TreeNode[], depth: number) => {
    for (const node of nodes) {
      const hasKids = !!node.kids?.length
      rows.push({ node, depth, hasKids })
      if (hasKids && expanded.has(node.agId)) walk(node.kids!, depth + 1)
    }
  }
  walk(tree.kids ?? [], 0)
  return rows
})
const pct = (n: TreeNode) => clampPct((n.fact / n.plan) * 100)
const barColor = (p: number) => (p >= 80 ? '#2aa65c' : p >= 50 ? '#E0A21B' : '#D43A3A')
</script>

<template>
  <div>
    <PageHeader title="Структура и поиск" subtitle="Ваша ветка 1–6 уровней" />

    <div class="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatTile label="Агентов в ветке" :value="structureStats.agents" tone="brand" />
      <StatTile label="Прямых веток" :value="structureStats.branches" tone="info" />
      <StatTile label="Висящих сумм" :value="`${structureStats.hanging} ₸`" tone="amber" />
    </div>

    <!-- Корневой узел -->
    <SectionCard emphasis class="mb-5">
      <div class="flex items-center gap-4">
        <InitialsAvatar :name="tree.name" :size="48" />
        <div>
          <p class="text-[16px] font-extrabold text-white">{{ tree.name }}</p>
          <p class="text-[12.5px] text-white/85">{{ tree.level }} уровень · Куратор · {{ tree.agentNo }}</p>
        </div>
        <div class="ml-auto text-right">
          <p class="text-[12px] text-white/80">Факт ветки</p>
          <p class="text-[18px] font-extrabold tabular-nums text-white">{{ formatMoney(tree.fact) }}</p>
        </div>
      </div>
    </SectionCard>

    <SectionCard title="Дерево ветки" :no-pad="true">
      <ul class="py-1">
        <li
          v-for="row in flat"
          :key="row.node.agId"
          class="flex items-center gap-3 px-5 py-2.5 transition hover:bg-soft/40"
        >
          <div class="flex items-center" :style="{ paddingLeft: `${row.depth * 22}px` }">
            <button
              v-if="row.hasKids"
              class="grid size-6 place-items-center rounded-md text-muted-foreground transition hover:bg-soft"
              @click="toggle(row.node.agId)"
            >
              <component :is="expanded.has(row.node.agId) ? ChevronDown : ChevronRight" :size="16" />
            </button>
            <span v-else class="inline-block w-6" />
          </div>
          <InitialsAvatar :name="row.node.name" :size="32" />
          <div class="min-w-0 flex-1">
            <p class="truncate text-[13.5px] font-semibold text-ink">{{ row.node.name }}</p>
            <p class="truncate text-[11.5px] text-muted-foreground">
              {{ row.node.city }} · <span class="font-mono">{{ row.node.agentNo }}</span>
            </p>
          </div>
          <span class="hidden rounded-md bg-brand-12 px-2 py-0.5 text-[11px] font-bold text-brand-ink sm:inline">ур. {{ row.node.level }}</span>
          <div class="hidden w-40 sm:block">
            <div class="mb-1 flex items-center justify-between text-[11.5px]">
              <span class="font-semibold tabular-nums text-ink">{{ formatMoney(row.node.fact) }}</span>
              <span class="tabular-nums text-muted-foreground">{{ pct(row.node) }}%</span>
            </div>
            <div class="h-1.5 w-full overflow-hidden rounded-full bg-soft">
              <div class="h-full rounded-full" :style="{ width: `${pct(row.node)}%`, background: barColor(pct(row.node)) }" />
            </div>
          </div>
          <span
            v-if="row.node.hanging > 0"
            class="flex shrink-0 items-center gap-1 rounded-md bg-amber-soft px-2 py-1 text-[11px] font-bold text-amber"
          ><AppIcon name="alert" :size="12" /> {{ formatMoney(row.node.hanging) }}</span>
        </li>
      </ul>
    </SectionCard>
  </div>
</template>
