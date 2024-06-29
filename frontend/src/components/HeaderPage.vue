<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="flex items-center justify-between dark:text-white px-8 py-4">
        <img src="/img/viewingTool-logo.png" class="dark:invert !h-[50px]">
        <nav class="flex gap-10 items-center">
            <RouterLink to="/search" class="bg-gray-200/30 px-4 py-2 w-80 flex justify-between items-center rounded-lg"><i class="fa-solid fa-magnifying-glass mr-2"></i>Search...</RouterLink>
            <ul class="flex gap-2">
                <li><RouterLink to="/" class="header-link" active-class="bg-white/40 scale-[0.97] transition"><i class="fa-solid fa-house"></i>Home</RouterLink></li>
                <li><RouterLink to="/plaza/popular" class="header-link" active-class="bg-white/40 scale-[0.97] transition"><i class="fa-solid fa-fire"></i>Popular</RouterLink></li>
                <li><RouterLink to="/plaza/top" class="header-link" active-class="bg-white/40 scale-[0.97] transition"><i class="fa-solid fa-ranking-star"></i>The Top 50</RouterLink></li>
                <li><RouterLink to="/artisans" class="header-link" active-class="bg-white/40 scale-[0.97] transition"><i class="fa-solid fa-star"></i>Artisans</RouterLink></li>
                <li><RouterLink to="/contests" class="header-link" active-class="bg-white/40 scale-[0.97] transition"><i class="fa-solid fa-rotate-left"></i>Previous Contests</RouterLink></li>
            </ul>
        </nav>
    </header>
</template>