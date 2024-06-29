<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps(
    {
        total_pages: Number,
        current_page: Number
    }
)

const emit = defineEmits(['update:current_page']);

const incrementPage = () => {
  if (props.current_page < props.total_pages) {
    emit('update:current_page', props.current_page + 1);
  }
};

const decrementPage = () => {
  if (props.current_page > 1) {
    emit('update:current_page', props.current_page - 1);
  }
};

</script>

<template>
    <div class="inline-flex items-center gap-10 w-full justify-between px-32 py-10">
        <button class="p-3 border dark:border-slate-600 dark:bg-slate-700 rounded-lg" @click="decrementPage"><i class="fa-solid fa-chevron-left text-3xl"></i></button>
        <p class="p-3 dark:bg-slate-700 rounded-lg">Page {{ current_page }} of {{ total_pages }}</p>
        <button class="p-3 border dark:border-slate-600 dark:bg-slate-700 rounded-lg" @click="incrementPage"><i class="fa-solid fa-chevron-right text-3xl"></i></button>    
    </div>
</template>