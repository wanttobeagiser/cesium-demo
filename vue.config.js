const CopyWebpackPlugin = require('copy-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const webpack = require('webpack');
const AutoImport = require('unplugin-auto-import/webpack').default;
const Components = require('unplugin-vue-components/webpack').default;
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

// CesiumJS源代码的路径
const cesiumSource = './node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        // 在Cesium中定义一个相对基本路径来加载资源
        CESIUM_BASE_URL: JSON.stringify('./')
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
          { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
          { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
          { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }
        ]
      })
    ],
    resolve: {
      alias: {
        // 添加cesium-navigation的别名
        "cesium-navigation": path.resolve(__dirname, "node_modules/cesium-navigation-es6"),
      },
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
  },

});
