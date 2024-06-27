<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchPlazaNew } from '@/backend';
import MiiCard from '@/components/MiiCard.vue';

const plaza_new = ref();

onMounted(async () => {
    plaza_new.value = await fetchPlazaNew();
})

</script>

<template>
    <div class="container">
        <h1>Popular Miis</h1>
        <ul class="grid grid-cols-5 gap-10">
                <MiiCard v-for="mii in plaza_new" :key="mii.entry_id" v-bind="mii" />
            </ul>
    </div>
</template>