<template>
  <div class="landscapeItem_box">
      <div class="landscapeItem_box_img" :id="`landscape${id}`">
          <!-- <img :src="src" alt=""> -->
      </div>
      <div class="landscapeItem_box_centens">
          <div class="landscapeItem_box_title">{{title}}</div>
          <div class="landscapeItem_num_box">
              <div class="landscapeItem_box_num_">{{value}}</div>
              <div class="landscapeItem_box_num">处</div>
          </div>
      </div>
  </div>
</template>

<script>
  import SVGA from 'svgaplayerweb'
  export default {
    name: 'LandscapeItem',
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
      var player = new SVGA.Player(`#landscape${this.id}`)
      var parser = new SVGA.Parser(`#landscape${this.id}`)
      parser.load(`${this.src}`, function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
    },
    methods: {
    }
  }
</script>
