// 导入axios
import axios from "axios";

// 配置 axios副本
const request = axios.create({
  baseURL: "http://interview-api-t.itheima.net", // 请求根路径
  timeout: 5000, // 超时
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("mobile-token");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// 导出
export default request;
// axios 请求根路径
