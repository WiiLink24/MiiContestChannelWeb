<script setup lang="ts">
import { fetchArtisans } from '@/backend'
import ArtisanCard from '@/components/ArtisanCard.vue'
import PageNavigation from '@/components/PageNavigation.vue'
import Title from '@/components/Title.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const artisans = ref()
const isLoading = ref(false)

onMounted(async () => {
  artisans.value = await fetchArtisans(current_page.value)
  console.log(artisans.value)
})

const route = useRoute()
const router = useRouter()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)
const updateCurrentPage = (newPage: number) => {
  current_page.value = newPage
}

watch(current_page, async (newValue) => {
  router.push({ query: { ...route.query, page: newValue.toString() } })
  try {
    isLoading.value = true
    artisans.value = await fetchArtisans(current_page.value)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  
  }
})
</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
  />
  <div class="container translate-y-10">
    <Title name="Artisans" />
    <div v-if="artisans">
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mb-6 -translate-y-8">
        <ArtisanCard v-for="artisan in artisans.data" :key="artisan.wii_number" v-bind="artisan" />
      </ul>
      <PageNavigation
        :current_page="current_page"
        :total_pages="artisans.total_pages"
        @update:current_page="updateCurrentPage"
      />
    </div>
    <div v-else class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
      <div class="flex flex-col items-center gap-3 text-gray-200 dark:text-slate-400">
          <i class="fa-solid fa-bomb text-6xl"></i>
          <h2 class="w-96 text-center relative">Could not establish a connection to the Plaza database, please try again later...</h2>
      </div>
    </div>
  </div>
</template>
