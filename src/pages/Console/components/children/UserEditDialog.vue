<template>
      <el-dialog
        title="编辑"
        :visible.sync="visible"
        :close-on-click-modal = false
        top='35vh'
        width="23%"
        :before-close="Close">
        <el-form ref="form" :model="userfrom" >
            <el-form-item label="账户名称:" >
              <el-input v-model="userfrom.username" readonly class='editusername'></el-input>
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
            <el-form-item label="权限分配:" class="rede">
              <el-checkbox-group v-model="userfrom.authority">
                <el-checkbox label="1" name="1">首页</el-checkbox>
                <el-checkbox label="2" name="2">地质信息</el-checkbox>
                <el-checkbox label="3" name="3">决策管理</el-checkbox>
                <el-checkbox label="4" name="4">后台管理</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userdown">取 消</el-button>
          <el-button  type="primary" @click="userup">确 认</el-button>
        </div>
      </el-dialog>
</template>
<script>
  import { postQueryUserList, postUpdataUserList } from '../../../../api/user'
  export default {
    data () {
      return {
        queryRequest: postQueryUserList,
        updataRequert: postUpdataUserList,
        userfrom: {
          username: '',
          password: '',
          passwordConfirm: '',
          name: '',
          authority: [],
          userId: 0
        }
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      editdata: {
      }
    },
    methods: {
      async userup () {
        // console.log(this.userfrom)
        if (this.userfrom.password || this.userfrom.passwordConfirm) {
          console.log('err2222')
          if (this.userfrom.password === this.userfrom.passwordConfirm) {
            await this.getTableData()
          } else {
            this.$message.error('两次密码不统一')
            console.log(111)
          }
        } else {
          await this.getTableData()
          console.log('err1111')
        }
        this.$parent.EdithandleClose()
        console.log('this:++++', this.userfrom)
      },
      Close () {
        this.$parent.EdithandleClose()
      },
      userdown () {
        this.$parent.EdithandleClose()
      },
      async getTableData () {
        try {
          const data = JSON.parse(JSON.stringify(this.userfrom))
          data.authority = this.userfrom.authority.toString()
          await this.updataRequert(data)
          this.$parent.getTableData()
          // this.tableData = tableData.userList
          console.log('+++++++++++++++++++++++++++', data)
        } catch (err) {
          console.log('111111aaaaaaa', err)
          if (err === 10009) {
            this.$message.error('用户已存在')
          }
        }
      }
    },
    mounted () {
    // this.userfrom = this.editdata
    // this.getTableData()
    },
    watch: {
      editdata (value) {
        const data = JSON.parse(JSON.stringify(value))
        data.authority = value.authority.split(',')
        this.userfrom = data
      // console.log('watch:++++', this.userfrom)
      }
    }
  }
</script>
