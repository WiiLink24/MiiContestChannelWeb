<script setup lang="ts">
import type { Mii } from '@/types';

defineProps<Mii>();
</script>

<template>
    <div>
        <h1>{{ nickname }}</h1>
        <span>{{ initials }}</span>
    </div>
</template>