import { request } from "./request";

const http = {
  get(url, params, config) {
    return request("GET", url, params, config);
  },
  delete(url, data, config) {
    return request("DELETE", url, data, config);
  },
  delete1(url, params, config) {
    return request("DELETE1", url, params, config);
  },
  post(url, data, config) {
    return request("POST", url, data, config);
  },
  put(url, data, config) {
    return request("PUT", url, data, config);
  },
  putForm(url, data, config) {
    return request(
      "PUT",
      url,
      data,
      Object.assign(
        {
          headers: { "Content-Type": "multipart/form-data; charset=utf-8" }
        },
        config
      )
    );
  },
  postForm(url, data, config) {
    return request(
      "POST",
      url,
      data,
      Object.assign({
        headers: { "Content-Type": "multipart/form-data; charset=utf-8" }
      })
    );
  }
};

export default http;
