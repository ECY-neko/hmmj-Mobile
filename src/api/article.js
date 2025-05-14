// 存放和面经相关的请求
import request from "@/utils/request";

// 分页获取面经列表请求
export const articleAPI = (params) => {
  return request.get("/h5/interview/query", { params });
};

// 获取单个面经详情
export const detailAPI = (id) => {
  return request({
    method: "get",
    url: "/h5/interview/show",
    params: {
      id,
    },
  });
};

// 点赞、收藏
export const likeCollectAPI = (id,num) => {
  return request({
    method: "post",
    url: '/h5/interview/opt',
    data: {
      id,
      optType:num
    }
  });
};
