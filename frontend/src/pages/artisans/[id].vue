<script setup lang="ts">
import { fetchArtisan, renderMii } from '@/backend';
import { onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import ReturnBtn from '@/components/ReturnBtn.vue';
import MiiCard from '@/components/MiiCard.vue';

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
        <ReturnBtn />
        <div v-if="artisan_data">
            <h1>{{ artisan_data.name }}</h1>
            <img :src="mii_img" alt="">
        </div>
        <div v-if="artisan_data && mii_data">
            <h2>Miis made by {{ artisan_data.name }}</h2>
            <ul>
                <MiiCard v-for="entries in mii_data" :key="entries.entry_id" v-bind="entries" />
            </ul>
        </div>
        <div v-else-if="artisan_data && !mii_data">
            <h2>{{ artisan_data.name }} haven't made any Miis yet.</h2>
        </div>
    </div>
</template>