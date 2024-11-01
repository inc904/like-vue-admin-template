<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
                    item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import pathToRegexp from 'path-to-regexp'
let route = useRoute()
console.log('route', route)
const router = useRouter()
let routes = router.getRoutes()
console.log('routes:', routes)

const levelList = ref([])
const getBreadcrumb = () => {
    let matched = route.matched.filter(item => item.meta && item.meta.title)
    console.log('matched', matched)
    const first = matched[0]
    let dashboard = routes.find(item => item.path === '/dashboard')
    if (!isDashboard(first)) {
        matched = [dashboard].concat(matched)
    }
    levelList.value = matched.filter(item => item && item.meta && item.meta.title)
}
const isDashboard = (route) => {
    let name = route && route.name
    if (!name) return false
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
watch(() => route.path, getBreadcrumb, { immediate: true })

const handleLink = (route) => {
    const { redirect, path } = route
    if (redirect) {
        return router.push(redirect)
    }
    return router.push(pathCompile(path))
}
const pathCompile = (path) => {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = route
    let toPath = pathToRegexp.compile(path)
    console.log('toPath', toPath)
    return toPath(params)
}
onMounted(() => {
    getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>