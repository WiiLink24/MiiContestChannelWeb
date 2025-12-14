<script setup lang="ts">
import { fetchContests } from '@/backend';
import { ref, onMounted } from 'vue';
import ContestCard from '@/components/ContestCard.vue';
import { useHead } from '@unhead/vue'

useHead({
  title: 'Active Contests | MCC Viewing Tool',
  meta: [
    { name: 'description', content: 'View all running and past contests of the service, as well as information associated to them!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

const active_contests = ref();

onMounted(async () => {
    const contests = await fetchContests();
    active_contests.value = contests.filter((contest) => contest.status === 'open');
})
</script>

<template>
    <div>
        <ul class="flex flex-col gap-3" v-if="active_contests">
            <div  v-for="contest in active_contests">
            <RouterLink :to="`/contests/${contest.contest_id}`">
                <ContestCard :key="contest.id" v-bind="contest" />
            </RouterLink>
            </div>
        </ul>
        <p v-else class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
            <i class="fa-solid fa-bomb text-6xl"></i>
        <h2 class="w-96 text-center relative">There are no running contests at the moment, please check back later...</h2>
    </div>
    </div>
    </p>
    </div>

</template>