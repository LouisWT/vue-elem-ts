import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
import state, { RootState } from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { HomeState } from 'views/Home/state';
import Home from 'views/Home/store';

Vue.use(Vuex);

export default new Vuex.Store({
  // 状态树
  state,

  // state 的计算属性，每一项都是一个函数
  // (state, getters) => 返回计算属性
  // 第一个参数是 state，第二项是 getters，可以通过它访问其他 getter
  getters,

  // 相当于 reducer，区别在于它不是返回新 state，而是在回调函数中对 state 进行操作
  // 包含事件类型和回调函数
  // 如果要改变对象类型的变量，需要使用新对象来替换
  // state.obj = { ...state.obj, newProp: 123 }
  // mutation 必须是同步的
  // this.$state.commit mutation
  mutations,

  // action 类似 mutation，不同之处在于
  // action 提交的是 mutation，而不是直接变更状态
  // action 可以包含异步操作
  // this.$state.dispatch action
  actions,

  // 将store 分割为模块，每个模块可以拥有自己的 state、mutation、action、getter和嵌套的子模块
  modules: {
    // Home
    Home,
  },

});

export interface State extends RootState {
  Home?: HomeState;
}

export interface ActionContext {
  commit: Commit;
  dispatch: Dispatch;
}
