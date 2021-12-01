import Vue from "vue";
import Vuex from "vuex";
// import AuthServices from "@/services/AuthServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,

    UserId: null,
    isUserLoggedIn: false,
    message: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, UserId) {
      state.UserId = UserId;
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, UserId) {
      commit("setUser", UserId);
    },

    fetchAccessToken({ commit }) {
      commit("setToken", localStorage.getItem("accessToken"));
      // commit("setUser", localStorage.getItem("UserId"));
    },
    setMessage({ commit }, message) {
      commit("setMessage", message);
    },
  },
  modules: {},
});
