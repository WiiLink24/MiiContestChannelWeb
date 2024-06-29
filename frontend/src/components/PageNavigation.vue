<script setup lang="ts">
import { onMounted, defineProps, defineEmits } from 'vue'

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
  console.log(props.current_page);
}

const decrementPage = () => {
  updateArrows();
  if (props.current_page > 1) {
    emit('update:current_page', props.current_page - 1)
  }
  console.log(props.current_page);
}

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
  <div class="inline-flex items-center gap-1 w-full justify-end">
    <p class="p-3 dark:bg-slate-700 rounded-lg">Page <b id="curr">{{ current_page }}</b> of <b id="last">{{ total_pages }}</b></p>
    <l class="opacity-30 ml-3 mr-3"> | </l>
    <button
      id="prev"
      class="p-2 dark:bg-slate-700 dark:hover:bg-slate-900 rounded-lg transition-all"
      @click="decrementPage"
    >
      <i class="fa-solid fa-chevron-left text-3xl"></i>
    </button>
    <button
      id="next"
      class="p-2 dark:bg-slate-700 dark:hover:bg-slate-900 rounded-lg transition-all"
      @click="incrementPage"
    >
      <i class="fa-solid fa-chevron-right text-3xl"></i>
    </button>
  </div>
</template>
