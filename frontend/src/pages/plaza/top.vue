<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import { fetchPlazaTop } from '@/backend'

const top50 = ref()
const isLoading = ref(true)

onMounted(async () => {
  try {
    isLoading.value = true
    top50.value = await fetchPlazaTop()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_orange_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
  />
<div class="container translate-y-10">
    <Title name="Top 50" />
    <p class="-translate-y-20 text-right opacity-45">
      These are the Top 50 Miis, sorted by number of likes!
    </p>
    <LoadingAnimation v-if="isLoading" />
    <template v-if="top50">
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 -translate-y-14">
        <MiiCard
          v-for="(item, index) in top50"
          :key="item.entry_id"
          v-bind="item"
          :ranking="index + 1"
        />
      </ul>
    </template>
    <div v-else-if="!isLoading" class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
      <div class="flex flex-col items-center gap-3 text-gray-200 dark:text-slate-400">
          <i class="fa-solid fa-bomb text-6xl"></i>
          <h2 class="w-96 text-center relative">Could not establish a connection to the Plaza database, please try again later...</h2>
      </div>
    </div>
</div>
</template>