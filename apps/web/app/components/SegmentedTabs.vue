<script setup lang="ts">
interface Seg { value: string; label: string; count?: number }
const props = defineProps<{ segments: Seg[]; modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <div class="inline-flex rounded-xl bg-soft p-1">
    <button
      v-for="s in props.segments"
      :key="s.value"
      type="button"
      @click="emit('update:modelValue', s.value)"
      :class="[
        'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13.5px] font-semibold transition',
        props.modelValue === s.value
          ? 'bg-card text-ink shadow-[0_1px_3px_rgba(16,40,32,.08)]'
          : 'text-muted-foreground hover:text-ink',
      ]"
    >
      {{ s.label }}
      <span
        v-if="s.count !== undefined"
        class="rounded-full bg-danger px-1.5 text-[11px] font-bold text-white tabular-nums"
        >{{ s.count }}</span
      >
    </button>
  </div>
</template>
