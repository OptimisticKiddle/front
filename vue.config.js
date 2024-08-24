const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  publicPath: "./",
 
  outputDir: 'disk',
 
  assetsDir: 'assets',
 
 
  transpileDependencies: true,
 
  devServer: {
    hot: true, //热加载
    host: 'localhost',
    port: 8081, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
    }
  },
 
  
})