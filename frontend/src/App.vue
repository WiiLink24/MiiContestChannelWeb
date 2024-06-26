<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import HeaderPage from '@/components/HeaderPage.vue'
</script>

<template>
  <HeaderPage />
  <main class="bg-white dark:bg-slate-800 dark:text-white">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

