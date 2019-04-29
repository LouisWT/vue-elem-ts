<template>
  <header id="header-top">
    <!-- 返回的箭头 -->
    <section class="header-goback" v-if="goBack" @click="$router.go(-1)">
      <!-- 必须用 viewBox -->
      <svg width="12" height="18" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"></polyline>
      </svg>
    </section>
    <!-- 用户头像或者登录注册 -->
    <router-link class="header-login" :to="userInfo ? '/profile' : '/login'" v-if="signInUp">
      <!-- 如果有用户信息，那么就显示头像 -->
      <img class="user-avatar" v-if="userInfo" :src="'https://elm.cangdu.org/img/'+ userInfo.avatar" alt="头像">
      <!-- 如果没有用户信息那么就显示登录或者注册 -->
      <span class="login-span" v-else>登录|注册</span>
    </router-link>
    <section class="header-title" v-if="title">
      <span class="header-text">{{title}}</span>
    </section>
    <!-- 传入的其他插槽 -->
    <slot name='logo'></slot>
    <slot name='search'></slot>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import { UserInfo } from 'store/state';


// 装饰器是对类行为进行改变的函数
// 它是在编译阶段运行的，本质上就是语法糖
@Component
export default class Header extends Vue {

  public name: string = 'Header';
  // :boolean 是在 ts 中需要添加的
  // 由于 ts 的 Strict Class Initialization，所以不在 constructor 里面初始化的属性会报错
  // 加上 ! 断言修饰符之后就不会报错了
  @Prop(Boolean) public readonly goBack!: boolean;
  @Prop(Boolean) public readonly signInUp!: boolean;
  @Prop(String) public readonly title!: string;
  // 获取 Store 的 state，正常来说应当写在计算属性里，用修饰器更简单
  @State public userInfo!: UserInfo;
  // VoidFunction 相当于 () => void
  @Action public getUserInfoAction!: VoidFunction;

  public mounted() {
    this.getUserInfoAction();
  }
}
</script>
<style lang="scss" scoped>
@import '~style/mixin';

#header-top{
  position: fixed;
  @include wh(100%, 1.95rem);
  left: 0;
  top: 0;
  z-index: 100;
  background-color: $blue;
  display: flex;
  align-items: center;
}
.header-goback {
  margin-left: .4rem;
  width: 0.6rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 0.6rem;
    height: 1rem;
  }
}
.header-login{
    text-decoration: none;
    right: 0.55rem;
    // 水平垂直居中
    @include ct;
    font-size: 0;
    .login-span{
      // 字体大小颜色
      @include sc(0.65rem, #fff);
      color: #fff;
      vertical-align: middle;
    }
    .user-avatar{
      vertical-align: middle;
      border-radius: 50% 50%;
      @include wh(.8rem, .8rem);
    }
}
.header-title{
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  .header-text{
    @include sc(0.8rem, #fff);
    text-align: center;
    font-weight: bold;
  }
}
</style>
