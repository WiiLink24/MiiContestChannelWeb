<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPlazaNew } from '@/backend'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'
import PageNavigation from '@/components/PageNavigation.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

useHead({
  title: 'Popular | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'Up and rising Miis in our service, download them for yourself!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const plaza_new = ref()
const plaza_new_data = ref()
const isLoading = ref(false)

const route = useRoute()
const router = useRouter()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)

onMounted(async () => {
  try {
    isLoading.value = true
    plaza_new.value = await fetchPlazaNew(current_page.value)
    plaza_new_data.value = plaza_new.value.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  
  }
})

const updateCurrentPage = (newPage: number) => {
  current_page.value = newPage
}

watch(current_page, async (newValue) => {
  router.push({ query: { ...route.query, page: newValue.toString() } })
  try {
    isLoading.value = true
    plaza_new.value = await fetchPlazaNew(current_page.value)
    plaza_new_data.value = plaza_new.value.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  
  }
})
</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_blue_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
    alt="CMOC Background Image"
  />
  <div class="container translate-y-10">
    <Title :name="$t('plaza.title')" />
    <LoadingAnimation v-if="isLoading" />
    <div v-else>
      <p v-if="plaza_new" class="-translate-y-20 text-right opacity-45 text-black">
        {{ $t('plaza.n') }} {{ 50 * plaza_new.total_pages-1 }}+ {{ $t('plaza.miis') }}
      </p>
      <div v-if="plaza_new">
        <ul
        v-if="plaza_new_data"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3 -translate-y-14"
        >
          <MiiCard v-for="mii in plaza_new_data" :key="mii.entry_id" v-bind="mii" />
        </ul>
        <PageNavigation
          :current_page="current_page"
          :total_pages="plaza_new.total_pages"
          @update:current_page="updateCurrentPage"
        />
    </div>
    <p v-else>
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <i class="fa-solid fa-bomb text-6xl"></i>
        <h2 class="w-96 text-center relative">{{ $t('plaza.database') }}</h2>
    </div>
    </div>
    </p>
    </div>
  </div>
</template>
