<template>
  <div class="home">
      <keep-alive>
        <Header :toNum="1"/>
      </keep-alive>
      <div class="home_content">
        <!-- <checkbox-lift/> -->
        <div class="home_check_box">
          <div class="home_check_list">
            <el-tree
              :data="data?data.geoTree:data"
              show-checkbox
              :check-on-click-node= false
              node-key="id"
              ref="tree"
              :render-after-expand= false
              :expand-on-click-node = false
              :props="defaultProps"
              :default-expanded-keys = expanded
              @check-change="handlechek">
                <div slot-scope="{ node, data }" class="fix">
                    <i v-if="data.icon&&data.icon!==''"  class='co-icon-map' :style="{backgroundImage:'url('+data.icon+')'}"></i>
                    <!-- <i :class="data.icon" style="backgroundImage:'url(./../../../assets/icons/waiting.png)"></i> -->
                    <!-- <img src="static/dzxxTree/layer_15.png" alt="" style="width:20px;  "> -->
                    <div style="font-size:14px" class="tree-node">{{node.label}}</div>
                          <!-- <input type="range"  value ="100" min="0" max="100" ref="range" @input="input()"/> -->
                          <el-slider v-show="data.icon||data.id===9 " v-model="data.value" :min="0" :max="100" @input="input(data)" ></el-slider>
                  </div>
            </el-tree>
          </div>
        </div>
        <div class="home_map_box">

          <div class="home_map">
            <mainmask :whitch='towhitch' :isshow='mainmaskshow' :maskdata='maskdata'></mainmask>
               <div id="map" class="map" style="width:100%;height:100%;pointer-events: ;">
                 <div
                    class="popup"
                    ref="popup"
                    v-show="currentCoordinate">
                      <!-- <span class="icon-close" @click="closePopup">x</span> -->
                      <!-- <div class="content">{{currentCoordinate}}</div> -->
                      <div class="header">
                        热储层位详情
                        <span class="icon-close" @click="closePopup">X</span>
                      </div>
                      <div class="body">
                          <div class="top">
                            {{details.name}}
                          </div>
                          <div class="last">
                            <p>Q={{details.q}}</p>
                            <p>Qwh:{{details.qwh}}</p>
                            <p>Qp:{{details.qp}}</p>
                            <p>温度T={{details.temp}}</p>
                            <p>W:{{details.w}}</p>
                          </div>
                      </div>
                  </div>
                </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import 'ol/ol.css'
  // import { toLonLat } from 'ol/proj'
  // import TileWMS from 'ol/source/TileWMS'
  import Map from 'ol/Map'
  // import OSM from 'ol/source/OSM'
  import TileLayer from 'ol/layer/Tile'
  import Overlay from 'ol/Overlay'
  // import { toStringHDMS } from 'ol/coordinate'
  import XYZ from 'ol/source/XYZ'
  import View from 'ol/View'
  import { GEOLOGY_LIST_DATA } from '../../constant/index.js'
  import Header from './../../components/Header'
  import mainmask from './components/mainmask'
  import { postQueryGeologyList, postQueryCameraList, postQuerySensorList, postQueryZKList } from '../../api/geology'

  import Feature from 'ol/Feature'
  import { Vector as VectorLayer } from 'ol/layer'
  // import GeoJSON from 'ol/format/GeoJSON'
  import VectorSource from 'ol/source/Vector'
  import Point from 'ol/geom/Point'
  import { Style, Icon } from 'ol/style'

  // import { isEmpty } from 'ol/extent'
  // import { applyTransform } from 'ol/ex4reuuuuuuotent'
  // import * as olExtent from 'ol/extent'
  // import * as olProj from 'ol/proj'
  export default {
    name: 'Geology',
    data () {
      return {
        value2: 100,
        queryRequest: postQueryGeologyList,
        queryCamera: postQueryCameraList,
        querySensor: postQuerySensorList,
        queryZK: postQueryZKList,
        msg: '地质信息',
        formid: '',
        map: {},
        overlay: null,
        currentCoordinate: null, // 弹窗
        mapdata: GEOLOGY_LIST_DATA,
        data: [],
        details: {},
        maskdata: {},
        towhitch: {
          id: 2
        },
        mainmaskshow: false,
        expanded: [1],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        postdata: {
          page: 0
        },
        cameradata: {},
        cameradatalist: [],
        cameraSource: [],
        sensordata: {},
        sensordatalist: [],
        sensorSource: [],
        query: [1],
        ZKdata: {},
        ZKSource: []
      }
    },
    components: {
      Header,
      mainmask
    // ,
    // CheckboxLift
    },
    methods: {
      input (data) {
        // var value = this.$refs.range
        // console.log(data)
        if (data.id === 13) {
          this.mapdata.RiversSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 12) {
          this.mapdata.LakeSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 11) {
          this.mapdata.BasinSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 9) {
          this.mapdata.AreaSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 15) {
          this.mapdata.ThemeSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 14) {
          this.mapdata.RecreationSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 16) {
          this.mapdata.ReserveSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 17) {
          this.mapdata.BufferSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 18) {
          this.mapdata.MountainSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 24) {
          this.mapdata.PlainRiverSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 25) {
          this.mapdata.DamSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 26) {
          this.mapdata.ValleyRidgeSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 27) {
          this.mapdata.FlatLowHillSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 28) {
          this.mapdata.GentleLowHillSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 29) {
          this.mapdata.ParietalColliculusSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 30) {
          this.mapdata.LowMountainSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 31) {
          this.mapdata.ValleySource.setOpacity(1 - data.value / 100)
        } else if (data.id === 33) {
          this.mapdata.TerrainSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 35) {
          this.mapdata.GeothermalTargetSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 36) {
          this.mapdata.GeothermalForegroundtSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 41) {
          this.mapdata.HigherWaterSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 42) {
          this.mapdata.MediumWaterSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 43) {
          this.mapdata.HydrologyRiversSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 52) {
          this.mapdata.Aswdz_qdSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 44) {
          this.mapdata.Swdz_21Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 45) {
          this.mapdata.Swdz_22Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 46) {
          this.mapdata.Swdz_23Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 47) {
          this.mapdata.Swdz_24Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 48) {
          this.mapdata.Swdz_25Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 49) {
          this.mapdata.Swdz_26Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 50) {
          this.mapdata.Swdz_51Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 53) {
          this.mapdata.Gcdz_41Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 54) {
          this.mapdata.Gcdz_42Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 55) {
          this.mapdata.Gcdz_43Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 56) {
          this.mapdata.Gcdz_44Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 34) {
          this.mapdata.HighAndLowSource.setOpacity(1 - data.value / 100)
        } else if (data.id === 63) {
          this.mapdata.Trzy_511Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 64) {
          this.mapdata.Trzy_512Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 65) {
          this.mapdata.Trzy_513Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 61) {
          this.mapdata.Trzy_521Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 62) {
          this.mapdata.Trzy_522Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 66) {
          this.mapdata.Trzy_531Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 67) {
          this.mapdata.Trzy_532Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 68) {
          this.mapdata.Trzy_541Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 69) {
          this.mapdata.Trzy_542Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 72) {
          this.mapdata.Trzy_611Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 73) {
          this.mapdata.Trzy_612Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 74) {
          this.mapdata.Trzy_613Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 75) {
          this.mapdata.Trzy_621Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 76) {
          this.mapdata.Trzy_622Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 77) {
          this.mapdata.Trzy_623Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 78) {
          this.mapdata.Trzy_624Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 79) {
          this.mapdata.Trzy_625Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 80) {
          this.mapdata.Trzy_626Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 81) {
          this.mapdata.Trzy_627Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 82) {
          this.mapdata.Trzy_628Source.setOpacity(1 - data.value / 100)
        } else if (data.id === 83) {
          this.mapdata.Trzy_629Source.setOpacity(1 - data.value / 100)
        }
      },
      handlechek (test, test1, test2) {
        // console.log('1111', test, test1, test2)
        // if (test1) {
        //   this.fromid = test.id
        //   console.log(this.fromid)
        // }
        // if (test1 && test.dizhi) {
        //   this.maskshow = true
        // } else if (!test1) {
        //   this.maskshow = false
        // }
        if (!test2) {
          if (test1) {
            if (test.id === 13) {
              this.map.addLayer(this.mapdata.RiversSource)
            } else if (test.id === 12) {
              this.map.addLayer(this.mapdata.LakeSource)
            } else if (test.id === 11) {
              this.map.addLayer(this.mapdata.BasinSource)
            } else if (test.id === 9) {
              this.map.addLayer(this.mapdata.AreaSource)
            } else if (test.id === 15) {
              this.map.addLayer(this.mapdata.ThemeSource)
            } else if (test.id === 14) {
              this.map.addLayer(this.mapdata.RecreationSource)
            } else if (test.id === 16) {
              this.map.addLayer(this.mapdata.ReserveSource)
            } else if (test.id === 17) {
              this.map.addLayer(this.mapdata.BufferSource)
            } else if (test.id === 18) {
              this.map.addLayer(this.mapdata.MountainSource)
            } else if (test.id === 24) {
              this.map.addLayer(this.mapdata.PlainRiverSource)
            } else if (test.id === 25) {
              this.map.addLayer(this.mapdata.DamSource)
            } else if (test.id === 26) {
              this.map.addLayer(this.mapdata.ValleyRidgeSource)
            } else if (test.id === 27) {
              this.map.addLayer(this.mapdata.FlatLowHillSource)
            } else if (test.id === 28) {
              this.map.addLayer(this.mapdata.GentleLowHillSource)
            } else if (test.id === 29) {
              this.map.addLayer(this.mapdata.ParietalColliculusSource)
            } else if (test.id === 30) {
              this.map.addLayer(this.mapdata.LowMountainSource)
            } else if (test.id === 31) {
              this.map.addLayer(this.mapdata.ValleySource)
            } else if (test.id === 33) {
              this.map.addLayer(this.mapdata.TerrainSource)
            } else if (test.id === 35) {
              this.map.addLayer(this.mapdata.GeothermalTargetSource)
            } else if (test.id === 36) {
              this.map.addLayer(this.mapdata.GeothermalForegroundtSource)
            } else if (test.id === 41) {
              this.map.addLayer(this.mapdata.HigherWaterSource)
            } else if (test.id === 42) {
              this.map.addLayer(this.mapdata.MediumWaterSource)
            } else if (test.id === 43) {
              this.map.addLayer(this.mapdata.HydrologyRiversSource)
            } else if (test.id === 52) {
              this.map.addLayer(this.mapdata.Aswdz_qdSource)
            } else if (test.id === 44) {
              this.map.addLayer(this.mapdata.Swdz_21Source)
            } else if (test.id === 45) {
              this.map.addLayer(this.mapdata.Swdz_22Source)
            } else if (test.id === 46) {
              this.map.addLayer(this.mapdata.Swdz_23Source)
            } else if (test.id === 47) {
              this.map.addLayer(this.mapdata.Swdz_24Source)
            } else if (test.id === 48) {
              this.map.addLayer(this.mapdata.Swdz_25Source)
            } else if (test.id === 49) {
              this.map.addLayer(this.mapdata.Swdz_26Source)
            } else if (test.id === 50) {
              this.map.addLayer(this.mapdata.Swdz_51Source)
            } else if (test.id === 53) {
              this.map.addLayer(this.mapdata.Gcdz_41Source)
            } else if (test.id === 54) {
              this.map.addLayer(this.mapdata.Gcdz_42Source)
            } else if (test.id === 55) {
              this.map.addLayer(this.mapdata.Gcdz_43Source)
            } else if (test.id === 56) {
              this.map.addLayer(this.mapdata.Gcdz_44Source)
            } else if (test.id === 34) {
              this.map.addLayer(this.mapdata.HighAndLowSource)
            } else if (test.id === 63) {
              this.map.addLayer(this.mapdata.Trzy_511Source)
            } else if (test.id === 64) {
              this.map.addLayer(this.mapdata.Trzy_512Source)
            } else if (test.id === 65) {
              this.map.addLayer(this.mapdata.Trzy_513Source)
            } else if (test.id === 61) {
              this.map.addLayer(this.mapdata.Trzy_521Source)
            } else if (test.id === 62) {
              this.map.addLayer(this.mapdata.Trzy_522Source)
            } else if (test.id === 66) {
              this.map.addLayer(this.mapdata.Trzy_531Source)
            } else if (test.id === 67) {
              this.map.addLayer(this.mapdata.Trzy_532Source)
            } else if (test.id === 68) {
              this.map.addLayer(this.mapdata.Trzy_541Source)
            } else if (test.id === 69) {
              this.map.addLayer(this.mapdata.Trzy_542Source)
            } else if (test.id === 72) {
              this.map.addLayer(this.mapdata.Trzy_611Source)
            } else if (test.id === 73) {
              this.map.addLayer(this.mapdata.Trzy_612Source)
            } else if (test.id === 74) {
              this.map.addLayer(this.mapdata.Trzy_613Source)
            } else if (test.id === 75) {
              this.map.addLayer(this.mapdata.Trzy_621Source)
            } else if (test.id === 76) {
              this.map.addLayer(this.mapdata.Trzy_622Source)
            } else if (test.id === 77) {
              this.map.addLayer(this.mapdata.Trzy_623Source)
            } else if (test.id === 78) {
              this.map.addLayer(this.mapdata.Trzy_624Source)
            } else if (test.id === 79) {
              this.map.addLayer(this.mapdata.Trzy_625Source)
            } else if (test.id === 80) {
              this.map.addLayer(this.mapdata.Trzy_626Source)
            } else if (test.id === 81) {
              this.map.addLayer(this.mapdata.Trzy_627Source)
            } else if (test.id === 82) {
              this.map.addLayer(this.mapdata.Trzy_628Source)
            } else if (test.id === 83) {
              this.map.addLayer(this.mapdata.Trzy_629Source)
            } else if (test.id === 85) {
              this.postcameraposition()
              // console.log(this.cameraSource)
              this.map.addLayer(this.positionLayer)
            } else if (test.id === 84) {
              this.postsensorposition()
              // console.log(this.cameraSource)
              this.map.addLayer(this.sensorpositionLayer)
            } else if (test.id === 86) {
              this.postZKposition()
              // console.log(this.cameraSource)
              this.map.addLayer(this.ZKpositionLayer)
            }
          } else {
            if (test.id === 13) {
              this.map.removeLayer(this.mapdata.RiversSource)
            } else if (test.id === 12) {
              this.map.removeLayer(this.mapdata.LakeSource)
            } else if (test.id === 11) {
              this.map.removeLayer(this.mapdata.BasinSource)
            } else if (test.id === 10) {
            } else if (test.id === 9) {
              this.map.removeLayer(this.mapdata.AreaSource)
            } else if (test.id === 15) {
              this.map.removeLayer(this.mapdata.ThemeSource)
            } else if (test.id === 14) {
              this.map.removeLayer(this.mapdata.RecreationSource)
            } else if (test.id === 16) {
              this.map.removeLayer(this.mapdata.ReserveSource)
            } else if (test.id === 17) {
              this.map.removeLayer(this.mapdata.BufferSource)
            } else if (test.id === 18) {
              this.map.removeLayer(this.mapdata.MountainSource)
            } else if (test.id === 24) {
              this.map.removeLayer(this.mapdata.PlainRiverSource)
            } else if (test.id === 25) {
              this.map.removeLayer(this.mapdata.DamSource)
            } else if (test.id === 26) {
              this.map.removeLayer(this.mapdata.ValleyRidgeSource)
            } else if (test.id === 27) {
              this.map.removeLayer(this.mapdata.FlatLowHillSource)
            } else if (test.id === 28) {
              this.map.removeLayer(this.mapdata.GentleLowHillSource)
            } else if (test.id === 29) {
              this.map.removeLayer(this.mapdata.ParietalColliculusSource)
            } else if (test.id === 30) {
              this.map.removeLayer(this.mapdata.LowMountainSource)
            } else if (test.id === 31) {
              this.map.removeLayer(this.mapdata.ValleySource)
            } else if (test.id === 33) {
              this.map.removeLayer(this.mapdata.TerrainSource)
            } else if (test.id === 35) {
              this.map.removeLayer(this.mapdata.GeothermalTargetSource)
            } else if (test.id === 36) {
              this.map.removeLayer(this.mapdata.GeothermalForegroundtSource)
            } else if (test.id === 41) {
              this.map.removeLayer(this.mapdata.HigherWaterSource)
            } else if (test.id === 42) {
              this.map.removeLayer(this.mapdata.MediumWaterSource)
            } else if (test.id === 43) {
              this.map.removeLayer(this.mapdata.HydrologyRiversSource)
            } else if (test.id === 52) {
              this.map.removeLayer(this.mapdata.Aswdz_qdSource)
            } else if (test.id === 44) {
              this.map.removeLayer(this.mapdata.Swdz_21Source)
            } else if (test.id === 45) {
              this.map.removeLayer(this.mapdata.Swdz_22Source)
            } else if (test.id === 46) {
              this.map.removeLayer(this.mapdata.Swdz_23Source)
            } else if (test.id === 47) {
              this.map.removeLayer(this.mapdata.Swdz_24Source)
            } else if (test.id === 48) {
              this.map.removeLayer(this.mapdata.Swdz_25Source)
            } else if (test.id === 49) {
              this.map.removeLayer(this.mapdata.Swdz_26Source)
            } else if (test.id === 50) {
              this.map.removeLayer(this.mapdata.Swdz_51Source)
            } else if (test.id === 53) {
              this.map.removeLayer(this.mapdata.Gcdz_41Source)
            } else if (test.id === 54) {
              this.map.removeLayer(this.mapdata.Gcdz_42Source)
            } else if (test.id === 55) {
              this.map.removeLayer(this.mapdata.Gcdz_43Source)
            } else if (test.id === 56) {
              this.map.removeLayer(this.mapdata.Gcdz_44Source)
            } else if (test.id === 34) {
              this.map.removeLayer(this.mapdata.HighAndLowSource)
            } else if (test.id === 63) {
              this.map.removeLayer(this.mapdata.Trzy_511Source)
            } else if (test.id === 64) {
              this.map.removeLayer(this.mapdata.Trzy_512Source)
            } else if (test.id === 65) {
              this.map.removeLayer(this.mapdata.Trzy_513Source)
            } else if (test.id === 61) {
              this.map.removeLayer(this.mapdata.Trzy_521Source)
            } else if (test.id === 62) {
              this.map.removeLayer(this.mapdata.Trzy_522Source)
            } else if (test.id === 66) {
              this.map.removeLayer(this.mapdata.Trzy_531Source)
            } else if (test.id === 67) {
              this.map.removeLayer(this.mapdata.Trzy_532Source)
            } else if (test.id === 68) {
              this.map.removeLayer(this.mapdata.Trzy_541Source)
            } else if (test.id === 69) {
              this.map.removeLayer(this.mapdata.Trzy_542Source)
            } else if (test.id === 72) {
              this.mainmaskshow = false
              this.towhitch.id = 0
              this.map.removeLayer(this.mapdata.Trzy_611Source)
            } else if (test.id === 73) {
              this.mainmaskshow = false
              this.towhitch.id = 0
              this.map.removeLayer(this.mapdata.Trzy_612Source)
            } else if (test.id === 74) {
              this.mainmaskshow = false
              this.towhitch.id = 0
              this.map.removeLayer(this.mapdata.Trzy_613Source)
            } else if (test.id === 75) {
              this.map.removeLayer(this.mapdata.Trzy_621Source)
            } else if (test.id === 76) {
              this.map.removeLayer(this.mapdata.Trzy_622Source)
            } else if (test.id === 77) {
              this.map.removeLayer(this.mapdata.Trzy_623Source)
            } else if (test.id === 78) {
              this.map.removeLayer(this.mapdata.Trzy_624Source)
            } else if (test.id === 79) {
              this.map.removeLayer(this.mapdata.Trzy_625Source)
            } else if (test.id === 80) {
              this.map.removeLayer(this.mapdata.Trzy_626Source)
            } else if (test.id === 81) {
              this.map.removeLayer(this.mapdata.Trzy_627Source)
            } else if (test.id === 82) {
              this.map.removeLayer(this.mapdata.Trzy_628Source)
            } else if (test.id === 83) {
              this.map.removeLayer(this.mapdata.Trzy_629Source)
            } else if (test.id === 85) {
              this.mainmaskshow = false
              this.towhitch.id = 0
              this.map.removeLayer(this.positionLayer)
            } else if (test.id === 84) {
              this.map.removeLayer(this.sensorpositionLayer)
              this.mainmaskshow = false
              this.towhitch.id = 0
            } else if (test.id === 86) {
              this.map.removeLayer(this.ZKpositionLayer)
              this.mainmaskshow = false
              this.towhitch.id = 0
            }
          }
        }
      },
      async getTableData () {
        if (!this.queryRequest) {
          console.log(11)
        // nothing todo
        } else {
          try {
            const data = await this.queryRequest()
            this.data = data
            // console.log(this.data)

          // else {5
          //   this.$message.error('暂无权限')
          //   this.$router.push('/index')
          // }
          // console.log('data:+++++++++++++++++++++', data)
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
      initMap () {
        // console.log('map：+++++++++++++++++++++', this.nodeid, this.nodedif)
        var wmsLayer = new TileLayer({
          // source: new TileWMS({
          //   url: 'http://192.168.40.142:8080/geoserver/lqs/wms?service=WMS&version=1.1.0&request=GetMap&layers=lqs%3Achengdu'
          // }),
          source: new XYZ({
            url: 'http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
          // url: 'http://192.168.40.142:8080/geoserver/lqs/wms?service=WMS&version=1.1.0&request=GetMap&layers=lqs%3Alqs_4326_tiles&bbox=410952.7931%2C3343394.2608000003%2C461931.9931%2C3428612.6608&width=459&height=768&srs=EPSG%3A4326&format=application/openlayers'
          }),
          zIndex: 5
        })
        this.overlay = new Overlay({
          element: this.$refs.popup, // 弹窗标签, 在 html 里
          autoPan: true, // 如果弹窗在底图边缘时, 底图会移动
          autoPanAnimation: { // 底图移动动画
            duration: 250
          }
        })
        // 隐藏图层
        // wmsSource.setVisible(false)
        // this.mapdata.BasinSource.setVisible(false)
        // this.mapdata.LakeSource.setVisible(false)
        // this.mapdata.RiversSource.setVisible(false)
        // 删除图层
        // this.overlay = new Overlay({
        //   element: this.$refs.popup, // 弹窗标签, 在 html 里
        //   autoPan: true, // 如果弹窗在底图边缘时, 底图会移动
        //   autoPanAnimation: { // 底图移动动画
        //     duration: 250
        //   }
        // })
        this.map = new Map({
          layers: [wmsLayer, this.mapdata.wmsSource, this.mapdata.TownshipSource
          // 总体规划图
          //  gitrce, this.mapdata.RecreationSource, this.mapdata.ReserveSource, this.mapdata.BufferSource, this.mapdata.MountainSource
          // 地貌图
          // this.mapdata.PlainRiverSource, this.mapdata.DamSource, this.mapdata.ValleyRidgeSource, this.mapdata.FlatLowHillSource, this.mapdata.GentleLowHillSource, this.mapdata.ParietalColliculusSource, this.mapdata.LowMountainSource, this.mapdata.ValleySource
          // 地势图
          //  this.mapdata.TerrainSource, this.mapdata.HighAndLowSource
          // 地热图
          //  this.mapdata.GeothermalTargetSource, this.mapdata.GeothermalForegroundtSource
          // 水文图
          //  this.mapdata.HigherWaterSource, this.mapdata.MediumWaterSource, this.mapdata.Swdz_21Source, this.mapdata.Swdz_22Source, this.mapdata.Swdz_23Source, this.mapdata.Swdz_24Source, this.mapdata.Swdz_25Source, this.mapdata.Swdz_26Source, this.mapdata.Swdz_51Source,
          //  this.mapdata.HydrologyRiversSource, this.mapdata.Aswdz_qdSource
          // 工程地质图
          //  this.mapdata.Gcdz_41Source, this.mapdata.Gcdz_42Source, this.mapdata.Gcdz_43Source, this.mapdata.Gcdz_44Source
          // 土壤资源
          //  this.mapdata.Trzy_511Source, this.mapdata.Trzy_512Source, this.mapdata.Trzy_513Source, this.mapdata.Trzy_521Source, this.mapdata.Trzy_522Source, this.mapdata.Trzy_531Source, this.mapdata.Trzy_532Source, this.mapdata.Trzy_541Source, this.mapdata.Trzy_542Source
          //  地质灾害图
          //  this.mapdata.Trzy_611Source, this.mapdata.Trzy_612Source, this.mapdata.Trzy_613Source,
          //  this.mapdata.Trzy_621Source, this.mapdata.Trzy_622Source, this.mapdata.Trzy_623Source, this.mapdata.Trzy_624Source, this.mapdata.Trzy_625Source, this.mapdata.Trzy_626Source, this.mapdata.Trzy_627Source, this.mapdata.Trzy_628Source, this.mapdata.Trzy_629Source
          ],
          target: 'map',
          overlays: [this.overlay],
          view: new View({
            projection: 'EPSG:4326',
            center: [104.383889, 30.605000],
            zoom: 10.5,
            extent: [102.77777, 29.99999, 105.77777, 31.22222]
            // transformFn: [104.383889, 30.605000, 104.383889, 30.605000]
            // extent: [104.383889]
          // maxZoom: 10.5,
          // minZoom: 10.5
          })
        })
        // this.map.removeLayer(this.mapdata.wmsSource)
        console.log('init finished')
        console.log(this.map)
        this.mapClick()
        // this.map.added(e){
        //   console.log(e)
        // }
        // this.map.added(evt => {
        //   console.log(evt)
        // })
        // this.map.layers.on('added', function (e) {
        //   console.log(e)
        // })
      },
      mapClick () { // 地图点击事件
        // 通过 map.on() 监听, singleclick 是单击的意思. 也可以用 click 代替 singleclick.
        this.map.on('singleclick', evt => {
          var feature = this.map.getFeaturesAtPixel(evt.pixel)
          console.log(feature)
          if (feature[0]) {
            const coordinate = evt.coordinate // 获取坐标
            // const hdms = toStringHDMS(toLonLat(coordinate)) // 转换坐标格式
            this.currentCoordinate = coordinate // 保存坐标点
            if (feature[0].values_.q) {
              this.details = feature[0].values_
              setTimeout(() => {
                // 设置弹窗位置
                // 这里要设置定时器, 不然弹窗首次出现, 底图会跑偏
                this.overlay.setPosition(coordinate)
              }, 0)
            } else if (feature[0].values_.id === 'camera') {
              this.mainmaskshow = true
              this.towhitch.id = 85
              console.log(feature[0].values_.data)
              this.maskdata = feature[0].values_.data
            } else if (feature[0].values_.id === 'sensor') {
              this.mainmaskshow = true
              this.towhitch.id = 84
              console.log(feature[0].values_.data)
              this.maskdata = feature[0].values_.data
            } else if (feature[0].values_.id === 'zk') {
              this.mainmaskshow = true
              this.towhitch.id = 86
              console.log(feature[0].values_.data)
              this.maskdata = feature[0].values_.data
            } else if (feature[0].values_.LX === '崩塌') {
              this.mainmaskshow = true
              this.towhitch.id = 72
              console.log(feature[0].values_)
              this.maskdata = feature[0].values_
            } else if (feature[0].values_.LX === '不稳定斜坡') {
              this.mainmaskshow = true
              this.towhitch.id = 73
              console.log(feature[0].values_)
              this.maskdata = feature[0].values_
            } else if (feature[0].values_.LX === '滑坡') {
              this.mainmaskshow = true
              this.towhitch.id = 74
              console.log(feature[0].values_)
              this.maskdata = feature[0].values_
            }
          } else {
            this.closePopup()
            console.log(34343)
          }
          // this.positionIcon(evt.coordinate)
        })
      },
      closePopup () {
        // 把弹窗位置设置为 undefined, 并清空坐标数据
        this.overlay.setPosition(undefined)
        this.currentCoordinate = null
      },
      positionIcon (obj) {
        // console.log('positionIcon', center)
        var iconFeature = new Feature({
          geometry: new Point([obj.lng, obj.lat]),
          data: obj,
          id: 'camera'
        })
        var iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 20],
            scale: 1,
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '/static/geologyIcon/sxt_map.png'
          })
        })
        iconFeature.setStyle(iconStyle)
        this.cameraSource.push(iconFeature)

        // this.map.addLayer(this.positionLayer)
        // this.positionLayer.setPosition(center)
      },
      sensorpositionIcon (obj) {
        // console.log('positionIcon', center)
        var iconFeature = new Feature({
          geometry: new Point([obj.lng, obj.lat]),
          data: obj,
          id: 'sensor'
        })
        var iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 20],
            scale: 1,
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '/static/geologyIcon/cgq_map.png'
          })
        })
        iconFeature.setStyle(iconStyle)
        this.sensorSource.push(iconFeature)

        // this.map.addLayer(this.positionLayer)
        // this.positionLayer.setPosition(center)
      },
      ZKpositionIcon (obj) {
        // console.log('positionIcon', center)
        var iconFeature = new Feature({
          geometry: new Point([obj.jd, obj.wd]),
          data: obj,
          id: 'zk'
        })
        var iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 20],
            scale: 1,
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '/static/geologyIcon/zk_map.png'
          })
        })
        iconFeature.setStyle(iconStyle)
        this.ZKSource.push(iconFeature)

        // this.map.addLayer(this.positionLayer)
        // this.positionLayer.setPosition(center)
      },
      async getCamreaTableData () {
        try {
          const data = this.postdata
          const tableData = await this.queryCamera(data)
          this.cameradata = tableData.cameraList
          // this.total = tableData.total
          // this.getcameradata()
          // console.log('camera:', tableData)
        } catch (err) {
        }
      },
      async getSensorTableData () {
        try {
          const data = this.postdata
          const tableData = await this.querySensor(data)
          this.sensordata = tableData.sensorList
          // this.total = tableData.total
          // this.getsensordata()
          // console.log('sensor', tableData)
        } catch (err) {
        }
      },
      async getZKTableData () {
        try {
          const data = this.postdata
          const tableData = await this.queryZK(data)
          this.ZKdata = tableData.zkList
          // this.total = tableData.total
          // this.getsensordata()
          console.log('sensor', this.ZKdata)
        } catch (err) {
          console.log(err)
        }
      },
      postcameraposition () {
        for (let i = 0; i < this.cameradata.length; i++) {
          this.positionIcon(this.cameradata[i])
        }
        var vectorSource = new VectorSource({
          features: this.cameraSource
        })
        this.positionLayer = new VectorLayer({
          zIndex: 15,
          source: vectorSource
        })
      },
      postsensorposition () {
        for (let i = 0; i < this.sensordata.length; i++) {
          this.sensorpositionIcon(this.sensordata[i])
        }
        var vectorSource1 = new VectorSource({
          features: this.sensorSource
        })
        this.sensorpositionLayer = new VectorLayer({
          zIndex: 15,
          source: vectorSource1
        })
      },
      postZKposition () {
        for (let i = 0; i < this.ZKdata.length; i++) {
          this.ZKpositionIcon(this.ZKdata[i])
        }
        var vectorSource2 = new VectorSource({
          features: this.ZKSource
        })
        this.ZKpositionLayer = new VectorLayer({
          zIndex: 15,
          source: vectorSource2
        })
      },
      setquery () {
        if (this.$route.query.id) {
          // this.query.push(this.$route.query.id)
          this.query = [this.$route.query.id]
          this.expanded = [this.$route.query.id]
          console.log('++++++++++++++')
        }
        this.$refs.tree.setCheckedKeys(this.query, false)
      }
    },
    async mounted () {
      this.initMap()
      await this.getTableData()
      this.setquery()
      this.getCamreaTableData()
      this.getSensorTableData()
      this.getZKTableData()
      console.log(this.$route.query.id)
      // console.log('$router:', this.$router)
    },
    updated () {
      // this.$refs.tree.setCheckedNodes([2], false)
    }
  // watch: {
  //   map: {
  //     handler: function (val, oldval) {
  //       console.log('修改后', val, '修改前', oldval)
  //       // console.log(this.map)
  //     }
  //   }
  // }
  }

</script>
<style lang="scss" scoped>
  .popup {
    min-width: 280px;
    position: relative;
    background: #fff;
    // padding: 8px 16px;
    display: flex;
    flex-direction: column;
    // line-height: 60px;
    // left: -50%;
    // top: -50%;
    // transform: translate(-50%, calc(-100% - 12px));
    /* 弹窗下方的小三角形 */
    &::after {
      display: block;
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      border: 12px solid transparent;
      border-left-color: #fff;
      right: -35px;
      top: 55%;
      transform: translateX(-50%);
    }
  }
  /* 关闭弹窗按钮 */
  // .icon-close {
  //   cursor: pointer;
  //   align-self: flex-end;
  //   margin-bottom: 10px;
  // }
  .body{
    height: 160px;
    background-color: #fff;
    padding: 10px 20px;
    text-align: left;
    .top{
    // height: 40px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    font-family: Microsoft YaHei;
    color: #222;
    // background-color: red;
    }
    .last{
      margin-top: 10px;
      font-size: 14px;
      color: #555;
      line-height: 20px;
      height: 110px;
      // background-color: black;
      p{
        height: 22px;
        line-height: 22px;
      }
    }
  }
  .header{
    height: 30px;
    background-color: #004070;
    font-size: 14px;
    line-height: 30px;
    text-indent: 20px;
    text-align: left;
    color: white;
      .icon-close {
        cursor: pointer;
        float: right;
        margin-right: 10px;
        color: white;
      }
  }

</style>
