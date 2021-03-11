<template>
  <div class="distance_box">
      <div class="distance_img" :id="`distanceImg${id}`">
          <!-- <div class="distance_svga" :id="`distanceImg${id}`"></div> -->
          <!-- <img src="./../../../assets/index/ju.png" alt=""> -->
      </div>
      <div class="distance_centens">
          <div class="distance_title">{{title}}</div>
          <div class="distance_num">{{value}}²</div>
      </div>
  </div>
</template>

<script>
  import SVGA from 'svgaplayerweb'
  export default {
    name: 'Distance',
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
      var player = new SVGA.Player(`#distanceImg${this.id}`)
      var parser = new SVGA.Parser(`#distanceImg${this.id}`)
      parser.load(`${this.src}`, function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
    }
  }
</script>
