<template>
  <div style="position: relative; height: 100%;">
    <div class="water_resources_box">
      <ItemBut :display1="display1" :display2="display2" :display3="display3" :action4="pickPoint"/>
    </div>
    <view-dialog-donut :show="dataViewLog" :title="dataTitleDialog">
      <DonutChart />
    </view-dialog-donut>
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
    <button></button>
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
  import ViewDialogDonut from './../../../components/viewDialogDonut'
  // 柱形图
  import DonutChart from './../components/donutChart'
  import PickPointTitle from './../../../components/pickPointTitle'
  import ComparedDataDialog from './../../../components/comparedDataDialog'
  import TableComponent from './../../../components/tableComponent'
  import FaceInformationDialog from './../../../components/faceInformationDialog'
  import FaceListItem from './../../../components/faceListItem'

  import CesiumModelAjax from './cesiumModelAjax'
  import { postQueryCLQDInfo } from '../../../api/waterResources'

  import { mixinCesium } from './../../../mixins/cesium'
  // 优质旅游资源
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
          qdmc: '旅游资源名称',
          qdlx: '交通状况',
          qsll: '所属旅游综合体名称',
          sw: '旅游资源主类',
          phz: '亚类',
          eh: '基本类型',
          rjy: '性质特征',
          ddl: '开发利用现状',
          tds: '联系电话'
        },
        isImg: '1',
        dataTitleDialog: '优质旅游资源统计',
        display1: true,
        display2: true,
        display3: true,
        dataViewLog: false,
        counter: [],
        switchs: false,
        index: '',
        pickPoint: false,
        brightBut: false,
        isFormTable: false,
        text: '旅游资源选点对比',
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
      DonutChart,
      PickPointTitle,
      ComparedDataDialog,
      TableComponent,
      FaceInformationDialog,
      FaceListItem,
      ViewDialogDonut,
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
