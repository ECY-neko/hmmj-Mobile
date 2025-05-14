<template>
  <div class="layout-page">
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 底部tabbar -->
    <van-tabbar route>
      <van-tabbar-item icon="description" to="/article">面经</van-tabbar-item>
      <van-tabbar-item icon="star" to="/collect">收藏</van-tabbar-item>
      <van-tabbar-item icon="like" to="/like">喜欢</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page'
}
</script>

<style lang="less" scoped></style>
