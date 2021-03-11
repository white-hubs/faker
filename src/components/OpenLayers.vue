<template>
  <div id="map" class="maps" style="width:100%;height:100%;pointer-events: ;">
    <div class="popup" ref="popup" v-show="currentCoordinate">
      <div class="content">
        <img src="../assets/icons/setposition.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
  import 'ol/ol.css'
  import Map from 'ol/Map'
  import OSM from 'ol/source/OSM'
  import TileLayer from 'ol/layer/Tile'
  import Overlay from 'ol/Overlay'
  // import { toStringHDMS } from 'ol/coordinate'
  // import XYZ from 'ol/source/XYZ'
  import View from 'ol/View'
  import { GEOLOGY_LIST_DATA } from '../constant/index'
  export default {
    data () {
      return {
        mapdata: GEOLOGY_LIST_DATA,
        map: {},
        overlay: null,
        currentCoordinate: null // 弹窗
      }
    },
    props: ['setposition', 'isclick'],
    methods: {
      initMap () {
        console.log('map：+++++++++++++++++++++', this.setposition)
        var wmsLayer = new TileLayer({
          // source: new XYZ({
          //   url: 'http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
          // })
          source: new OSM()
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
          autoPanAnimation: {
            // 底图移动动画
            duration: 250
          }
        })
        this.map = new Map({
          layers: [wmsLayer, this.mapdata.wmsSource, this.mapdata.TownshipSource],
          target: 'map',
          overlays: [this.overlay],
          view: new View({
            projection: 'EPSG:4326',
            center: [104.383889, 30.605],
            zoom: 10.5
          })
        })
        console.log('init finished')
        console.log(this.map)
        if (this.isclick) {
          this.mapClick()
        }
      },
      mapClick () {
        this.map.on('singleclick', evt => {
          console.log('111', evt.coordinate)
          this.currentCoordinate = evt.coordinate // 保存坐标点
          this.postpoint()
          this.timeout(evt.coordinate)
        })
      },
      postpoint () {
        this.$emit('postposition', this.currentCoordinate)
      },
      timeout (positon) {
        setTimeout(() => {
          // 设置弹窗位置
          // 这里要设置定时器, 不然弹窗首次出现, 底图会跑偏
          this.overlay.setPosition(positon)
        }, 0)
      }
    },
    mounted () {
      this.initMap()
      // 要设置currentCoordinate 图标位置，不然会跑偏
      this.currentCoordinate = this.setposition
      this.timeout(this.setposition)
      // this.timeout(this.setposition)
      // console.log(this.setposition)
    },
    watch: {
      currentCoordinate () {},
      setposition (val) {
        console.log('change', val)
        // 要设置currentCoordinate 图标位置，不然会跑偏
        this.currentCoordinate = this.setposition
        this.timeout(this.setposition)
      }
    }
  }
</script>
<style lang="scss" scoped>
.popup {
  position: relative;
  display: flex;
  flex-direction: column;
  // transform: translate(-50%, calc(-100% - 12px));
  /* 弹窗下方的小三角形 */
}
/* 关闭弹窗按钮 */
.content {
  img {
    height: 20px;
  }
}
</style>
