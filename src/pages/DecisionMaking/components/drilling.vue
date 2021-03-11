<template>
  <div style="position: relative;height: 100%;">
    <div class="water_resources_box">
      <ItemBut :display1="display1" :display2="display2" :display3="display3" />
    </div>
    <data-view-dialog :show="dataViewLog" :title="titleDialog">
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
    <compared-data-dialog :text="text" :show="isFormTable">
      <TableComponent />
    </compared-data-dialog>
    <!-- <button @click="faceClick">地质面</button> -->
    <!-- <button @click="bigClick">大点</button> -->
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
    <CesiumModelJson :pointLayer = "pickPoint" @func="getCounterData"/>
    <big-view-dialog :show="bigViewDialogIs" :title="bigTitleDialog">
      <div class="drilling_box">
        <div class="drilling_one">
          <div class="drilling_title">钻孔信息(ZK0001)</div>
          <div class="drilling_c">
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">地理位置</div>
              <div class="drilll_center_value">{{zk.zjlx}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">钻孔类型</div>
              <div class="drilll_center_value">{{zk.zjlx}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">孔口标高</div>
              <div class="drilll_center_value">{{zk.kkbg}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">钻孔深度</div>
              <div class="drilll_center_value">{{zk.zksd}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">钻孔斜度</div>
              <div class="drilll_center_value">{{zk.zkxd}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">开孔口径</div>
              <div class="drilll_center_value">{{zk.kkkj}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">终孔口径</div>
              <div class="drilll_center_value">{{zk.zkkj}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name"> 开始日期</div>
              <div class="drilll_center_value">{{zk.zkksrq}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">结束日期</div>
              <div class="drilll_center_value">{{zk.zkjsrq}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">静止水位</div>
              <div class="drilll_center_value">{{zk.jzsw}}</div>
            </div>
            <div class="drilling_c_center_box">
              <div class="drilll_center_name">钻孔编号</div>
              <div class="drilll_center_value">{{zk.zkbm}}</div>
            </div>
            <!-- <div class="drilling_c_center_box">
              <div class="drilll_center_name">钻孔柱状图</div>
              <div class="drilll_center_value">钻孔类型钻孔</div>
            </div> -->
          </div>
        </div>
        <div class="drilling_two">
          <div class="drilling_title">钻孔柱状图</div>
          <div class="drilling_c">
            <div class="drill_left">
              <ThreeModel v-if="bigViewDialogIs" @func="getFloor"/>
            </div>
            <div class="drill_right">
              <div class="drill_right_header">
                <div class="header_title">分层特征描述</div>
              </div>
              <div class="drill_right_center" v-if="isFcms">
                <div class="drilling_c_center_box">
                  <div class="drilll_center_name">标准编码</div>
                  <div class="drilll_center_value">{{fcms.bzbm}}</div>
                </div>
                <div class="drilling_c_center_box">
                  <div class="drilll_center_name">层底埋深</div>
                  <div class="drilll_center_value">{{fcms.cdims}}m</div>
                </div>
                <div class="drilling_c_center_box">
                  <div class="drilll_center_name">层顶埋深</div>
                  <div class="drilll_center_value">{{fcms.cdnms}}m</div>
                </div>
                <!-- <div class="drilling_c_center_box">
                  <div class="drilll_center_name">地层代号</div>
                  <div class="drilll_center_value">{{fcms.dcdh}}</div>
                </div> -->
                <div class="drilling_c_center_box">
                  <div class="drilll_center_name">分层厚度</div>
                  <div class="drilll_center_value">{{fcms.fchd}}m</div>
                </div>
                <div class="drilling_c_center_box">
                  <div class="drilll_center_name">岩土体类型</div>
                  <div class="drilll_center_value">{{fcms.yttlx}}</div>
                </div>
                <div class="drilling_c_center_box">
                  <div class="drilll_center_name">分层特征描述</div>
                </div>
                <div class="drilling_c_center_box">
                  <!-- <div class="drilll_center_name">分层特征描述</div> -->
                  <div class="drilll_center_value" style="margin-left:10px;">{{fcms.fctzms}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </big-view-dialog>
  </div>
</template>
<script>
// 钻孔模板
  import ItemBut from './../../../components/itemBut'
  import DataViewDialog from './../../../components/dataViewDialog'
  import DataViewTitle from './../../../components/dataViewTitle'
  // 柱形图
  import EchartsBar from './../components/EchartsBar'
  import ComparedDataDialog from './../../../components/comparedDataDialog'
  import TableComponent from './../../../components/tableComponent'
  import FaceInformationDialog from './../../../components/faceInformationDialog'
  import FaceListItem from './../../../components/faceListItem'
  import BigViewDialog from './bigViewDialog'
  import ThreeModel from './threeModel'
  // 地质灾害模板BigViewDialog

  import CesiumModelJson from './cesiumModelJson'
  import { postQueryZKInfoitem, postFindZKFCInfo } from '../../../api/drilling'
  export default {
    name: 'Geological',
    data () {
      return {
        // 左侧弹窗信息
        zk: {},
        fcms: {},
        isFcms: false,
        postQueryZKInfoItem: postQueryZKInfoitem,
        postFindZKFCInfo,
        isImg: '0',
        bigViewDialogIs: false,
        bigTitleDialog: '钻孔名称钻孔名称钻孔名称',
        titleDialog: '数据查看',
        echartsTypeData1: {
          startColor: '#017B88',
          endColor: '#0BBAC9',
          thisColor: '#06F3FC',
          echartId: 'echartsBarDrilling',
          legendData: [
            {
              name: '面积',
              icon: 'rect'
            },
            {
              name: '占比'
            // icon: 'pin'
            }
          ],
          isLegend: true,
          titleOne: '面积：km2',
          isTitleOne: true,
          titleTwo: '百分比：%',
          isTitleTwo: true,
          lineColor: '#BE0DFF'
        },
        display1: true,
        display2: false,
        display3: true,
        dataViewLog: false,
        title2: '土壤质量化学综合评价',
        Total2: '',
        number2: '',
        unit2: '',
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
      ComparedDataDialog,
      TableComponent,
      FaceInformationDialog,
      FaceListItem,
      BigViewDialog,
      ThreeModel,
      CesiumModelJson
    },
    methods: {
      async getFloor (bsm) {
        this.data = {
          bsm: bsm
        }
        if (!this.postFindZKFCInfo) {
          console.log(11)
        // nothing todo
        } else {
          try {
            const data = await this.postFindZKFCInfo(this.data)
            this.fcms = data.zkfc
            this.isFcms = true
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

      async getZKInfoItem (data) {
        this.ZKitem = {
          page: 0,
          size: 0,
          zkbm: data
        }
        if (!this.postQueryZKInfoItem) {
          console.log(11)
        // nothing todo
        } else {
          try {
            const data = await this.postQueryZKInfoItem(this.ZKitem)
            this.zk = data.zk
            // this.zkList = data.zkList
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
      },
      getCounterData (data) {
        this.bigClick(data)
      },
      faceClick () {
        if (this.facebox) {
          this.facebox = false
        } else {
          this.facebox = true
        }
      },
      bigClick (data) {
        if (data) {
          this.getZKInfoItem(data)
        }
        this.bigViewDialogIs = !this.bigViewDialogIs
      },
      endFormTable () {
        this.counter = []
      },
      formTable () {
        this.isFormTable = true
      },
      formTableFlase () {
        this.isFormTable = false
      },
      thisClick (e) {
        this.switchs = false
        this.index = ''

        if (this.counter.length > 0) {
          for (let i = 0; i < this.counter.length; i++) {
            if (e === this.counter[i]) {
              // 判断数组内元素是否重复
              this.switchs = true
              // 记录重复元素下标
              this.index = i
            }
          }
          if (this.switchs) {
            // 点击判断是否点重复并删除
            this.counter.splice(this.index, 1)
          } else {
            // 判断对比数量不可大于五
            if (this.counter.length > 4) {
              this.$message('不可以多余5个')
              return false
            }
            // 添加数组数据
            this.counter.push(e)
          }
        } else {
          this.counter.push(e)
        }
        if (this.counter.length > 1) {
          this.brightBut = true
        } else {
          this.brightBut = false
        }
      },
      pickPointFun () {
        if (this.pickPoint) {
          this.pickPoint = false
        } else {
          this.pickPoint = true
        }
      },
      dataViewDialogTrue () {
        this.dataViewLog = true
      },
      dataViewDialogFalse () {
        this.dataViewLog = false
      },
      bigViewDialog () {
        this.bigViewDialogIs = false
      }
    }
  }
</script>
