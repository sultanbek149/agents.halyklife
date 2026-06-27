<script setup lang="ts">
import { clampPct } from '~/lib/format'
interface Props {
  pct: number
  label?: string
  right?: string
  color?: string
  height?: number
}
const props = withDefaults(defineProps<Props>(), { color: 'var(--brand)', height: 8 })
const pct = computed(() => clampPct(props.pct))
</script>

<template>
  <div>
    <div v-if="label || right" class="mb-1.5 flex items-center justify-between text-[12.5px]">
      <span class="font-medium text-muted-foreground">{{ label }}</span>
      <span class="font-semibold tabular-nums text-ink">{{ right }}</span>
    </div>
    <div class="w-full overflow-hidden rounded-full bg-soft" :style="{ height: `${height}px` }">
      <div class="h-full rounded-full transition-all" :style="{ width: `${pct}%`, background: color }" />
    </div>
  </div>
</template>
