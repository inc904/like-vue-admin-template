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

const isCollapse = computed(() => !sidebar.opened)

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
      <el-menu router :collapse="isCollapse" :default-active="activeMenu" :background-color="variables.menuBg"
        :text-color="variables.menuText" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <SidebarItem v-for="(route, index) in routes" :key="index" :route="route" :base-path="route.path" />
      </el-menu>

      <el-menu :collapse="isCollapse" :default-active="activeMenu" :background-color="variables.menuBg"
        :text-color="variables.menuText" default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
        @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon>
            <document />
          </el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
