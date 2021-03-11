<template>
  <div class="comparedDataDialog_box" v-show="show">
    <div class="dialog_header">
      <div class="dialog_header_title">{{ text }}</div>
      <img
        class="dialog_header_img"
        src="@/assets/index/close.png"
        alt=""
        @click="closeClick"
      />
    </div>
    <div class="dialog_center">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ComparedDataDialog',
    data () {
      return {}
    },
    props: ['text', 'show'],
    methods: {
      closeClick () {
        this.$parent.formTableFlase()
      }
    }
  }
</script>
