<script setup lang="ts">
import { fetchArtisan, renderMii, downloadMii, formatWiiNumber } from '@/backend'
import { formatDate } from '@/date_format'
import { isValidWiiNumber } from 'nwc24js'
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ReturnBtn from '@/components/ReturnBtn.vue'
import ArtisanCard from '@/components/ArtisanCard.vue'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'
import PageNavigation from '@/components/PageNavigation.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Artisan View | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Detailed information about a specific Mii Artisan, including all their posted Miis for you to download!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

let page_total
const isLoading = ref(false)

const route = useRoute()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)
const updateCurrentPage = (newPage: number) => {
  current_page.value = newPage
}

const artisanId = ref(route.params.id)
const artisan = ref()
const artisan_data = ref()
const mii_data = ref()
const mii_img = ref()
const isArtisanNumberValid = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
  artisan.value = await fetchArtisan(artisanId.value, 1);
  artisan_data.value = artisan.value.artisan_data;
  page_total = artisan.value.entries_data.total_pages;
  mii_data.value = artisan.value.entries_data.miis_data;
  console.log(formatWiiNumber(artisan_data.value.wii_number))
  console.log(isValidWiiNumber(formatWiiNumber(artisan_data.value.wii_number)))
  isArtisanNumberValid.value = isValidWiiNumber(formatWiiNumber(artisan_data.value.wii_number))

  if (artisan_data.value && artisan_data.value.mii_data) {
    mii_img.value = await renderMii(artisan_data.value.mii_data);
  }
} catch (error) {
  console.error(error)
} finally {
  isLoading.value = false
}
});


// Using a computed property to automatically update the formatted date when artisan_data.last_post changes
const lastPostFormatted = computed(() => {
  if (!artisan_data.value || !artisan_data.value.last_post) {
    return 'Date not available';
  }
  return formatDate(artisan_data.value.last_post);
});

watch(current_page, async (newValue) => {
  try {
    artisan.value = await fetchArtisan(artisanId.value, current_page.value);
  artisan_data.value = artisan.value.artisan_data;
  page_total = artisan.value.entries_data.total_pages;
  mii_data.value = artisan.value.entries_data.miis_data;

  if (artisan_data.value && artisan_data.value.mii_data) {
    mii_img.value = await renderMii(artisan_data.value.mii_data);
  }
} catch (error) {
  console.error(error)
} finally {
  isLoading.value = false
}
})
</script>

<template>
  <div v-if="artisan_data" class="container translate-y-10">
    <ReturnBtn />
    <div v-if="artisan_data" class="mt-3 flex sm:flex-row flex-col gap-6">
      <ul class="sm:w-48 w-full relative">
        <ArtisanCard v-bind="artisan_data" />
      </ul>
      <div class="pb-3 flex flex-col items-start justify-end">
        <Title :name="artisan_data.name" class="mobile-hide"/>
        <div class="sm:-translate-y-12">
            <div class="w-full mb-3 flex sm:flex-row flex-col sm:items-center items-start justify-between gap-3 relative">
        <button 
        class="p-3 pl-6 pr-6 bg-green-500/60 border-1 border-green-60 backdrop-blur-md rounded-md hover:bg-green-600 transition-all"
        @click="downloadMii(artisan_data.name, artisan_data.mii_data)"
        ><i class="fa-solid fa-download"></i> Download {{ artisan_data.name }}'s Mii</button>
        <span v-if="artisan_data.is_master" class="p-1 pl-2 pr-2 text-md font-bold select-none rounded-full bg-orange-400"
        >◆ Master Mii Artisan ◆
        </span>
        </div>
        <p class="flex flex-col text-xl text-black">
          <span class="opacity-30 text-sm">Wii Number</span>{{ formatWiiNumber(artisan_data.wii_number) }}
          <span v-if="isArtisanNumberValid" class="text-green-500">✓</span>
          <span v-else class="text-red-500">✗</span>
        </p>
        <div class="flex flex-row items-center text-black">
          <p class="flex flex-col justify-end text-left text-black">
            <span class="opacity-30 text-sm">Last posted on </span>
            <p id="lastPost" class="text-xl text-black">
              {{ lastPostFormatted }}
          </p>
          </p>
        </div>
    </div>
      </div>
    </div>
    <hr class="pb-3 opacity-5 border-t-black dark:border-t-white" />
    <div class="mt-6 mb-3 flex flex-row items-center justify-between">
      <h1 class="font-bold text-4xl">Miis</h1>
      <h2 v-if="artisan_data" class="opacity-60">{{ artisan_data.name }} has submitted {{ artisan_data.number_of_posts }} Miis.</h2>
    </div>
    <div v-if="artisan_data && mii_data">
      <ul v-id="!isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3">
        <MiiCard v-for="entries in mii_data" :key="entries.entry_id" v-bind="entries" />
      </ul>
      <LoadingAnimation v-if="isLoading" />
      <PageNavigation
        :current_page="current_page"
        :total_pages="page_total"
        @update:current_page="updateCurrentPage"
        class="mt-10" />
    </div>
    <div
      v-else-if="artisan_data && !mii_data"
      class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative"
    >
      <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
        <i class="fa-solid fa-magnifying-glass text-6xl"></i>
        <h2 class="w-96 text-center relative">
          {{ artisan_data.name }} has posted no Miis. Once they do, they will be shown here...
        </h2>
      </div>
    </div>
  </div>
  <div v-else class="container p-20 w-full h-30 translate-y-14 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <div class="flex flex-row gap-3 items-center"><i class="fa-solid fa-bomb text-6xl"></i></div>
        <h2 class="w-96 text-center relative">The Mii Artisan you were looking for could not be found...</h2>
    </div>
    </div>
</template>