<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-3 p-20 border-4 border-dashed rounded-xl border-gray-300/60 text-gray-300/60">
        <img class="w-10 h-10 brightness-[100000%] invert dark:invert-0" src="/src/assets/loading.gif" alt="Loading Animation">
        <p class="text-black">{{ t('loading') }}</p>
    </div>
</template>