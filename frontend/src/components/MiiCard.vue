<script setup lang="ts">
import type { Mii } from '@/types';
import { renderMii } from '@/backend';
import { countries } from '@/countries';
import { computed } from 'vue';

const props = defineProps<Mii>();

const mii_img = await renderMii(props.mii_data)
const country_flag = computed(() => countries[props.country_id]?.flag);
</script>

<template>
    <li class="p-3 rounded-lg border flex flex-col justify-end relative z-20 dark:border-slate-600 dark:bg-slate-700 dark:text-white">
        <span v-if="ranking" class="text-7xl font-bold text-gray-600 z-0 absolute select-none self-start -ml-2 mb-[9.75rem]">{{ ranking }}</span>
        <div class="z-10 flex flex-col w-full items-center">
            <span class="self-end text-2xl">{{ country_flag }}</span>
            <img class="w-28 relative bottom-3" :src="mii_img" />
            <h1 class="text-3xl">{{ nickname }}</h1>
            <span class="text-2xl inline-flex items-center gap-3 self-start"><i class="fa-solid fa-thumbs-up"></i>{{ perm_likes }}</span>
        </div>
        <span class="text-8xl font-bold text-gray-600 z-0 absolute -mr-3.5 -mb-4 select-none self-end">{{ initials }}</span>
    </li>
</template>