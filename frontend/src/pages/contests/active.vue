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
        <ul class="flex flex-col gap-3" v-if="active_contests">
            <ContestCard v-for="contest in active_contests" :key="contest.id" v-bind="contest" />
        </ul>
        <p v-else>
            No results
        </p>
    </div>

</template>