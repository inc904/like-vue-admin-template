<script setup>
import { computed } from 'vue'
import { Sidebar, Navbar, AppMain } from './components'
import { useAppStore } from '@/store/index.js'

const appStore = useAppStore()
const { sidebar, device } = appStore

const classObj = computed(() => ({
  hideSidebar: !sidebar.opened,
  openSidebar: sidebar.opened,
  withoutAnimation: sidebar.withoutAnimation,
  mobile: device === 'mobile',
}))
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <Navbar></Navbar>
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  background-color: red;
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
