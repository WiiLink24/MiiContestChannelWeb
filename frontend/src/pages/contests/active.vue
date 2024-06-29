<script setup lang="ts">
import { fetchContests } from '@/backend';
import { ref, onMounted } from 'vue';
import ContestCard from '@/components/ContestCard.vue';

const active_contests = ref();

onMounted(async () => {
    const contests = await fetchContests();

    active_contests.value = contests.filter((contest: any) => contest.status === 'waiting');
})
</script>

<template>
    <div>
        <h1>Active Contests</h1>
        <ul v-if="active_contests === Array(0)"  class="grid grid-cols-3">
            <ContestCard v-for="contest in active_contests" :key="contest.id" v-bind="contest" />
        </ul>
        <p v-else>There is no contest currently running :(</p>
    </div>

</template>