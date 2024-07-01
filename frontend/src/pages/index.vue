<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchContests } from '@/backend'
import type { Contest } from '@/types'
import ContestCard from '@/components/ContestCard.vue'

const contests = ref<Contest[]>([])
const positions = ref({})

onMounted(async () => {
  contests.value = await fetchContests()
  const container = document.querySelector('.cmoc-bg')
  if (container) {
    const { width, height } = container.getBoundingClientRect()
    contests.value.forEach((contest, index) => {
  const randomPosition = generateRandomPosition(width, height, index)
  positions.value[contest.contest_id] = randomPosition
})
  }
})

const generateRandomPosition = (width, height, index) => {
  return {
    top: Math.random() * (height - 300) + index * Math.random() * 5,
    left: width / 2 + Math.random() * (width - 400 - width / 2) + index * Math.random() * 10,
    rotation: Math.random() * 6 - 3,
  }
}

let dragging = false
let start = { x: 0, y: 0 }

const dragStart = (contestId, e) => {
  dragging = true
  const position = positions.value[contestId]
  start.x = e.clientX - position.left
  start.y = e.clientY - position.top
  e.target.style.zIndex = 50 // Bring to front
}

const draggingEvent = (contestId, e) => {
  if (!dragging) return
  const position = positions.value[contestId]
  position.left = e.clientX - start.x
  position.top = e.clientY - start.y
}

const dragEnd = (e) => {
  if (!dragging) return
  dragging = false
  e.target.style.zIndex = 10 // Reset z-index
}
</script>

<template>
  <div
    id="parent"
    class="w-[calc(100%-50px)] h-[650px] rounded-[80px] rounded-t-2xl cmoc-bg overflow-hidden"
    style="left: 50%; transform: translate(-50%, 50px); position: relative"
  >
    <div class="container h-screen py-20 absolute">
      <section class="h-[500px] flex flex-col justify-between grow-0 w-1/2 space-y-2 text-white">
        <div>
          <h1 class="text-5xl font-bold">Welcome to the new CMOC Viewing Tool</h1>
          <h2 class="mt-2 text-3xl">
            Get updated info on all running contests, as well as download your favorite Mii
            Characters from our service.
          </h2>
          <br />
          <a
            class="inline-flex flex-row gap-1 items-center bg-[#2bca38] hover:bg-green-600 hover:scale-105 hover:shadow-xl hover:shadow-green-400/10 hover:no-underline transition-all px-8 py-3 rounded-xl text-white border-2 border-gray-200/10"
            href="https://www.wiilink24.com/"
            ><img
              src="/img/favicon.png"
              style="filter: brightness(10000); height: 20px !important"
            />
            Install WiiLink</a
          >
        </div>
        <div class="text-xl opacity-80">
          <i class="fa-solid fa-hand"></i> Here are all available contests, go ahead and play around
          with them!
        </div>
      </section>
    </div>
    <transition-group name="fade" tag="div" class="container">
      <div v-if="contests.length > 0">
        <div
          v-for="(contest, index) in contests"
          :key="contest.contest_id"
          :style="{
            position: 'absolute',
            top: positions[contest.contest_id]?.top + 'px',
            left: positions[contest.contest_id]?.left + 'px',
            rotate: positions[contest.contest_id]?.rotation + 'deg',
            animationDelay: index * 0.2 + 's'
          }"
          @mousedown="(e) => dragStart(contest.contest_id, e)"
          @mousemove="(e) => draggingEvent(contest.contest_id, e)"
          @mouseup="dragEnd"
          @mouseleave="dragEnd"
          class="draggable w-100 h-50 shadow-[0px 0px 60px #d3d68c60] z-10 hover:z-50 opacity-0 fade-enter-active fade-leave-active transition-all"
          style="width: 600px !important"
        >
        <ContestCard :key="contest.id" v-bind="contest" />
         </div>
      </div>
      <div v-else class="right-40 top-1/2 -translate-y-1/2 absolute">
        <div
          class="p-2 rounded-3xl border-[5px] border-white bg-[rgb(76,130,163)] shadow-2xl rotate-3 z-10 relative"
        >
          <div class="mt-2 bg-white p-1 rounded-xl flex flex-row items-center">
            <div class="p-3 pl-6 pr-6 text-left flex flex-row items-center text-black gap-6">
              <i class="fa-solid fa-triangle-exclamation text-6xl"></i>
              There are no contests available at the moment...<br />
              Once there are, they will be shown here!
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.draggable {
  animation: fadeIn 0.5s ease forwards;
}
.draggable {
  user-select: none;
  cursor: pointer;
}
</style>
