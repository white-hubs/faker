<template>
<div class="usermodel">
    <div class="console_box">
      <div class="usertop">
        关键词搜索：
        <el-input  v-model="searchdata.searchContent" placeholder="请输入设备名称"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="Reset">重置</el-button>
      </div>
      <div class="tablist">
        <div class="tablist-top">
          <p>传感器列表</p>
          <el-button @click="cameraAdd">新增传感器</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          type="index"
          style="width: 100%"
          :row-style="{height: '40px'}"
          >
          <template slot="empty" >
            <img  src="../../../assets/icons/null.png" alt="" />
            <p class="empty-p">暂无数据</p>
          </template>
          <el-table-column prop="id" label="序号" width="120" type="index"></el-table-column>
          <el-table-column prop="sensorCode" label="设备编号" width="" ></el-table-column>
          <el-table-column prop="name" label="设备名称" width=""></el-table-column>
          <el-table-column prop="chargePerson" label="负责人"  width=''></el-table-column>
          <el-table-column prop="installTime" label="安装时间" width='200'></el-table-column>
          <el-table-column prop="dataStatus" label="设备状态" width=''>
            <template slot-scope="scope">
              <div v-if="scope.row.dataStatus===1" class="statusbody1"><div class="status1"></div> 在线</div>
              <div v-if="scope.row.dataStatus===0" class="statusbody2"><div class="status2"></div> 禁用</div>
              <!-- <span style="margin-left: 10px">{{ scope.row.dataStatus }}</span> -->
            </template></el-table-column>
          <el-table-column prop="remark" label="备注" width='270' ></el-table-column>
          <el-table-column
          label="操作"
          align="left"
           width="200"
           >
          <template slot-scope="{ row }">
            <el-tooltip content="查看" placement="bottom">
              <i class="hk-icon-preview" @click="handleClickSee(row)" />
            </el-tooltip>
            <el-tooltip content="编辑" placement="bottom">
              <i class="hk-icon-edit" @click="handleClickEdit(row)" />
            </el-tooltip>
            <el-tooltip content="禁用" placement="bottom">
              <i class="hk-icon-disable" @click="handleClickDisable(row)" v-if="row.dataStatus===1"/>
            </el-tooltip>
            <el-tooltip content="启用" placement="bottom">
              <i class="hk-icon-enable" @click="handleClickEnable(row)" v-if="row.dataStatus===0"/>
            </el-tooltip>
            <el-tooltip content="删除" placement="bottom">
              <i class="hk-icon-delete" @click="handleClickDelete(row)" />
            </el-tooltip>
            <el-tooltip content="定位" placement="bottom">
              <i class="hk-icon-position" @click="openMap(row)"/>
            </el-tooltip>
          </template>
          </el-table-column>
        </el-table>
        <el-pagination
        class="msg-pagination-container"
        :background= isBackground
        layout="sizes, total, prev, pager, next"
        :total= total
        :page-sizes="[15]"
        :page-size="data.size"
        :current-page="data.page"
        :hide-on-single-page = true
        @current-change="handleCurrentChange"
        >
        <!-- total, prev, pager, next -->
      </el-pagination>
      </div>
    </div>
    <div class="deleted">
      <el-dialog
      :visible.sync="DeletedialogVisible"
      width="20%"
      top='35vh'
      :before-close="DeletedhandleClose">
      <div class="deletedTo"><img src="../../../assets/icons/warninig.png" alt=""><span>删除设备</span></div>
      <div class="deletedBu">删除后该设备所有信息将无法恢复，确认是否删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DeletedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Deletedialog()" >确 定</el-button>
      </span>
    </el-dialog>
    <!-- //禁用 -->
        <el-dialog
      :visible.sync="DisabledialogVisible"
      width="20%"
      top='35vh'
      :before-close="DisablehandleClose">
      <div class="deletedTo"><img src="../../../assets/icons/warninig.png" alt=""><span>禁用设备</span></div>
      <div class="deletedBu">禁用后该设备将不在信息平台展示，确认是否执行？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DisabledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Disable">确 定</el-button>
      </span>
    </el-dialog>
    <!-- //启用 -->
    <el-dialog
      :visible.sync="EnabledialogVisible"
      width="20%"
      top='35vh'
      :before-close="EnablehandleClose">
      <div class="deletedTo"><img src="../../../assets/icons/warninig.png" alt=""><span>启用设备</span></div>
      <div class="deletedBu">解禁后该设备将恢复在信息平台展示，确认是否执行？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EnabledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Enable">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <div class="cameraForm" v-if="cameraForm">
      <sensorAdd :editdata='edittableData' :iscamera='iscamera'></sensorAdd>
    </div>
    <div class="cameraForm" v-if="cameraSee" >
      <sensorSee  :editdata='edittableData'></sensorSee>
    </div>
      <hk-dialog :visible.sync="dialogVisible" :title="dialogTitle" width='45%'>
    <openlayers style="height:600px;" :setposition='position' :isclick="false"/>
  </hk-dialog>
    </div>
</template>
<script>
  import sensorAdd from '../Addcomponents/sensorAdd'
  import sensorSee from '../Addcomponents/sensorSee'
  // import { postSwitchCameraList } from '../../../api/camera'
  import { postQuerySensorList, postFindSensorList, postDeleteSensorList, postSwitchSensorList } from '../../../api/sensor'
  import openlayers from '../../../components/OpenLayers.vue'
  import HkDialog from '../../../components/HkDialog'
  export default {
    name: 'user',
    data () {
      return {
        inputinner: '',
        isBackground: true,
        DeletedialogVisible: false,
        DisabledialogVisible: false,
        EnabledialogVisible: false,
        dialogTitle: '查看定位',
        dialogVisible: false,
        position: [],
        disable: true,
        cameraForm: false,
        cameraSee: false,
        queryRequest: postQuerySensorList,
        editRequest: postFindSensorList,
        deleteRequest: postDeleteSensorList,
        switchRequest: postSwitchSensorList,
        Editid: {},
        Seeid: {},
        tableData: [],
        edittableData: [],
        iscamera: true,
        total: 0,
        data: {
          size: 15,
          page: 1,
          enable: false,
          id: 0
        },
        id: {
          idList: []
        },
        searchdata: {
          searchContent: ''
        }
      }
    },
    methods: {
      openMap (row) {
        this.position = [row.lng, row.lat]
        // console.log(this.position)
        this.dialogVisible = true
      },
      handleCurrentChange (val) {
        this.data.page = val
        // this.queryConsole()
        this.tableData()
      },
      handleClickDelete (row) {
        this.DeletedialogVisible = true
        this.id.idList[0] = row.id
      },
      DeletedhandleClose () {
        this.DeletedialogVisible = false
      },
      handleClickDisable (row) {
        this.data.id = row.id
        this.DisabledialogVisible = true
      },
      DisablehandleClose () {
        this.DisabledialogVisible = false
      },
      handleClickEnable (row) {
        this.data.id = row.id
        this.EnabledialogVisible = true
      },
      EnablehandleClose () {
        this.EnabledialogVisible = false
      },
      // 禁用/
      Disable () {
        this.disable = false
        this.data.enable = false
        // this.data.id = row.id
        this.SwitchTableData()
        this.DisablehandleClose()
        console.log(this.data)
      },
      // 启用
      Enable () {
        this.disable = true
        this.data.enable = true
        this.SwitchTableData()
        this.EnablehandleClose()
      },
      cameraAdd () {
        // this.$router.push()
        this.cameraForm = true
        this.iscamera = true
      },
      cameraClose () {
        // this.$router.push()
        this.cameraForm = false
        this.cameraSee = false
        // this.getTableData()
      },
      handleClickEdit (row) {
        this.cameraForm = true
        this.iscamera = false
        // console.log(row)
        this.data.id = row.id
        this.getEditTableData()
      },
      handleClickSee (row) {
        this.cameraSee = true
        // this.iscamera = false
        // console.log(row)
        this.data.id = row.id
        this.getEditTableData()
      },
      async getTableData () {
        try {
          const data = this.data
          const tableData = await this.queryRequest(data)
          this.tableData = tableData.sensorList
          this.total = tableData.total
          console.log('ssssss', this.tableData)
        } catch (err) {
          if (err === 20003) {
            this.$message.error('登录过期')
            window.sessionStorage.token = ''
            this.$router.push('/')
          } else if (err === 20004) {
            this.$message.error('暂无权限')
            this.$router.push('/index')
          }
        }
      },
      async getEditTableData () {
        try {
          const data = this.data
          const tableData = await this.editRequest(data)
          this.edittableData = tableData.sensor
          console.log('jjkhjhj', tableData)
        } catch (err) {
          if (err === 20003) {
            this.$message.error('登录过期')
            window.sessionStorage.token = ''
            this.$router.push('/')
          } else if (err === 20004) {
            this.$message.error('暂无权限')
            this.$router.push('/index')
          }
        }
      },
      async DeleteTableData () {
        try {
          const data = this.id
          const tableData = await this.deleteRequest(data)
          // this.edittableData = tableData.camera
          console.log('jjkhjhj', tableData)
          this.getTableData()
        } catch (err) {
          if (err === 20003) {
            this.$message.error('登录过期')
            window.sessionStorage.token = ''
            this.$router.push('/')
          } else if (err === 20004) {
            this.$message.error('暂无权限')
            this.$router.push('/index')
          }
        }
      },
      async SwitchTableData () {
        try {
          const data = this.data
          const tableData = await this.switchRequest(data)
          // this.edittableData = tableData.camera
          console.log('jjkhjhj', tableData)
          this.getTableData()
        } catch (err) {
          if (err === 20003) {
            this.$message.error('登录过期')
            window.sessionStorage.token = ''
            this.$router.push('/')
          } else if (err === 20004) {
            this.$message.error('暂无权限')
            this.$router.push('/index')
          }
        }
      },
      Deletedialog () {
        this.DeletedialogVisible = false
        this.DeleteTableData()
        console.log(this.id)
      },
      search () {
        this.getSearchTableData()
        // console.log(this.searchdata.searchContent)
      },
      async getSearchTableData () {
        try {
          const data = this.searchdata
          const tableData = await this.queryRequest(data)
          this.tableData = tableData.sensorList
          this.total = tableData.total
          // console.log('searchuser', tableData)
        } catch (err) {
          if (err === 20003) {
            this.$message.error('登录过期')
            window.sessionStorage.token = ''
            this.$router.push('/')
          }
        }
      },
      Reset () {
        this.searchdata.searchContent = ''
        this.getSearchTableData()
      }
    },
    components: {
      sensorAdd,
      sensorSee,
      openlayers,
      HkDialog
    },
    created () {
      this.cameraForm = false
    },
    mounted () {
      this.getTableData()
    }
  }
</script>
<style lang="scss">
 .cell {max-height: 40px !important;overflow: auto !important;}
</style>
