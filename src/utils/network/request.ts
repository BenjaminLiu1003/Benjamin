import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import storage from '@/utils/storage/index'
import NProgress from "nprogress";

const text = "loading";
let loading;
let requestCount = 0;

const showLoading = () => {
  if (requestCount === 0 && !loading) {
    loading = ElLoading.service({
      text: text,
      background: "rgba(0, 0, 0, 0.7)",
      spinner: "el-icon-loading"
    });
  }
  ++requestCount;
};
const hideLoading = () => {
  --requestCount;
  if (requestCount === 0) {
    loading.close();
  }
};
export function request(method, url, info, config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV == "production"
        ? process.env.VUE_APP_API_URL_PROD
        : process.env.VUE_APP_API_URL_DEV,
    timeout: 20000
  });

  const config0 = {
    method: method === "DELETE1" ? "DELETE" : method,
    url: url,
    data:
      method === "POST" || method === "PUT" || method === "DELETE"
        ? info
        : null,
    params: method === "GET" || method === "DELETE1" ? info : null,
    withCredentials: true
  };

  config = Object.assign(config0, config);

  // 请求拦截器配置
  instance.interceptors.request.use(
    (config) => {
      // showLoading();
      NProgress.start();
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // const token = window.localStorage.getItem("token");
      const token = storage.getCsrfToken()
      token && (config.headers.Authorization = token);
      if (config.method === "POST") {
        config.data = JSON.stringify(config.data);
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器配置
  instance.interceptors.response.use(
    (response) => {
      // hideLoading();
      NProgress.done();
      return response.data;
    },
    (error) => {
      if (!error.response || !error.response.status) {
        return Promise.reject(error);
      }
      let message;
      switch (error.response.status) {
        case 400:
          message = "请求错误";
          break;
        case 401:
          message = "无权访问";
          break;
        case 403:
          message = "Token过期了";
          break;
        case 404:
          message = "404";
          break;
        case 408:
          message = "请求超时";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        case 501:
          message = "服务未实现";
          break;
        case 502:
          message = "网关错误";
          break;
        case 503:
          message = "服务不可用";
          break;
        case 504:
          message = "网关超时";
          break;
        case 505:
          message = "HTTP版本不受支持";
          break;
        default:
          message = "请求失败";
      }
      ElMessage.error(message);
      return Promise.reject(error);
    }
  );

  // 发送真正的网络请求
  return instance(config);
}
