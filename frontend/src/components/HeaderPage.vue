<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="flex items-center justify-between dark:text-white px-8 py-4">
        <h1>CMOC Icon Placeholder</h1>
        <nav class="flex gap-10">
            <RouterLink to="/search" class="bg-gray-200/30 px-4 py-2 w-80 flex justify-between items-center rounded-lg"><i class="fa-solid fa-magnifying-glass mr-2"></i>Search...</RouterLink>
            <ul class="flex gap-2">
                <li><RouterLink to="/" class="p-2 inline-flex items-center gap-1.5 transition-all rounded-lg" active-class="bg-gray-200/30 border-b-4"><i class="fa-solid fa-house"></i>Home</RouterLink></li>
                <li><RouterLink to="/plaza/popular" class="p-2 inline-flex items-center gap-1.5 transition-all rounded-lg" active-class="bg-gray-200/30 border-b-4"><i class="fa-solid fa-fire"></i>Popular</RouterLink></li>
                <li><RouterLink to="/plaza/top" class="p-2 inline-flex items-center gap-1.5 transition-all rounded-lg" active-class="bg-gray-200/30 border-b-4"><i class="fa-solid fa-ranking-star"></i>The Top 50</RouterLink></li>
                <li><RouterLink to="/artisans" class="p-2 inline-flex items-center gap-1.5 transition-all rounded-lg" active-class="bg-gray-200/30 border-b-4"><i class="fa-solid fa-star"></i>Artisans</RouterLink></li>
                <li><RouterLink to="/contests" class="p-2 inline-flex items-center gap-1.5 transition-all rounded-lg" active-class="bg-gray-200/30 border-b-4"><i class="fa-solid fa-rotate-left"></i>Contests</RouterLink></li>
            </ul>
        </nav>
    </header>
</template>