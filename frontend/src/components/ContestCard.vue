<script setup lang="ts">
import type { Contest } from '@/types';
import { RouterLink } from 'vue-router';

const props = defineProps<Contest>();


</script>

<template>
    <li class="p-2 border dark:bg-slate-500">
        <RouterLink :to="`/contests/${contest_id}`">
            <h1>{{ english_name }}</h1>
        </RouterLink>
    </li>
</template>