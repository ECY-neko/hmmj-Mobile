<template>
  <div class="login-page">
    <!-- 登陆标题 -->
    <van-nav-bar title="面经登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="账号"
        placeholder="账号"
        autocomplete="username"
        :rules="userRules"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        autocomplete="current-password"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            pattern: /^\S*(?=\S{6,})/,
            message: '至少6位，至少有一个大写字母，小写字母，特殊字符',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 超链接 -->
    <router-link class="link" to="/register">还没有账号？去注册</router-link>
  </div>
</template>

<script>
import { loginAPI } from "@/api/user";

export default {
  name: "login-page",
  data() {
    return {
      username: "qifeilo",
      password: "DRZjsw..",
      userRules: [
        // required 表示用户名必填
        { required: true, message: "请填写用户名" },
        // pattern 正则验证
        // message 验证不通过提示
        { pattern: /^[\w-]{4,16}$/, message: "4-16位数字，字母，下划线" },
      ],
    };
  },
  methods: {
    async onSubmit(values) {
      try {
        const {
          data: {
            data: { token },
          },
        } = await loginAPI(values);
        localStorage.setItem("mobile-token", token);
        this.$toast("登陆成功");
        this.username = this.password = "";
        this.$router.push("/article");
      } catch (err) {
        if (err.response) {
          this.$toast(err.response.data.message);
        } else {
          this.$toast("登陆失败");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.link {
  float: right;
  margin-right: 20px;
  font-size: 14px;
  color: #1989fa;
}
</style>
