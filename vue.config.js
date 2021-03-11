const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const cesiumSource = './node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'
// const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      }),
      new CopyWebpackPlugin([
        {
          from: './node_modules/earthsdk/dist/XbsjCesium',
          to: 'js/earthsdk/XbsjCesium',
          toType: 'dir'
        },
        {
          from: './node_modules/earthsdk/dist/XbsjEarth',
          to: 'js/earthsdk/XbsjEarth',
          toType: 'dir'
        }
      ])
    ],
    /* eslint-disable */
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
    /* eslint-enable */
  },
  devServer: {
    port: 12345,
    proxy: {
      '/backstage': {
        target: 'http://192.168.40.131:20000'
        // target: 'http://192.168.40.15:10000'
      }
    }
  }
}
