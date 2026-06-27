<script setup lang="ts">
import type { TaskPriority } from '~/types/api'
const props = defineProps<{ priority: TaskPriority }>()
const colors: Record<TaskPriority, string> = {
  low: '#9AA8A2',
  medium: '#E0A21B',
  high: '#E8770F',
  urgent: '#D43A3A',
}
</script>

<template>
  <span class="inline-block size-2.5 rounded-full" :style="{ background: colors[props.priority] }" />
</template>
