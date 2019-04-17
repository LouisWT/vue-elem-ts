<template>
  <div>
    <Header :signInUp="true">
      <span class="header-logo" slot="logo" @click="reload">eleme</span>
    </Header>
    <!-- 当前定位城市 -->
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>如果定位不准确，请在城市列表中选择</span>
      </div>
      <router-link class="guess-city" v-if="guessCity && guessCity.id" :to="'/city/' + guessCity.id">
        <span>{{guessCity && guessCity.name}}</span>
        <svg width="12" height="18" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="4,0 12,9 4,18" style="fill:none;stroke:#999;stroke-width:2"></polyline>
        </svg>
      </router-link>
    </nav>
    <!-- 热门城市 -->
    <section class="hot-city-container">
      <h4 class="city-title">热门城市</h4>
      <ul class="city-list">
        <router-link tag="li" v-for="item in hotCity" :to="'/city' + item.id" :key="item.id">
          {{item.name}}
        </router-link>
      </ul>
    </section>
    <!-- 所有城市列表，按字母排序 -->
    <section class="cities" v-for="(value, key, index) in sortGroupCity" :key="key">
      <h4 class="letter">{{key}}
        <span v-if="index === 0">（按字母排序）</span>
      </h4>
      <ul class="city-list">
        <router-link  tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id">
          {{item.name}}
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import Header from 'components/Header/Header.vue';
import { City, SortCity } from './state';

// 如果要使用 namespace，需要在 module 的store 中设置 namespaced 为 true
const HomeModule = namespace('Home');

@Component({
  name: 'Home',
  components: {
    Header,
  },
})
export default class Home extends Vue {
  @HomeModule.State public guessCity!: City;
  @HomeModule.State public hotCity!: City[];
  @HomeModule.State public groupCity!: SortCity;
  @HomeModule.Action public getGuessCity!: VoidFunction;
  @HomeModule.Action public getHotCity!: VoidFunction;
  @HomeModule.Action public getGroupCity!: VoidFunction;

  get sortGroupCity() {
    const obj: SortCity = {};
    for (let i = 65; i <= 90; i++) {
      if (this.groupCity[String.fromCharCode(i)]) {
        obj[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)];
      }
    }
    return obj;
  }

  public reload() {
    window.location.reload();
  }

  public mounted() {
    this.getGuessCity();
    this.getHotCity();
    this.getGroupCity();
  }
}

</script>

<style lang="scss" scoped>
@import '~style/mixin';

.header-logo {
  left: 0.4rem;
  font-weight: 400;
  @include sc(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include ct;
}

.city-nav {
  // 上面的 Header 是 fixed 布局，所以预留出它的空间
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: .4rem;
  .city-tip {
    // flex 布局
    @include fj;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    // nth-of-type 是伪类选择器
    span:nth-of-type(1) {
      @include sc(0.55rem, #666);
    }
    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(0.475rem ,#9f9f9f);
    }
  }
  .guess-city {
    @include fj;
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    @include font(0.75rem, 1.8rem);
    text-decoration: none;
    span:nth-of-type(1) {
      color: $blue;
    }
    svg {
      @include wh(.6rem, .6rem);
      fill: #999;
    }
  }
}

.hot-city-container {
  border-top: 2px solid $bc;
  margin-bottom: .4rem;
  .city-title {
    @include sc(0.55rem, #666);
    padding-left: 0.45rem;
    margin: 0.45rem 0;
    font-weight: 400;
  }
  .city-list {
    border-top: 1px solid $bc;
    border-right: 1px solid $bc;
    li {
      display: inline-block;
      border-left: 0.025rem solid $bc;
      border-bottom: 0.025rem solid $bc;
      box-sizing: border-box;
      text-align: center;
      @include wh(25%, 1.75rem);
      @include font(0.6rem, 1.75rem);
      color: $blue;
    }
  }
}

.cities {
  list-style: none;
  border-top: 2px solid $bc;
  .letter {
    @include sc(0.55rem, #666);
    padding-left: 0.45rem;
    margin: 0.45rem 0;
    font-weight: 400;
  }
  .city-list {
    border-top: 1px solid $bc;
    border-right: 1px solid $bc;
    margin-bottom: .45rem;
    li {
      list-style: none;
      display: inline-block;
      border-left: 0.025rem solid $bc;
      border-bottom: 0.025rem solid $bc;
      box-sizing: border-box;
      text-align: center;
      @include wh(25%, 1.75rem);
      @include font(0.6rem, 1.75rem);
      // 以下三个同时设置才会实现文本超出部分显示 ...
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
