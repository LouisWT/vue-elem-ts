/**
 * 自定义 webpack 配置
 */
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // vue-html-loader and css-loader translates non-root URLs to relative paths.
        // In order to treat it like a module path, prefix it with ~
        // 如果不是 import 方式引入的话(template 或者 style 中引用)，路径别名前面需要加一个 ~
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        config: path.resolve(__dirname, 'src/config'),
        service: path.resolve(__dirname, 'src/service'),
        store: path.resolve(__dirname, 'src/store'),
        utils: path.resolve(__dirname, 'src/utils'),
        views: path.resolve(__dirname, 'src/views'),
        style: path.resolve(__dirname, 'src/style'),
      }
    }
  }
}