<script setup lang="ts">
import { fetchContests } from '@/backend';
import { ref, onMounted } from 'vue';
import ContestCard from '@/components/ContestCard.vue';

import { RouterLink, RouterView } from 'vue-router'

const active_contests = ref();
const ended_contests = ref();

onMounted(async () => {
    const contests = await fetchContests();

    active_contests.value = contests.filter((contest: any) => contest.status === 'waiting');
    ended_contests.value = contests.filter((contest: any) => contest.status === 'results');
})

</script>

<template>
    <div class="container">
        <h1>Contests</h1>
        <nav class="pb-3 border-b border-white flex gap-5">
            <RouterLink to="/contests/active" activeClass="border-b-2 border-blue-400">Active Contests</RouterLink>
            <RouterLink to="/contests/previous" activeClass="border-b-2 border-blue-400">Previous Contests</RouterLink>
        </nav>
        <RouterView />
    </div>
</template>