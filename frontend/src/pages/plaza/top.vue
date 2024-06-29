<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'
import { fetchPlazaTop } from '@/backend';


const top50 = ref();

onMounted(async () => {
  top50.value = await fetchPlazaTop();
})
</script>

<template>
  <div class="container">
    <Title name="Top 50" />
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      <MiiCard v-for="(item, index) in top50" :key="item.entry_id" v-bind="item" :ranking="index + 1" />
    </ul>
  </div>
</template>
