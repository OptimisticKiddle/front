const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  publicPath: "./",
 
  outputDir: 'disk',
 
  assetsDir: 'assets',
 
 
  transpileDependencies: true,
 
  // devServer: {
  //   hot: true, //热加载
  //   host: 'localhost',
  //   port: 8080, //端口
  //   https: false, //false关闭https，true为开启
  //   open: true, //自动打开浏览器
  //   proxy: {
  //     '/api': {
  //       target: '/',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/'
  //       }
  //     },
  //   }
  // },
 
  
})