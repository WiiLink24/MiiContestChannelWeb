<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchContests } from '@/backend'
import type { Contest } from '@/types';

const contests = ref<Contest[]>([])
console.log(fetchContests())

onMounted(async () => {
  contests.value = await fetchContests()
})
</script>

<template>
  <div class="container h-screen py-20">
    <div class="flex w-full h-auto">
      <div class="cmoc-bg m-6">
        <div v-for="contest in contests" :key="contest.contest_id" class="p-8">
          <div
        class="w-100 h-50 shadow-[0px 0px 60px #d3d68c60]"
      >
        <div
          class="p-2 rounded-3xl border-[5px] border-white bg-[rgb(76,130,163)] shadow-2xl z-10 relative"
        >
          <p class="ml-1 text-white text-lg">
            <span id="randomInt"></span> days remaining
          </p>
          <p>{{  contest.status }}</p>
          <div class="mt-2 bg-white p-1 rounded-xl flex flex-row items-center">
            <img :src="`http://127.0.0.1:9011/assets/contest/${contest.contest_id}/thumbnail.jpg`"
              alt="Thumbnail Preview"
              class="p-1 mr-40 w-32 h-32 rounded-xl"
            />
            <h2
              id="contestName"
              class="col-start-1 col-span-full text-2xl text-black"
            >{{ contest.english_name }}</h2>
          </div>
        </div>
        <img
          id="souvenirPreview2"
          class="w-80 hidden rounded-3xl shadow-2xl z-0 absolute !right-0 -translate-x-full -translate-y-[70%] rotate-3"
        />
      </div>
        </div>
      </div>

      <section class="grow-0 w-1/2 space-y-2">
        <h1 class="text-5xl">Welcome to the new CMOC Viewing Tool</h1>
        <h2 class="text-3xl">
          Get updated info on all running contests, as well as download your favorite Mii Characters
          from our service.
        </h2>
        <a class="bg-[#2bca38] px-8 py-3 rounded-xl text-white border-2 border-gray-200/10" href="https://www.wiilink24.com/"
          >Install WiiLink</a
        >
        <!-- Display contests -->
      </section>
    </div>
  </div>
</template>
