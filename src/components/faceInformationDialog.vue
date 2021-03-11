<template>
  <div class="faceInformationDialog_box" v-show="show">
    <div class="face_title_box">
      <div class="titleBg" id="titleBg"></div>
      <div class="title">{{text}}</div>
    </div>
    <div class="faceCenter">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import SVGA from 'svgaplayerweb'
  export default {
    name: 'faceInformationDialog',
    data () {
      return {

      }
    },
    props: [
      'text',
      'show',
      'isImg'// isImg = '0' 钻孔图标 '1' 其他图标
    ],
    methods: {
      closeClick () {
        this.$parent.formTableFlase()
      }
    },
    mounted () {
      if (this.isImg === '1') {
        this.urlSvga = '/svga/decisionMaking/dzcmc.svga'
      } else {
        this.urlSvga = '/svga/decisionMaking/zkxx.svga'
      }
      var player = new SVGA.Player('#titleBg')
      var parser = new SVGA.Parser('#titleBg')
      parser.load(`${this.urlSvga}`, function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
    }
  }
</script>
