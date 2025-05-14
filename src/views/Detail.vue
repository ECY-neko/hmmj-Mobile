<template>
  <!-- 查询参数传参  获取参数方式 $route.query.id -->
  <!-- 动态路由传参  获取参数方式 $route.params.id -->
  <div class="detail-page">
    <van-nav-bar
      left-text="返回"
      @click-left="$router.back()"
      fixed
      title="面经详细"
    />
    <header class="header">
      <h1>{{ detail.stem }}</h1>
      <p>
        创建时间 {{ detail.createdAt }} | {{ detail.views }} 浏览量 |
        {{ detail.likeCount }} 点赞数
      </p>
      <p>
        <img :src="detail.avatar" alt />
        <span>{{ detail.creator }}</span>
      </p>
    </header>
    <main class="body" v-html="detail.content"></main>
    <div class="opt">
      <van-icon
        :class="{ active: detail.likeFlag }"
        name="like-o"
        @click="toggleLike"
      />
      <van-icon
        :class="{ active: detail.collectFlag }"
        name="star-o"
        @click="toggleCollect"
      />
    </div>
  </div>
</template>

<script>
import { detailAPI, likeCollectAPI } from "@/api/article";

export default {
  data() {
    return {
      detail: [],
    };
  },
  name: "detail-page",
  async created() {
    const {
      data: { data },
    } = await detailAPI(this.$route.params.id);
    this.detail = data;
  },
  methods: {
    async toggleLike() {
      this.detail.likeFlag = !this.detail.likeFlag;
      await likeCollectAPI(this.detail.id, 1);
      if (this.detail.likeFlag) {
        this.detail.likeCount++;
        this.$toast.success("感谢支持");
      } else {
        this.detail.likeCount--;
        this.$toast.success("把我的感谢还回来");
      }
    },
    async toggleCollect() {
      this.detail.collectFlag = !this.detail.collectFlag;
      await likeCollectAPI(this.detail.id, 2);
      if (this.detail.collectFlag) {
        this.$toast.success("收藏成功");
      } else {
        this.$toast.success("取消收藏");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #fec635;
        color: #fff;
      }
    }
  }
}
</style>
