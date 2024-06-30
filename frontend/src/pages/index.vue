<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { fetchContests } from '@/backend'
import type { Contest } from '@/types'

const dragging = ref(false)
const contests = ref<Contest[]>([])
const positions = ref<{ [key: string]: { top: number; left: number; rotation: number } }>({})
const start = ref({ x: 0, y: 0 })
const parentDimensions = ref({ width: 0, height: 0 })
const elementDimensions = ref({ width: 0, height: 0 })

onMounted(async () => {
  contests.value = await fetchContests()
  const container = document.querySelector('.cmoc-bg')
  if (container) {
    const { width, height } = container.getBoundingClientRect()

    contests.value.forEach((contest) => {
      let positionSet = false
      while (!positionSet) {
        const minLeft = width / 4
        const randomLeft = minLeft + Math.random() * (width - 400 - minLeft)
        const randomTop = Math.random() * (height - 300)
        const randomRotation = Math.random() * 6 - 3

        // Check if the new position overlaps with any existing position
        let overlap = false
        for (const key in positions.value) {
          const pos = positions.value[key]
          if (Math.abs(pos.left - randomLeft) < 200 && Math.abs(pos.top - randomTop) < 200) {
            // Assuming 200px as the minimum distance to avoid overlap
            overlap = true
            break
          }
        }

        if (!overlap) {
          positions.value[contest.contest_id] = {
            top: randomTop,
            left: randomLeft,
            rotation: randomRotation
          }
          positionSet = true
        }
      }
    })
  }
})

const dragStart = (contestId, e) => {
  dragging.value = true
  const position = positions.value[contestId]
  start.value.x = e.clientX - position.left
  start.value.y = e.clientY - position.top
  start.value.rotation = position.rotation

  const parent = document.getElementById('parent')
  parentDimensions.value.width = parent.offsetWidth - 25
  parentDimensions.value.height = parent.offsetHeight - 200
  elementDimensions.value.width = e.target.offsetWidth
  elementDimensions.value.height = e.target.offsetHeight
}

const draggingEvent = (contestId, e) => {
  if (dragging.value) {
    const position = positions.value[contestId]
    let newLeft = e.clientX - start.value.x
    let newTop = e.clientY - start.value.y

    position.left = newLeft
    position.top = newTop
  }
}

const dragEnd = () => {
  dragging.value = false
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
          Get updated info on all running contests, as well as download your favorite Mii Characters
          from our service.
        </h2>
        <br />
        <a
          class="inline-flex flex-row gap-1 items-center bg-[#2bca38] px-8 py-3 rounded-xl text-white border-2 border-gray-200/10"
          href="https://www.wiilink24.com/"
          ><img src="/img/favicon.png" style="filter:brightness(10000);height:20px !important;"> Install WiiLink</a
        >
      </div>
        <div class="text-xl opacity-80">
        <i class="fa-solid fa-hand"></i> Here are all available contests, go ahead and play around with them!
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
          <div
            class="p-2 rounded-3xl border-[5px] border-white bg-[rgb(76,130,163)] shadow-2xl z-10 relative"
          >
            <div class="flex flex-row items-center justify-between">
              <p class="ml-1 text-white text-lg"><span id="randomInt"></span> days remaining</p>
              <p>{{ contest.status }}</p>
            </div>
            <div class="mt-2 bg-white p-1 rounded-xl flex flex-row items-center">
              <img
                :src="`http://127.0.0.1:9011/assets/contest/${contest.contest_id}/thumbnail.jpg`"
                alt="Thumbnail Preview"
                class="p-1 mr-40 w-32 h-32 rounded-xl"
              />
              <h2 id="contestName" class="col-start-1 col-span-full text-2xl text-black">
                {{ contest.english_name }}
              </h2>
            </div>
          </div>
          <img
            id="souvenirPreview2"
            class="w-80 hidden rounded-3xl shadow-2xl z-0 absolute !right-0 -translate-x-full -translate-y-[70%] rotate-3"
          />
        </div>
      </div>
      <div v-else class="right-40 top-1/2 -translate-y-1/2 absolute">
        <div class="text-center flex flex-col items-center gap-3">
          <i class="fa-solid fa-triangle-exclamation text-6xl"></i>
          There are no contests available at the moment...<br>
          Once there are, they will be shown here!
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
</style>

<style scoped>
.draggable {
  user-select: none;
  cursor: pointer;
}
</style>
