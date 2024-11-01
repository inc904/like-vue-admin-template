<template>
    <div class="demo-page root">
        <nav class="nav">
            <div class="navTop">
                <div class="circle"></div>
            </div>
            <ul class="links">
                <li class="navLink" v-for="i in navLinksCount" :key="i">
                    <div class="circle"></div>
                </li>
            </ul>
        </nav>
        <main class="main">
            <header class="header">
                <div class="searchBar">
                    <svg class="searchIcon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M2 8C2 4.691 4.691 2 8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8ZM17.707 16.293L14.312 12.897C15.365 11.543 16 9.846 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16C9.846 16 11.543 15.365 12.897 14.312L16.293 17.707C16.488 17.902 16.744 18 17 18C17.256 18 17.512 17.902 17.707 17.707C18.098 17.316 18.098 16.684 17.707 16.293Z"
                            fill="black"></path>
                    </svg>
                    <h5 class="searchTitle">Search</h5>
                </div>
                <ul class="profileSwitcher">
                    <li :class="['profileWrapper', { activeProfile: idx === 0 }]" v-for="(i, idx) in 4">
                        <div class="profile">
                            <img :src="`https://randomuser.me/api/portraits/men/${idx}.jpg`" />
                        </div>
                    </li>
                </ul>
            </header>
            <div class="listWrapper">
                <div class="listContainer">
                    <div class="listHeading">Telescope</div>
                    <listItem type="telescope" />
                </div>
                <div class="listContainer">
                    <div class="listHeading">Asteroids</div>
                    <listItem type="asteroid" />
                </div>
            </div>
            <div class="columnsWrapper">
                <ColumnItem v-for="i in columnsCount" :key="i" :rank="i" :isPoster="getIsPoster()" />
            </div>
        </main>
    </div>
</template>

<script setup>
import { navLinksCount, columnsCount, } from './data.js'
import ColumnItem from './column.vue'
import listItem from './list.vue';
defineOptions({ name: 'UniformUI' })

const getIsPoster = () => Math.random() < 0.5
</script>

<style lang="scss">
:root {
    --ideal-viewport-width: 1600;
}
</style>

<style lang="scss">
:root {
    --ideal-viewport-width: 1600;
}

@function scaleValue($value) {
    @return calc(#{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width)));
}

.demo-page {
    min-height: 100vh;
    color: #fff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
}

button {
    cursor: pointer;
}

body {
    font-family: 'Hind', sans-serif;
}

.root {
    display: flex;
    color: #000;
    background: #f2f2f2;
}

// Header -------------

.header {
    padding: #{scaleValue(18)} 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.searchIcon {
    max-width: #{scaleValue(36)};
    max-height: #{scaleValue(36)};
}

.searchBar {
    display: flex;
    align-items: center;
}

.searchIcon {
    display: block;
    margin-right: #{scaleValue(8)};
}

.searchTitle {
    font-size: #{scaleValue(14)};
    color: rgba(#000, 0.72);
}

.profileSwitcher {
    display: flex;
}

.profileWrapper {
    position: relative;
    margin-right: #{scaleValue(9)};

    &:last-of-type {
        margin-right: 0;
    }

    &.activeProfile {
        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: #{scaleValue(12)};
            height: #{scaleValue(12)};
            background: #34b53a;
            border-radius: 50%;
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.profile {
    width: #{scaleValue(44)};
    height: #{scaleValue(44)};
    border-radius: 50%;
    overflow: hidden;
}

// Navigation -------------

.nav {
    width: #{scaleValue(96)};
    border-top-right-radius: #{scaleValue(20)};
    border-bottom-right-radius: #{scaleValue(20)};
    height: 100vh;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.navTop {
    height: #{scaleValue(80)};
    border-bottom: 1px solid rgba(#000, 0.12);
    margin-bottom: #{scaleValue(20)};
    display: flex;
    justify-content: center;
    align-items: center;
}

.navLink {
    margin-bottom: #{scaleValue(20)};
}

.circle {
    width: #{scaleValue(36)};
    height: #{scaleValue(36)};
    background: rgba(black, 0.12);
    border-radius: 50%;
}

// List wrapper -------------

.listWrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: #{scaleValue(50)};
}

.list {
    width: #{scaleValue(692)};
    padding: #{scaleValue(5)} #{scaleValue(40)};
    background: white;
    border-radius: #{scaleValue(10)};
}

.listHeading {
    font-size: #{scaleValue(22)};
    margin-bottom: #{scaleValue(12)};
    font-weight: 400;
    color: rgba(#000, 0.72);
}

.listItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: #{scaleValue(20)} 0;
    border-bottom: 1px solid rgba(#000, 0.12);

    &:last-of-type {
        border-bottom: 0;
    }
}

.listProfilePic {
    width: #{scaleValue(50)};
    height: #{scaleValue(50)};
    border-radius: 50%;
}

.listTime {
    font-size: #{scaleValue(18)};
    color: rgba(#000, 0.72);
    font-weight: 400;
}

.listPrice {
    width: 100%;
    font-size: #{scaleValue(22)};
    display: flex;
    justify-content: flex-end;
}

.listCell {
    width: 30%;
    display: flex;
    align-items: center;
}

// Timeline feed -------------

.main {
    padding-left: #{scaleValue(136)};
    padding-right: #{scaleValue(30)};
}

.columnsWrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
</style>
