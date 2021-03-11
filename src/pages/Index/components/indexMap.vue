<template>
  <div id="map" class="map_box" style="width:100%;height:100%;"></div>
</template>

<script>
  import 'ol/ol.css'
  import Map from 'ol/Map'
  import TileLayer from 'ol/layer/Tile'
  // import TileWMS from 'ol/source/TileWMS'
  import View from 'ol/View'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  // import Select from 'ol/interaction/Select'
  import GeoJSON from 'ol/format/GeoJSON'
  // import {Vector as VectorLayer} from 'ol/layer'
  // import DragPan from 'ol/interaction/DragPan'
  import * as olControl from 'ol/control'
  import Style from 'ol/style/Style'
  import Circle from 'ol/style/Circle'
  import Fill from 'ol/style/Fill'
  import XYZ from 'ol/source/XYZ'
  import Stroke from 'ol/style/Stroke'
  import Text from 'ol/style/Text'

  export default {
    name: 'IndexMap',
    data () {
      return {
        // 定义安全区
        wmsSourceSafety: {},
        // 定义基本安全区
        wmsSourceBasicSafety: {},
        // 定义安全较差区
        wmsSourcePoorSafety: {}
      }
    },
    props: ['isActive1', 'isActive2', 'isActive3'],
    watch: {
      isActive1 (val) {
        this.isActive1 = val
        this.wmsSourceSafety.setVisible(val)
      },
      isActive2 (val) {
        this.isActive2 = val
        this.wmsSourceBasicSafety.setVisible(val)
      },
      isActive3 (val) {
        this.isActive3 = val
        this.wmsSourcePoorSafety.setVisible(val)
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        // 底图
        var wmsLayer = new TileLayer({
          source: new XYZ({
            url: 'http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
          // url: 'http://192.168.40.142:8080/geoserver/lqs/wms?service=WMS&version=1.1.0&request=GetMap&layers=lqs%3Alqs_4326_tiles&bbox=410952.7931%2C3343394.2608000003%2C461931.9931%2C3428612.6608&width=459&height=768&srs=EPSG%3A4326&format=application/openlayers'
          }),
          opacity: 0.2
        // style: new Style({
        //   stroke: new Stroke({ // 边界样式
        //     color: '#08C6F4',
        //     width: 3
        //   })
        // })
        })
        // 范围
        var wmsSource = new VectorLayer({
          source: new VectorSource({
            url:
              'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_planningscope&maxFeatures=50&outputFormat=application%2Fjson',
            format: new GeoJSON()
          }),
          style: new Style({
            stroke: new Stroke({
              // 边界样式
              color: '#08C6F4',
              width: 2
            })
          })
        })
        // 区
        var AreaSource = new VectorLayer({
          source: new VectorSource({
            url:
              'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_countyboundary&maxFeatures=50&outputFormat=application%2Fjson',
            format: new GeoJSON()
          }),
          style: function (feature) {
            var style = new Style({
              stroke: new Stroke({
                // 边界样式
                color: '#08C6F4',
                width: 1
              }),
              fill: new Fill({
                // 矢量图层填充颜色，以及透明度
                color: 'rgba(6, 243, 252, 0.2)'
              }),
              text: new Text({
                text: feature.get('名称'),
                font: '15px sans-serif',
                textAlign: 'center',
                textBaseline: 'middle',
                overflow: false, // 超出面的部分不显示
                fill: new Fill({
                  color: '#fff'
                })
              })
            })
            feature.setStyle(style)
          }
        })
        // 安全区
        var wmsSourceSafety = new VectorLayer({
          source: new VectorSource({
            url:
              'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzaq_I&outputFormat=application%2Fjson',
            format: new GeoJSON()
          }),
          opacity: 0.4,
          style: new Style({
            fill: new Fill({
              // 矢量图层填充颜色，以及透明度
              color: 'rgba(6,243,252,0.7)'
            })
          })
        })

        // 基本安全区
        var wmsSourceBasicSafety = new VectorLayer({
          source: new VectorSource({
            url:
              'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzaq_II&outputFormat=application%2Fjson',
            format: new GeoJSON()
          }),
          style: new Style({
            fill: new Fill({
              // 矢量图层填充颜色，以及透明度
              color: 'rgba(252,200,61,0.7)'
            })
          })
        })

        // 安全较差区
        var wmsSourcePoorSafety = new VectorLayer({
          source: new VectorSource({
            url:
              'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzaq_III&outputFormat=application%2Fjson',
            format: new GeoJSON()
          }),
          style: new Style({
            fill: new Fill({
              // 矢量图层填充颜色，以及透明度
              color: 'rgba(232,82,82,0.7)'
            })
          })
        })

        // 乡镇
        var TownshipSource = new VectorLayer({
          source: new VectorSource({
            url:
              'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_townname&maxFeatures=50&outputFormat=application%2Fjson',
            format: new GeoJSON()
          }),
          style: function (feature) {
            var style = new Style({
              image: new Circle({
                radius: 4,
                fill: new Fill({
                  color: 'rgba(255, 255, 255, 0.5)'
                }),
                stroke: new Stroke({
                  color: '#fafafa',
                  width: 1
                })
              }),
              text: new Text({
                text: feature.get('name'),
                font: '12px Microsoft YaHei',
                textAlign: 'right',
                textBaseline: 'middle',
                fill: new Fill({
                  color: 'rgba(250, 250, 250, 0.85)'
                }),
                offsetX: -8,
                placement: 'point', // point 则自动计算面的中心k点然后标注  line 则根据面要素的边进行标注
                overflow: false // 超出面的部分不显示
              })
            })
            feature.setStyle(style)
          }
        })
        // 定义图层
        this.wmsSourceSafety = wmsSourceSafety
        this.wmsSourceBasicSafety = wmsSourceBasicSafety
        this.wmsSourcePoorSafety = wmsSourcePoorSafety
        // // 是否显示图层
        this.wmsSourceSafety.setVisible(this.isActive1)
        this.wmsSourceBasicSafety.setVisible(this.isActive2)
        this.wmsSourcePoorSafety.setVisible(this.isActive3)

        var view = new View({
          zoom: 10.3,
          maxZoom: 15,
          minZoom: 10,
          projection: 'EPSG:4326',
          center: [104.383889, 30.605]
        })
        var map = new Map({
          // 去掉左上角的加减图标
          controls: olControl
            .defaults({ attribution: false, zoom: false, rotate: false })
            .extend([]),
          layers: [wmsLayer, wmsSource, wmsSourceSafety, wmsSourceBasicSafety, wmsSourcePoorSafety, AreaSource, TownshipSource],
          target: 'map',
          view: view
        })
        // setVisible()控制图层显示与隐藏
        wmsSourceSafety.setVisible(this.isActive1)
        wmsSourceBasicSafety.setVisible(this.isActive2)
        wmsSourcePoorSafety.setVisible(this.isActive3)
        // 点击事件
        map.on('singleclick', function (evt) {
          var feature = map.getFeaturesAtPixel(evt.pixel)
          console.log(feature)
          var pixel = map.getEventPixel(evt.originalEvent)
          var featureInfo = map.forEachFeatureAtPixel(pixel, function (
            feature,
            layer
          ) {
            return { feature: feature, layer: layer }
          })
          if (
            featureInfo !== undefined &&
            featureInfo !== null &&
            featureInfo.layer !== null
          ) {
            // featureInfo.feature 打印选择要素
            // featureInfo.layer 打印选择要素所属Layer
            console.log('打印选择要素', featureInfo.feature)
            console.log('打印选择要素所属Layer', featureInfo.layer)
          }
        })
      // 禁止鼠标滚轮
      // map.getView().setMinZoom(9)
      // map.getView().setMaxZoom(9)

      // 禁止鼠标拖动
      // let pan = getPan()
      // false：当前地图不可拖动。true：可拖动
      // pan.setActive(false)

      // function getPan () {
      //   let pan
      //   map.getInteractions().forEach(function (element, index, array) {
      //     if (element instanceof DragPan) {
      //       pan = element
      //     }
      //   })
      //   return pan
      // }
      }
    },
    components: {}
  }
</script>
<style scoped></style>
