<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        href="javascript:;"
        :class="{ active: sorter === 'weight_desc' }"
        @click="sorterChange('weight_desc')"
        >推荐</a
      >
      <a
        href="javascript:;"
        :class="{ active: sorter === null }"
        @click="sorterChange(null)"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 使用van-list 页面刷新自动执行，可以省去created(){} -->
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
import { articleAPI } from "@/api/article";

export default {
  name: "article-page",
  data() {
    return {
      current: 1, // 页码
      sorter: "weight_desc", // weight_desc获取推荐的面试题  null 最新的
      list: [], // 默认展示数据
      loading: false, // true 正在加载  false 没请求，不加载
      finished: false,
      refreshing: false,
      temp: 0, // 记录滚动的距离
      scrollTop: 0, // 真实滚动的距离
    };
  },
  // created() {
  //   this.onLoad()
  // },
  methods: {
    // 获取面经列表数据
    async onLoad() {
      const {
        data: {
          data: { rows, pageTotal },
        },
        // 401 报错 token未携带
      } = await articleAPI({
        current: this.current,
        sorter: this.sorter,
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
    // 最新||推荐  切换
    sorterChange(sorter) {
      this.sorter = sorter;
      this.current = 1; // 重置页码为1
      this.list = []; // 重置存储数据的数组
      this.loading = true; // 表示正在加载数据，避免重复发请求
      this.onLoad(); // 调方法，发请求
    },
  },
  activated() {
    window.addEventListener("scroll", () => {
      // 保存页面滚动的距离
      this.temp = document.documentElement.scrollTop;
    });
    // 设置滚动出去的距离（滚动条位置）
    document.documentElement.scrollTop = this.scrollTop;
  },
  deactivated() {
    // 把滚动出局的距离记录到新的变量中
    this.scrollTop = this.temp;
  },
};
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
