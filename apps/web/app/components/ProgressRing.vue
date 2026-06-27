<script setup lang="ts">
import { clampPct } from '~/lib/format'
interface Props {
  pct: number
  size?: number
  thickness?: number
  color?: string
  track?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 132,
  thickness: 14,
  color: 'var(--brand)',
  track: '#E9EFEC',
})
const pct = computed(() => clampPct(props.pct))
const ringStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  background: `conic-gradient(${props.color} 0% ${pct.value}%, ${props.track} ${pct.value}% 100%)`,
}))
const holeStyle = computed(() => ({
  inset: `${props.thickness}px`,
}))
</script>

<template>
  <div class="relative shrink-0 rounded-full" :style="ringStyle">
    <div class="absolute rounded-full bg-card" :style="holeStyle" />
    <div class="absolute inset-0 grid place-items-center text-center">
      <slot>
        <div>
          <div class="text-2xl font-extrabold tabular-nums text-ink">{{ pct }}%</div>
        </div>
      </slot>
    </div>
  </div>
</template>
