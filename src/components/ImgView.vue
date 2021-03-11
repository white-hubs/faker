<template>
<div class="dialogs">
  <el-dialog
    class="tp-dialog"
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="$emit('update:visible', false)"
    :width="width">
     <!-- <img :src="this.imgurls+this.imgurl" alt=""> -->
      <el-image
    :src="this.imgurls+this.imgurl"
    :preview-src-list="[this.imgurls+this.imgurl]">
  </el-image>
    <!-- <viewer >
        <img :src="this.imgurls+this.imgurl">
    </viewer> -->
    <!-- <viewer :images="images">
    <img v-for="src in images" :src="src" :key="src">
</viewer> -->
  </el-dialog>
</div>
</template>

<script>
  const IMGURL = process.env.VUE_APP_IMG_SERVER
  export default {
    data () {
      return {
        images: [this.imgurls]
      }
    },
    name: 'HkDialog',
    props: ['imgurl', 'visible', 'title', 'width'],
    computed: {
      imgurls () {
        return IMGURL
      }
    }
  }
</script>
<style lang="scss">
.dialogs{
.el-dialog{
  height: 600px;
  overflow-y: hidden;
}
.el-dialog__body{
  height: 565px;
  overflow:scroll;
}
.el-dialog__header{
  background-color: #004070;
  padding: 10px;
  height: 45px;
}
.el-dialog__title{
  float: left;
  color: #08C6F4;
  text-align: left;
  font-size: 16px;
  margin-left: 20px;
}
.el-dialog__headerbtn{
  top:16px;
}
}
</style>
