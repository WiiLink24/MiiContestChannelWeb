<script setup lang="ts">
import { ref } from 'vue';
import { fetchSearch } from '@/backend'
import MiiCard from '@/components/MiiCard.vue'

let search_field = ref('');
let search_type = ref('miis');

let search_results = ref();

const searchQuery = async () => {
    search_results.value = await fetchSearch(search_type.value, search_field.value)
}

</script>

<template>
    <div class="container">
        <h1>Search</h1>
        <h2>Search for Miis or Artisans!</h2>
        <h3>Miis require the name or initials, while artisans require the Wii number of the user.</h3>
        <div class="flex flex-col">
            <ul class="flex gap-5">
                <li class="inline-flex gap-3">
                    <input type="radio" name="search_type" value="miis" v-model="search_type" />
                    <label for="">Miis</label>
                </li>
                <li class="inline-flex gap-3">
                    <input type="radio" name="search_type" value="artisans" v-model="search_type" />
                    <label>Artisans</label>
                </li>
            </ul>
            <input class="bg-gray-100 border" v-model="search_field" type="text" placeholder="Search..." />
            <button @click="searchQuery()">Search</button>
        </div>
        <div v-if="search_results">
            <h2>Results</h2>
            <MiiCard v-for="result in search_results" :key="result.entry_id" v-bind="result" />
        </div>
    </div>
</template>