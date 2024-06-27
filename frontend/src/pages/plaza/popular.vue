<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { fetchPlazaNew } from '@/backend';
import MiiCard from '@/components/MiiCard.vue';
import PageNavigation from '@/components/PageNavigation.vue';

const plaza_new = ref();
const plaza_new_data = ref();

const route = useRoute();
const current_page = ref(route.query.page ? parseInt(route.query.page as string) : 1);

onMounted(async () => {
    plaza_new.value = await fetchPlazaNew();
    plaza_new_data.value = plaza_new.value.data;
})

const updateCurrentPage = (newPage: number) => {
    current_page.value = newPage;
};

</script>

<template>
    <div class="container">
        <h1>Popular Miis</h1>
        <div v-if="plaza_new">
            <ul class="grid grid-cols-5 gap-10">
                    <MiiCard v-for="mii in plaza_new_data" :key="mii.entry_id" v-bind="mii" />
                </ul>
            <PageNavigation :current_page="current_page" :total_pages="plaza_new.total_pages" @update:current_page="updateCurrentPage"/>
        </div>
    </div>
</template>