<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

import { useAppStore } from '@/store/index.js'
import { useSettingsStore } from '@/store/index.js'

import variables from '@/styles/variables.module.scss'

import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const route = useRoute()
const router = useRouter()
const routes = router.options.routes

console.log('routes', { routes, route })

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { sidebar } = appStore
const { sidebarLogo } = settingsStore

const isCollapse = computed(() => sidebar.opened)

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const showLogo = computed(() => {
  return sidebarLogo
})

</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">

      <el-menu :default-active="activeMenu" :background-color="variables.menuBg" :text-color="variables.menuText"
        class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <SidebarItem v-for="(route, index) in routes" :key="index" :route="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
