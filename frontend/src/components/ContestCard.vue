<script setup lang="ts">
import type { Contest } from '@/types';
import { RouterLink } from 'vue-router';

const props = defineProps<Contest>();


</script>

<template>
    <li
        class="w-100 h-50 shadow-[0px 0px 60px #d3d68c60] hover:no-underline"
      >
      <RouterLink :to="`/contests/${contest_id}`">
        <div
          class="p-2 rounded-3xl border-[5px] border-white bg-[rgb(76,130,163)] shadow-2xl z-10 relative"
        >
        <div class="flex flex-row items-center justify-between">
          <p class="ml-1 text-white text-lg">
            <span id="randomInt"></span> days remaining
          </p>
          <p>{{ status }}</p>
          </div>
          <div class="mt-2 bg-white p-1 rounded-xl flex flex-row items-center">
            <img :src="`http://127.0.0.1:9011/assets/contest/${contest_id}/thumbnail.jpg`"
              alt="Thumbnail Preview"
              class="p-1 mr-40 w-32 h-32 rounded-xl"
            />
            <h2
              id="contestName"
              class="col-start-1 col-span-full text-2xl text-black"
            >{{ english_name }}</h2>
          </div>
        </div>
        <img
          id="souvenirPreview2"
          class="w-80 hidden rounded-3xl shadow-2xl z-0 absolute !right-0 -translate-x-full -translate-y-[70%] rotate-3"
        />
        </RouterLink>
    </li>
</template>