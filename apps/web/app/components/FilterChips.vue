<script setup lang="ts">
interface Chip { value: string; label: string; count?: number }
const props = defineProps<{ chips: Chip[]; modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      v-for="c in props.chips"
      :key="c.value"
      type="button"
      @click="emit('update:modelValue', c.value)"
      :class="[
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition',
        props.modelValue === c.value
          ? 'border-transparent bg-brand text-primary-foreground'
          : 'border-line bg-card text-muted-foreground hover:bg-soft',
      ]"
    >
      {{ c.label }}
      <span
        v-if="c.count !== undefined"
        :class="[
          'rounded-full px-1.5 text-[11px] font-bold tabular-nums',
          props.modelValue === c.value ? 'bg-white/25 text-primary-foreground' : 'bg-soft text-muted-foreground',
        ]"
        >{{ c.count }}</span
      >
    </button>
  </div>
</template>
