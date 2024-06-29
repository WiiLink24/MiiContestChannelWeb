<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 1
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <header :class="{'backdrop-blur-md shadow-md bg-gray-300/50 dark:bg-slate-600/50 transition-all': isScrolled}" class="w-full flex items-center justify-between dark:text-white px-8 py-4 z-10 fixed">
        <img src="/img/viewingTool-logo.png" class="dark:invert !h-[50px]">
        <nav class="flex gap-10 items-center">
            <ul class="flex gap-2 items-center">
                <li><RouterLink to="/" class="header-link" active-class="bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-house"></i> Home</RouterLink></li>
                <li><RouterLink to="/plaza/popular" class="header-link" active-class="bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-fire"></i> Popular</RouterLink></li>
                <li><RouterLink to="/plaza/top" class="header-link" active-class="bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-ranking-star"></i> The Top 50</RouterLink></li>
                <li><RouterLink to="/artisans" class="header-link" active-class="bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-star"></i> Artisans</RouterLink></li>
                <li><RouterLink to="/contests" class="header-link" active-class="bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-rotate-left"></i> Previous Contests</RouterLink></li>
                <l class="opacity-30 mr-3">|</l> 
                <RouterLink to="/search" class="bg-gray-200/30 px-4 py-2 w-80 flex justify-between items-center rounded-lg hover:no-underline hover:shadow-xl hover:scale-105 shadow-slate-400 transition-all"><i class="fa-solid fa-magnifying-glass mr-2"></i>Search...</RouterLink>
            </ul>
        </nav>
    </header>
</template>