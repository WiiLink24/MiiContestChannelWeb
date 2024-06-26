<script setup lang="ts">
import { fetchArtisans } from '@/backend';
import ArtisanCard from '@/components/ArtisanCard.vue';
import { onMounted, ref } from 'vue';

const artisans = ref();

onMounted(async () => {
    artisans.value = await fetchArtisans();
})
</script>

<template>
    <div class="container">
        <h1>Artisans</h1>
        <ul class="grid grid-cols-5 gap-10">
            <ArtisanCard v-for="artisan in artisans" :key="artisan.wii_number" v-bind="artisan" />
        </ul>

    </div>
</template>