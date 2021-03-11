<template>
  <div class="itemBut_box">
      <div class="itemBut" v-if="display1" :style="action1?backgroundAction1:backgroundDiv1" @click="handerClick(1)">
          <div class="itemBut_name" :class="{itemBut_action:action1}">数据查看</div>
      </div>
      <div class="itemBut" v-if="display2" :style="action2?backgroundAction2:backgroundDiv2" @click="handerClick(2)">
          <div class="itemBut_name" :class="{itemBut_action:action2}">选点对比</div>
      </div>
      <div class="itemBut" v-if="display3" :style="action3?backgroundAction3:backgroundDiv3" @click="handerClick(3)">
          <div class="itemBut_name" :class="{itemBut_action:action3}">剖      切</div>
      </div>
  </div>
</template>
<script>
  import sjckImgN from '@/assets/index/sjck_n.png'
  import sjckImgS from '@/assets/index/sjck_s.png'
  import xddbImgN from '@/assets/index/xddb_n.png'
  import xddbImgS from '@/assets/index/xddb_s.png'
  import pqImgN from '@/assets/index/pq_n.png'
  import pqImgS from '@/assets/index/pq_s.png'
  // display1 判断按钮是否显示  查看数据
  // display2 判断按钮是否显示  选点对比
  // display3 判断按钮是否显示  剖    切
  export default {
    name: 'ItemBut',
    data () {
      return {
        backgroundDiv1: {
          backgroundImage: 'url(' + sjckImgN + ')'
        },
        backgroundAction1: {
          backgroundImage: 'url(' + sjckImgS + ')'
        },
        backgroundDiv2: {
          backgroundImage: 'url(' + xddbImgN + ')'
        },
        backgroundAction2: {
          backgroundImage: 'url(' + xddbImgS + ')'
        },
        backgroundDiv3: {
          backgroundImage: 'url(' + pqImgN + ')'
        },
        backgroundAction3: {
          backgroundImage: 'url(' + pqImgS + ')'
        },
        action1: false,
        action2: false,
        action3: false
      }
    },
    props: [
      'display1',
      'display2',
      'display3',
      'action4'
    ],
    watch: {
      // 使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
      action4: function (newVal, oldVal) {
        if (newVal === false) {
          this.action2 = newVal
        }
      }
    },
    methods: {
      handerClick (e) {
        if (e === 1) {
          if (this.action1) {
            this.action1 = false
            this.$parent.dataViewDialogFalse()
          } else {
            this.action1 = true
            this.action2 = false
            this.action3 = false
            this.$parent.dataViewDialogTrue()
          // this.$parent.pickPointFun()
          }
        } else if (e === 2) {
          if (this.action2) {
            this.action2 = false
            this.$parent.pickPointFun()
          } else {
            this.action2 = true
            this.action1 = false
            this.action3 = false
            this.$parent.dataViewDialogFalse()
            this.$parent.pickPointFun()
          }
        } else if (e === 3) {
          if (this.action3) {
            this.action3 = false
          } else {
            this.action3 = true
            this.action1 = false
            this.action2 = false
            this.$parent.dataViewDialogFalse()
          }
        }
      }
    }
  }
</script>
