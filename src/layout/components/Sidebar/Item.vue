<template>
  <!-- <template v-if="icon">
    <i v-if="icon.includes('el-icon')" :class="icon" />
    <svg-icon v-else :icon-class="icon" />
  </template> -->
  <template v-if="title">
    <span slot="title">{{ title }}</span>
  </template>
</template>

<script setup>
let props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
