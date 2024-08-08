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

<style>
ul,
li {
  transition: 0.2s;
}

ul:hover li {
  opacity: 0.5;
  transition: 0.2s;
}

ul:not(:has(li:hover)) li {
  opacity: 1;
  transition: 0.2s;
}

ul li:hover {
  opacity: 1;
  transition: 0.2s;
}
</style>