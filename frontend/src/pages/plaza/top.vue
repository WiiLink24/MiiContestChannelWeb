<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MiiCard from '@/components/MiiCard.vue'
import { fetchPlazaTop } from '@/backend';

interface TopItem {
  entry_id: number;
  artisan_id: number;
  initials: string;
  skill: string;
  nickname: string;
  gender: string;
  country_id: number;
  wii_number: string;
  mii_data: string;
}

const top50 = ref<TopItem[]>([])

onMounted(async () => {
  top50.value = await fetchPlazaTop();

  console.log(top50.value)
})
</script>

<template>
  <div class="container">
    <h1>Top 50</h1>
    <ul class="grid grid-cols-5 gap-10">
      <MiiCard v-for="item in top50" :key="top50.entry_id" v-bind="item" />
    </ul>
  </div>
</template>
