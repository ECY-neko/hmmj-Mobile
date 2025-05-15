<template>
  <div class="collect-page">
    <van-sticky>
      <van-nav-bar title="我的收藏" />
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 使用全局组件 -->
        <ArticleItem
          v-for="item in list"
          :key="item.id"
          :item="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { likeCollectListAPI } from "@/api/article";
export default {
  name: "collect-page",
  data() {
    return {
      current: 1, // 页码
      list: [], // 默认展示数据
      loading: false, // true 正在加载  false 没请求，不加载
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    // 获取面经列表数据
    async onLoad() {
      const {
        data: {
          data: { rows, pageTotal },
        },
        // 401 报错 token未携带
      } = await likeCollectListAPI({
        optType: 1,
        page: this.current,
      });
      // 判断是否刷新页面
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false; // 刷新完成
      }
      this.list.push(...rows);
      this.loading = false;
      this.current++; // 页码+1
      if (this.current > pageTotal) {
        this.finished = true;
      }
      // push添加书需要展开[]  而不是直接把数组加进去
    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      this.current = 1;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
.collect-page {
  margin-bottom: 50px;
  // margin-top: 44px;
}
</style>
