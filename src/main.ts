import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import dataV from "@jiaminghi/data-view";
// 引入全局css
import "./assets/scss/style.scss";
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import "./assets/icon/iconfont.css";
// 引入 全局注册组件
import PublicComponent from "@/components/componentInstall";
import messages from "@/lang/index.js";
import { createI18n } from "vue-i18n";
// 导入请求进度条组件和样式
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import SvgIcon from "./icons";
// import ElTreeSelect from 'el-tree-select'
import JsonViewer from 'vue-json-viewer'
// import JsonViewer from 'vue3-json-viewer'
// import CodeEditor from 'bin-code-editor'
// import 'bin-code-editor/lib/styles/index.css'
// import axios from "axios";
// import { i18n } from "./lang/i18n.js";

const i18n = createI18n({
  legacy: false,
  messages,
  locale: "en",
  fallbackLocale: "en"
});

const app = createApp(App);
// app.use(CodeEditor);
app.use(PublicComponent);
// app.use(dataV);
app.use(SvgIcon);
app.use(JsonViewer);
app.use(store);
app.use(router);
app.use(i18n);
app.use(ElementPlus, { locale });
// app.use(ElTreeSelect);
app.directive("scrollBottom", {
  updated(el) {
    el.scrollTo({
      top: el.scrollHeight - el.clientHeight,
      behavior: "smooth"
    })
  }
})
app.mount("#app");
