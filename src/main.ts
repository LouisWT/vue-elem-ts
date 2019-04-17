import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import './utils/rem';

Vue.config.productionTip = false;

new Vue({
  router,
  // 导入 store
  // 可以通过实例的 $store 来访问 store
  store,
  render: (h) => h(App),
}).$mount('#app');
