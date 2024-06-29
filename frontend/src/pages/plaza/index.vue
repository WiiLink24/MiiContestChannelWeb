<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchPlaza } from '@/backend';
import MiiCard from '@/components/MiiCard.vue';
import Title from '@/components/Title.vue';

const plaza = ref();

onMounted(async () => {
    plaza.value = await fetchPlaza();
});
</script>

<template>
    <div class="container">
        <Title name="Plaza" />
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            <MiiCard v-for="mii in plaza" :key="mii.entry_id" v-bind="mii" />
        </ul>
    </div>
</template>