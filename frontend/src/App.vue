<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import HeaderPage from '@/components/HeaderPage.vue'
import FooterPage from '@/components/FooterPage.vue'
</script>

<template>
  <HeaderPage />
  <main class="bg-white dark:bg-slate-800 dark:text-white translate-y-10">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
  <FooterPage />
</template>

