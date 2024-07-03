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
    <header :class="{'backdrop-blur-md shadow-md bg-gray-400/50 dark:bg-slate-600/50 transition-all': isScrolled}" class="w-full flex items-center justify-between dark:text-white md:px-8 lg:px-8 px-4 py-4 z-10 fixed">
        <img src="/img/viewingTool-logo.png" class="dark:invert !h-[50px]">
        <nav class="flex gap-10 items-center">
            <ul class="flex gap-2 items-center mobile-hide-flex">
                <li><RouterLink to="/" class="header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-house"></i> Home</RouterLink></li>
                <li><RouterLink to="/plaza/popular" class="header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-fire"></i> Popular</RouterLink></li>
                <li><RouterLink to="/plaza/top" class="header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-ranking-star"></i> The Top 50</RouterLink></li>
                <li><RouterLink to="/artisans" class="header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-star"></i> Artisans</RouterLink></li>
                <li><RouterLink to="/contests/active" class="header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-trophy"></i> Contests</RouterLink></li>
                <li class="opacity-30 mr-3">|</li> 
                <RouterLink to="/search" class="bg-gray-400/30 dark:bg-gray-200/30 px-4 py-2 w-80 text-black flex justify-between items-center rounded-lg hover:no-underline hover:shadow-xl hover:scale-105 shadow-slate-400 transition-all"><i class="fa-solid fa-magnifying-glass mr-2"></i>Search...</RouterLink>
            </ul>
            <div class="mobile-show" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')"><i class="fa-solid fa-bars text-3xl"></i></div>
        </nav>
    </header>
    <div id="mobile-menu" class="bg-gray-200 dark:bg-slate-700 hidden">
        <ul class="left-1/2 -translate-x-1/2 w-[calc(100%-50px)] mt-24 flex flex-col gap-2 items-center relative">
          <RouterLink to="/search" class="bg-gray-400/30 dark:bg-gray-200/30 px-4 py-2 w-full text-black flex justify-between items-center rounded-lg hover:no-underline hover:shadow-xl hover:scale-105 shadow-slate-400 transition-all"><i class="fa-solid fa-magnifying-glass mr-2"></i>Search...</RouterLink>
          <hr class="w-full mt-3 mb-3 border-t-black dark:border-t-white">
                <li class="w-full"><RouterLink to="/" class="w-full block header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-house"></i> Home</RouterLink></li>
                <li class="w-full"><RouterLink to="/plaza/popular" class="w-full block header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-fire"></i> Popular</RouterLink></li>
                <li class="w-full"><RouterLink to="/plaza/top" class="w-full block header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-ranking-star"></i> The Top 50</RouterLink></li>
                <li class="w-full"><RouterLink to="/artisans" class="w-full block header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-star"></i> Artisans</RouterLink></li>
                <li class="w-full"><RouterLink to="/contests/active" class="w-full block header-link text-black" active-class="bg-gray-300/80 dark:bg-white/20 scale-[0.97] transition"><i class="fa-solid fa-trophy"></i> Contests</RouterLink></li>
            </ul>
      </div>
</template>