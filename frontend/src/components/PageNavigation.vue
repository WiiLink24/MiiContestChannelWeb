<script setup lang="ts">
import { onMounted, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  total_pages: Number,
  current_page: Number
})

const emit = defineEmits(['update:current_page'])

const incrementPage = () => {
  if (props.current_page < props.total_pages) {
    emit('update:current_page', props.current_page + 1)
  }
}

const decrementPage = () => {
  if (props.current_page > 1) {
    emit('update:current_page', props.current_page - 1)
  }
}

const emitCurrentPage = () => {
  //fetch input value
  const input = document.getElementById('pageinput');
  emit('update:current_page', parseInt(input.value));
};
</script>

<template>
  <div class="inline-flex items-center gap-1 w-full justify-between">
    <p class="opacity-60">Showing page <b id="curr">{{ current_page }}</b> of <b id="last">{{ total_pages }}</b></p>
    <div v-if="props.total_pages > 1" class="flex flex-row items-center gap-1">
    <button
      v-if="props.current_page > 1"
      id="prev"
      class="p-3 pl-4 pr-4 border-2 border-gray-300 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all rounded-l-[18px] rounded-r-[6px]"
      @click="decrementPage"
    >
      <i class="fa-solid fa-chevron-left text-md"></i>
    </button>
    <input type="number" id="pageinput" :class="{'rounded-l-lg': props.current_page > 1 && props.current_page < props.total_pages, 'rounded-r-lg': props.current_page < props.total_pages, 'rounded-lg': props.current_page === 1 || props.current_page === props.total_pages, 'rounded-tl-lg': props.current_page > 1, 'rounded-tr-lg': props.current_page < props.total_pages}" :style="{'border-top-left-radius': props.current_page > 1 ? '6px' : '18px', 'border-bottom-left-radius': props.current_page > 1 ? '6px' : '18px', 'border-top-right-radius': props.current_page < props.total_pages ? '6px' : '18px', 'border-bottom-right-radius': props.current_page < props.total_pages ? '6px' : '18px'}" class="p-3 bg-white/0 border-2 border-gray-300 hover:border-gray-200 dark:hover:border-slate-600 dark:border-slate-700 rounded-lg w-14 text-center transition-all" :value="props.current_page" @keyup.enter="emitCurrentPage" @change="updateArrows" />
    <button
      v-if="props.current_page < props.total_pages"
      id="next"
      class="p-3 pl-4 pr-4 border-2 border-gray-300 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all rounded-l-[6px] rounded-r-[18px]"
      @click="incrementPage"
    >
      <i class="fa-solid fa-chevron-right text-md"></i>
    </button>
  </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>