<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPlazaNew } from '@/backend'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'
import PageNavigation from '@/components/PageNavigation.vue'

const plaza_new = ref()
const plaza_new_data = ref()

const route = useRoute()
const router = useRouter()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)

onMounted(async () => {
  plaza_new.value = await fetchPlazaNew(current_page.value)
  plaza_new_data.value = plaza_new.value.data
})

const updateCurrentPage = (newPage: number) => {
  current_page.value = newPage
}

watch(current_page, async (newValue) => {
  router.push({ query: { ...route.query, page: newValue.toString() } })
  plaza_new.value = await fetchPlazaNew(current_page.value)
})
</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_blue_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
  />
  <div class="container translate-y-10">
    <Title name="Popular" />
    <p class="-translate-y-20 text-right opacity-45">
      There are Miis in the Plaza!
    </p>
    <div v-if="plaza_new">
      <ul
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 -translate-y-14"
      >
        <MiiCard v-for="mii in plaza_new_data" :key="mii.entry_id" v-bind="mii" />
      </ul>
      <PageNavigation
        :current_page="current_page"
        :total_pages="plaza_new.total_pages"
        @update:current_page="updateCurrentPage"
      />
    </div>
  </div>
</template>
