<template>
  <!-- 一级路由出口 -->
  <!-- keep-alive:include="组件中的name" -->
  <keep-alive :include="['layout-page']">
  <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
