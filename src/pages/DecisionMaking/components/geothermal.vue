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
  import CesiumModelAjax from './cesiumModelAjax'
  import { postQueryCLQDInfo } from '../../../api/waterResources'
  // faceInformationDialog
  import { mixinCesium } from './../../../mixins/cesium'
  export default {
    mixins: [mixinCesium],
    name: 'Geothermal',
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
          qdlx: '地热类型',
          qsll: '热储厚度',
          sw: '平均深埋',
          phz: '制热面积',
          eh: '制热量',
          rjy: '制冷面积',
          ddl: '制冷量',
          tds: '埋管面积',
          hzd: '平均水深'
        },
        isImg: '1',
        dialogTitle: '数据查看',
        echartsTypeData: {
          startColor: '#522F7E',
          endColor: '#9254DE',
          thisColor: '#BE0DFF',
          echartId: 'echartsBarGeomal',
          // legendData: ['地热泵点数', '最新成交价'],
          legendData: [
            {
              name: '制热面积',
              icon: 'rect'
            },
            {
              name: '地热泵点数'
            // icon: 'rect'
            }
          ],
          isLegend: true,
          lineColor: '#13C2C2',
          titleOne: '制热面积：㎡',
          isTitleOne: true,
          titleTwo: '数量：处',
          isTitleTwo: true
        },
        display1: true,
        display2: true,
        display3: true,
        dataViewLog: false,
        title1: '地热资源数据统计：',
        Total1: '共',
        number1: '323',
        unit1: '处',
        counter: [],
        switchs: false,
        index: '',
        pickPoint: false,
        brightBut: false,
        isFormTable: false,
        text: '地热泵点对比数据',
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
