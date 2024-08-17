<script setup lang="ts">
import Title from '@/components/Title.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

useHead({
  title: 'Contests | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'View all running and past contests of the service, as well as information associated to them!'},
    { property: 'og:image', content: '/img/cmocseobg.png' },
  ],
})

</script>

<template>
  <img
    src="https://rc24.xyz/goodies/wallpapers/CMO_Channel_BG_1600x900.png"
    class="w-full absolute z-0 blur-sm dissolve"
    alt="CMOC Background Image"
  />
  <div class="container translate-y-10">
    <Title :name="t('contests.title')" />
    <nav
      class="right-0 inline-flex items-center justify-end bg-gray-400/60 dark:bg-slate-500/60 backdrop-blur-sm hover:bg-gray-400 dark:hover:bg-slate-600 transition-all -translate-y-10 rounded-[18px] p-1 gap-1 relative"
    >
      <RouterLink
        to="/contests/active"
        class="flex items-center gap-2 px-4 sm:py-2 py-3 text-white hover:bg-gray-500 dark:hover:bg-slate-500 cursor-pointer hover:no-underline rounded-[14px] rounded-r-md transition-all"
        activeClass="bg-green-500 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-500"
      >
        <i class="fas fa-trophy"></i>
        <span class="mobile-hide">{{ t('contests.active') }}</span>
      </RouterLink>
      <RouterLink
        to="/contests/previous"
        class="flex items-center gap-2 px-4 sm:py-2 py-3 text-white hover:bg-gray-500 dark:hover:bg-slate-500 cursor-pointer hover:no-underline rounded-[14px] rounded-l-md transition-all"
        activeClass="bg-blue-500 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500"
      >
        <i class="fas fa-history"></i>
        <span class="mobile-hide">{{ t('contests.previous') }}</span>
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
