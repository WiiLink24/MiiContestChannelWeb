<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchContest } from '@/backend';
import { useRoute } from 'vue-router';
import MiiCard from '@/components/MiiCard.vue';

const route = useRoute();
const contestId = ref(route.params.id)

const contest = ref();

const contest_data = ref();
const entries_data = ref();

onMounted(async () => {
    contest.value = await fetchContest(contestId.value);
    contest_data.value = contest.value.contest_data;
    entries_data.value = contest.value.entries_data;

    console.log(entries_data.value)
})
</script>

<template>
    <div class="container">
        <div v-if="contest">
            <h1>Contest Results for {{ contest_data.english_name }}</h1>
        </div>
        <ul class="grid grid-cols-5 gap-10">
            <MiiCard v-for="entry in entries_data" :key="entry.artisan_id" v-bind="entry" />
        </ul>
    </div>
</template>