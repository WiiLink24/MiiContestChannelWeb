<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchContests, fetchPlazaNew } from '@/backend'
import type { Contest, Mii } from '@/types'
import ContestCard from '@/components/ContestCard.vue'
import MiiCard from '@/components/MiiCard.vue'

const contests = ref<Contest[]>([])
const positions = ref({})
const newMiis = ref()

onMounted(async () => {
  newMiis.value = await fetchPlazaNew(1)
  newMiis.value = newMiis.value.data
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

function displayData(id: string) {
  const element = document.getElementById(id)
  document.getElementById('temp').classList.add('hidden')
  if (element) {
    element.classList.remove('hidden')
  }
}

function removeData(id: string) {
  const element = document.getElementById(id)
  document.getElementById('temp').classList.remove('hidden')
  if (element) {
    element.classList.add('hidden')
  }
}


const generateRandomPosition = (width, height, index) => {
  return {
    top: Math.random() * (height - 300) + index * Math.random() * 5,
    left: width / 2 + Math.random() * (width - 400 - width / 2) + index * Math.random() * 10,
    rotation: Math.random() * 6 - 3
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
    class="w-[calc(100%-50px)] h-[650px] rounded-[80px] rounded-t-2xl cmoc-bg z-10 overflow-hidden"
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
  <ul class="mb-10 flex gap-1 items-center justify-center translate-y-[67px] z-0 relative">
    <li>
      <RouterLink to="/" class="header-link-index"
        ><i class="fa-solid fa-house"></i> Home</RouterLink
      >
    </li>
    <li>
      <RouterLink to="/plaza/popular" class="header-link-index"
        ><i class="fa-solid fa-fire"></i> Popular</RouterLink
      >
    </li>
    <li>
      <RouterLink to="/plaza/top" class="header-link-index"
        ><i class="fa-solid fa-ranking-star"></i> The Top 50</RouterLink
      >
    </li>
    <li>
      <RouterLink to="/artisans" class="header-link-index"
        ><i class="fa-solid fa-star"></i> Artisans</RouterLink
      >
    </li>
    <li>
      <RouterLink to="/contests/active" class="header-link-index"
        ><i class="fa-solid fa-trophy"></i> Contests</RouterLink
      >
    </li>
    <li>
      <RouterLink to="/search" class="header-link-index"
        ><i class="fa-solid fa-magnifying-glass mr-2"></i> Search</RouterLink
      >
    </li>
  </ul>
  <div class="container translate-y-[90px]">
    <h1 class="font-bold text-4xl">Newest Miis</h1>
    <div class="mt-3 mb-8 scroll-container">
      <ul class="mt-3 inline-flex flex-row gap-3">
        <MiiCard
          v-for="mii in newMiis"
          :key="mii.entry_id"
          v-bind="mii"
          style="width: 300px !important; position: relative"
        />
        <MiiCard
          v-for="mii in newMiis"
          :key="`duplicate-${mii.entry_id}`"
          v-bind="mii"
          style="width: 300px !important; position: relative"
        />
      </ul>
    </div>
    <div class="mt-6 mb-10">
      <h1 class="font-bold text-4xl">What's new on the Check Mii Out Channel?</h1>
      <div class="p-6 mt-3 border-4 border-slate-600 border-dashed rounded-3xl block relative">
        <i class="-right-10 -top-10 text-9xl animate-spin text-yellow-300/60 fa-solid fa-certificate absolute"></i>
        <div>
          <h1 class="p-2 pl-4 pr-4 rounded-t-lg rounded-b-md bg-slate-500/30 text-2xl font-bold"><i class="fa-solid fa-hammer"></i> Improved infrastructure</h1>
          <p class="mt-1 mb-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
            We have improved our infrastructure to make the service faster and more reliable. It is now much easier to post new contests and manage data, so expect more frequent contests!
          </p>
        </div>
        <div>
          <h1 class="p-2 pl-4 pr-4 rounded-t-lg rounded-b-md bg-slate-500/30 text-2xl font-bold"><i class="fa-solid fa-bug"></i> Bug fixes</h1>
          <p class="mt-1 mb-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
            We have fixed a lot of bugs, meaning you will experience a smoother experience in the Channel.
          </p>
        </div>
        <div>
          <h1 class="p-2 pl-4 pr-4 rounded-t-lg rounded-b-md bg-slate-500/30 text-2xl font-bold"><i class="fa-solid fa-globe"></i> New website</h1>
          <p class="mt-1 mb-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
            We have updated our website to make it more user-friendly and easier to navigate. We have also added new features to make it easier to find the content you are looking for.
          </p>
      </div>
      <div>
        <h1 class="p-2 pl-4 pr-4 rounded-t-lg rounded-b-md bg-slate-500/30 text-2xl font-bold"><i class="fa-solid fa-gavel"></i> Easier moderation</h1>
        <p class="mt-1 mb-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
          We have added new moderation tools to make it easier to manage the content on the Channel. This will help us keep the Channel safe and fun for everyone.
        </p>
      </div>
      <hr class="mt-6 mb-6">
      <div>
        <h1 class="opacity-60"><i class="fa-regular fa-circle-dot"></i> ...and much more!</h1>
      </div>
    </div>
  </div>
    <div class="flex flex-row items-center justify-between gap-3">
      <h1 class="font-bold text-4xl">Tools</h1>
      <h2 class="opacity-60">Here are some tools we really like!</h2>
    </div>
    <div class="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      <a class="btn rounded-l-xl rounded-r-md text-center" href="https://www.miicharacters.com/" @mouseenter="displayData('miichar')" @mouseleave="removeData('miichar')">Mii Characters</a>
      <a class="btn rounded-md text-center" href="https://www.miilibrary.com/" @mouseenter="displayData('miilib')" @mouseleave="removeData('miilib')">Mii Library</a>
      <a class="btn rounded-md text-center" href="https://github.com/Genwald/MiiPort/releases/tag/0.1.1" @mouseenter="displayData('miiport')" @mouseleave="removeData('miiport')">MiiPort</a>
      <a class="btn rounded-md text-center" href="https://pf2m.com/tools/mii/" @mouseenter="displayData('miirender')" @mouseleave="removeData('miirender')">Mii Renderer</a>
      <a class="btn rounded-l-md rounded-r-xl text-center" href="https://www.wiilink24.com/extras/mii" @mouseenter="displayData('miiedit')" @mouseleave="removeData('miiedit')">Mii Avatar Editor</a>
    </div>
    <div class="mb-10">
      <p id="temp" class="mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg flex items-center justify-center gap-3">
        <i class="fa-solid fa-question-circle"></i> Hover over a tool to view its description.
      </p>
      <p id="miichar" class="hidden mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
        <i class="fa-solid fa-info-circle"></i> Mii Characters is a website where you can find all kinds of Mii Characters, from popular characters to original creations. You can also submit your own Mii Characters to share with the world!
      </p>
      <p id="miilib" class="hidden mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
        <i class="fa-solid fa-info-circle"></i> Mii Library is a website where you can find all kinds of Mii Characters, from popular characters to original creations. You can also submit your own Mii Characters to share with the world!
      </p>
      <p id="miiport" class="hidden mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
        <i class="fa-solid fa-info-circle"></i> MiiPort is a tool that allows you to transfer Mii Characters between your Wii and your computer. You can use it to back up your Mii Characters, share them with friends, or even edit them on your computer!
      </p>
      <p id="miirender" class="hidden mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
        <i class="fa-solid fa-info-circle"></i> Mii Renderer is a tool that allows you to render Mii Characters in high resolution. You can use it to create high-quality images of your Mii Characters for use in videos, artwork, or other projects!
      </p>
      <p id="miiedit" class="hidden mt-6 p-3 border-2 border-slate-500/30 rounded-t-md rounded-b-lg">
        <i class="fa-solid fa-info-circle"></i> Mii Avatar Editor is a tool that allows you to create custom Mii Characters. You can choose from a wide range of features to create a Mii that looks just like you, or create a completely original character!
      </p>
    </div>
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
