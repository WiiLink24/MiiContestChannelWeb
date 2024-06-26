<script setup lang="ts">
import { fetchArtisan, renderMii } from '@/backend';
import { onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const artisanId = ref(route.params.id)

const artisan = ref();
const artisan_data = ref();
const mii_data = ref();

const mii_img = ref();

onMounted(async () => {
    artisan.value = await fetchArtisan(artisanId.value);
    artisan_data.value = artisan.value.artisan_data;
    mii_data.value = artisan.value.mii_data;

    mii_img.value = await renderMii(artisan_data.value.mii_data);
    console.log(artisan.value)
})

</script>

<template>
    <div class="container">
        <div v-if="artisan_data">
            <h1>{{ artisan_data.name }}</h1>
            <img :src="mii_img" alt="">
        </div>

    </div>
</template>