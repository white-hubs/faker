<template>
  <div class="dataViewDialog_box" v-show="show">
      <div class="dialog_header">
          <div class="dialog_header_title">{{title}}</div>
          <img class="dialog_header_img" src="@/assets/index/close.png" alt="" @click="closeClick">
      </div>
      <div class="dialog_center">
          <slot></slot>
      </div>
  </div>
</template>
<script>

  export default {
    name: 'DataViewDialog',
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
        this.$parent.dataViewDialogFalse()
      }
    }
  }
</script>
