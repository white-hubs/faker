<template>
  <div id="map" class="map" style="width:100%;height:100%;pointer-events: ;">
    <div
      class="popup"
      ref="popup"
      v-show="currentCoordinate">
      <span class="icon-close" @click="closePopup">x</span>
      <div class="content">{{currentCoordinate}}</div>
    </div>
  </div>
</template>
<script>
  import 'ol/ol.css'
  import Map from 'ol/Map'
  // import OSM from 'ol/source/OSM'
  import TileLayer from 'ol/layer/Tile'
  import Overlay from 'ol/Overlay'
  import { toStringHDMS } from 'ol/coordinate'
  import XYZ from 'ol/source/XYZ'
  import View from 'ol/View'
  import { GEOLOGY_LIST_DATA } from '../../../constant/index.js'

  export default {
    data () {
      return {
        map: {},
        overlay: null,
        currentCoordinate: null, // 弹窗
        mapdata: GEOLOGY_LIST_DATA
      }
    },
    props: ['nodeid', 'nodedif'],
    methods: {
      initMap () {
        console.log('map：+++++++++++++++++++++', this.nodeid, this.nodedif)
        var wmsLayer = new TileLayer({
          source: new XYZ({
            url: 'http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
          })
        })
        // 隐藏图层
        // wmsSource.setVisible(false)
        // this.mapdata.BasinSource.setVisible(false)
        // this.mapdata.LakeSource.setVisible(false)
        // this.mapdata.RiversSource.setVisible(false)
        // 删除图层
        this.overlay = new Overlay({
          element: this.$refs.popup, // 弹窗标签, 在 html 里
          autoPan: true, // 如果弹窗在底图边缘时, 底图会移动
          autoPanAnimation: { // 底图移动动画
            duration: 250
          }
        })
        this.map = new Map({
          layers: [wmsLayer, this.mapdata.wmsSource, this.mapdata.BasinSource, this.mapdata.LakeSource, this.mapdata.RiversSource],
          target: 'map',
          overlays: [this.overlay],
          view: new View({
            projection: 'EPSG:4326',
            center: [104.383889, 30.605000],
            zoom: 10.5,
            maxZoom: 10.5,
            minZoom: 10.5
          })
        })
        this.map.removeLayer(this.mapdata.wmsSource)
        console.log('init finished')
        console.log(this.map)
        this.mapClick(this.mapdata.wmsSource)
      },
      mapClick (source) {
        this.map.on('singleclick', evt => {
          console.log(evt.coordinate)
          const coordinate = evt.coordinate // 获取坐标
          const hdms = toStringHDMS(coordinate) // 转换坐标格式
          console.log(coordinate)
          this.currentCoordinate = hdms // 保存坐标点
          setTimeout(() => {
            // 设置弹窗位置
            // 这里要设置定时器, 不然弹窗首次出现, 底图会跑偏
            this.overlay.setPosition(coordinate)
          }, 0)
          // this.map.removeLayer(source)
          this.map.addLayer(source)
        })
      },
      closePopup () {
        // 把弹窗位置设置为 undefined, 并清空坐标数据
        this.overlay.setPosition(undefined)
        this.currentCoordinate = null
        this.map.removeLayer(this.mapdata.wmsSource)
      }
    },
    mounted () {
      this.initMap()
    }
  }
</script>
<style lang="scss" scoped>
  .popup {
    min-width: 280px;
    position: relative;
    background: #fff;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, calc(-100% - 12px));
    /* 弹窗下方的小三角形 */
    &::after {
      display: block;
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      border: 12px solid transparent;
      border-top-color: #fff;
      bottom: -23px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  /* 关闭弹窗按钮 */
  .icon-close {
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 10px;
  }
</style>
