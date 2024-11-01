<template>
    <div class="column">
        <div class="feedItem" v-for="(val, j) in new Array(5 + Math.round(Math.random() * 4)).fill(null)">
            <img class="feedItemBG" v-if="isPoster" :src="`https://picsum.photos/200/${300 + rank + j}`" />
            <div :class="['feedWrapper', { hasBackground: isPoster }]" :data="isPoster">
                <ul class="feedTags" :style="`--ref-margin-bottom:${isPoster ? (100 + Math.random() * 60) : 42}`">
                    <li class="feedTag" v-for="(item, index) in getTags()" :key="index"
                        :style="{ background: item.color }">
                        {{ item.label }}
                    </li>
                </ul>
                <h2 class="feedTitle">{{ getTitle() }}</h2>
                <p class="feedDesc">{{ getParagraph() }}</p>
                <button class="feedButton" v-if="!isPoster">Details</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { availableTags, titles, descriptions } from './data.js'
defineOptions({ name: 'ColumItem' })
let props = defineProps(['item', 'rank', 'isPoster'])

const getTags = () => {
    let tags = availableTags.filter(_ => Math.random() < 0.3)
    tags = tags.length ? tags : [availableTags[0]]
    return tags
}
const getTitle = () => titles[Math.floor(Math.random() * titles.length)]
const getParagraph = () => descriptions[Math.floor(Math.random() * descriptions.length)]

</script>

<style lang="scss" scoped>
@import '../../styles/fn.module.scss';



.column {
    width: calc(25% - #{scaleValue(40)});
}

.feedItem {
    position: relative;
    margin-bottom: #{scaleValue(50)};
    border-radius: #{scaleValue(10)};
    overflow: hidden;
    background: white;
}

.feedDesc {
    // margin: #{scaleValue(32)} 0 0 0;
    font-size: #{scaleValue(16)};
}

.feedTags {
    margin-bottom: #{scaleValue(var(--ref-margin-bottom))};
}

.feedTag {
    display: inline-block;
    margin-right: #{scaleValue(6)};
    margin-bottom: #{scaleValue(6)};
    padding: #{scaleValue(5)} #{scaleValue(10)};
    border-radius: #{scaleValue(4)};
    font-size: #{scaleValue(15)};
    color: #111;

    &:last-of-type {
        margin-right: 0;
    }
}

.feedTitle {
    font-size: #{scaleValue(40)};
}

.feedItemLink {}

.feedButton {
    margin-top: #{scaleValue(32)};
    font-size: #{scaleValue(20)};
    color: #4339F2;
    background: none;
    border: none;
}

.feedItemBG {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.feedWrapper {
    padding: #{scaleValue(16)} #{scaleValue(20)};
    position: relative;
    z-index: 2;

    &.hasBackground {
        background: rgba(black, 0.3);
        color: white;
    }
}
</style>