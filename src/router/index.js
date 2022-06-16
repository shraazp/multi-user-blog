import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue"
import Profile from "../views/Profile.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import ResetPassword from "../views/ResetPassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:'Home',
    },


  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta:{
      title:'Blogs',
    },
   

  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta:{
      title:'ForgotPassword',
    },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta:{
      title:'ResetPassword',
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      title:'Login',
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      title:'Register',
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "Preview Blog Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/view-blog/:blogID",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "View Blog Post",
      requiresAuth: false,
    },
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "Edit Blog Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to,from,next) =>{
  document.title=`${to.meta.title} | VueBlog`
  next();
})

export default router;
