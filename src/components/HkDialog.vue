<template>
  <el-dialog
    class="tp-dialog"
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="$emit('update:visible', false)"
    :width="width">
    <slot />
  </el-dialog>
</template>

<script>
  export default {
    name: 'HkDialog',

    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '50%'
      }
    }
  }
</script>
