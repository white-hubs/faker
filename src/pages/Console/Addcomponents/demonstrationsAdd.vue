<template>
<div class="demonstrationsAdd">
<el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
  <el-form-item label="示范点名称:" prop="name">
    <el-input v-model="formData.name" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="示范点定位:" prop="position" class="calsspos" >
    <el-button v-if="formData.lng||formData.lng" @click="openMap()">重新选择</el-button>
    <el-button v-else @click="openMap()">选择定位</el-button>
    <el-input  v-model="formData.lng" readonly v-show="formData.lng" >      <i slot="suffix" style="font-style:normal;margin-right: 10px; color:rgba(234,251,255,0.45);">°N</i></el-input>
    <el-input  v-model="formData.lat" readonly v-show="formData.lat">      <i slot="suffix" style="font-style:normal;margin-right: 10px;color:rgba(234,251,255,0.45);">°E</i></el-input>
  </el-form-item>
  <el-form-item label="请上传模型缩略图" prop="files">
    <!-- <el-input v-model="ruleForm.name"></el-input> -->
    <upload-img
      v-model="formData.files"
      @fileChange="fileArr"
    />
  </el-form-item>
  <el-form-item label="示范点信息:" prop="remark">
    <el-input type="textarea" v-model="formData.remark" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button  @click="demonstrationsBack">取消</el-button>
    <el-button type="primary" @click="demonstrationsSubmit">确定</el-button>
  </el-form-item>
</el-form>
  <hk-dialog :visible.sync="dialogVisible" :title="dialogTitle" width='45%'>
    <open-layers style="height:600px;" @postposition="getPoint" />
  </hk-dialog>
</div>
</template>
<script>
  import OpenLayers from '../../../components/OpenLayers'
  import HkDialog from '../../../components/HkDialog'
  import UploadImg from '../../../components/UploadImg'
  import { postSaveCameraList, postUpdataCameraList } from '../../../api/camera'
  export default {
    data () {
      return {
        dialogVisible: false,
        dialogTitle: '选择定位',
        saverRequest: postSaveCameraList,
        updataRequest: postUpdataCameraList,
        formData: {
          cameraCode: '',
          name: '',
          lng: 0,
          lat: 0,
          chargePerson: '',
          installTime: '',
          remark: '',
          files: []
        },
        fileList: [],
        rules: {
          name: [
            { required: true, message: '请输示范点名称', trigger: 'blur' }
          ],
          lng: [
            { required: true, message: '请输入经纬度', trigger: 'blur' }
          ],
          lat: [
            { required: true, message: '请输入经纬度', trigger: 'blur' }
          ]
        }
      }
    },
    // props: {
    //   editdata: {}, iscamera: Boolean },
    methods: {
      demonstrationsBack () {
        this.$parent.demonstrationsClose()
      },
      demonstrationsSubmit () {
      // this.$emit('cameras', this.camerashow)
      // this.getTableData()
      // console.log(this.iscamera)
      // if (this.iscamera) {
      //   this.getTableData()
      // } else {
      //   this.getEditTableData()
      // }
      // this.$parent.cameraClose()
      // console.log(typeof this.fileList)
      },
      openMap () {
        this.dialogVisible = true
      },
      getPoint (data) {
        this.formData.lng = data[0]
        this.formData.lat = data[1]
        console.log('经纬度：++++++++', data)
      },
      getPolygon (data) {
        // this.formData.points = JSON.stringify(data)
        console.log('经纬度：-------------------', data)
      },
      fileArr (data) {
        this.fileList = data
        console.log(typeof data)
      }
    // async getTableData () {
    //   try {
    //     const data = this.formData
    //     const tableData = await this.saverRequest(data)
    //     // this.tableData = tableData.cameraList
    //     console.log(tableData)
    //   } catch (err) {
    //     if (err === 20003) {
    //       this.$message.error('登录过期')
    //       window.sessionStorage.token = ''
    //       this.$router.push('/')
    //     }
    //   }
    // },
    // async getEditTableData () {
    //   try {
    //     const data = this.formData
    //     const tableData = await this.updataRequest(data)
    //     // this.tableData = tableData.cameraList
    //     console.log(tableData)
    //   } catch (err) {
    //     if (err === 20003) {
    //       this.$message.error('登录过期')
    //       window.sessionStorage.token = ''
    //       this.$router.push('/')
    //     } else if (err === 10009) {
    //       this.$message.error('设备已存在')
    //     }
    //   }
    // }
    },
    components: {
      OpenLayers,
      HkDialog,
      UploadImg
    },
    watch: {
    // editdata (value) {
    //   this.formData = value
    // }
    }
  }
</script>
