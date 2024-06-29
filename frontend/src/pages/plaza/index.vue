<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchPlaza } from '@/backend';
import MiiCard from '@/components/MiiCard.vue';

const plaza = ref();

onMounted(async () => {
    plaza.value = await fetchPlaza();
});
</script>

<template>
    <div class="container">
        <h1>Plaza</h1>
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            <MiiCard v-for="mii in plaza" :key="mii.entry_id" v-bind="mii" />
        </ul>
    </div>
</template>