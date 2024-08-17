<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import { fetchPlazaTop } from '@/backend'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

useHead({
  title: 'Top 50 | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Top 50 Miis currently in the service!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

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
    alt="CMOC Background Image"
  />
<div class="container translate-y-10">
    <Title :name="t('top.title')" />
    <p class="-translate-y-20 text-right opacity-45 text-black">
      {{ t('top.desc') }}
    </p>
    <LoadingAnimation v-if="isLoading" />
    <template v-if="top50">
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3 -translate-y-14">
        <MiiCard
          v-for="(item, index) in top50"
          :key="item.entry_id"
          v-bind="item"
          :ranking="index + 1"
        />
      </ul>
    </template>
    <div v-else-if="!isLoading" class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
      <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <i class="fa-solid fa-bomb text-6xl"></i>
          <h2 class="w-96 text-center relative">{{ t('top.database') }}</h2>
      </div>
    </div>
</div>
</template>