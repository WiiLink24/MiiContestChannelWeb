<script setup lang="ts">
import type { Artisan } from '@/types';
import { renderMii } from '@/backend';
import { countries } from '@/countries';

const props = defineProps<Artisan>();

const mii_img = await renderMii(props.mii_data)
const country_flag = Object.values(countries).find(country => country.id === props.country_id)?.flag;
</script>

<template>
    <li class="p-3 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white ">
        <RouterLink :to="`/artisans/${wii_number}`">
        <img class="w-24" :src="mii_img" />
        <section class="inline-flex gap-4">
            <h1>{{ name }}</h1>
        </section>
        <div class="flex items-center px-4 justify-center gap-5">
            <span>{{ country_flag }}</span>
            <span><i class="fa-solid fa-chevron-up"></i>{{ total_likes }}</span>
        </div>
        </RouterLink>
    </li>
</template>