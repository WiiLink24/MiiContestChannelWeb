<script setup lang="ts">
import ReturnBtn from '@/components/ReturnBtn.vue'
import Title from '@/components/Title.vue';
</script> 

<template>
    <div class="translate-y-20 pt-20 pb-20 container border-4 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl flex flex-col items-center">
        <ReturnBtn class="top-5 left-5 absolute" />
        <Title name="404" />
        <p class="text-3xl font-bold">Page not found</p>
    </div>
</template>