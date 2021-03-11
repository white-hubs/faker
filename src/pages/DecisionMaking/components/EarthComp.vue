<template>
<div style="padding: 48px 26px 0 26px;">
  <div class="cesium">
    <div ref="earthContainer" style="width: 100%;height: 760px;"></div>
    <!----====start=测量====--->
    <div style="position: absolute; top:20px;left:12%;">
      <button type="button" style="margin-right:15px;" @click="clickMeasure('1')">{{stickGround}}</button>
      <button type="button" style="margin-right:15px;" @click="clickMeasure('2')">空间距离</button>
      <button type="button" style="margin-right:15px;" @click="clickMeasure('3')">空间面积</button>
      <button type="button" style="margin-right:15px;" @click="clickMeasure('4')">三角量测</button>
      <button type="button" style="margin-right:15px;">加载模型</button>
      <button type="button" style="margin-right:15px;" @click="clickMeasure('5')">清除量测</button>
    </div>
    <!----====end=测量====--->

    <!----====start=地表透明度====--->
    <div class="box" style="position: absolute; left: 35%; top: 0; color: white; background: rgba(0, 0, 0, 0.6); min-width:350px; font-size:24px; font-family: 宋体;">
        <div class="defultbtn" :class="{'btnon':subSurfaceEnabled}"  @click="subSurfaceEnabled = !subSurfaceEnabled">地下模式</div><br/>
        <!-- <span>地表不透明度: {{ surfaceOpacity | numFilter }}</span><br/> -->
        <span>地表不透明度: {{ surfaceOpacity }}</span><br/>
        <span><input type="range" min="0.0" max="1.0" step="0.01" v-model.number="surfaceOpacity"></span><br/>
    </div>
    <!----====end=地表透明度====--->

    <!----====start=等高线====--->
    <div id="toolbar" style="position: absolute; left: 55%; top: 0; color: white; background: rgba(0, 0, 0, 0.6);">
      <div class="demo-container">
        <div>
          <label><input type="checkbox" data-bind="checked: enableContour">是否显示等高线</label>
        </div>
        <div>
          间距
          <input style="width: 136px" type="range" min="1.0" max="500.0" step="1.0" data-bind="value: contourSpacing, valueUpdate: 'input', enable: enableContour">
          <span data-bind="text: contourSpacing"></span>m
        </div>
        <div>
          线宽
          <input style="width: 125px" type="range" min="1.0" max="10.0" step="1.0" data-bind="value: contourWidth, valueUpdate: 'input', enable: enableContour">
          <span data-bind="text: contourWidth"></span>px
        </div>
        <div>
          <button type="button" data-bind="click: changeColor, enable: enableContour">
            线颜色
          </button>
        </div>
      </div>
    </div>
    <!----====end=等高线====--->
  </div>
</div>
</template>

<script>
  import { cesiumMeasure } from './../../../utils/cesium-measure'
  /**
   * @pointLayerIs 判断是否点击数据对比按钮
   * @cesiumItem 页面展示列表点击X掉已选的点
   * @cesiumData 点数据
   * @cesiumName 需要展示的name 的键名 eg:aaaa
   */
  // 1 创建Earth的vue组件
  var EarthComp = {
    data () {
      return {
        _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
        _bgImagery: undefined,
        redAll: [],
        positions: [],
        blueImg: '/cesiumImg/position_blue.png',
        redImg: '/cesiumImg/position_red.png',
        _viewer: undefined,
        _measure: undefined,
        clampToGround: true,
        stickGround: '贴地',
        subSurfaceEnabled: false, // 地下模式
        surfaceOpacity: 0.0 // 地表透明度
      }
    },
    props: [
      'pointLayerIs', // 是否点击选点对比
      'cesiumItem', // 点击取消红点的下标
      'cesiumData', // 获取点数据
      'cesiumName' // 传参展示名字字段
    ],
    // 1.1 资源创建
    mounted () {
      if (typeof XE !== 'undefined') {
        this.createEarth()
      }
    },
    watch: {
      pointLayerIs: function (newVal, oldVal) {
        if (newVal === false) {
          this.deleteRadPoint()
        }
      },
      cesiumItem: function (newVal, oldVal) {
        this.deleteItemRadPoint(newVal)
      }
    },
    methods: {
      createEarth () {
        // 1.1.1 创建地球
        var earth = new XE.Earth(this.$refs.earthContainer)
        // 开启拾取点击操作
        earth.interaction.picking.enabled = true
        // 1.1.2 添加默认地球影像
        earth.sceneTree.root = {
          expand: true,
          title: '预览场景',
          children: [
            {
              ref: 'Imagery',
              czmObject: {
                xbsjType: 'Imagery',
                xbsjGuid: '8985e446-295e-454b-a0bb-0007a2e9d79c',
                name: '谷歌影像',
                xbsjImageryProvider: {
                  XbsjImageryProvider: {
                    url: 'http://mt1.google.cn/vt/lyrs=s,h&gl=cn&x={x}&y={y}&z={z}&s=Gali',
                    srcCoordType: 'GCJ02',
                    rectangle: [
                      -3.141592653589793,
                      -1.5707963267948966,
                      3.141592653589793,
                      1.5707963267948966
                    ]
                  },
                  UrlTemplateImageryProvider: {},
                  WebMapTileServiceImageryProvider: {},
                  createTileMapServiceImageryProvider: {}
                }
              }
            },
            {
              ref: 'terrain',
              czmObject: {
                xbsjType: 'Terrain',
                xbsjGuid: 'd0ab7c08-5a81-4168-b24f-1455396da6b8',
                name: '龙泉山地形服务',
                xbsjTerrainProvider: {
                  type: 'XbsjCesiumTerrainProvider',
                  XbsjEllipsoidTerrainProvider: {},
                  XbsjCesiumTerrainProvider: {
                    url: 'http://localhost:9000/terrain/3751b480393a11ebbeef9729fb7a782f',
                    requestVertexNormals: true,
                    requestWaterMask: true
                  },
                  GoogleEarthEnterpriseTerrainProvider: {}
                },
                rectangle: [
                  1.814958430932292,
                  0.5235173827374833,
                  1.832602206049203,
                  0.5411222091234521
                ]
              }
            }]
        }
        // 获取图层
        var terrain = earth.sceneTree.$refs.terrain.czmObject
        // 点数据
        var spotData = this.cesiumData
        // 点数据整理整理数据
        // var positions = [];
        var entity
        // var temp = true
        var cesiumName = this.cesiumName
        for (var i = 0; i < spotData.length; i++) {
          this.positions.push(
            {
              longitude: spotData[i].jd,
              latitude: spotData[i].wd,
              name: spotData[i][cesiumName],
              index: i,
              img: this.blueImg,
              id: spotData[i].tybh
            })
        }
        // 根据数据创建点位
        this.positions.forEach((element, index) => {
          entity = this.AddPoint(earth, element)
          element._entity = entity
        })
        // 点数据点击事件
        var canvasbox = earth.czm.viewer.canvas
        // 创建定位
        var pickPosition = {}
        // 是否显示名字
        // var dialogModel = this.$refs.dialogModel
        // 点击事件
        canvasbox.onclick = e => {
          pickPosition.x = e.offsetX
          pickPosition.y = e.offsetY
          var picked = earth.czm.viewer.scene.pick(pickPosition)
          if (picked !== undefined && picked.id !== undefined && picked.collection !== undefined) {
            if (this.pointLayerIs) {
              // 获取数据obj
              var obj = {}
              this.positions.forEach(item => {
                // 判断是否点击到点
                if (picked.id === item._entity) {
                  // 判断点击的是蓝点反之红点
                  if (item.img === this.blueImg) {
                    if (this.redAll.length < 5) {
                      item.img = this.redImg
                      item._entity._billboard._image._value = this.redImg
                      this.redAll.push(item.index)
                      obj.index = item.index
                      obj.name = item.name
                      obj.id = item.id
                    }
                  } else {
                    var redAlls = this.redAll
                    for (var j = 0; j < redAlls.length; j++) {
                      if (item.index === redAlls[j]) {
                        item._entity._billboard._image._value = this.blueImg
                        item.img = this.blueImg
                        obj.index = item.index
                        obj.name = item.name
                        obj.id = item.id
                        this.redAll.splice(j, 1)
                      }
                    }
                  }
                }
              })
              this.sendCounterData(obj)
            } else {
              this.sendCounterData()
            }
          }
        }

        // 定义Viewer
        this._viewer = earth.czm.viewer
        // ======start=====等高线==========
        var minHeight = -414.0 // 死海近似高度
        var maxHeight = 8777.0 // 珠穆朗玛峰近似高度
        var contourColor = Cesium.Color.RED.clone()
        var contourUniforms = {}
        var shadingUniforms = {}

        var viewModel = {
          enableContour: false,
          contourSpacing: 20.0,
          contourWidth: 1.0,
          selectedShading: 'elevation',
          changeColor: function () {
            contourUniforms.color = Cesium.Color.fromRandom(
              { alpha: 1.0 },
              contourColor
            )
          }
        }

        Cesium.knockout.track(viewModel)
        // 绑定调用它的dom元素
        var toolbar = document.getElementById('toolbar')
        Cesium.knockout.applyBindings(viewModel, toolbar)

        function updateMaterial () {
          var hasContour = viewModel.enableContour
          var selectedShading = viewModel.selectedShading
          var globe = earth.czm.viewer.scene.globe
          var material
          if (hasContour) {
            material = Cesium.Material.fromType('ElevationContour')
            contourUniforms = material.uniforms
            contourUniforms.width = viewModel.contourWidth
            contourUniforms.spacing = viewModel.contourSpacing
            contourUniforms.color = contourColor
          }
          globe.material = material
        }

        updateMaterial()

        Cesium.knockout
          .getObservable(viewModel, 'enableContour')
          .subscribe(function (newValue) {
            updateMaterial()
          })

        Cesium.knockout
          .getObservable(viewModel, 'contourWidth')
          .subscribe(function (newValue) {
            contourUniforms.width = parseFloat(newValue)
          })

        Cesium.knockout
          .getObservable(viewModel, 'contourSpacing')
          .subscribe(function (newValue) {
            contourUniforms.spacing = parseFloat(newValue)
          })

        Cesium.knockout
          .getObservable(viewModel, 'selectedShading')
          .subscribe(function (value) {
            updateMaterial()
          })
        // =======end======等高线=================

        terrain.flyTo()

        // 定义测量类
        this._measure = new Cesium.Measure(this._viewer)

        // 数据双向绑定 地表透明度
        this._disposers = []
        this._disposers.push(XE.MVVM.bind(this, 'subSurfaceEnabled', earth.terrainEffect, 'subSurfaceEnabled'))
        this._disposers.push(XE.MVVM.bind(this, 'surfaceOpacity', earth.terrainEffect, 'surfaceOpacity'))
        // 等高线

        // 设置初始值
        earth.terrainEffect.subSurfaceEnabled = true
        earth.terrainEffect.surfaceOpacity = 0.0
        this._earth = earth
      },
      sendCounterData (data) {
        // func: 是父组件指定的传数据绑定的函数，data子组件给父组件传递的数据
        this.$emit('func', data)
      },
      // 删除全部红点
      deleteRadPoint () {
        this.positions.forEach(item => {
          item.img = this.blueImg
          item._entity._billboard._image._value = this.blueImg
          this.redAll = []
        })
      },
      // 删除单一点
      deleteItemRadPoint (data) {
        var redAlls = this.redAll
        this.positions.forEach(item => {
          if (item.index === data) {
            item.img = this.blueImg
            item._entity._billboard._image._value = this.blueImg
          }
        })
        for (var j = 0; j < redAlls.length; j++) {
          if (redAlls[j] === data) {
            this.redAll.splice(j, 1)
          }
        }
      },
      // 添加点
      AddPoint (earth, e) {
        var pinBuilder = new Cesium.XbsjPinBuilder()
        const entity = earth.czm.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(e.longitude, e.latitude),
          billboard: {
            image: e.img,
            width: 12,
            height: 24
          }
        })
        return entity
      },
      loadModel () {
        // terrain.flyTo()
      },
      // 测量事件
      clickMeasure (num) {
        if (num === '1') {
          if (this.clampToGround) {
            this.stickGround = '补贴地'
          } else {
            this.stickGround = '贴地'
          }
        }
        switch (num) {
        case '1': this.clampToGround = !this.clampToGround; break
        case '2': this._measure.drawLineMeasureGraphics({ clampToGround: this.clampToGround, callback: () => { } }); break
        case '3': this._measure.drawAreaMeasureGraphics({ clampToGround: this.clampToGround, callback: () => { } }); break
        case '4': this._measure.drawTrianglesMeasureGraphics({ callback: () => { } }); break
        case '5': this._measure._drawLayer.entities.removeAll(); break
        case '加载模型': loadModel(); break
        }
      }
    },
    // 1.2 资源销毁
    beforeDestroy () {
      // vue程序销毁时，需要清理相关资源
      this._earth = this._earth && this._earth.destroy()
    }
  }

  export default EarthComp
</script>
