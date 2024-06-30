<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchMii, renderMii } from '@/backend';
import { useRoute } from 'vue-router'
import LoadingAnimation from '@/components/LoadingAnimation.vue';

const route = useRoute()

const mii = ref()
const mii_img = ref()
const isLoading = ref(false)

onMounted(async () => {
    try {
        isLoading.value = true
        mii.value = await fetchMii(route.params.id)
        mii_img.value = await renderMii(mii.value.mii_data)
    } finally {
        isLoading.value = false
    }
})

watch(route, async () => {
  mii.value = await fetchMii(route.params.id)
})

</script>

<template>
    <div class="container">
        <LoadingAnimation v-if="isLoading" />
        <div v-else-if="mii">
            <h1>{{ mii.nickname }}</h1>
            <img :src="mii_img" alt="">
        </div>
    </div>
</template>