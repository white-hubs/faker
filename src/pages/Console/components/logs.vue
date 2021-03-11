<template>
  <div class="usermodel">
    <div class="console_box">
      <div class="usertop">
        关键词搜索：
        <el-input  v-model="searchdata.searchContent" placeholder="请输入操作者账号"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="Reset">重置</el-button>
      </div>
      <div class="tablist">
        <div class="tablist-top">
          <p>日志列表</p>
          <!-- <el-button ></el-button> -->
        </div>
        <el-table
          :data="tableData"
          stripe
          type="index"
          style="width: 100%"
          :row-style="{ height: '40px' }"
        >
          <template slot="empty">
            <img src="../../../assets/icons/null.png" alt="" />
            <p class="empty-p">暂无数据</p>
          </template>
          <el-table-column
            prop="id"
            label="序号"
            width="300"
            type="index"
          ></el-table-column>
          <el-table-column
            prop="someone"
            label="操作者账号"
            width=""
          ></el-table-column>
          <el-table-column
            prop="somewhere"
            label="操作板块"
            width=""
          ></el-table-column>
          <el-table-column
            prop="something"
            label="操作内容"
            width=""
          ></el-table-column>
          <el-table-column
            prop="sometime"
            label="操作时间"
            width="200"
          ></el-table-column>
        </el-table>
        <el-pagination
          class="msg-pagination-container"
          :background="isBackground"
          layout="total, prev, pager, next"
          :total= total
          :page-sizes="[15]"
          :page-size="data.size"
          :current-page="data.page"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        >
          <!-- total, prev, pager, next -->
        </el-pagination>
      </div>
    </div>
    <!-- <div class="cameraForm" >
      <cameraAdd :editdata='edittableData' :iscamera='iscamera'></cameraAdd>
    </div> -->
  </div>
</template>
<script>
  import { postQueryLogsList } from '../../../api/logs'
  export default {
    name: 'user',
    data () {
      return {
        queryRequest: postQueryLogsList,
        total: 100,
        data: {
          size: 15,
          page: 1,
          id: 0
        },
        tableData: [],
        isBackground: true,
        DeletedialogVisible: false,
        searchdata: {
          searchContent: ''
        }
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.data.page = val
        // console.log(val)
        this.tableData()
      },
      handleClickDelete () {
        this.DeletedialogVisible = true
      },
      DeletedhandleClose () {
        this.DeletedialogVisible = false
      },
      async getTableData () {
        try {
          const data = this.data
          const tableData = await this.queryRequest(data)
          this.tableData = tableData.auditList
          this.total = tableData.total
          console.log('logs', tableData)
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
      search () {
        this.getSearchTableData()
        // console.log(this.searchdata.searchContent)
      },
      async getSearchTableData () {
        try {
          const data = this.searchdata
          const tableData = await this.queryRequest(data)
          this.tableData = tableData.auditList
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
    components: {},
    created () {},
    mounted () {
      this.getTableData()
    }
  }
</script>
<style lang="scss">
.cell {
  max-height: 40px !important;
  overflow: auto !important;
}
.testt{
  display: none;
}
</style>
