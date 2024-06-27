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
    <li class="p-3 rounded-lg border dark:border-slate-600 dark:bg-slate-700 dark:text-white">
        <img class="w-24" :src="mii_img" />
        <section class="inline-flex gap-4">
            <h1>{{ nickname }}</h1>
            <span>{{ initials }}</span>
        </section>
        <div class="flex items-center px-4 justify-center gap-5">
            <i v-if="gender === 1" class="fa-solid fa-person"></i>
            <i v-else-if="gender === 2" class="fa-solid fa-person-dress"></i>
            <span>{{ country_flag }}</span>
            <span><i class="fa-solid fa-chevron-up"></i>{{ likes }}</span>
            <span><i class="fa-solid fa-chevrons-up"></i>{{ perm_likes }}</span>
        </div>
    </li>
</template>