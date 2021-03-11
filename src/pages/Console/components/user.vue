<template>
<div class="usermodel">
    <div class="console_box">
      <div class="usertop">
        关键词搜索：
        <el-input  v-model="searchdata.searchContent"  placeholder="请输入账号名称"></el-input>
        <el-button type="primary" @click="search" >搜索</el-button>
        <el-button @click="Reset">重置</el-button>
      </div>
      <div class="tablist">
        <div class="tablist-top">
          <p>用户列表</p>
          <el-button @click="dialogVisible = true">新增用户</el-button>
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
          <el-table-column prop="userId" label="序号" width="180" ></el-table-column>
          <el-table-column prop="username" label="账号名称" ></el-table-column>
          <!-- <el-table-column prop="password" label="账号密码" ></el-table-column> -->
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="createdAt" label="创建时间" ></el-table-column>
          <el-table-column
          label="操作"
          align="left"
           width="160"
           >
          <template slot-scope="{ row }">
            <el-tooltip content="查看" placement="bottom">
              <i class="hk-icon-preview" @click="handleClickSee(row)" />
            </el-tooltip>
            <el-tooltip content="编辑" placement="bottom">
              <i class="hk-icon-edit" @click="handleClickEdit(row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="bottom">
              <i class="hk-icon-delete" @click="handleClickDelete(row)"/>
            </el-tooltip>
          </template>
          </el-table-column>
        </el-table>
        <el-pagination
        class="msg-pagination-container"
        :background= isBackground
        layout="total, prev, pager, next"
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
      <div class="deletedTo"><img src="../../../assets/icons/warninig.png" alt=""><span>删除账号</span></div>
      <div class="deletedBu">删除后该账号将无法登录系统，确认是否删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DeletedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeleteClickVisible()">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <UserDialog :visible.sync="dialogVisible"/>
    <UserEditDialog :visible.sync="EditdialogVisible" :editdata ='EdittableData' />
    <UserSeeDialog :visible.sync="SeedialogVisible" :seedata ='SeetableData'/>
    </div>
</template>
<script>
  import UserDialog from './children/UserAddDialog'
  import UserEditDialog from './children/UserEditDialog'
  import UserSeeDialog from './children/UserSeeDialog'
  import { postQueryUserList, postQueryUserinfo, postQueryDelete } from '../../../api/user'
  // import { mapActions } from 'vuex'
  export default {
    name: 'user',
    data () {
      return {
        // inputinner: '',
        isBackground: true,
        dialogVisible: false,
        EditdialogVisible: false,
        SeedialogVisible: false,
        DeletedialogVisible: false,
        queryRequest: postQueryUserList,
        findRequest: postQueryUserinfo,
        deleteRequest: postQueryDelete,
        total: 0,
        // menulists:
        //   {
        //     title: '测试',
        //     name: '测试',
        //     routeName: 'ces'
        //   },
        searchdata: {
          searchContent: ''
        },
        SeetableData: {},
        tableData: [],
        EdittableData: [],
        data: {
          size: 15,
          page: 1,
          userId: 0
        }
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.data.page = val
        this.getTableData()
      },
      handleClose () {
        this.dialogVisible = false
      },
      EdithandleClose () {
        this.EditdialogVisible = false
      },
      SeehandleClose () {
        this.SeedialogVisible = false
      },
      handleClickEdit (row) {
        this.data.userId = row.userId
        console.log(row.userId)
        if (row.userId === 1) {
          this.$message.error('该账户不可修改')
        } else {
          // console.log(row.userId)
          this.getEditTableData()
          this.EditdialogVisible = true
        }
      },
      handleClickSee (row) {
        this.data.userId = row.userId
        this.getEditTableData()
        this.SeedialogVisible = true
      },
      // ...mapActions({
      //   handleClickSee: 'editableTabs'
      // }),
      handleClickDelete (row) {
        if (row.userId === 1) {
          this.$message.error('该账户不可修改')
        } else {
          // console.log(row.userId)
          this.data.userId = row.userId
          this.DeletedialogVisible = true
        }
      },
      DeletedhandleClose () {
        this.DeletedialogVisible = false
      },
      DeleteClickVisible () {
        this.getDeleteTableData()
        this.DeletedialogVisible = false
        // this.getTableData()
      },
      async getTableData () {
        try {
          const data = this.data
          const tableData = await this.queryRequest(data)
          this.tableData = tableData.userList
          this.total = tableData.total
          console.log('user', tableData)
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
          const tableData = await this.findRequest(data)
          this.EdittableData = tableData.userInfo
          this.SeetableData = tableData.userInfo
        // console.log('editdata:+++++++++++++++++', this.EdittableData)
        } catch (err) {
        }
      },
      async getDeleteTableData () {
        try {
          const data = this.data
          await this.deleteRequest(data)
          /*           this.EdittableData = tableData.userInfo
          this.SeetableData = tableData.userInfo */
          // console.log('editdata:+++++++++++++++++', this.EdittableData)
          this.getTableData()
        } catch (err) {
        }
      },
      search () {
        this.getSearchTableData()
        // console.log(this.searchdata.searchContent)
      },
      async getSearchTableData () {
        try {
          const data = this.searchdata
          const tableData = await this.queryRequest(data)
          this.tableData = tableData.userList
          this.total = tableData.total
          // console.log('searchuser', tableData)
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
      Reset () {
        this.searchdata.searchContent = ''
        this.getSearchTableData()
      }
    },
    components: {
      UserDialog,
      UserEditDialog,
      UserSeeDialog
    },
    mounted () {
      this.getTableData()
    }
  }
</script>
<style lang="scss">
   .cell {max-height: 40px !important;overflow: auto !important;}
</style>
