<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchMii, renderMii } from '@/backend';
import { useRoute } from 'vue-router'
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import { useHead } from '@unhead/vue'

useHead({
  title: 'Mii View | MCC Viewing Tool',
  meta: [
    { name: 'description', content: 'Detailed information about a specific Mii!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const route = useRoute()

const mii = ref()
const mii_img = ref()
const isLoading = ref(false)

onMounted(async () => {
    try {
        isLoading.value = true
        mii.value = await fetchMii(route.params.id)
        mii_img.value = await renderMii(mii.value.mii_data)
    } finally {
        isLoading.value = false
    }
})

watch(route, async () => {
  mii.value = await fetchMii(route.params.id)
})

</script>

<template>
    <div class="container">
        <LoadingAnimation v-if="isLoading" />
        <div v-else-if="mii">
            <h1>{{ mii.nickname }}</h1>
            <img :src="mii_img" :alt="`${mii.nickame} Mii`">
        </div>
        <div v-else class="p-20 w-full h-30 translate-y-14 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <div class="flex flex-row gap-3 items-center"><i class="fa-solid fa-bomb text-6xl"></i></div>
        <h2 class="w-96 text-center relative">The Mii you were looking for could not be found...</h2>
    </div>
    </div>
    </div>
</template>