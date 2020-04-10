const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    // 禁用主机检查, 这样可以进行内网穿透
    disableHostCheck: true,
    // historyApiFallback: true,
    // noInfo: true,
    // colors: true,
    // 访问端口
    port: 8190
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
    // performance: {
    //   hints: 'warning',
    //   maxAssetSize: 524288,
    //   maxEntrypointSize: 524288
    // }
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require('postcss-plugin-px2rem')({
      //       // 新版本的是这个值
      //       rootValue: 1200 / 10,
      //       // （布尔值）允许在媒体查询中转换px。
      //       mediaQuery: false,
      //       // 设置要替换的最小像素值(3px会被转rem)。 默认 0
      //       minPixelValue: 3
      //     })
      //   ]
      // }
    },
    requireModuleExtension: true
  }
};
