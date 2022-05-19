import { login, logout } from "@/api/login";
import storage from "@/utils/storage/index";
import { Promise } from "core-js";

const user = {
  state: {
    user_id: -1,
    user_name: ""
  },

  mutations: {
    SET_USER_ID: (state, id) => {
      state.user_id = id;
      storage.setUserId(id);
    },
    SET_USER_NAME: (state, name) => {
      state.user_name = name;
      storage.setUserName(name);
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then((response) => {
            commit("SET_USER_ID", 1);
            commit("SET_USER_NAME", username);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
};

export default user;
