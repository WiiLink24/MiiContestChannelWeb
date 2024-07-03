<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { fetchContest } from '@/backend'
import { useRoute } from 'vue-router'
import MiiCard from '@/components/MiiCard.vue'
import ReturnBtn from '@/components/ReturnBtn.vue'
import ContestCard from '@/components/ContestCard.vue'
import PageNavigation from '@/components/PageNavigation.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'

let page_total
const isLoading = ref(false)

const route = useRoute()
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1)
const updateCurrentPage = (newPage: number) => {
  current_page.value = newPage
}

const contestId = ref(route.params.id)
const contest = ref()
const contest_data = ref()
const entries_data = ref()

onMounted(async () => {
    try {
    isLoading.value = true
  contest.value = await fetchContest(contestId.value, 1)
  contest_data.value = contest.value.contest_data
  entries_data.value = contest.value.entries_data_temp
    } catch (error) {
    console.error(error)
        } finally {
    isLoading.value = false
    }
})

watch(current_page, async (newValue) => {
  try {
    contest.value = await fetchContest(contestId.value, current_page.value)
  contest_data.value = contest.value.contest_data
  entries_data.value = contest.value.entries_data_temp

} catch (error) {
  console.error(error)
} finally {
  isLoading.value = false
}
})
</script>

<template>
  <div v-if="contest_data">
    <div class="flex flex-row gap-3 items-center justify-between">
        <ReturnBtn />
        <h1 v-if="contest_data" class="text-xl font-bold">Contest Results for {{ contest_data.english_name }}</h1>
    </div>
    <div v-if="contest" class="mt-3">
      <ContestCard v-bind="contest_data" />
      <hr class="mt-6 mb-6 border-t-black dark:border-t-white">
      <div v-if="entries_data">
      <ul v-if="!isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-10 gap-3">
        <MiiCard
          v-for="entry in entries_data"
          :key="entry.artisan_id"
          v-bind="entry"
          :ranking="entry.rank"
          :contest_id="contest_data.contest_id"
        />
      </ul>
      <PageNavigation
        :current_page="entries_data.current_page"
        :total_pages="entries_data.total_pages"
        @update:current_page="updateCurrentPage"
        class="mt-10"
        />
        <LoadingAnimation v-if="isLoading" />
    </div>
      <p v-else class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <i class="fa-solid fa-bomb text-6xl"></i>
        <h2 class="w-96 text-center relative">No Miis have been submitted for this contest. Check back later!</h2>
    </div>
    </div>
    </p>
    </div>
  </div>
  <div v-else class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <div class="flex flex-row gap-3 items-center"><i class="fa-solid fa-bomb text-6xl"></i></div>
        <h2 class="w-96 text-center relative">The Contest you were looking for could not be found...</h2>
    </div>
    </div>
</template>
