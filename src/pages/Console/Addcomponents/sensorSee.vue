<template>
<div class="cameraSee">
  <el-button class="back" type="primary" @click="back()">返回</el-button>
  <div class="hr"></div>
<el-form :model="formData"  ref="formData" label-width="100px" class="demo-ruleForm">
  <el-form-item label="设备编号:  " prop="sensorCode">
    <el-input v-model="formData.sensorCode" readonly></el-input>
  </el-form-item>
  <el-form-item label="设备名称:" prop="name">
    <el-input v-model="formData.name" readonly></el-input>
  </el-form-item>
  <el-form-item label="安装定位:" prop="position" class="calsspos" >
    <el-input class="lng" v-model="formData.lng" readonly> <i slot="suffix" style="font-style:normal;margin-right: 10px; color:rgba(234,251,255,0.45);">°N</i></el-input>
    <el-input class="lat" v-model="formData.lat" readonly> <i slot="suffix" style="font-style:normal;margin-right: 10px; color:rgba(234,251,255,0.45);">°E</i></el-input>
  </el-form-item>
  <el-form-item label="负责人:" prop="chargePerson" >
    <el-input v-model="formData.chargePerson" readonly></el-input>
  </el-form-item>
  <el-form-item label="安装时间:" prop='installTime'>
     <el-input  v-model="formData.installTime" readonly></el-input>
  </el-form-item>
  <el-form-item label="备注:" prop="remark">
    <el-input type="textarea" v-model="formData.remark" readonly></el-input>
  </el-form-item>
  <el-form-item label="最新监测值:" prop="remark" class="sensorvalue">
    <!-- <el-input type="textarea" v-model="formData.remark" readonly></el-input> -->
    <br>
        <el-table
          :data="tableData"
          stripe
          type="index"
          style="width: 100%"
          :row-style="{height: '40px'}"
          >
          <!-- <template slot="empty" >
            <img  src="../../../assets/icons/null.png" alt="" />
            <p class="empty-p">暂无数据</p>
          </template> -->
          <el-table-column prop="id" label="监测项" width="250" type="index"></el-table-column>
          <el-table-column prop="sensorCode" label="监测项" width="" ></el-table-column>
          <el-table-column prop="name" label="监测项" width=""></el-table-column>
          <el-table-column prop="chargePerson" label="监测项"  width=''></el-table-column>
          <el-table-column prop="installTime" label="监测项" width=''></el-table-column>
          <el-table-column prop="remark" label="监测项" ></el-table-column>
        </el-table>
  </el-form-item>
</el-form>
</div>
</template>
<script>

  export default {
    data () {
      return {
        formData: {
          cameraCode: '11',
          name: '',
          lng: 123213210,
          lat: 0,
          chargePerson: '321',
          installTime: '',
          remark: ''
        },
        tableData: [
          {
            id: '1',
            sensorCode: '1',
            name: '1',
            chargePerson: '1',
            installTime: '1',
            remark: '1'
          }
        ]
      }
    },
    props: { editdata: {} },
    methods: {
      back () {
        this.$parent.cameraClose()
      }
    },
    watch: {
      editdata (value) {
        this.formData = value
        console.log('213213213', value)
      }
    }
  }
</script>
