### 1. 项目源码的结构
```
│  App.vue  首页
│  main.ts  入口ts文件
│  shims-tsx.d.ts 让 IDE 认识 .tsx 文件
│  shims-vue.d.ts 让 IDE 认识 .vue 文件
│
├─assets  放静态资源，主要是图片
│      logo.png
│
├─components 组件，多个页面共享的可以复用的部分抽成一个组件
│  └─Header
│          Header.vue
│
├─config  配置
│      env.ts
│
├─router  vue-router 的配置
│      router.ts
│
├─store vuex 相关
│      actions.ts 所有全局状态用到的 action
│      getters.ts 所有全局状态用到的 getter
│      mutation-types.ts 所有（包括全局状态和module状态） mutation-type
│      mutations.ts 所有全局状态用到的 mutation
│      service.ts 所有异步操作
│      state.ts 所有全局状态用到的 state 的初始 state 和 state 的接口定义
│      store.ts 会结合全局状态的 action state 等等和每个 module 的 store 导出一个全局 store
│
├─style
│      mixin.scss 常用的样式 mixin
│
├─utils 工具文件夹
│      http.ts 发请求
│      rem.ts rem布局设置 html font-size
│      storage.ts 操作 localStorage
│
└─views 存放一个个 view，基本是一个路由对应一个 View
    └─Home
            actions.ts 当前 View 用到的 action
            Home.vue 当前 View
            mutation.ts 当前 View 用到的 mutation，mutation-type 是从 src/store/mutation-types 中导入的
            state.ts 当前 View 的局部状态的初始状态和接口定义
            store.ts 导出 module store 对象供 src/store/store.ts 使用
```

### 2. 状态管理
全局的状态（不是某个 View 独有的）在 src/store 中，每个 View 自己的状态都在 View 所在的文件夹中，最后作为一个 module 被 src/store/store.ts 引用。

### 3. 代码编写

#### 3.1 typescript 的注意点
1. 每个 state 文件要定义初始状态（initState）还有状态的接口定义，状态的接口定义包括对应 initState 的根 State（RootState）定义，还包括RootState 的每个字段的接口定义（如果不是基本类型）。这样组件在获取到 State 的某个字段时，就可以直接引用接口定义来作为变量的类型
2. 所有 mutation-type 都放在一个文件夹统一管理
3. 所有异步操作都放在 services 中统一管理（暂时）

#### 3.2 .vue 文件编写
1.  首先把组件或者 View 需要的 prop\data\state\action 等等写好，将组件的逻辑大致写好
2.  写 template，把页面骨架写好
3.  写 style，给骨架应用样式
4.  调试交互逻辑之类的