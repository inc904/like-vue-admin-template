<template>
    <ul class="list">
        <Item v-for="(i, index) in possibleDates" :key="index" :rank="index" :type="type" />
    </ul>

</template>

<script setup>
import { possibleDates } from './data'
import Item from './item.vue'
defineOptions({ name: 'ListItem' })
defineProps(['rank', 'type'])


</script>

<style lang="scss" scoped></style>
