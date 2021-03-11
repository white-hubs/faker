<template>
  <div>
    <div class="water_resources_box">
      <ItemBut :display1="display1" :display2="display2" :display3="display3" />
    </div>
    <compared-data-dialog :text="text" :show="isFormTable">
      <TableComponent />
    </compared-data-dialog>
    <!-- <button @click="faceClick">地质面</button> -->
    <!-- <button>观景台</button> -->
    <face-information-dialog :text="facetext" :show="facebox" :isImg="isImg">
      <div class="faceListItem_">
        <FaceListItem
          v-for="(item, index) in faceData"
          :key="index"
          :name="item.name"
          :value="item.value"
        />
      </div>
    </face-information-dialog>
    <!-- <Drawer /> -->
  </div>
</template>
<script>
// 单景台
  import ItemBut from './../../../components/itemBut'
  // 柱形图
  import ComparedDataDialog from './../../../components/comparedDataDialog'
  import TableComponent from './../../../components/tableComponent'
  import FaceInformationDialog from './../../../components/faceInformationDialog'
  import FaceListItem from './../../../components/faceListItem'
  // import Drawer from './drawer'
  // 地质灾害模板
  export default {
    name: 'Geological',
    data () {
      return {
        isImg: '1',
        display1: false,
        display2: false,
        display3: true,
        dataViewLog: false,
        counter: [],
        switchs: false,
        index: '',
        pickPoint: false,
        brightBut: false,
        isFormTable: false,
        text: '地质灾害点对比数据',
        facetext: '地质层名称地质层名称',
        facebox: false,
        faceData: [
          {
            name: '钻孔类型',
            value: '钻孔类型钻孔'
          },
          {
            name: '钻孔深度',
            value: '1000m'
          },
          {
            name: '层顶埋深',
            value: '1000m'
          },
          {
            name: '层底埋深',
            value: '1000m'
          },
          {
            name: '岩土体类型',
            value: '泥质粉砂岩'
          },
          {
            name: '钻孔深度',
            value: '1000m'
          },
          {
            name: '层顶埋深',
            value: '1000m'
          },
          {
            name: '层底埋深',
            value: '1000m'
          },
          {
            name: '岩土体类型',
            value: '泥质粉砂岩'
          }
        ]
      }
    },
    components: {
      ItemBut,
      ComparedDataDialog,
      TableComponent,
      FaceInformationDialog,
      FaceListItem
      // Drawer
    },
    methods: {
      faceClick () {
        if (this.facebox) {
          this.facebox = false
        } else {
          this.facebox = true
        }
      },
      endFormTable () {
        this.counter = []
      },
      formTable () {
        this.isFormTable = true
      },
      formTableFlase () {
        this.isFormTable = false
      },
      thisClick (e) {
        this.switchs = false
        this.index = ''

        if (this.counter.length > 0) {
          for (let i = 0; i < this.counter.length; i++) {
            if (e === this.counter[i]) {
              // 判断数组内元素是否重复
              this.switchs = true
              // 记录重复元素下标
              this.index = i
            }
          }
          if (this.switchs) {
            // 点击判断是否点重复并删除
            this.counter.splice(this.index, 1)
          } else {
            // 判断对比数量不可大于五
            if (this.counter.length > 4) {
              this.$message('不可以多余5个')
              return false
            }
            // 添加数组数据
            this.counter.push(e)
          }
        } else {
          this.counter.push(e)
        }
        if (this.counter.length > 1) {
          this.brightBut = true
        } else {
          this.brightBut = false
        }
      },
      pickPointFun () {
        if (this.pickPoint) {
          this.pickPoint = false
        } else {
          this.pickPoint = true
        }
      },
      dataViewDialogTrue () {
        this.dataViewLog = true
      },
      dataViewDialogFalse () {
        this.dataViewLog = false
      }
    }
  }
</script>
