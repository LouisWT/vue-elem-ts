import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/Home/Home.vue';
import Login from 'views/Login/Login.vue';
import App from '@/App.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/login',
        component: Login,
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ 'views/About.vue'),
  // },
];

export default new Router({
  routes,
  // 路由模式
  mode: 'hash',
  // 应用的基路径
  base: '/',
  // 当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式。默认值为 true
  // fallback: true,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop;
    }
    return {
      x: 0,
      y: to.meta.savedPosition || 0,
    };
  },
});
