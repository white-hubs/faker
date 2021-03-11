<template>
  <table class="mailTable" :style="styleObject">
    <div v-for="(key,i) in keyArr" :key="i" class="mailTable_box">
      <tr v-for="(item,index) in newtableData" :key="index" class="mailTable_box_list">
        <td v-for="(items,ind) in item[key]" :key="ind" class="item">{{items}}</td>
      </tr>
    </div>
  </table>
</template>

<script>
  export default {
    name: 'TableComponent',
    data () {
      return {
        styleObject: {},
        s_showByRow: true,
        // tableData: [
        //   { key: '单号', value: '1001', name: '1002', word: '1003' },
        //   { key: '商品名称', value: '1004', name: '1002', word: '1003' },
        //   { key: '价格', value: '1005', name: '1002', word: '1003' },
        //   { key: '订单日期', value: '1006', name: ' 1002', word: '1003' },
        //   { key: '付款方式', value: '1007', name: ' 1002', word: '1003' },
        //   { key: '收货地址', value: '1008', name: ' 1002', word: '1003' }
        // ],
        // tableData: [
        //   { key: '单号', key1: '商品名称', key2: '价格', key3: '订单日期' },
        //   { key: '1000', key1: '1004', key2: '1002', key3: '1003' },
        //   { key: '2001', key1: '1005', key2: '1002', key3: '1003' },
        //   { key: '1230', key1: '1006', key2: ' 1002', key3: '1003' },
        //   { key: '5462', key1: '1007', key2: ' 1002', key3: '1003' },
        //   { key: '5262', key1: '1008', key2: ' 1002', key3: '1003' }
        // ],
        newtableData: [],
        keyArr: []
      }
    },

    props: [
      'tableData',
      'tableStyle',
      'showByRow'
    ],
    computed: {
    },
    watch: {
      // 使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
      tableData: function (newVal, oldVal) {
        this.getKey()
      }
    },
    mounted () {
      this.getKey()
    },
    methods: {
      getKey () {
        const tableData = this.tableData
        this.keyArr = []
        this.newtableData = []
        if (tableData) {
          for (var key in tableData[0]) {
            this.keyArr.push(key)
          }
          const newArr = []
          this.keyArr.map((itemKey, i) => {
            var obj = {}
            obj[itemKey] = []
            tableData.map((item, index) => {
              obj[itemKey].push(item[itemKey])
            })
            newArr.push(obj)
          })
          this.newtableData = newArr
        }
      }
    },
    created () {
      this.styleObject = this.tableStyle
      if (this.showByRow !== undefined) {
        this.s_showByRow = this.showByRow
      }
    }
  }
</script>
