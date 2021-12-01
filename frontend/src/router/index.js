import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Posts from "@/components/Posts.vue";
import OnePost from "@/components/OnePost.vue";
// import Profil from "@/components/Profil.vue";

Vue.use(VueRouter);
// const user = JSON.parse(localStorage.getItem("user"));
// let id = user.id;

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/posts/:id",
    name: "OnePost",
    component: OnePost,
  }, 
  // {
  //   path: "/profil/" + id,
  //   name: "Profil",
  //   component: Profil,
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
