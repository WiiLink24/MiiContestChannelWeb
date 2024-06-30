<script setup lang="ts">
import { fetchContests } from '@/backend';
import { ref, onMounted } from 'vue';
import ContestCard from '@/components/ContestCard.vue';

const ended_contests = ref();

onMounted(async () => {
    const contests = await fetchContests();

    ended_contests.value = contests.filter((contest: any) => contest.status === 'results');
})
</script>

<template>
    <div>
        <ul class="flex flex-col gap-3">
            <ContestCard v-for="contest in ended_contests" :key="contest.id" v-bind="contest" />
        </ul>
    </div>

</template>