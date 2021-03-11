<template>
  <div class="drawer_box" v-show="show">
    <div class="setbox" :class="{ show: isshow }">
      <div class="cheimg" @click="open()" v-show="show">
        <img :src="isshow ? showimg : falseimg" alt="" />
      </div>
      <div class="face_title_box">
          <div class="face_title">
            <div class="titleBg" id="titleBg"></div>
            <div class="title">{{text}}</div>
          </div>
          <div class="img" @click="closeClick"></div>
        </div>
      <div class="faceCenter">
        <div class="lefttop"></div>
        <div class="righttop"></div>
        <div class="leftbottom"></div>
        <div class="rightbottom"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import SVGA from 'svgaplayerweb'
  export default {
    name: 'Drawer',
    data () {
      return {
        // isshow: true,
        showimg: require('../assets/icons/panel_fold.png'),
        falseimg: require('../assets/icons/panel_unfold.png')
      }
    },
    methods: {
      open () {
        this.$parent.tabIsshow()
      },
      closeClick () {
        this.$parent.faceClick()
      }
    },
    props: [
      'isshow', // 判断抽屉的状态
      'text', // 显示层名字
      'show', // 盒子是否显示
      'isImg'// isImg = '0' 钻孔图标 '1' 其他图标
    ],
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
