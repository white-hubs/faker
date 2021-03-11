<template>
      <el-dialog
        title="查看"
        :visible.sync="visible"
        :close-on-click-modal = false
        top='35vh'
        width="22%"
        :before-close="Close">
        <el-form ref="form" :model="userfrom" >
            <el-form-item label="账户名称:">
              <el-input v-model="userfrom.username"  readonly class="readonly"></el-input>
              <!-- <div style="text-ali">请输入</div>  -->
            </el-form-item>
            <!-- <el-form-item label="登录密码:">
              <el-input v-model="userfrom.password"  readonly class="readonly"></el-input>
            </el-form-item> -->
            <el-form-item label="姓名:">
              <el-input v-model="userfrom.name"  readonly class="readonly"></el-input>
            </el-form-item>
            <el-form-item label="权限分配:" class="readonlyche">
              <el-checkbox-group v-model="userfrom.authority">
                <el-checkbox label="1" name="" disabled>首页</el-checkbox>
                <el-checkbox label="2" name="" disabled>地质信息</el-checkbox>
                <el-checkbox label="3" name="" disabled>决策管理</el-checkbox>
                <el-checkbox label="4" name="" disabled>管理后台</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="userdown">取 消</el-button>
          <el-button  type="primary" @click="userup">确 认</el-button>
        </div> -->
      </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        userfrom: {
          username: '',
          password: '',
          name: '',
          authority: []
        }

      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      seedata: {

      }
    },
    methods: {
      userup () {
        // console.log(this.userfrom)
        // this.$parent.EdithandleClose()
        console.log(this.seedata)
      },
      Close () {
        this.$parent.SeehandleClose()
      },
      userdown () {
        this.$parent.SeehandleClose()
      }
    },
    mounted () {
    // this.userfrom = this.editdata
    },
    watch: {
      seedata (value) {
        const data = JSON.parse(JSON.stringify(value))
        data.authority = value.authority.split(',')
        this.userfrom = data
        console.log('watch:++++', this.userfrom)
        console.log(data)
      }
    }
  }
</script>
