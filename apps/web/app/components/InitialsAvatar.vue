<script setup lang="ts">
import { initials as toInitials } from '~/lib/format'
interface Props { name?: string; text?: string; size?: number; solid?: boolean }
const props = withDefaults(defineProps<Props>(), { size: 36, solid: false })
const label = computed(() => props.text ?? (props.name ? toInitials(props.name) : '?'))
</script>

<template>
  <span
    class="inline-grid shrink-0 place-items-center rounded-full font-bold"
    :class="solid ? 'bg-brand text-primary-foreground' : 'bg-brand-12 text-brand-ink'"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.36)}px` }"
  >
    {{ label }}
  </span>
</template>
