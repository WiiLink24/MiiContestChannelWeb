<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchSearch } from '@/backend'
import MiiCard from '@/components/MiiCard.vue'
import ArtisanCard from '@/components/ArtisanCard.vue'
import Title from '@/components/Title.vue'
import PageNavigation from '@/components/PageNavigation.vue'
import { useRoute } from 'vue-router'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

useHead({
  title: 'Search | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Search all of our Mii database and download them for yourself!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

let search_field = ref('')
let search_type = ref('miis')
let search_results = ref()
let page_total
const isLoading = ref(false)

const route = useRoute()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)
const updateCurrentPage = (newPage: number) => {
  current_page.value = newPage
}

async function decodeInput(input) {
  let idStripped = input.replace(/-/g, '').trim();
    let idBinary = parseInt(idStripped, 10).toString(2).padStart(40, '0').slice(8);

    let num = parseInt(idBinary, 2) >>> 0;

    num = (num ^ 0x20070419) >>> 0;
    num = (num ^ ((num >>> 0x1D) ^ (num >>> 0x11) ^ (num >>> 0x17))) >>> 0;
    num = (num ^ ((num & 0xF0F0F0F) << 4)) >>> 0;
    num = (num ^ (((num << 0x1E) ^ (num << 0x12) ^ (num << 0x18)) & 0xFFFFFFFF)) >>> 0;

    num = num >>> 0;
    return num
}

const searchQuery = async () => {
  try {
  isLoading.value = true
  const pattern = /^\d{4}-\d{4}-\d{4}$/;
  const pattern2 = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
  let searchInput = search_field.value;

  if (pattern.test(searchInput)) {
    searchInput = (await decodeInput(searchInput));
    searchInput = searchInput.toString();
  }
  if (pattern2.test(searchInput)) {
    searchInput = searchInput.replace(/-/g, '');
  }

  search_results.value = await fetchSearch(search_type.value, searchInput, current_page.value);
  page_total = search_results.value.total_pages;
  search_results.value = search_results.value.data;
} catch (error) {
  console.error(error)
} finally {
  isLoading.value = false
}
};

watch(current_page, async (newValue) => {
  try {
    isLoading.value = true
  const pattern = /^\d{4}-\d{4}-\d{4}$/;
  const pattern2 = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
  let searchInput = search_field.value;

  if (pattern.test(searchInput)) {
    searchInput = (await decodeInput(searchInput));
  }
  if (pattern2.test(searchInput)) {
    searchInput = searchInput.replace(/-/g, '');
  }

  search_results.value = await fetchSearch(search_type.value, searchInput, current_page.value);
  page_total = search_results.value.total_pages;
  search_results.value = search_results.value.data;
} catch (error) {
  console.error(error)
} finally {
  isLoading.value = false
}
})
</script>

<template>
  <div class="w-full h-full absolute z-0 blur-sm"></div>
  <div class="top-0 left-0 w-full h-80 absolute dissolve"  style="background: linear-gradient(33deg, rgba(217,114,118,1) 0%, rgba(73,199,44,1) 39%, rgba(26,228,207,1) 80%, rgba(36,189,240,1) 100%);"></div>
  <div class="container translate-y-14">
    <Title icon="fa-solid fa-magnifying-glass" :name="t('search.title')" />
    <div class="w-full -translate-y-8 flex flex-row gap-1 relative">
      <input
        class="w-full p-3 bg-gray-200/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-slate-600 focus:bg-gray-300 dark:focus:bg-slate-700 transition-all relative rounded-l-[18px] rounded-r-[4px]"
        v-model="search_field"
        type="text"
        :placeholder="t('search.field')" 
        @keyup.enter="searchQuery(), current_page = 1"
        :autofocus="true"
      />
      <div class="flex items-center bg-gray-200/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-slate-600 transition-all rounded-[4px] p-1">
        <div
          class="mr-1 h-full flex items-center justify-center cursor-pointer dark:hover:bg-slate-500 rounded-[4px]"
          :class="{ 'bg-green-500 dark:hover:bg-green-500': search_type === 'miis' }"
          @click="search_type = 'miis'; search_results = null"
        >
          <div class="flex items-center gap-2 px-4 py-2 text-white">
            <i
              class="fas fa-user"
              :class="{
                'text-gray-400': search_type !== 'miis',
                'text-white': search_type === 'miis'
              }"
            ></i>
            <label
              class="select-none mobile-hide"
              :class="{
                'text-gray-400': search_type !== 'miis',
                'text-white': search_type === 'miis'
              }"
              >{{ t('search.miis') }}</label
            >
          </div>
          <input
            type="radio"
            name="search_type"
            value="miis"
            v-model="search_type"
            class="hidden"
          />
        </div>
        <div
          class="cursor-pointer h-full flex items-center justify-center dark:hover:bg-slate-500 rounded-[4px]"
          :class="{ 'bg-blue-500 dark:hover:bg-blue-500': search_type === 'artisans' }"
          @click="search_type = 'artisans'; search_results = null"
        >
          <div class="flex items-center gap-2 px-4 py-2 text-white">
            <i
              class="fas fa-paint-brush"
              :class="{
                'text-gray-400': search_type !== 'artisans',
                'text-white': search_type === 'artisans'
              }"
            ></i>
            <label
              class="select-none mobile-hide"
              :class="{
                'text-gray-400': search_type !== 'artisans',
                'text-white': search_type === 'artisans'
              }"
              >{{ t('search.artisans') }}</label
            >
          </div>
          <input
            type="radio"
            name="search_type"
            value="artisans"
            v-model="search_type"
            class="hidden"
          />
        </div>
    </div>
      <button
        @click="searchQuery(), current_page = 1"
        class="p-3 pl-4 pr-4 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 transition-all rounded-l-[4px] rounded-r-[18px]"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div v-if="search_results">
  <div>
    <div v-if="search_results.length > 0 && search_type === 'miis'">
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3" v-if="!isLoading">
      <MiiCard v-for="result in search_results" :key="result.entry_id" v-bind="result" />
    </ul>
    <LoadingAnimation v-if="isLoading" />
      <PageNavigation
        :current_page="current_page"
        :total_pages="page_total"
        @update:current_page="updateCurrentPage"
        class="mt-10"
      />
  </div>
    <div v-else-if="search_results.length > 0 && search_type === 'artisans'">
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3" v-if="!isLoading">
      <ArtisanCard v-for="result in search_results" :key="result.entry_id" v-bind="result" />
    </ul>
    <LoadingAnimation v-if="isLoading" />
      <PageNavigation
        :current_page="current_page"
        :total_pages="page_total"
        @update:current_page="updateCurrentPage"
        class="mt-10"
      />
  </div>
    <p v-else class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <i class="fa-solid fa-bomb text-6xl"></i>
        <h2 class="sm:w-96 w-full text-center relative">Nothing was found... Did you type it in correctly?</h2>
    </div>
    </div>
    </p>
  </div>
    </div>
	<div v-else-if="search_type == 'miis'" class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
		<div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
			<div class="flex flex-row gap-3 items-center">
				<i class="fa-solid fa-magnifying-glass text-6xl"></i>
				<b class="p-3 pl-6 pr-6 rounded-lg text-white bg-green-500">{{ t('search.mii_mode') }}</b>
			</div>
			<h2 class="sm:w-96 w-full text-center relative" v-html="t('search.mii_instructions')">
			</h2>
		</div>
	</div>
	<div v-else-if="search_type == 'artisans'" class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
		<div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
			<div class="flex flex-row gap-3 items-center">
				<i class="fa-solid fa-magnifying-glass text-6xl"></i>
				<b class="p-3 pl-6 pr-6 rounded-lg text-white bg-blue-500">{{ t('search.artisan_mode') }}</b>
			</div>
			<h2 class="sm:w-96 w-full text-center relative" v-html="t('search.artisan_instructions')"></h2>
		</div>
		</div>
	</div>
</template>
