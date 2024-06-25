<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/top">Top 50</RouterLink>
    </nav>
  </header>
  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

