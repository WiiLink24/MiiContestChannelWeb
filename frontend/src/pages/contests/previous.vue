<script setup lang="ts">
import { fetchContests } from '@/backend';
import { ref, onMounted } from 'vue';
import ContestCard from '@/components/ContestCard.vue';

const ended_contests = ref();

onMounted(async () => {
    const contests = await fetchContests();

    ended_contests.value = contests.filter((contest: any) => contest.status === 'ended');
})
</script>

<template>
    <div>
        <ul class="flex flex-col gap-3" v-if="ended_contests">
            <div  v-for="contest in ended_contests">
            <RouterLink :to="`/contests/${contest.contest_id}`">
                <ContestCard :key="contest.id" v-bind="contest" />
            </RouterLink>
        </div>
        </ul>
        <p v-else class="text-red-500">
        <div class="p-20 w-full h-30 rounded-[18px] border-4 border-gray-400 dark:border-slate-500 border-dashed flex items-center justify-center relative">
        <div class="flex flex-col items-center gap-3 text-gray-200 dark:text-slate-400">
            <i class="fa-solid fa-bomb text-6xl"></i>
        <h2 class="w-96 text-center relative">This should never appear, if it has appeared on a prod environment, please notify the WiiLink staff...</h2>
    </div>
    </div>
    </p>
    </div>

</template>