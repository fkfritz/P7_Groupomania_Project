import Vue from "vue";
import Vuex from "vuex";
// import AuthServices from "@/services/AuthServices";
import UserServices from "@/services/UserServices";
import PostServices from "@/services/PostServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    users:{},
    UserId: null,
    isUserLoggedIn: false,
    message: [],
    posts: [],
  },
  getters:{
    users(state) {
      return state.users;
    },
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
    SET_USERS(state, users){
      state.users = users;
    },
    SET_POSTS(state, posts){
      state.posts =posts;
    }
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
    getUsers({ commit }){
      const response = UserServices.getAllUsers();
      const users =response.data
      commit("SET_USERS", users);
      console.log(response);
    },
    async getPosts({ commit }){
      const response = await PostServices.getAllPosts();
      const posts =response.data
      commit("SET_POSTS", posts);
      console.log(response);
    }
  },
  modules: {},
});
