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
    <ul
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 -translate-y-14" v-else
    >
      <MiiCard
        v-for="(item, index) in top50"
        :key="item.entry_id"
        v-bind="item"
        :ranking="index + 1"
      />
    </ul>
  </div>
</template>