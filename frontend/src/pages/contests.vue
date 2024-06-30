<script setup lang="ts">
import { fetchContests } from '@/backend'
import { ref, onMounted } from 'vue'
import ContestCard from '@/components/ContestCard.vue'
import Title from '@/components/Title.vue'

import { RouterLink, RouterView } from 'vue-router'

const active_contests = ref()
const ended_contests = ref()

onMounted(async () => {
  const contests = await fetchContests()

  active_contests.value = contests.filter((contest: any) => contest.status === 'waiting')
  ended_contests.value = contests.filter((contest: any) => contest.status === 'results')
})
</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
  />
  <div class="container translate-y-10">
    <Title name="Contests" />
    <nav
      class="right-0 inline-flex items-center justify-end bg-gray-200/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-slate-600 transition-all -translate-y-10 rounded-[18px] p-1 gap-1 relative"
    >
      <RouterLink
        to="/contests/active"
        class="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-200 dark:hover:bg-slate-500 cursor-pointer hover:no-underline rounded-[14px] rounded-r-md transition-all"
        activeClass="bg-green-500 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-500"
      >
        <i class="fas fa-trophy"></i>
        <span>Active Contests</span>
      </RouterLink>
      <RouterLink
        to="/contests/previous"
        class="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-200 dark:hover:bg-slate-500 cursor-pointer hover:no-underline rounded-[14px] rounded-l-md transition-all"
        activeClass="bg-blue-500 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500"
      >
        <i class="fas fa-history"></i>
        <span>Previous Contests</span>
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
