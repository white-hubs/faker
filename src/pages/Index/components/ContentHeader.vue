<template>
  <div class="contentHeader_box">
      <div class="contentHeader_img">
          <!-- <img :src="src" alt=""> -->
          <div class="contentHeaderSvga" :id="`contentHeaderImg${id}`"></div>
          <div class="contentHeader_title">{{title}}</div>
      </div>
      <div class="contentHeader_centens">
          <div class="contentHeader_num">{{value}}</div>
      </div>
  </div>
</template>

<script>
  import SVGA from 'svgaplayerweb'
  export default {
    name: 'ContentHeader',
    data () {
      return {
        msg: '首页'
      }
    },
    props: [
      'title',
      'value',
      'src',
      'id'
    ],
    mounted () {
      var player = new SVGA.Player(`#contentHeaderImg${this.id}`)
      var parser = new SVGA.Parser(`#contentHeaderImg${this.id}`)
      parser.load(`${this.src}`, function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
    }
  }
</script>
