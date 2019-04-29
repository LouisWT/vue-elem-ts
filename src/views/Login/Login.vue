<template>
  <div class="container">
    <Header :goBack="true" :signInUp="false" title="密码登录"></Header>
    <form class="login-from">
      <section class="phone-wrapper input-container">
        <input v-model="phone" type="text" name="phone" id="phone" placeholder="账号">
      </section>
      <section class="password-wrapper input-container">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" name="password" id="password" placeholder="密码">
        <el-switch
          class="display-btn"
          active-color="#13ce66"
          inactive-color="#e4e4e4"
          v-model="showPassword"
        ></el-switch>
      </section>
      <section class="code-wrapper input-container">
        <input v-model="captchas" type="text" name="code" id="code" placeholder="验证码">
        <div class='code-img'>
          <img :src="captchasCode" alt="验证码">
        </div>
        <div class="code-tips">
          <p>看不清</p>
          <!-- .prevent阻止默认行为 -->
          <a href="" @click.prevent="getCaptchaCode">换一张</a>
        </div>
      </section>
      <section class="tips-wrapper">
        <p>温馨提示:未注册过的账号,登录时将自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </section>
      <input class="submit" type="submit" value="登录" @click.prevent="">
    </form>
    <router-link class="to-forget" to="/forget">重置密码?</router-link>
    <!-- 这里是显示警告信息的组件 -->
    <!-- <Alert></Alert> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import Header from 'components/Header/Header.vue';
import { getCaptchas } from 'store/service';

// 如果要使用 namespace，需要在 module 的store 中设置 namespaced 为 true
// const HomeModule = namespace('Home');

@Component({
  name: 'Login',
  components: {
    Header,
  },
})
export default class Login extends Vue {
  // 初始状态
  public phone = '';
  public password = '';
  public captchas = '';
  public showPassword = false;
  public captchasCode = '';
  public alertMessage = '';

  // Vue 中异步请求可以放 created 或者 mounted 中
  public created() {
    this.getCaptchaCode();
  }

  public async getCaptchaCode() {
    const res = await getCaptchas();
    this.captchasCode = res.code;
  }

  @Watch('phone')
  public onPhoneChanged(phone: string, oldPhone: string) {
    const phoneRegx = /^[0-9]{0,11}$/;
    if (!phoneRegx.test(phone)) {
      this.alertMessage = '请输入手机号';
      this.phone = oldPhone;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/function';
@import '~style/mixin';

.container {
  padding-top: 2.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.input-container{
  height: 1.5rem;
  font-size: 1rem;
  color: $bc;
  padding-left: .5rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
  margin-bottom: .1rem;
  background-color: #fff;
  input {
    font-size: .7rem;
    border: none;
    width: 70%;
  }
  // 取消被选中后的边框
  input:focus {
    outline: none;
  }
}
.password-wrapper, .code-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.code-wrapper {
  font-size: 0.6rem;
  input {
    width: 60%;
  }
  .code-tips {
    width: 2rem;
    margin-left: .5rem;
    a {
      text-decoration: none;
      color: #3b95e9;
    }
  }
}
.code-img {
  position: relative;
  height: 1.5rem;
  width: 4rem;
}
.tips-wrapper {
  color: red;
  margin-top: .5rem;
  font-size: .6rem;
  p {
    margin-bottom: .5rem;
  }
}
.submit {
  background-color: #4cd964;
  color: #fff;
  @extend %btn-basic;
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  border-radius: 3px;
  outline: none;
}
.to-forget {
  margin-top: 2rem;
  font-size: .6rem;
  color: #3b95e9;
  float: right;
  text-decoration: none;
}
</style>

