<script setup lang="ts">
import ReturnBtn from '@/components/ReturnBtn.vue'
import Title from '@/components/Title.vue'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

useHead({
  title: '404 | CMOC Viewing Tool',
  meta: [
    { name: 'description', content: 'The content you were looking for could not be found...' },
    { property: 'og:image', content: '/img/cmocseobg.png' }
  ]
})
</script>

<template>
  <div
    class="translate-y-20 pt-48 pb-48 container rounded-2xl flex flex-col items-center"
  >
    <ReturnBtn class="top-5 left-5 absolute" />
    <h1
      id="title"
      class="text-9xl outline-text uppercase whitespace-nowrap text-ellipsis z-5 relative flex items-center justify-between overflow-hidden"
    >
      404
    </h1>
    <p class="text-3xl font-bold">{{ t('404') }}</p>
  </div>
</template>
