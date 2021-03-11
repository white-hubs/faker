<template>
<div>
  <div class="cesium">
    <div id="cesiumContainer" style="width: 100%;height: 760px;background-color: rosybrown;"></div>
  </div>
</div>
</template>

<script>
  import * as Cesium from 'cesium/Cesium'

  export default {
    name: 'CesiumModelJson',
    data () {
      return {
        zkList: [],
        promise: {},
        three: {},
        cesium: {},
        attrs: {
          earthAlpha: 1
        },
        viewer: {},
        pointLayer: null,
        geometryArray: [],
        isPointLayer: false,
        redAll: []
      }
    },
    props: [
      'fatherMethod',
      'pointLayerIs',
      'cesiumItem',
      'cesiumData',
      'cesiumName'
    ],
    created () {
    },
    watch: {
      // 使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
      pointLayerIs: function (newVal, oldVal) {
        for (var j = 0; j < this.redAll.length; j++) {
          this.billboards.remove(this.redAll[j])
        }
        this.redAll = []
      },
      cesiumItem: function (newVal, oldVal) {
        for (var j = 0; j < this.redAll.length; j++) {
          if (this.redAll[j]._id === newVal) {
            this.billboards.remove(this.redAll[j])
            this.redAll.splice(j, 1)
          }
        }
      }
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
          // terrainProvider: Cesium.createWorldTerrain()
        })
        // 深度开启或关闭
        this.viewer.scene.globe.depthTestAgainstTerrain = false
        // 设置地图basecolor为透明色
        this.viewer.scene.globe.baseColor = new Cesium.Color(1, 1, 1, 0.5)
        // 循环设置影像的透明度
        // var _mapAlpha = 0.1
        // this.viewer.imageryLayers.alpha = _mapAlpha
        // if (this.viewer.imageryLayers) {
        //   console.info('this.viewer.imageryLayers', this.viewer.imageryLayers)
        //   for (var p = 0; p < this.viewer.imageryLayers.length; p++) {
        //     console.info(this.viewer.imageryLayers[p])
        //     this.viewer.imageryLayers.get(p).alpha = _mapAlpha
        //   }
        // }
        // 刷新全部的影像切片
        this.viewer.scene.globe._surface.invalidateAllTiles()

        // 加载模型
        var scene = this.viewer.scene
        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(104.361367, 30.56905, -5000.0))
        // var model =
        scene.primitives.add(Cesium.Model.fromGltf({
          url: '/models/lqs.gltf', // 模型文件相对路径
          modelMatrix: modelMatrix,
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          scale: 1 // 调整模型在地图中的大小
        }))
        //  this.viewer.zoomTo(model)
        // this.viewer.camera.flyTo({ // 设置视角
        //   destination: Cesium.Cartesian3.fromDegrees(104.361367, 30.56905, 10000.0)
        // })

        this.billboards = this.viewer.scene.primitives.add(new Cesium.BillboardCollection())
        var zkList = this.cesiumData
        var cesiumName = this.cesiumName
        for (var i = 0; i < zkList.length; i++) {
          // jd 经度 wd 纬度
          var jd = zkList[i].jd
          var wd = zkList[i].wd
          var tybh = zkList[i].tybh
          var positions = Cesium.Cartesian3.fromDegrees(jd, wd, 0.0)
          var name = zkList[i][cesiumName]
          //   var a =
          var img = '/cesiumImg/position_blue.png'
          this.billboards.add({
            position: positions,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            image: img,
            width: 12,
            height: 24,
            id: {
              id: tybh,
              index: i,
              positions: positions,
              img: img,
              name: name
            }
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            // disableDepthTestDistance: Number.POSITIVE_INFINITY - 1
          })
        }
        // 定位到范围中心点
        this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(104.361367, 31.48505, 150000),
          // destination: Cesium.Cartesian3.fromDegrees(104.361367, 30.56905),
          orientation: {
            heading: Cesium.Math.toRadians(180), // 1
            pitch: Cesium.Math.toRadians(-60),
            // heading: Cesium.Math.toRadians(170), // 1
            // pitch: Cesium.Math.toRadians(-10),
            roll: 0
          }
        })

        var that = this
        var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        handler.setInputAction(function (movement) { // 事件获取点击空间
          var pickedFeature = that.viewer.scene.pick(movement.position) // 获取点击片段
          console.info('pickedFeature', pickedFeature)
          // 点击点判断
          if (pickedFeature && pickedFeature.id && pickedFeature.id.index) {
            var pickPositions = pickedFeature.id.positions // 点击坐标
            var pickImg = pickedFeature.id.img // 获取点击按钮的图片
            var pickIndex = pickedFeature.id.index // 获取点击按钮的图片
            if (that.pointLayerIs) { // 判断是否点击 选点对比
              that.$parent.faceClick()
              if (that.redAll.length > 4) { // 判断选点是否超过5个
              } else {
                // 判断是否是初始化点
                if (pickImg === '/cesiumImg/position_blue.png') {
                  var a = that.billboards.add({
                    position: pickPositions,
                    image: '/cesiumImg/position_red.png',
                    width: 12,
                    height: 24,
                    id: pickIndex,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                  })
                  // 添加选中点集合
                  that.redAll.push(a)
                }
              }
            }
            that.sendCounterData(pickedFeature.id)
          }
          //   判断点击是否是点击过的点
          if (pickedFeature && pickedFeature.id) {
            if (pickedFeature.id.index === undefined) {
              var reda = that.redAll
              var objs = {}
              for (var j = 0; j < reda.length; j++) {
                if (reda[j].id === pickedFeature.id) {
                  that.billboards.remove(that.redAll[j])
                  that.redAll.splice(j, 1)
                  objs.index = pickedFeature.id
                }
              }
              that.sendCounterData(objs)
            }
          }
          // 点击面
          if (pickedFeature && pickedFeature.mesh) {
            var pickName = pickedFeature.mesh._name
            that.$parent.faceTitleData(pickName)
            console.info('_name', pickedFeature.mesh._name)
          }
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN)// 鼠标移动事件

        // 定义点提示框
        var labelEntity = that.viewer.entities.add({
          label: {
            show: false,
            showBackground: true,
            backgroundColor: new Cesium.Color(0.1, 0.20, 0.55, 0.83),
            font: '14px monospace',
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 左右位置
            verticalOrigin: Cesium.VerticalOrigin.TOP, // 上下位置
            pixelOffset: new Cesium.Cartesian2(0, -35) // 左右上下
          }
        })
        // 定义面提示框
        var labelEntitySurface = that.viewer.entities.add({
          label: {
            show: false,
            showBackground: true,
            backgroundColor: new Cesium.Color(0.1, 0.20, 0.55, 0.83),
            font: '14px monospace',
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 左右位置
            verticalOrigin: Cesium.VerticalOrigin.TOP, // 上下位置
            pixelOffset: new Cesium.Cartesian2(0, -35) // 左右上下
          }
        })
        // 鼠标移入labelEntity提示框
        handler.setInputAction(function (movement) {
          var foundPosition = false
          var foundPositionSurface = false
          if (that.viewer.scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = that.viewer.scene.pick(movement.endPosition)
            console.info('pickedObject', pickedObject)
            // 点移入移出
            if (that.viewer.scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.id !== '') {
              var cartesian = that.viewer.scene.pickPosition(movement.endPosition)
              if (Cesium.defined(pickedObject.id)) {
                if (Cesium.defined(cartesian)) {
                  // var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
                  labelEntity.position = cartesian
                  labelEntity.label.show = true
                  labelEntity.label.text = pickedObject.id.name
                  // labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, -cartographic.height * (that.viewer.scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : -20))
                  labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, -10)
                  foundPosition = true
                }
              }
            }
            // 面移入移出
            if (that.viewer.scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.mesh) {
              var cartesianSurface = that.viewer.scene.pickPosition(movement.endPosition)
              if (Cesium.defined(pickedObject.mesh)) {
                if (Cesium.defined(cartesian)) {
                  // var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
                  labelEntitySurface.position = cartesianSurface
                  labelEntitySurface.label.show = true
                  labelEntitySurface.label.text = pickedObject.mesh._name
                  // labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, -cartographic.height * (that.viewer.scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : -20))
                  labelEntitySurface.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, -10)
                  foundPositionSurface = true
                }
              }
            }
          }
          if (!foundPosition) {
            labelEntity.label.show = false
          }
          if (!foundPositionSurface) {
            labelEntitySurface.label.show = false
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        that.viewer._cesiumWidget._creditContainer.style.display = 'none'
      }
    }
  }
</script>
<style scoped>
.cesium {
  position: absolute;
  height: 50%;
  width: 97%;
  top: 47px;
  left: 1px;
  right: 1px;
  bottom: 0;
  margin: 0 auto;
}
#cesiumContainer {
  height: 50%;
  width: 50;
}
</style>
