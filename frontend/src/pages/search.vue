<script setup lang="ts">
import { ref } from 'vue'
import { fetchSearch } from '@/backend'
import MiiCard from '@/components/MiiCard.vue'
import ArtisanCard from '@/components/ArtisanCard.vue'
import Title from '@/components/Title.vue'

let search_field = ref('')
let search_type = ref('miis')

let search_results = ref()

const searchQuery = async () => {
  search_results.value = await fetchSearch(search_type.value, search_field.value);
}
</script>

<template>
<div class="w-full h-full absolute z-0 blur-sm dissolve" style="background: linear-gradient(33deg, rgba(217,114,118,1) 0%, rgba(73,199,44,1) 39%, rgba(26,228,207,1) 80%, rgba(36,189,240,1) 100%);"></div>
  <div class="container translate-y-14">
    <Title icon="fa-solid fa-magnifying-glass" name="Search"/>
    <div class="w-full -translate-y-8 flex flex-row gap-1 relative">
      <input
        class="w-full p-3 bg-gray-200/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-slate-600 focus:bg-gray-300 dark:focus:bg-slate-700 transition-all relative rounded-l-[18px] rounded-r-[4px]"
        v-model="search_field"
        type="text"
        placeholder="Search for Miis or Artisans by Name, ID or Initials..."
        @keyup.enter="searchQuery()"
        :autofocus="true"
      />
      <div class="flex items-center bg-gray-200/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-slate-600 transition-all rounded-[4px] p-1">
        <div
          class="mr-1 cursor-pointer dark:hover:bg-slate-500 rounded-[4px]"
          :class="{ 'bg-green-500 dark:hover:bg-green-500': search_type === 'miis' }"
          @click="search_type = 'miis'"
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
              class="select-none"
              :class="{
                'text-gray-400': search_type !== 'miis',
                'text-white': search_type === 'miis'
              }"
              >Miis</label
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
          class="cursor-pointer dark:hover:bg-slate-500 rounded-[4px]"
          :class="{ 'bg-blue-500 dark:hover:bg-blue-500': search_type === 'artisans' }"
          @click="search_type = 'artisans'"
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
              class="select-none"
              :class="{
                'text-gray-400': search_type !== 'artisans',
                'text-white': search_type === 'artisans'
              }"
              >Artisans</label
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
        @click="searchQuery()"
        class="p-3 pl-4 pr-4 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 transition-all rounded-l-[4px] rounded-r-[18px]"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div v-if="search_results">
  <div>
    <ul class="grid grid-cols-5 gap-10" v-if="search_results.length > 0 && search_type === 'miis'">
      <MiiCard v-for="result in search_results" :key="result.entry_id" v-bind="result" />
    </ul>
    <ul class="grid grid-cols-5 gap-10" v-else-if="search_results.length > 0 && search_type === 'artisans'">
      <ArtisanCard v-for="result in search_results" :key="result.entry_id" v-bind="result" />
    </ul>
    <p v-else class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-200 dark:text-slate-400">
            <i class="fa-solid fa-bomb text-6xl"></i>
        <h2 class="w-96 text-center relative">Nothing was found... Did you type it in correctly?</h2>
    </div>
    </div>
    </p>
  </div>
    </div>
    <div v-else class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-200 dark:text-slate-400">
            <i class="fa-solid fa-magnifying-glass text-6xl"></i>
        <h2 class="w-96 text-center relative">To begin searching, choose between Mii and Artisan search, then type your query in the box. You can search for a Mii by using its Name, ID, or Initals.</h2>
    </div>
    </div>
  </div>
</template>
