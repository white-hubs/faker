<template>
<div>
  <div class="cesium">
    <div id="cesiumContainer" style="width: 100%;height: 740px;background-color: rosybrown;"></div>
  </div>
</div>
</template>

<script>
  // import Cesium from 'cesium/Cesium'
  import * as Cesium from 'cesium/Cesium'
  import { postQueryZKInfo } from '../../../api/drilling'
  export default {
    name: 'CesiumModelJson',
    data () {
      return {
        zkList: [],
        postQueryZKInfo: postQueryZKInfo,
        promise: {},
        three: {},
        cesium: {},
        attrs: {
          earthAlpha: 1
        },
        viewer: {},
        pointLayer: null,
        // controls: null,
        geometryArray: [],
        isPointLayer: false
      }
    },
    props: {
      fatherMethod: {
        type: Function,
        default: null
      }
    },
    created () {
    },

    mounted () {
      //   this.sceneInit()
      this.getZKInfo()
    },
    methods: {
      async getZKInfo () {
        this.ZKdata = {
          page: 0,
          size: 0
        }
        if (!this.postQueryZKInfo) {
          console.log(11)
        // nothing todo
        } else {
          try {
            const data = await this.postQueryZKInfo(this.ZKdata)
            this.zkList = data.zkList
            this.sceneInit()
            // this.getZKInfo()
          } catch (err) {
            console.log('errrrr++++++++', err)
            if (err === 20003) {
              this.$message.error('登录过期')
              window.sessionStorage.token = ''
              this.$router.push('/')
            } else if (err === 20004) {
              this.$message.error('暂无权限')
              this.$router.push('/index')
            }
          }
        }
      },
      sendCounterData (data) {
        // func: 是父组件指定的传数据绑定的函数，data子组件给父组件传递的数据
        this.$emit('func', data)
      },
      sceneInit: function () {
        Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTkzY2NkYy1jYzFjLTQzNjUtYjM0My00YmFkMDI0ZTkzZjkiLCJpZCI6OTA5OCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MzQ4Mzc0OX0.8Me5DGjdfusz4EnslPSkmPyqFIz8tY4SZz5kBNEXUew'
        this.viewer = new Cesium.Viewer('cesiumContainer', {
          infoBox: false,
          selectionIndicator: false,
          shadows: true,
          shouldAnimate: true,
          animation: false, // 是否显示动画控件
          baseLayerPicker: false, // 是否显示图层选择控件
          geocoder: false, // 是否显示地名查找控件
          timeline: false, // 是否显示时间线控件
          sceneModePicker: false, // 是否显示投影方式控件
          navigationHelpButton: false, // 是否显示帮助信息控件
          baselLayerPicker: false,
          fullscreenButton: false, // 是否显示全屏按钮
          homeButton: false
        })
        var zkList = this.zkList
        this.billboards = this.viewer.scene.primitives.add(new Cesium.BillboardCollection())
        for (var i = 0; i < zkList.length; i++) {
          var jd = zkList[i].jd
          var wd = zkList[i].wd
          var zkbm = zkList[i].zkbm
          var positions = Cesium.Cartesian3.fromDegrees(jd, wd)
          var img = '/cesiumImg/position_blue.png'
          this.billboards.add({
            position: positions,
            image: img,
            width: 12,
            height: 24,
            id: zkbm
          })
        }
        this.viewer.camera.flyTo({ // 定位到范围中心点
          destination: Cesium.Cartesian3.fromDegrees(104.361367, 30.56905, 180000),
          orientation: {
            heading: Cesium.Math.toRadians(180), // 1
            pitch: Cesium.Math.toRadians(-90),
            roll: 0
          }
        })

        var handler = this.viewer.screenSpaceEventHandler// 在屏幕空间发生的事件柄
        var that = this
        handler.setInputAction(function (movement) { // 事件获取点击空间
          var pickedFeature = that.viewer.scene.pick(movement.position) // 获取点击片段
          if (pickedFeature.id !== 'undefined') { // 判断是否点击到数据
            that.sendCounterData(pickedFeature.id)
          }
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN)// 鼠标移动事件
        this.viewer._cesiumWidget._creditContainer.style.display = 'none'
      }
    }
  }
</script>
<style scoped>
.cesium {
  position: absolute;
  height: 50%;
  width: 96%;
  top: 60px;
  left: 15px;
  right: 15px;
  bottom: 0;
  margin: 0 auto;
}
#cesiumContainer {
  height: 50%;
  width: 50;
  /* position: absolute;
  top:0; */
}
</style>
