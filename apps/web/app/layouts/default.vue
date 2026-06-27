<script setup lang="ts">
const { open, close } = useSidebar()
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- Десктоп-сайдбар -->
    <AppSidebar />

    <!-- Мобильный drawer -->
    <UiSheet v-model:open="open">
      <UiSheetContent side="left" class="w-[280px] max-w-[85vw] p-0" :show-close-button="false">
        <UiSheetHeader class="sr-only">
          <UiSheetTitle>Навигация</UiSheetTitle>
        </UiSheetHeader>
        <AppNav @navigate="close()" />
      </UiSheetContent>
    </UiSheet>

    <!-- Контентная колонка с собственным скроллом -->
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <AppHeader />
      <main class="min-h-0 flex-1 overflow-y-auto">
        <div class="w-full px-5 py-6 sm:px-7 lg:px-8 animate-hl-fade">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
