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
  export default {
    name: 'CesiumModel',
    data () {
      return {
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
        billboards: {},
        redAll: [],
        isPointLayer: false,
        // url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_qd&outputFormat=application%2Fjson'
        url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_townname&maxFeatures=50&outputFormat=application%2Fjson'
      }
    },
    // props: {
    //   fatherMethod: {
    //     type: Function,
    //     default: null
    //   },
    //   pointLayerIs: {
    //     type: Boolean,
    //     default: false
    //   },
    //   cesiumItem: {
    //     type: String,
    //     default: ''
    //   }
    // },
    props: [
      'fatherMethod',
      'pointLayerIs',
      'cesiumItem'
    ],
    watch: {
      // 使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
      pointLayerIs: function (newVal, oldVal) {
        if (newVal === false) {
          this.billboards.removeAll(this.redAll)
          this.redAll = []
        }
      },
      cesiumItem: function (newVal, oldVal) {
        for (var j = 0; j < this.redAll.length; j++) {
          if (this.redAll[j].index === newVal) {
            this.billboards.remove(this.redAll[j])
            this.redAll.splice(j, 1)
          }
        }
      }
    },
    created () {
    },

    mounted () {
      this.sceneInit()
    },
    methods: {
      sendCounterData (data) {
        // func: 是父组件指定的传数据绑定的函数，data子组件给父组件传递的数据
        this.$emit('func', data)
      },
      // 调用父组件方法 根据index 添加 或者 去重
      thisClick: function (data) {
        this.$parent.thisClick(data)
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
        // if (this.isPointLayer) {
        this.promise = this.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(`${this.url}`))
        var that = this
        this.promise.then(function (dataSource) {
          that.pointLayer = dataSource
          that.viewer.dataSources.add(dataSource)
          var entities = dataSource.entities.values
          // 可对单个实体进行设置
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i]
            // entity.billboard = undefined
            entity.billboard = { // 图标
              image: '/cesiumImg/position_blue.png',
              width: 12,
              height: 24
            }
            entity.index = i
            entity.nameID = entity.id // 给每条线添加一个编号，方便之后对线修改样式
          }
        })
        this.billboards = that.viewer.scene.primitives.add(new Cesium.BillboardCollection())
        this.viewer.flyTo(this.promise)
        // 鼠标事件互动
        // var handler = this.viewer.screenSpaceEventHandler(this.viewer.scene.canvas)// 在屏幕空间发生的事件柄

        var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        handler.setInputAction(function (movement) { // 事件获取点击空间
          var pickedFeature = that.viewer.scene.pick(movement.position) // 获取点击片段
          if (pickedFeature && pickedFeature.id && pickedFeature.id.index) {
            var x = pickedFeature.id._position._value // 获取点击的点坐标
            var pickImg = pickedFeature.id._billboard._image._value // 获取img
            var PropertyBag = pickedFeature.id._properties // 数据存储的位置
            // var PropertyBagNameID = pickedFeature.id.nameID // 数据存储ID
            var PropertyBagIndex = pickedFeature.id.index // 数据下标
            // 判断新建billboards
            if (that.pointLayerIs) { // 判断是否点击 选点对比
              if (that.redAll.length > 4) { // 判断选点是否超过5个
                // this.$message('不可以多余5个')
                // return false
              } else {
                if (pickImg === '/cesiumImg/position_blue.png') {
                  var a = that.billboards.add({
                    position: x,
                    image: '/cesiumImg/position_red.png',
                    width: 12,
                    height: 24,
                    id: PropertyBagIndex,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                  })
                  that.redAll.push(a)
                }
              }
            }
            var arr = Object.keys(pickedFeature.id._properties) // 动态获取数据对象的键
            var obj = {} // 点击获取数据
            for (var i = 0; i < arr.length; i++) {
              if (PropertyBag[arr[i]]._value) { // 判断数据是否包含_value true则提取数据
                obj[[arr[i]]] = PropertyBag[arr[i]]._value
              }
            }
            // 重组数据添加index
            obj.index = PropertyBagIndex
            that.sendCounterData(obj)
          }
          if (pickedFeature && pickedFeature.id.index === undefined) {
            var reda = that.redAll
            var objs = {}
            for (var j = 0; j < reda.length; j++) {
              if (reda[j]._id === pickedFeature.id) {
                that.billboards.remove(that.redAll[j])
                that.redAll.splice(j, 1)
                objs.index = pickedFeature.id
              }
            }
            that.sendCounterData(objs)
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
