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
    <div class="inline-flex items-center gap-10">
        <button @click="decrementPage"><i class="fa-solid fa-chevron-left"></i></button>
        <p>Page {{ current_page }} of {{ total_pages }}</p>
        <button @click="incrementPage"><i class="fa-solid fa-chevron-right"></i></button>    
    </div>
</template>