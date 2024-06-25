<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const top50 = ref([])

onMounted(() => {
    axios.get('http://localhost:3000/api/top')
        .then(response => {
            top50.value = response.data
        })
        .catch(error => {
            console.error(error)
        })
    
    console.log(top50.value)
})
</script>

<template>
    <h1>Top 50</h1>
    <div v-for="item in top50">
        <p>{{ item.entry_id }}</p>
        <p>{{ item.artisan_id }}</p>
        <p>{{ item.initials }}</p>
        <p>{{ item.skill }}</p>
        <p>{{ item.nickname }}</p>
        <p>{{ item.gender }}</p>
        <p>{{ item.country_id }}</p>
        <p>{{ item.wii_number }}</p>
        <p>{{ item.mii_data  }}</p>
    </div>
</template>