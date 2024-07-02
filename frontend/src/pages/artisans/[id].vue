<script setup lang="ts">
import { fetchArtisan, renderMii, downloadMii, formatWiiNumber } from '@/backend'
import { formatDate } from '@/date_format'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ReturnBtn from '@/components/ReturnBtn.vue'
import ArtisanCard from '@/components/ArtisanCard.vue'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'

const route = useRoute()
const artisanId = ref(route.params.id)

const artisan = ref()
const artisan_data = ref()
const mii_data = ref()

const mii_img = ref()

onMounted(async () => {
  artisan.value = await fetchArtisan(artisanId.value);
  artisan_data.value = artisan.value.artisan_data;
  mii_data.value = artisan.value.miis_data;

  if (artisan_data.value && artisan_data.value.mii_data) {
    mii_img.value = await renderMii(artisan_data.value.mii_data);
  }
  console.log(artisan.value);
});


// Using a computed property to automatically update the formatted date when artisan_data.last_post changes
const lastPostFormatted = computed(() => {
  if (!artisan_data.value || !artisan_data.value.last_post) {
    return 'Date not available';
  }
  return formatDate(artisan_data.value.last_post);
});

</script>

<template>
  <div class="container translate-y-10">
    <ReturnBtn />
    <div v-if="artisan_data" class="mt-3 flex flex-row gap-6">
      <ul class="w-48 relative">
        <ArtisanCard v-bind="artisan_data" />
      </ul>
      <div class="pb-3 flex flex-col items-start justify-end">
        <Title :name="artisan_data.name" />
        <div class="-translate-y-12">
            <div class="w-full mb-3 flex flex-row items-center justify-between gap-3 relative">
        <button 
        class="p-3 pl-6 pr-6 bg-green-500/60 border-1 border-green-60 backdrop-blur-md rounded-md hover:bg-green-600 transition-all"
        @click="downloadMii(artisan_data.name, artisan_data.mii_data)"
        ><i class="fa-solid fa-download"></i> Download {{ artisan_data.name }}'s Mii</button>
        <span v-if="artisan_data.is_master" class="p-1 pl-2 pr-2 text-md font-bold select-none rounded-full bg-orange-400"
        >◆ Master Mii Artisan ◆
        </span>
        </div>
        <p class="flex flex-col text-xl">
          <span class="opacity-30 text-sm">Wii Number</span>{{ formatWiiNumber(artisan_data.wii_number) }}
        </p>
        <div class="flex flex-row items-center">
          <p class="flex flex-col justify-end text-left">
            <span class="opacity-30 text-sm">Last posted on </span>
            <p id="lastPost" class="text-xl">
              {{ lastPostFormatted }}
          </p>
          </p>
        </div>
    </div>
      </div>
    </div>
    <hr class="pb-3 opacity-5" />
    <div class="mt-6 mb-3 flex flex-row items-center justify-between">
      <h1 class="font-bold text-4xl">Miis</h1>
      <h2 v-if="artisan_data" class="opacity-60">{{ artisan_data.name }} has submitted {{ artisan_data.number_of_posts }} Miis.</h2>
    </div>
    <div v-if="artisan_data && mii_data">
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        <MiiCard v-for="entries in mii_data" :key="entries.entry_id" v-bind="entries" />
      </ul>
    </div>
    <div
      v-else-if="artisan_data && !mii_data"
      class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative"
    >
      <div class="flex flex-col items-center gap-3 text-gray-200 dark:text-slate-400">
        <i class="fa-solid fa-magnifying-glass text-6xl"></i>
        <h2 class="w-96 text-center relative">
          {{ artisan_data.name }} has posted no Miis. Once they do, they will be shown here...
        </h2>
      </div>
    </div>
  </div>
</template>