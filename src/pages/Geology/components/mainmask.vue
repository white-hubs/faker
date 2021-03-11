<template>
    <div id="mask" :class="isshow?'mask':'mask-active'" v-show="maskshow">
      <div class="disaster" v-show="whitch.id===74">
    <div class="cheimg" @click="show">
      <img :src="isshow?showimg:falseimg" alt="">
    </div>
    <div class="mask-title">
      <div class="mask-img" id="mask-img1">
        <!-- <img src="../../../assets/icons/dm.png" alt=""> -->
      </div>
      <div class="mask-name">
        {{maskdata.NAME}}
      </div>
    </div>
    <div class="conter">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <ul>
        <li>
          <p class="name">统一编号</p>
          <p class="value">{{maskdata.BH}}</p>
        </li>
        <li>
            <p class="name">运动形式</p>
          <p class="value">未知</p>
        </li>
        <li>
            <p class="name">滑坡类型</p>
          <p class="value">{{maskdata.GMDJ}}</p>
        </li>
        <li>
            <p class="name">主滑方向</p>
          <p class="value">未知</p>
        </li>
        <li>
            <p class="name">滑坡速度</p>
          <p class="value">未知</p>
        </li>
        <li>
            <p class="name">滑坡面积</p>
          <p class="value">未知</p>
        </li>
        <li>
          <p class="name">规模等级</p>
          <p class="value">未知</p>
        </li>
          <li>
          <p class="name">滑坡时间</p>
          <p class="value">未知</p>
        </li>
      </ul>
    </div>
    <div class="view">
      <ul>
        <li  :class="!classche?'notli':'li'" @click="cheoutli">照片</li>
        <li  :class="classche?'notli':'li'" @click="cheoutlis">剖面图</li>
      </ul>
      <ul class="li-views">
        <li v-show="!classche"> <div v-for="(item, j ) in testimg " :key = j class="imgbox">
          <img :src="item.img" alt=""></div></li>
        <li v-show="classche"><div v-for="(item, j ) in testsimg " :key = j class="imgbox">
          <img :src="item.img" alt=""></div></li>
      </ul>
    </div>
    </div>
    <!-- 崩塌 -->
    <div class="disaster" v-show="whitch.id===72">
    <div class="cheimg" @click="show">
      <img :src="isshow?showimg:falseimg" alt="">
    </div>
    <div class="mask-title">
      <div class="mask-img" id="mask-img11">
        <!-- <img src="../../../assets/icons/dm.png" alt=""> -->
      </div>
      <div class="mask-name">
        {{maskdata.NAME}}
      </div>
    </div>
    <div class="conters">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <ul>
        <!-- <li v-for=" (item,i) in test" :key = i>
          <p class="name">{{item.name}}</p>
          <p class="value">{{item.value}}</p>
        </li> -->
        <li>
          <p class="name">统一编号</p>
          <p class="value">{{maskdata.BH}}</p>
        </li>
        <li>
            <p class="name">运动形式</p>
          <p class="value">未知</p>
        </li>        <li>
            <p class="name">崩塌类型</p>
          <p class="value">{{maskdata.GMDJ}}</p>
        </li>        <li>
            <p class="name">崩塌扩展方式</p>
          <p class="value">未知</p>
        </li>        <li>
            <p class="name">主崩方向</p>
          <p class="value">未知</p>
        </li>        <li>
            <p class="name">最大落差</p>
          <p class="value">未知</p>
        </li>        <li>
            <p class="name">规模等级</p>
          <p class="value">未知</p>
        </li>
        <li>
          <p class="name">灾情等级</p>
          <p class="value">未知</p>
        </li>
                <li>
          <p class="name">险情等级</p>
          <p class="value">未知</p>
        </li>
                <li>
          <p class="name">崩塌时间</p>
          <p class="value">未知</p>
        </li>
      </ul>
    </div>
    <div class="view">
      <ul>
        <li  :class="!classche?'notli':'li'" @click="cheoutli">照片</li>
        <li  :class="classche?'notli':'li'" @click="cheoutlis">剖面图</li>
      </ul>
      <ul class="li-views">
        <li v-show="!classche"> <div v-for="(item, j ) in testimg " :key = j class="imgbox">
          <img :src="item.img" alt=""></div></li>
        <li v-show="classche"><div v-for="(item, j ) in testsimg " :key = j class="imgbox">
          <img :src="item.img" alt=""></div></li>
      </ul>
    </div>
    </div>
    <!-- 不稳定斜坡 -->
    <div class="disaster" v-show="whitch.id===73">
    <div class="cheimg" @click="show">
      <img :src="isshow?showimg:falseimg" alt="">
    </div>
    <div class="mask-title">
      <div class="mask-img" id="mask-img1">
        <!-- <img src="../../../assets/icons/dm.png" alt=""> -->
      </div>
      <div class="mask-name">
        {{maskdata.NAME}}
      </div>
    </div>
    <div class="conter">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <ul>
        <li>
          <p class="name">统一编号</p>
          <p class="value">{{maskdata.BH}}</p>
        </li>
        <li>
            <p class="name">运动形式</p>
          <p class="value">未知</p>
        </li>
        <li>
            <p class="name">斜坡类型</p>
          <p class="value">{{maskdata.GMDJ}}</p>
        </li>
        <li>
            <p class="name">斜坡方向</p>
          <p class="value">未知</p>
        </li>
        <li>
            <p class="name">最大落差</p>
          <p class="value">未知</p>
        </li>
        <li>
            <p class="name">规模等级</p>
          <p class="value">未知</p>
        </li>
        <li>
          <p class="name">灾情等级</p>
          <p class="value">未知</p>
        </li>
          <li>
          <p class="name">险情等级</p>
          <p class="value">未知</p>
        </li>
          <li>
          <p class="name">时间</p>
          <p class="value">未知</p>
        </li>
      </ul>
    </div>
    <div class="view">
      <ul>
        <li  :class="!classche?'notli':'li'" @click="cheoutli">照片</li>
        <li  :class="classche?'notli':'li'" @click="cheoutlis">剖面图</li>
      </ul>
      <ul class="li-views">
        <li v-show="!classche"> <div v-for="(item, j ) in testimg " :key = j class="imgbox">
          <img :src="item.img" alt=""></div></li>
        <li v-show="classche"><div v-for="(item, j ) in testsimg " :key = j class="imgbox">
          <img :src="item.img" alt=""></div></li>
      </ul>
    </div>
    </div>
    <!-- 传感器 -->
    <div class="disaster" v-show="whitch.id===84">
    <div class="cheimg" @click="show">
      <img :src="isshow?showimg:falseimg" alt="">
    </div>
    <div class="mask-title">
      <div class="mask-img" id="mask-img2">
        <!-- <img src="../../../assets/icons/cgq.png" alt=""> -->
        <!-- <div ></div> -->
      </div>
      <div class="mask-name">
        传感器名称
      </div>
    </div>
    <div class="sensorname">
      传感器监测实况：
    </div>
    <div class="sensorconter">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
    <ul>
      <li>
        <p class="name"><i class="hk-icon-temperature"></i>温度</p>
        <p class="value">20°C</p>
      </li>
      <li>
         <p class="name"><i class="hk-icon-humidity"></i>湿度</p>
        <p class="value">12°C</p>
      </li>
      <li>
         <p class="name"><i class="hk-icon-precipitation"></i>降水量</p>
        <p class="value">30mm/h</p>
      </li>
    </ul>
    </div>
    <div class="sensorname">
      设备信息：
    </div>
    <div class="sensorlast">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <ul>
        <li>
        <p class="name">设备名称</p>
        <p class="value">{{maskdata.name}}</p>
        </li>
        <li>
        <p class="name">负责人</p>
        <p class="value">{{maskdata.chargePerson}}</p>
        </li>
        <li>
        <p class="name">安装时间</p>
        <p class="value">{{maskdata.updatedAt}}</p>
        </li>
      </ul>
    </div>
    </div>
        <!-- 摄像头 -->
    <div class="disaster" v-show="whitch.id===85">
    <div class="cheimg" @click="show">
      <img :src="isshow?showimg:falseimg" alt="">
    </div>
    <div class="mask-title">
      <div class="mask-img" id="mask-img3">
        <!-- <img src="../../../assets/icons/sxt.png" alt=""> -->
      </div>
      <div class="mask-name">
        摄像头名称
      </div>
    </div>
    <div class="sensorname">
      摄像头监测实况：
    </div>
    <div class="cameraconter">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <div class="notdata">
        <img src="../../../assets/icons/null.png" alt="">
        <p>暂无数据</p>
      </div>
    </div>
    <div class="sensorname">
      设备信息：
    </div>
    <div class="sensorlast">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <ul>
        <li>
        <p class="name">设备名称</p>
        <p class="value">{{maskdata.name}}</p>
        </li>
        <li>
        <p class="name">负责人</p>
        <p class="value">{{maskdata.chargePerson}}</p>
        </li>
        <li>
        <p class="name">安装时间</p>
        <p class="value">{{maskdata.updatedAt}}</p>
        </li>
      </ul>
    </div>
    </div>
    <!-- 钻孔 -->
    <div class="disaster" v-show="whitch.id===86">
    <div class="cheimg" @click="show">
      <img :src="isshow?showimg:falseimg" alt="">
    </div>
    <div class="mask-title">
      <div class="mask-img" id="mask-img4">
        <!-- <img src="../../../assets/icons/sxt.png" alt=""> -->
      </div>
      <div class="mask-name">
        <p class="zkname">钻孔编号</p>
          {{maskdata.zkbh}}
      </div>
    </div>
    <div class="sensorname">
      设备信息：
    </div>
    <div class="conterss">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="leftbottom"></div>
      <div class="rightbottom"></div>
      <ul>
        <li>
        <p class="name">地理位置</p>
        <p class="value">{{maskdata.jd}}N° {{maskdata.wd}}E°</p>
        </li>
        <li>
        <p class="name">钻孔类型</p>
        <p class="value">{{zktype}}</p>
        </li>
        <li>
        <p class="name">孔口标高</p>
        <p class="value">{{maskdata.kkbg}}m</p>
        </li>
        <li>
        <p class="name">钻孔深度 </p>
        <p class="value">{{maskdata.zksd}}m</p>
        </li>
        <li>
        <p class="name">钻孔斜度</p>
        <p class="value">{{maskdata.zkxd}}</p>
        </li>
        <li>
        <p class="name">开孔口径</p>
        <p class="value">{{maskdata.kkkj}}mm</p>
        </li>
        <li>
        <p class="name">终孔口径</p>
        <p class="value">{{maskdata.zkkj}}mm</p>
        </li>
        <li>
        <p class="name"> 开始日期</p>
        <p class="value">{{maskdata.zkksrq}}</p>
        </li>
        <li>
        <p class="name">结束如期</p>
        <p class="value">{{maskdata.zkjsrq}}</p>
        </li>
        <li>
        <p class="name">静止水位</p>
        <p class="value">{{maskdata.jzsw}}</p>
        </li>
      </ul>
    </div>
        <div class="view" v-if="maskdata.zkzht">
      <ul>
        <li  :class="!classche?'notli':'li'" @click="cheoutli">柱状图</li>
        <!-- <li  :class="classche?'notli':'li'" @click="cheoutlis">剖面图</li> -->
      </ul>
      <ul class="li-views">
        <li v-show="!classche"> <div  class="imgbox">
          <img :src="this.imgurl+maskdata.zkzht" alt="" @click="imgshow"></div></li>
      </ul>
    </div>
    </div>
      <ImgView  :imgurl='maskdata.zkzht' :visible.sync="dialogVisible" :title="dialogTitle" width='45%'></ImgView>
       <!-- <open-layers style="height:600px;"/> -->
  </div>
</template>
<script>
  import SVGA from 'svgaplayerweb'
  import ImgView from '../../../components/ImgView'
  import { ZKtype } from '../../../constant/Geothermal'
  const IMGURL = process.env.VUE_APP_IMG_SERVER
  export default {
    name: 'mainmask',
    data () {
      return {
        showimg: require('../../../assets/icons/panel_fold.png'),
        falseimg: require('../../../assets/icons/panel_unfold.png'),
        maskshow: true,
        classche: false,
        // isshow: false,
        dialogVisible: false,
        dialogTitle: '图片查看',
        test: [
          {
            name: '统一编号',
            value: 1150808012318181100
          },
          {
            name: '运动形式',
            value: '运动形式运动形式运动形式'
          },
          {
            name: '滑体类型',
            value: '滑体类型滑体类型滑体类型'
          },
          {
            name: '主滑方向',
            value: '251.1°'
          },
          {
            name: '滑坡速度',
            value: '5m/s'
          },
          {
            name: '滑坡面积',
            value: '12545.2m²'
          },
          {
            name: '规模等级',
            value: '特大型'
          },
          {
            name: '滑坡时间',
            value: '2012-02-21'
          }
        ],
        testimg: [
          { img: require('../../../assets/img/img1.png') },
          { img: require('../../../assets/img/img2.png') }
        ],
        testsimg: [
          { img: require('../../../assets/img/img2.png') },
          { img: require('../../../assets/img/img1.png') }
        ]
      }
    },
    props: ['whitch', 'isshow', 'maskdata'],
    methods: {
      show () {
        this.isshow = !this.isshow
      },
      cheoutli () {
        this.classche = false
      },
      cheoutlis () {
        this.classche = true
      },
      imgshow () {
        this.dialogVisible = true
      }
    },
    watch: {
      maskdata (value) {
      }
    },
    mounted () {
      console.log('1213213', this.imgurl)
      var player1 = new SVGA.Player('#mask-img1')
      var parser1 = new SVGA.Parser('#mask-img1')
      parser1.load('/svga/login/dm.svga', function (videoItem) {
        player1.setVideoItem(videoItem)
        player1.startAnimation()
      })

      var player2 = new SVGA.Player('#mask-img2')
      var parser2 = new SVGA.Parser('#mask-img2')
      parser2.load('/svga/login/cgq.svga', function (videoItem) {
        player2.setVideoItem(videoItem)
        player2.startAnimation()
      })
      var player3 = new SVGA.Player('#mask-img3')
      var parser3 = new SVGA.Parser('#mask-img3')
      parser3.load('/svga/login/sxt.svga', function (videoItem) {
        player3.setVideoItem(videoItem)
        player3.startAnimation()
      })
      var player4 = new SVGA.Player('#mask-img4')
      var parser4 = new SVGA.Parser('#mask-img4')
      parser4.load('/svga/login/zkxx.svga', function (videoItem) {
        player4.setVideoItem(videoItem)
        player4.startAnimation()
      })
      console.log(1111)

      var player11 = new SVGA.Player('#mask-img11')
      var parser11 = new SVGA.Parser('#mask-img11')
      parser11.load('/svga/login/dm.svga', function (videoItem) {
        player11.setVideoItem(videoItem)
        player11.startAnimation()
      })
    },
    updated () {},
    computed: {
      imgurl () {
        return IMGURL
      },
      zktype () {
        return ZKtype[this.maskdata.zklx]
      }
    },
    components: {
      ImgView
      // OpenLayers
    }
  }
</script>
