<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  contest_id: String,
  status: String,
  english_name: String,
  has_souvenir: Boolean,
  open_time: String,
  close_time: String,
})

const daysRemaining = computed(() => {
  const closeDate = new Date(props.close_time)
  const currentDate = new Date()
  const differenceInTime = closeDate.getTime() - currentDate.getTime()
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))
  return differenceInDays
})

const isNew = computed(() => {
  const openDate = new Date(props.open_time);
  console.log(openDate);
  const currentDate = new Date();
  console.log(currentDate);
  const differenceInTime = openDate.getTime() - currentDate.getTime()
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  console.log(differenceInDays);
  return differenceInDays < 5 && differenceInDays > 0;
});
</script>

<template>
  <li @mouseenter="hover = true" @mouseleave="hover = false" :style="hoverStyle" class="list-none td-none w-100 h-50 shadow-[0px 0px 60px #d3d68c60] hover:no-underline hover:shadow-lg transition-all">
      <div
        class="p-2 rounded-3xl border-[5px] border-white bg-[rgb(76,130,163)] shadow-2xl z-10 relative"
      >
        <div class="flex flex-row items-center justify-between">
          <p class="ml-1 text-white text-lg">
            <span v-if="daysRemaining < 0">The contest has ended!</span>
            <span v-else-if="daysRemaining === 1">{{ daysRemaining }} day remaining</span>
            <span v-else>{{ daysRemaining }} days remaining</span>
          </p>
          <p class="flex flex-row items-center uppercase-first-letter">
            {{ status }} <l class="opacity-60">({{ contest_id }})</l> <div v-if="isNew" class="ml-3 box sb4">New!</div>  <div v-if="daysRemaining <= 2 && daysRemaining >= 0" class="ml-3 box-red sb4-red">Closing soon!</div>
          </p>
        </div>
        <div class="mt-2 bg-white p-1 rounded-xl flex flex-row items-center justify-between">
          <img
            :src="`http://127.0.0.1:9011/assets/contest/${contest_id}/thumbnail.jpg`"
            alt="Thumbnail Preview"
            class="p-1 w-32 h-32 rounded-xl"
          />
          <h2 id="contestName" class="mr-6 col-start-1 col-span-full text-2xl text-black">
            {{ english_name }} <b v-if="has_souvenir"> | <i class="fa-solid fa-gift"></i></b>
          </h2>
        </div>
      </div>
      <img
        id="souvenirPreview2"
        class="w-80 hidden rounded-3xl shadow-2xl z-0 absolute !right-0 -translate-x-full -translate-y-[70%] rotate-3"
      />
  </li>
</template>

<script>
export default {
  data() {
    return {
      hover: false, // Track hover state
    };
  },
  computed: {
    hoverStyle() {
      // Apply rotation style only when hover is true
      if (this.hover) {
        const rotationDegree = Math.floor(Math.random() * 6) - 3;
        return {
          transform: `rotate(${rotationDegree}deg) scale(1.05)`,
        };
      }
      return {};
    },
  },
}
</script>