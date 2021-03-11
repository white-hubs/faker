<template>
  <div class="dataViewDialog_box bigViewDialog_box" v-show="show">
      <div class="dialog_header">
          <div class="dialog_header_title">{{title}}</div>
          <img class="dialog_header_img" src="@/assets/index/close.png" alt="" @click="closeClick">
      </div>
      <div class="dialog_center drilling_center">
          <slot></slot>
      </div>
  </div>
</template>
<script>

  export default {
    name: 'BigViewDialog',
    data () {
      return {

      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      }
    },
    methods: {
      closeClick () {
        this.$parent.bigViewDialog()
      }
    }
  }
</script>

<style lang="scss" scoped>
.bigViewDialog_box{
    position: absolute;
    width: auto;
    height: calc(100% - 2.7037vh);
    margin: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    top:0;
}
.drilling_center{
    height: calc(100% - 3.708vh);
}
</style>
