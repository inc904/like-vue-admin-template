<template>
    <li class="listItem">
        <div class="listCell">
            <img class="listProfilePic"
                :src="`https://randomuser.me/api/portraits/${type === 'telescope' ? 'men' : 'women'}/${rank}.jpg`"
                alt="" />
        </div>
        <div class="listCell">
            <h5 class="listTime">{{ getDate() }}</h5>
        </div>
        <div class="listCell">
            <h5 class="listTime">{{ getTime() }}</h5>
        </div>
        <div class="listCell">
            <h6 class="listPrice" :style="{ color }">{{ price }}</h6>
        </div>
    </li>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { possibleDates, possibleTimes } from './data'

defineOptions({ name: 'Item' })
defineProps(['type', 'rank'])
const getDate = () => possibleDates[Math.floor(Math.random() * possibleDates.length)]
const getTime = () => possibleTimes[Math.floor(Math.random() * possibleTimes.length)]
const priceColor = (price) => (price < 100 ? 'red' : price < 200 ? 'blue' : 'orange')

const price = ref(0)
const color = ref('')
const getPrice = () => {
    price.value = Math.round(Math.random() * 220) + 80
    color.value = priceColor(price.value)
}
onMounted(() => {
    getPrice()

})
</script>

<style lang="scss" scoped></style>