<template>
<div class="usermodel">
    <div class="console_box">
      <div class="usertop">
        关键词搜索：
        <el-input  v-model="inputinner" placeholder="请输入账号名称"></el-input>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </div>
      <div class="tablist">
        <div class="tablist-top">
          <p>示范点列表</p>
          <el-button @click="demonstrationsAdd()">新增示范点</el-button>
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
          <el-table-column prop="id" label="序号" width="300" type="index"></el-table-column>
          <el-table-column prop="name" label="示范点名称" width="" ></el-table-column>
          <el-table-column prop="installTime" label="创建时间" width='500'></el-table-column>
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
            <el-tooltip content="删除" placement="bottom">
              <i class="hk-icon-delete" @click="handleClickDelete(row)" />
            </el-tooltip>
          </template>
          </el-table-column>
        </el-table>
        <el-pagination
        class="msg-pagination-container"
        :background= isBackground
        layout="sizes, total, prev, pager, next"
        :total= 0
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
        <el-button type="primary" @click="DeletedialogVisible = false" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <div class="cameraForm" v-if="demonstrations">
      <demonstrationsAdd ></demonstrationsAdd>
    </div>
    </div>
</template>
<script>
  import demonstrationsAdd from '../Addcomponents/demonstrationsAdd'
  export default {
    name: 'user',
    data () {
      return {
        data: {
          size: 15,
          page: 1,
          id: 0
        },
        tableData: [
          {
            name: 'yanquan',
            installTime: '2020-10-11'
          }
        ],
        inputinner: '',
        isBackground: true,
        DeletedialogVisible: false,
        demonstrations: false
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.data.page = val
      // this.queryConsole()
      },
      handleClickDelete () {
        this.DeletedialogVisible = true
      },
      DeletedhandleClose () {
        this.DeletedialogVisible = false
      },
      demonstrationsAdd () {
        this.demonstrations = true
      },
      demonstrationsClose () {
        this.demonstrations = false
      }
    },
    components: {
      demonstrationsAdd
    },
    created () {
    },
    mounted () {
    }
  }
</script>
<style lang="scss">
</style>
