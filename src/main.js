import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 导入全局所需要的组件
import ArticleItem from "./components/ArticleItem.vue";

// import Vant, { Toast } from 'vant'

// --------完整导入vant使用
import Vant from "vant";
import "vant/lib/index.css";
// 注册全局组件
Vue.component("ArticleItem", ArticleItem);
Vue.use(Vant);

// Toast('普通提示')
// Toast.success('成功提示')

// ----------按需导入使用
// import { Button, Tabbar, TabbarItem } from "vant";
// Vue.use(Tabbar);
// Vue.use(TabbarItem);
// Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
