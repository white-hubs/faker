import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index'
import Geology from '@/pages/Geology'
import Login from '@/pages/Login'
import DecisionMaking from '@/pages/DecisionMaking'
import Console from '@/pages/Console'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/geology',
      name: 'Geology',
      component: Geology
    },
    {
      path: '/decisionMaking',
      name: 'DecisionMaking',
      component: DecisionMaking,
      // redirect: '/waterResources',
      children: [
        {
          path: '/waterResources',
          name: 'waterResources',
          component: () => import(/* webpackChunkName: "waterResources" */ '../pages/DecisionMaking/components/waterResources.vue')
        },
        {
          path: '/waterSource',
          name: 'waterSource',
          component: () => import(/* webpackChunkName: "waterSource" */ '../pages/DecisionMaking/components/waterSource.vue')
        },
        {
          path: '/geothermal',
          name: 'geothermal',
          component: () => import(/* webpackChunkName: "geothermal" */ '../pages/DecisionMaking/components/geothermal.vue')
        },
        {
          path: '/geological',
          name: 'geological',
          component: () => import(/* webpackChunkName: "geological" */ '../pages/DecisionMaking/components/geological.vue')
        },
        {
          path: '/tourism',
          name: 'tourism',
          component: () => import(/* webpackChunkName: "geological" */ '../pages/DecisionMaking/components/tourism.vue')
        },
        {
          path: '/remains',
          name: 'remains',
          component: () => import(/* webpackChunkName: "geological" */ '../pages/DecisionMaking/components/remains.vue')
        },
        {
          path: '/drilling',
          name: 'drilling',
          component: () => import(/* webpackChunkName: "geological" */ '../pages/DecisionMaking/components/drilling.vue')
        },
        {
          path: '/demonstration',
          name: 'demonstration',
          component: () => import(/* webpackChunkName: "geological" */ '../pages/DecisionMaking/components/demonstration.vue')
        }
      ]
    },
    {
      path: '/console',
      name: 'Consolce',
      component: Console,
      // redirect: '/information',
      children: [
        {
          path: 'camera',
          name: 'camera',
          component: () => import(/* webpackChunkName: "dataoverview" */ '../pages/Console/components/camera.vue')
        },
        {
          path: 'sensor',
          name: 'sensor',
          component: () => import(/* webpackChunkName: "dataoverview" */ '../pages/Console/components/sensor.vue')
        },
        {
          path: '',
          name: 'information',
          component: () => import(/* webpackChunkName: "dataoverview" */ '../pages/Console/components/information.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import(/* webpackChunkName: "dataoverview" */ '../pages/Console/components/user.vue')
        },
        {
          path: 'demonstrations',
          name: 'demonstrations',
          component: () => import(/* webpackChunkName: "dataoverview" */ '../pages/Console/components/demonstrations.vue')
        },
        {
          path: 'logs',
          name: 'logs',
          component: () => import(/* webpackChunkName: "dataoverview" */ '../pages/Console/components/logs.vue')
        },
        {
          path: 'cameraAdd',
          name: 'cameraAdd',
          component: () => import(/* webpackChunkName: "dataoverview" */ '../pages/Console/Addcomponents/cameraAdd.vue')
        }
      ]
    }
  ],
  mode: 'history',
  linkActiveClass: 'router-link-active'
})
