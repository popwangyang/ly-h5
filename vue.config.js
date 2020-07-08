const GenerateAssetPlugin = require("generate-asset-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const config = require("./src/config/config.js");
let createConfig = function(compilation) {
  return JSON.stringify(config);
};

module.exports = {
  publicPath: "./",
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 14, // 换算的基数
            selectorBlackList: ["weui", "mu"], // 忽略转换正则匹配项
            propList: ["*"]
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader")
      .end();
  },
  configureWebpack: config => {
    let plugins = [
      new GenerateAssetPlugin({
        filename: "config/config.json",
        fn: (compilation, cb) => {
          cb(null, createConfig(compilation));
        }
      })
    ];
    if (process.env.NODE_ENV === "production") {
      plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: true
        })
      );
    }
    return {
      plugins
    };
  }
};
