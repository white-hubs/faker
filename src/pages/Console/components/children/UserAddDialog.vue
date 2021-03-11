<template>
      <el-dialog
        title="新增用户"
        :visible.sync="visible"
        :close-on-click-modal = false
        top='35vh'
        width="23%"
        :before-close="Close">
        <el-form ref="form" :model="userfrom" >
            <el-form-item label="账户名称:">
              <el-input v-model="userfrom.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="登录密码:">
              <el-input v-model="userfrom.password" placeholder="请输入" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:">
              <el-input v-model="userfrom.passwordConfirm" placeholder="请输入" type="password"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="userfrom.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限分配:"  class="rede">
              <el-checkbox-group v-model="userfrom.authority">
                <el-checkbox label="1" name="1">首页</el-checkbox>
                <el-checkbox label="2" name="2">地质信息</el-checkbox>
                <el-checkbox label="3" name="3">决策管理</el-checkbox>
                <el-checkbox label="4" name="5">管理后台</el-checkbox>
                <!-- <el-checkbox label="4" name="4">后台管理</el-checkbox> -->
              </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Close">取 消</el-button>
          <el-button  type="primary" @click="userup">确 认</el-button>
        </div>
      </el-dialog>
</template>
<script>
  import { postSaveUserList } from '../../../../api/user'
  export default {
    data () {
      return {
        queryRequest: postSaveUserList,
        userfrom: {
          username: '',
          password: '',
          passwordConfirm: '',
          name: '',
          authority: []
        }
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      userup () {
        if (this.userfrom.password === this.userfrom.passwordConfirm) {
          this.getTableData()
          this.Close()
        } else {
          this.$message.error('两次密码不统一')
        }
      },
      Close () {
        this.userfrom = {
          username: '',
          password: '',
          passwordConfirm: '',
          name: '',
          authority: []
        }
        this.$parent.handleClose()
      },
      async getTableData () {
        try {
          const data = JSON.parse(JSON.stringify(this.userfrom))
          data.authority = this.userfrom.authority.toString()
          const tableData = await this.queryRequest(data)
          this.$parent.getTableData()
          console.log(tableData)
        } catch (err) {
          console.log(err)
          if (err === 10009) {
            this.open1('账号重复')
          }
        }
      },
      open1 (title) {
        this.$message.error(title)
      }
    }
  }
</script>
