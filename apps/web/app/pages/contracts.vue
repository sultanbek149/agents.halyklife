<script setup lang="ts">
const goClients = () => navigateTo('/clients')
</script>

<template>
  <div>
    <PageHeader title="Договоры" subtitle="Раздел в разработке" />
    <SectionCard>
      <EmptyState
        icon="wrench"
        title="Раздел в разработке"
        body="Договоры появятся в следующем релизе кабинета. Пока доступны Клиенты и Оплаты."
      >
        <template #action>
          <UiButton variant="outline" class="rounded-xl font-semibold" @click="goClients">К клиентам</UiButton>
        </template>
      </EmptyState>
    </SectionCard>
  </div>
</template>
