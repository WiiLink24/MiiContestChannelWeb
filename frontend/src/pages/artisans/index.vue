<script setup lang="ts">
import { fetchArtisans } from '@/backend'
import ArtisanCard from '@/components/ArtisanCard.vue'
import PageNavigation from '@/components/PageNavigation.vue'
import Title from '@/components/Title.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const artisans = ref()

onMounted(async () => {
  artisans.value = await fetchArtisans()
  console.log(artisans.value)
})

const route = useRoute()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)
const updateCurrentPage = (newPage: number) => {
  current_page.value = newPage
}
</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
  />
  <div class="container translate-y-10">
    <Title name="Artisans" />
    <div v-if="artisans">
      <ul class="grid grid-cols-5 gap-10">
        <ArtisanCard v-for="artisan in artisans.data" :key="artisan.wii_number" v-bind="artisan" />
      </ul>
      <PageNavigation
        :current_page="current_page"
        :total_pages="artisans.total_pages"
        @update:current_page="updateCurrentPage"
      />
    </div>
  </div>
</template>
