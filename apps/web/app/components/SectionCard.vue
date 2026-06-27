<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  noPad?: boolean
  emphasis?: boolean
}
withDefaults(defineProps<Props>(), { noPad: false, emphasis: false })
</script>

<template>
  <section
    :class="[
      'rounded-xl border block-shadow',
      emphasis ? 'border-brand/30 bg-brand-12/40' : 'border-line bg-card',
    ]"
  >
    <header
      v-if="title || $slots.action || $slots.header"
      class="flex items-center justify-between gap-3 px-5 pt-4"
      :class="noPad && !$slots.default ? 'pb-4' : ''"
    >
      <slot name="header">
        <div>
          <h3 class="text-[14px] font-semibold leading-tight text-ink">{{ title }}</h3>
          <p v-if="subtitle" class="mt-0.5 text-[12px] text-muted-foreground">{{ subtitle }}</p>
        </div>
      </slot>
      <slot name="action" />
    </header>
    <div :class="noPad ? '' : 'p-5'">
      <slot />
    </div>
  </section>
</template>
