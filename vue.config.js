module.exports = {
  // 基本路径
  publicPath: '/',
  // 解除eslint限制
  lintOnSave: false,
  // 配置代理
  devServer: {
    host: '127.0.0.1',
    // 设置端口号，默认8080
    port: 9999,
    // 配置自动打开默认浏览器
    open: true,
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
  }
}