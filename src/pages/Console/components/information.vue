<template>
  <div class="information">
    <div class="information-top">
      规划区基础信息
    </div>
    <div class="information-contant">
      <div class="information-left">
        <el-table
          :data="tableData"
          stripe
          type="index"
          :row-style="{ height: '40px' }"
        >
          <template slot="empty">
            <img src="../../../assets/icons/null.png" alt="" />
            <p class="empty-p">暂无数据</p>
          </template>
          <el-table-column prop="userId" label="" width="230"></el-table-column>
          <el-table-column prop="username" label="">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isShow"
                v-model="scope.row.username"
                class="inputClass"
              ></el-input>
              <span v-else>{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" align="left" width="160">
            <template slot-scope="{ row }">
              <p
                v-if="!row.isShow"
                @click="handleClickEdit(row)"
                class="edithandle"
              >
                编辑
              </p>
              <p
                v-if="row.isShow"
                @click="handleClickSave(row)"
                class="edithandle"
              >
                保存
              </p>
              <p
                v-if="row.isShow"
                @click="handleClickCancel(row)"
                class="edithandle"
              >
                取消
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="information-right">
        <el-table
          :data="tablesData"
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
            prop="userId"
            label=""
            width="230"
            label-class-name="columnleft"
          ></el-table-column>
          <el-table-column prop="username" label="">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isShow"
                v-model="scope.row.username"
                class="inputClass"
              ></el-input>
              <span v-else>{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" align="left" width="160">
            <template slot-scope="{ row }">
              <p
                v-if="!row.isShow"
                @click="handleClickEdit(row)"
                class="edithandle"
              >
                编辑
              </p>
              <p
                v-if="row.isShow"
                @click="handleClickSave(row)"
                class="edithandle"
              >
                保存
              </p>
              <p
                v-if="row.isShow"
                @click="handleClickCancel(row)"
                class="edithandle"
              >
                取消
              </p>
              <!-- <p v-if="tableData[row.id].id">测试</p> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    postQueryinformation,
    postQueryUpdata
  } from '../../../api/information'
  export default {
    name: 'information',
    data () {
      return {
        queryRequest: postQueryinformation,
        updataRequest: postQueryUpdata,
        tableData: [
          {
            userId: '年平均气温',
            username: '16.8℃',
            isShow: false
          },
          {
            userId: '年平均降水量',
            username: '832.44mm',
            isShow: false
          },
          {
            userId: '最高海拔',
            username: '1405.2m',
            isShow: false
          },
          {
            userId: '距离天府广场',
            username: '25km',
            isShow: false
          },
          {
            userId: '距离天府国际机场',
            username: '25km',
            isShow: false
          },
          {
            userId: '高速线',
            username: '天府机场高速、G42泸蓉高速、G76厦蓉高速',
            isShow: false
          }
        ],
        tablesData: [
          {
            userId: '年平均湿度',
            username: '81%',
            isShow: false
          },
          {
            userId: '年平均日照',
            username: '1036.4h',
            isShow: false
          },
          {
            userId: '最低海拔',
            username: '145.2m',
            isShow: false
          },
          {
            userId: '距离双流国际机场',
            username: '25km',
            isShow: false
          },
          {
            userId: '铁路线',
            username: '成渝铁路、达成铁路',
            isShow: false
          },
          {
            userId: '地铁线',
            username: '地铁2号线、8号线、13号线',
            isShow: false
          }
        ],
        basicInfo: {}
      }
    },
    methods: {
      async getTableData () {
        try {
          const data = this.data
          const tableData = await this.queryRequest(data)
          this.basicInfo = tableData.basicInfo
          this.changedata()
          console.log(this.basicInfo)
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
      async getUpdataTableData () {
        try {
          const data = this.basicInfo
          const tableData = await this.updataRequest(data)
          console.log(tableData)
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
      handleClickEdit (row) {
        // console.log(row)
        row.isShow = !row.isShow
      },
      handleClickSave (row) {
        console.log(row)
        row.isShow = !row.isShow
        this.postdata()
        this.getUpdataTableData()
      },
      handleClickCancel (row) {
        // console.log(row)
        row.isShow = !row.isShow
      },
      changedata () {
        this.tableData[0].username = this.basicInfo.annualAvgTemp
        this.tableData[1].username = this.basicInfo.annualAvgPpt
        this.tableData[2].username = this.basicInfo.maxAsl
        this.tableData[3].username = this.basicInfo.disTianfuSquare
        this.tableData[4].username = this.basicInfo.disTianfuAirport
        this.tableData[5].username = this.basicInfo.highspeed
        this.tablesData[0].username = this.basicInfo.annualAvgHmdt
        this.tablesData[1].username = this.basicInfo.annualAvgSunshine
        this.tablesData[2].username = this.basicInfo.minAsl
        this.tablesData[3].username = this.basicInfo.disShuangliuAirport
        this.tablesData[4].username = this.basicInfo.railway
        this.tablesData[5].username = this.basicInfo.metro
      },
      postdata () {
        this.basicInfo.annualAvgTemp = this.tableData[0].username
        this.basicInfo.annualAvgPpt = this.tableData[1].username
        this.basicInfo.maxAsl = this.tableData[2].username
        this.basicInfo.disTianfuSquare = this.tableData[3].username
        this.basicInfo.disTianfuAirport = this.tableData[4].username
        this.basicInfo.highspeed = this.tableData[5].username
        this.basicInfo.annualAvgHmdt = this.tablesData[0].username
        this.basicInfo.annualAvgSunshine = this.tablesData[1].username
        this.basicInfo.minAsl = this.tablesData[2].username
        this.basicInfo.disShuangliuAirport = this.tablesData[3].username
        this.basicInfo.railway = this.tablesData[4].username
        this.basicInfo.metro = this.tablesData[5].username
      }
    },
    mounted () {
      this.getTableData()
    }
  }
</script>
