<template>
  <span>{{ hasOneShowingChild(item.children, item) ? 1 : 2 }}</span>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      ">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu" />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, registerRuntimeCompiler } from 'vue'
import { isExternal } from '@/utils/validate.js'
import Item from './Item.vue'
import AppLink from './Link.vue'
// import FixiOSBug from './FixiOSBug'
const onlyOneChild = ref({})
let props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const filterShowingChildren = (children) => {
  return children.filter((item) => !item.hidden)
}

const hasOneShowChild = (item) => {
  let showChildren = filterShowingChildren(item.children)
  return showChildren.length ? true : false
}

const setOnlyOneChild = (children) => {
  if (children.length === 1) {
    onlyOneChild.value = children[0]
  } else if (children.length === 0) {
    onlyOneChild.value = { ...props.item, path: '', noShowingChildren: true }
  }
}

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = filterShowingChildren(children)
  setOnlyOneChild(showingChildren)
  return showingChildren.length <= 1
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

const shouldShowSingleChild = computed(() => {
  return hasOneShowingChild(props.item.children, props.item)
})

onMounted(() => {
  if (!props.item.hidden) {
    hasOneShowingChild(props.item.children, props.item)
  }
})
</script>

<style scoped></style>
