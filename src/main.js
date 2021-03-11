//  The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import echarts from 'echarts'
import store from './store/store'
import './style/index.scss'
import widget from 'cesium/Widgets/widgets.css'

// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.config.productionTip = false
// new Vue({
//   el: '#app',
//   router,
//   store,
//   widget,
//   components: { App },
//   template: '<App/>'
// })
/* eslint-disable no-new */
// 添加 XbsjEarth
function startup () {
  new Vue({
    el: '#app',
    router,
    store,
    widget,
    components: { App },
    template: '<App/>'
  })
}

// 修改后的代码
// function startup () {
//   new Vue({
//     render: h => h(App)
//   }).$mount('#app')
// }

// // 1 XE.ready()会加载Cesium.js等其他资源，注意ready()返回一个Promise对象。
XE.ready().then(startup)
