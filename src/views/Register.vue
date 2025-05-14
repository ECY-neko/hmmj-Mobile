<template>
  <div class="login-page">
    <van-nav-bar title="面经注册" />
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
        <van-button block type="info" native-type="submit" color="orange"
          >注册</van-button
        >
      </div>
    </van-form>
    <!-- 超链接 -->
    <router-link class="link" to="/login">已有账号？去登录</router-link>
  </div>
</template>

<script>
import { registerAPI } from "@/api/user";

export default {
  name: "register-page",
  data() {
    return {
      username: "",
      password: "",
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
        await registerAPI(values);
        // 封装在API文件夹复用
        //   request({
        //   method: "post",
        //   url: "/h5/user/register",
        //   data: values,
        // });
        this.$toast("注册成功"); // 提示
        this.username = this.password = ""; // 重置表单
        this.$router.push("/login"); // 跳转登录页
      } catch (err) {
        if (err.response) {
          this.$toast(err.response.data.message); // 有响应结果提示响应结果信息
        } else {
          this.$toast("注册失败"); //  无响应结果 笼统提示
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
