<template>
  <div class="miicard">
    <h2>{{ initials }}</h2>
    <p>Nickname: {{ nickname }}</p>
    <p>Skill: {{ skill }}</p>
    <p>Gender: {{ gender }}</p>
    <p>Country ID: {{ country_id }}</p>
    <p>Wii Number: {{ wii_number }}</p>
  </div>
</template>

<script>
export default {
  props: {
    entry_id: Number,
    artisan_id: Number,
    initials: String,
    skill: String,
    nickname: String,
    gender: String,
    country_id: Number,
    wii_number: String,
    mii_data: String,
  },
}
</script>