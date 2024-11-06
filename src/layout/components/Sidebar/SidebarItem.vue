<template>
  <!-- 有子菜单,且只有一个 子菜单 -->


  <el-menu-item v-if="hasOneShowingChild(route.children, route)" :to="resolvePath(onlyOneChild.path)"
    :index="resolvePath(onlyOneChild.path)">
    <!-- <router-link v-if="hasOneShowingChild(route.children, route)" :to="resolvePath(onlyOneChild.path)"
      :data="resolvePath(onlyOneChild.path)"> -->
    <el-icon><icon-menu /></el-icon>
    <span :desc="resolvePath(onlyOneChild.path)">{{ onlyOneChild.meta.title }}</span>
    <!-- </router-link> -->
  </el-menu-item>



  <!-- 有多个子菜单 或者 没有子菜单且自身是一个菜单 -->
  <el-sub-menu v-else index="route.path">
    <template #title>
      <el-icon> <icon-menu /> </el-icon>
      <span :desc="resolvePath(route.path)">{{ route.meta.title }}</span>
    </template>
    <!-- <el-menu-item v-for="(child, index) in route.children">{{ child.meta.title }}</el-menu-item> -->
    <SidebarItem v-for="child in route.children" :key="child.path" :route="child"
      :base-path="resolvePath(child.path)" />
  </el-sub-menu>

</template>

<script setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { isExternal } from '@/utils/validate.js'

let props = defineProps({
  route: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
})


const onlyOneChild = ref({})
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }
}

const resolvePath = (routePath) => {

  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  // Pure JavaScript implementation of path resolution
  if (props.basePath) {
    return props.basePath + (props.basePath.endsWith('/') ? '' : '/') + routePath
  }
  return routePath
}

</script>

<style lang="scss" scoped></style>