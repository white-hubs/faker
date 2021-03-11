<template>
  <div style="position: relative; height: 100%;">
    <div class="water_resources_box">
      <ItemBut :display1="display1" :display2="display2" :display3="display3" :action4="pickPoint"/>
    </div>
    <data-view-dialog :show="dataViewLog" :title="dialogTitle">
      <DataViewTitle
        :title="title1"
        :num="number1"
        :unit="unit1"
        :total="Total1"
      />
      <div>
        <EchartsBarLabelTwo :echartsTypeData="echartsTypeData2" />
      </div>
      <DataViewTitle
        :title="title2"
        :num="number2"
        :unit="unit2"
        :total="Total2"
      />
      <div>
        <EchartsBar :echartsTypeData="echartsTypeData" />
      </div>
    </data-view-dialog>
    <div class="pick_point_box" v-show="pickItem">
      <div class="pick_point_center">
        <div v-for="(item, index) in counterData" :key="index">
          <PickPointTitle :name="item.name" :item="item"/>
        </div>
        <button
        class="startBut brightBut"
        @click="formTable"
        v-show="butShow"
      >
        开始对比
      </button>
      <button class="endBut" @click="endFormTable" v-show="butShow">结束对比</button>
      </div>
    </div>
    <compared-data-dialog :text="text" :show="isFormTable">
      <TableComponent :tableData="comparedData" v-if="comparedData.length>0"/>
    </compared-data-dialog>
    <!-- <button @click="faceClick">地质面</button> -->
    <!-- <face-information-dialog :text="facetext" :show="facebox" :isImg="isImg">
      <div class="faceListItem_">
        <FaceListItem
          v-for="(item, index) in faceData"
          :key="index"
          :name="item.name"
          :value="item.value"
        />
      </div>
    </face-information-dialog> -->
    <drawer :isImg="isImg" :text="facetext" :show="facebox" :isshow="isshow">
      <div class="faceListItem_">
        <FaceListItem
          v-for="(item, index) in faceData"
          :key="index"
          :name="item.name"
          :value="item.value"
        />
      </div>
    </drawer>
    <EarthComp
    :pointLayerIs = "pickPoint"
      @func="getCounterData"
      :cesiumName="cesiumName"
      :cesiumItem="cesiumItem"
      :cesiumData="cesiumData"
      v-if="cesiumData.length>0"
    />
    <!-- <earth-comp></earth-comp> -->
    <!-- <CesiumModelAjax
      :pointLayerIs = "pickPoint"
      @func="getCounterData"
      :cesiumName="cesiumName"
      :cesiumItem="cesiumItem"
      :cesiumData="cesiumData"
      v-if="cesiumData.length>0"
      /> -->
  </div>
</template>
<script>
  import ItemBut from './../../../components/itemBut'
  import DataViewDialog from './../../../components/dataViewDialog'
  import DataViewTitle from './../../../components/dataViewTitle'
  // 折线图
  // import LineChart from './../components/lineChart'
  // 柱形图
  import EchartsBar from './../components/EchartsBar'
  import PickPointTitle from './../../../components/pickPointTitle'
  import ComparedDataDialog from './../../../components/comparedDataDialog'
  import TableComponent from './../../../components/tableComponent'
  // import FaceInformationDialog from './../../../components/faceInformationDialog'
  import FaceListItem from './../../../components/faceListItem'
  // import CesiumModelAjax from './cesiumModelAjax'
  import EchartsBarLabelTwo from './../components/echartsBarLabelTwo'
  import Drawer from './../../../components/drawer'
  import { postQueryCLQDInfo } from '../../../api/waterResources'

  import { mixinCesium } from './../../../mixins/cesium'

  import EarthComp from './EarthComp'
  // faceInformationDialog
  export default {
    mixins: [mixinCesium],
    name: 'waterResources',
    data () {
      return {
        isshow: true,
        // 定义要选择的数据
        tableKeyObj: {
          tybh: '统一编号',
          qdmc: '泉点名称',
          qdlx: '泉点类型',
          qsll: '泉点流量',
          sw: '水温',
          phz: 'PH值',
          eh: 'EH',
          rjy: '溶解氧',
          ddl: '电导率',
          tds: 'TDS',
          hzd: '浑浊度'
        },
        echartsTypeData2: {
          startColor: '#017B88',
          endColor: '#0BBAC9',
          thisColor: '#08C6F4',
          echartId: 'echartsBarGeocal1',
          legendData: ['面积', '灾害点数'],
          isLegend: true,
          titleOne: '面积：km2',
          isTitleOne: true,
          titleTwo: '灾害点数：处',
          isTitleTwo: true
        },
        cesiumData: '',
        cesiumName: 'qdmc',
        postQueryInfo: postQueryCLQDInfo,
        isImg: '1',
        pickItem: false,
        butShow: false,
        dialogTitle: '数据查看',
        echartsTypeData: {
          startColor: '#30499E',
          endColor: '#597EF7',
          thisColor: '#7092FF',
          echartId: 'echartsBarPoint',
          legendData: ['', ''],
          isLegend: false,
          titleOne: '数量：处',
          isTitleOne: true,
          titleTwo: '',
          isTitleTwo: false,
          lineColor: ''
        },
        display1: true,
        display2: true,
        display3: true,
        dataViewLog: false,
        title1: '泉点类型数据统计：',
        Total1: '共',
        number1: '302',
        unit1: '处',
        title2: '泉点开发模式统计：',
        Total2: '',
        number2: '',
        unit2: '',
        counter: [],
        switchs: false,
        index: '',
        pickPoint: false,
        brightBut: false,
        isFormTable: false,
        text: '泉点对比数据',
        facetext: '地质层名称地质层名称',
        facebox: false,
        faceData: [
          {
            name: '钻孔类型',
            value: '钻孔类型钻孔'
          },
          {
            name: '钻孔深度',
            value: '1000m'
          },
          {
            name: '层顶埋深',
            value: '1000m'
          },
          {
            name: '层底埋深',
            value: '1000m'
          },
          {
            name: '岩土体类型',
            value: '泥质粉砂岩'
          },
          {
            name: '钻孔深度',
            value: '1000m'
          },
          {
            name: '层顶埋深',
            value: '1000m'
          },
          {
            name: '层底埋深',
            value: '1000m'
          },
          {
            name: '岩土体类型',
            value: '泥质粉砂岩'
          }
        ],
        counterData: [],
        cesiumItem: '',
        comparedData: []// 对比数据
      }
    },
    components: {
      ItemBut,
      DataViewDialog,
      DataViewTitle,
      // LineChart,
      EchartsBar,
      PickPointTitle,
      ComparedDataDialog,
      TableComponent,
      // FaceInformationDialog,
      FaceListItem,
      EchartsBarLabelTwo,
      // CesiumModelAjax,
      EarthComp,
      Drawer
    },
    watch: {
      // 使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
      pickPoint: function (newVal, oldVal) {
        if (newVal === false) {
          this.counterData = []
          this.pickItem = false
        }
      }
    },
    mounted () {
      //   this.sceneInit()
      this.getInfo()
    },
    methods: {
      async getInfo () {
        this.ZKdata = {
          page: 0,
          size: 0
        }
        if (!this.postQueryInfo) {
          console.log(11)
        // nothing todo
        } else {
          try {
            const data = await this.postQueryInfo(this.ZKdata)
            this.cesiumData = data.clqdList
            // this.sceneInit()
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
      }

    }
  }
</script>
