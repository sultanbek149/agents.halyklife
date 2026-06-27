<script setup lang="ts">
import { resolveIcon } from '~/lib/icons'
const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 18 })
const cmp = computed(() => resolveIcon(props.name))
</script>

<template>
  <component :is="cmp" :size="size" />
</template>
