<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  name: String,
  icon: String
})

const title = ref(props.name)

onMounted(() => {
  const titleElement = document.getElementById('title')

  const updateStylesOnScroll = () => {
    const scrollY = window.scrollY
    // Example calculations for translateY and opacity
    // Adjust these calculations based on your specific needs
    const translateY = Math.min(100, scrollY / 2) // Example: translateY increases with scroll, up to a max of 100
    const opacity = Math.max(0, 0.5 - scrollY / 100) // Example: opacity decreases with scroll, down to a minimum of 0

    titleElement.style.transform = `translateY(${translateY}px)`
    titleElement.style.opacity = `${opacity}`
  }

  window.addEventListener('scroll', updateStylesOnScroll)

  // Cleanup on component unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', updateStylesOnScroll)
  })
})
</script>

<template>
  <h1
    id="title"
    class="text-9xl text-white/60 outline-text uppercase opacity-50 z-5 relative flex items-center justify-between"
  >
    {{ title }} <i v-if="icon" :class="icon" class="opacity-50"></i>
  </h1>
</template>
