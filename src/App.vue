<template>
  <div id="app">
    <div id="nav">
      <!-- 使用 vue-router 必须在HTML这里指定 router-link -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- 这里显示 router-link 匹配到的视图 -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#nav {
  display: none;
}
</style>
