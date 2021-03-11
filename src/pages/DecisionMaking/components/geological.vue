<template>
  <div style="position: relative; height: 100%;">
    <div class="water_resources_box">
      <ItemBut :display1="display1" :display2="display2" :display3="display3" :action4="pickPoint" />
    </div>
    <data-view-dialog :show="dataViewLog" :title="dialogTitle">
      <DataViewTitle
        :title="title3"
        :num="number3"
        :unit="unit3"
        :total="Total3"
      />
      <div>
        <EchartsBarLabel :echartsTypeData="echartsTypeData2" />
      </div>
      <DataViewTitle
        :title="title1"
        :num="number1"
        :unit="unit1"
        :total="Total1"
      />
      <div>
        <EchartsBar :echartsTypeData="echartsTypeData" />
      </div>
      <DataViewTitle
        :title="title2"
        :num="number2"
        :unit="unit2"
        :total="Total2"
      />
      <div>
        <EchartsBar :echartsTypeData="echartsTypeData1" />
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
    <face-information-dialog :text="facetext" :show="facebox" :isImg="isImg">
      <div class="faceListItem_">
        <FaceListItem
          v-for="(item, index) in faceData"
          :key="index"
          :name="item.name"
          :value="item.value"
        />
      </div>
    </face-information-dialog>
    <CesiumModelAjax
      :pointLayerIs = "pickPoint"
      @func="getCounterData"
      :cesiumName="cesiumName"
      :cesiumItem="cesiumItem"
      :cesiumData="cesiumData"
      v-if="cesiumData.length>0"
      />
  </div>
</template>
<script>
  import ItemBut from './../../../components/itemBut'
  import DataViewDialog from './../../../components/dataViewDialog'
  import DataViewTitle from './../../../components/dataViewTitle'
  // 柱形图
  import EchartsBar from './../components/EchartsBar'
  import PickPointTitle from './../../../components/pickPointTitle'
  import ComparedDataDialog from './../../../components/comparedDataDialog'
  import TableComponent from './../../../components/tableComponent'
  import FaceInformationDialog from './../../../components/faceInformationDialog'
  import FaceListItem from './../../../components/faceListItem'
  import EchartsBarLabel from './../components/echartsBarLabel'

  import CesiumModelAjax from './cesiumModelAjax'
  import { postQueryCLQDInfo } from '../../../api/waterResources'

  import { mixinCesium } from './../../../mixins/cesium'
  // 地质灾害模板
  export default {
    mixins: [mixinCesium],
    name: 'Geological',
    data () {
      return {
        cesiumData: '',
        cesiumName: 'qdmc',
        postQueryInfo: postQueryCLQDInfo,
        pickItem: false,
        counterData: [],
        comparedData: [], // 对比数据
        cesiumItem: '',
        butShow: false,
        // 定义要选择的数据
        tableKeyObj: {
          tybh: '统一编号',
          qdmc: '地点名称',
          qdlx: '灾害类型',
          qsll: '最近灾害时间',
          sw: '灾情等级',
          phz: '险情等级',
          eh: '所属防治区',
          rjy: '水文地质特征'
        },
        isImg: '1',
        dialogTitle: '数据查看',
        echartsTypeData: {
          startColor: '#30499E',
          endColor: '#597EF7',
          thisColor: '#7092FF',
          echartId: 'echartsBarGeocal',
          legendData: [
            {
              name: '面积',
              icon: 'rect'
            },
            {
              name: '灾害点数'
            // icon: 'rect'
            }
          ],
          isLegend: true,
          titleOne: '面积：km2',
          isTitleOne: true,
          titleTwo: '灾害点数：处',
          isTitleTwo: true,
          lineColor: '#BE0DFF'
        },
        echartsTypeData1: {
          startColor: '#017B88',
          endColor: '#0BBAC9',
          thisColor: '#06F3FC',
          echartId: 'echartsBarGeocal2',
          legendData: [
            {
              name: '面积',
              icon: 'rect'
            },
            {
              name: '灾害点数'
            // icon: 'pin'
            }
          ],
          isLegend: true,
          titleOne: '面积：km2',
          isTitleOne: true,
          titleTwo: '灾害点数：处',
          isTitleTwo: true,
          lineColor: '#BE0DFF'
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
        display1: true,
        display2: true,
        display3: true,
        dataViewLog: false,
        title1: '重点防治区分布统计：',
        Total1: '',
        number1: '',
        unit1: '',
        title2: '次重点防治区分布统计：',
        Total2: '',
        number2: '',
        unit2: '',
        title3: '地质灾害统计',
        Total3: '',
        number3: '',
        unit3: '',
        counter: [],
        switchs: false,
        index: '',
        pickPoint: false,
        brightBut: false,
        isFormTable: false,
        text: '地质灾害点对比数据',
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
        ]
      }
    },
    components: {
      ItemBut,
      DataViewDialog,
      DataViewTitle,
      EchartsBar,
      PickPointTitle,
      ComparedDataDialog,
      TableComponent,
      FaceInformationDialog,
      FaceListItem,
      EchartsBarLabel,
      CesiumModelAjax
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
