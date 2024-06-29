<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MiiCard from '@/components/MiiCard.vue'
import Title from '@/components/Title.vue'
import { fetchPlazaTop } from '@/backend'

const top50 = ref()

onMounted(async () => {
  top50.value = await fetchPlazaTop()
})
</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_orange_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
  />
  <div class="container translate-y-10">
    <Title name="Top 50" />
    <p class="-translate-y-20 text-right opacity-45">
      These are the Top 50 Miis, sorted by number of likes!
    </p>
    <ul
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 -translate-y-14"
    >
      <MiiCard
        v-for="(item, index) in top50"
        :key="item.entry_id"
        v-bind="item"
        :ranking="index + 1"
      />
    </ul>
  </div>
</template>

<style scoped>
ul,
li {
  transition: 0.2s;
}

ul:hover li {
  opacity: 0.5;
  transition: 0.2s;
}

ul:not(:has(li:hover)) li {
  opacity: 1;
  transition: 0.2s;
}

ul li:hover {
  opacity: 1;
  transition: 0.2s;
}
</style>
