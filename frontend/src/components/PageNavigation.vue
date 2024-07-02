<script setup lang="ts">
import { onMounted, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  total_pages: Number,
  current_page: Number
})

const emit = defineEmits(['update:current_page'])

const incrementPage = () => {
  updateArrows();
  if (props.current_page < props.total_pages) {
    emit('update:current_page', props.current_page + 1)
  }
}

const decrementPage = () => {
  updateArrows();
  if (props.current_page > 1) {
    emit('update:current_page', props.current_page - 1)
  }
}

const emitCurrentPage = () => {
  //fetch input value
  const input = document.querySelector('input');
  emit('update:current_page', parseInt(input.value));
};

onMounted(() => {
  updateArrows();
})

function updateArrows() {
  const curr = document.getElementById('curr').innerHTML;
  const last = document.getElementById('last').innerHTML;

  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  if (curr == 1) {
    prev.style.opacity = 0.5;
    prev.style.pointerEvents = 'none';
  } else if (curr == last) {
    next.style.opacity = 0.5;
    next.style.pointerEvents = 'none';
  } else {
    prev.style.opacity = 1;
    prev.style.pointerEvents = 'auto';
    next.style.opacity = 1;
    next.style.pointerEvents = 'auto';
  }
}
</script>

<template>
  <div class="inline-flex items-center gap-1 w-full justify-between">
    <p class="opacity-60">Showing page <b id="curr">{{ current_page }}</b> of <b id="last">{{ total_pages }}</b></p>
    <div class="flex flex-row items-center gap-1">
    <button
      id="prev"
      class="p-3 pl-4 pr-4 border-2 border-gray-300 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-all"
      @click="decrementPage"
    >
      <i class="fa-solid fa-chevron-left text-md"></i>
    </button>
    <input type="number" class="p-3 bg-white/0 border-2 border-gray-300 hover:border-gray-200 dark:hover:border-slate-600 dark:border-slate-700 rounded-lg w-14 text-center transition-all" :value="props.current_page" @keyup.enter="emitCurrentPage" @change="updateArrows" />
    <button
      id="next"
      class="p-3 pl-4 pr-4 border-2 border-gray-300 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-all"
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