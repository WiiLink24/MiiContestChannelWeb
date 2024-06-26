<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import miicard from '@/components/cards/miicard.vue'

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

onMounted(() => {
  axios
    .get('http://localhost:3000/api/plaza/top')
    .then((response) => {
      top50.value = response.data
    })
    .catch((error) => {
      console.error("An exception has been caught: ", error)
    })

  console.log(top50.value)
})
</script>

<template>
  <h1>Top 50</h1>
  <div v-for="item in top50">
    <miicard
      :entry_id="item.entry_id"
      :artisan_id="item.artisan_id"
      :initials="item.initials"
      :skill="item.skill"
      :nickname="item.nickname"
      :gender="item.gender"
      :country_id="item.country_id"
      :wii_number="item.wii_number"
      :mii_data="item.mii_data"
    />
  </div>
</template>
