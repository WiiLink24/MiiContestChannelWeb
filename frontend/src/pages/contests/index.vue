<script setup lang="ts">
import { fetchContests } from '@/backend';
import { ref, onMounted } from 'vue';
import ContestCard from '@/components/ContestCard.vue';

const active_contests = ref();
const ended_contests = ref();

onMounted(async () => {
    const contests = await fetchContests();

    active_contests.value = contests.filter((contest) => contest.status === 'waiting');
    ended_contests.value = contests.filter((contest) => contest.status === 'results');
})

</script>

<template>
    <div class="container">
        <h1>Contests</h1>
        <section>
            <h2>Active contests</h2>
            <ul>
                <ContestCard v-for="contest in active_contests" :key="contest.contest_id" v-bind="contest" />
            </ul>
        </section>
        <section>
            <h2>Ended contests</h2>
            <ul>
                <ContestCard v-for="contest in ended_contests" :key="contest.contest_id" v-bind="contest" />
            </ul>
        </section>
    </div>

</template>