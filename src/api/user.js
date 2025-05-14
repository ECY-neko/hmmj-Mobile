// 和用户相关的请求放这里

import request from "@/utils/request";

// 注册请求
export const registerAPI = (data) => {
  return request({
    method: "post",
    url: "/h5/user/register",
    data: data,
  });
};

// 登录请求
export const loginAPI = (data) => {
  return request.post("/h5/user/login", data);
};
