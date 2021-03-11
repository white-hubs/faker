<template>
  <div class="home">
    <keep-alive>
      <Header :toNum="0" />
    </keep-alive>
    <div class="home_content home_content_index">
      <div class="home_index_header">
        <ContentHeader
          v-for="item in contentHeaderDate"
          :key="item.id"
          :title="item.title"
          :value="item.value"
          :src="item.src"
          :id="item.id"
        />
      </div>
      <div class="home_index_clickBut">
        <div class="index_clickBut_item" v-on:click="doSomething">
          <div class="divbg1" v-show="isActiveClick1"></div>
          <div id="divbg1" class="divbgsvga" v-show="isActive1"></div>
          <div>安全区</div>
        </div>
        <div class="index_clickBut_item" v-on:click="doSomething2">
          <div class="divbg2" v-show="isActiveClick2"></div>
          <div id="divbg2" class="divbgsvga" v-show="isActive2"></div>
          <div>基本安全区</div>
        </div>
        <div class="index_clickBut_item" v-on:click="doSomething3">
          <div class="divbg3" v-show="isActiveClick3"></div>
          <div id="divbg3" class="divbgsvga" v-show="isActive3"></div>
          <div>安全较差区</div>
        </div>
      </div>
      <!-- <img class="home_index_imgbg" src="./../../assets/home_map.svg" alt=""> -->
      <div class="home_left">
        <div class="left_planning home_content_bg">
          <div class="lefttop"></div>
          <div class="righttop"></div>
          <div class="rightbottom"></div>
          <div class="leftbottom"></div>
          <div class="title_height"></div>
          <LabelTitle :labelTitle="planning" />
          <div class="left_plann_title">
            <Distance
              v-for="item in distanceDate"
              :key="item.id"
              :title="item.title"
              :value="item.value"
              :id="item.id"
              :src="item.src"
            />
          </div>
          <div class="left_plann_content">
            <div class="left_plann_item">
              <img src="./../../assets/index/tielu.png" alt="" />
              <div>{{basicInfo.railway}}</div>
            </div>
            <div class="left_plann_item">
              <img src="./../../assets/index/gaoshu.png" alt="" />
              <div>{{basicInfo.highspeed}}</div>
            </div>
            <div class="left_plann_item">
              <img src="./../../assets/index/ditie.png" alt="" />
              <div>{{basicInfo.metro}}</div>
            </div>
          </div>
        </div>
        <div class="left_geothermal home_content_bg">
          <div class="lefttop"></div>
          <div class="righttop"></div>
          <div class="rightbottom"></div>
          <div class="leftbottom"></div>
          <div class="title_height"></div>
          <LabelTitle :labelTitle="geothermal" style="margin-top:0.1rem;" />
          <div class="geothermal_type_box">
            <div class="geothermal_img" id="geothermalImg">
              <!-- <img src="./../../assets/index/drzylx.png" alt="" /> -->
            </div>
            <div class="geothermal_centens">
              <div class="geothermal_title">地热资源类型</div>
              <div class="geothermal_num">{{drinfoTitle}}</div>
            </div>
          </div>
          <div class="geothermal_title_box" @click="toGeology">
            <div>中深层地热开发利用靶区</div>
            <img src="./../../assets/index/to.png" alt="" />
          </div>
          <ShowOff
            v-for="item in geothermalDate"
            :key="item.itemNum"
            :itemList="item.item"
            :itemName="item.name"
          />
        </div>
      </div>
      <div class="home_right">
        <div class="right_chemistry home_content_bg">
          <div class="lefttop"></div>
          <div class="righttop"></div>
          <div class="rightbottom"></div>
          <div class="leftbottom"></div>
          <div class="title_height"></div>
          <LabelTitle :labelTitle="chemistry" />
          <div class="chemistry_bar">
            <EchartsBar :data="wcInfo" v-if="wcInfo.length>0"/>
          </div>
        </div>
        <div class="right_soil home_content_bg">
          <div class="lefttop"></div>
          <div class="righttop"></div>
          <div class="rightbottom"></div>
          <div class="leftbottom"></div>
          <div class="title_height"></div>
          <LabelTitle :labelTitle="soil" />
          <div
          @mouseover="onmouseover"
          @mouseleave="onmoseout"
          >
            <div class="soil_tab">
              <li
                class="soil_tab_item"
                v-for="(item, index) in tabs"
                :key="index"
                :class="{ soil_tab_active: index == mark }"
                @click="tab(index)"
              >
                {{ item }}
              </li>
            </div>
            <div class="tabCon">
              <div class="tabCon_item">
                <DoughnutChart :data="doughChart" :id="doughChartId" :title="doughChartTitle" v-if="doughChart.length>0"/>
              </div>
              <!-- <div class="tabCon_item" v-if="1===mark">
                <DoughnutChart :data="ph" :id="phId" :mark="mark" v-if="ph.length>0"/>
              </div>
              <div class="tabCon_item" v-if="2===mark">
                <DoughnutChart :data="ceEle" :mark="mark" :id="ceEleId" v-if="ceEle.length>0"/>
              </div> -->
            </div>
          </div>
        </div>
        <div class="right_landscape home_content_bg">
          <div class="lefttop"></div>
          <div class="righttop"></div>
          <div class="rightbottom"></div>
          <div class="leftbottom"></div>
          <div class="title_height"></div>
          <LabelTitle :labelTitle="landscape" />
          <div class="landscape_list">
            <LandscapeItem
              v-for="item in landscapeDate"
              :key="item.id"
              :title="item.title"
              :value="item.value"
              :src="item.src"
              :id="item.id"
            />
          </div>
        </div>
      </div>
      <div class="bg_left"></div>
      <div class="bg_right"></div>
      <div class="bg_top"></div>
      <div class="bg_buttom"></div>
      <div class="home_content_map">
        <IndexMap
          :isActive1="isActive1"
          :isActive2="isActive2"
          :isActive3="isActive3"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import SVGA from 'svgaplayerweb'
  import Header from './../../components/Header'
  import LabelTitle from './components/LabelTitle'
  import Distance from './components/Distance'
  import ShowOff from './components/ShowOff'
  import EchartsBar from './components/EchartsBar'
  import LandscapeItem from './components/LandscapeItem'
  import DoughnutChart from './components/DoughnutChart'
  import ContentHeader from './components/ContentHeader'
  import IndexMap from './components/indexMap'

  import { postQueryInitData } from '../../api/index'
  export default {
    name: 'Index',
    data () {
      return {
        queryIndexData: postQueryInitData,
        // 判断是否显示安全区静态图片
        isActiveClick1: false,
        isActiveClick2: true,
        isActiveClick3: true,
        // 判断是否显示SVGA动画
        isActive1: true,
        isActive2: false,
        isActive3: false,
        planning: '规划区基础信息',
        geothermal: '地热资源统计',
        chemistry: '水化学类型统计',
        soil: '土壤资源统计',
        landscape: '景观资源统计',
        landscapeDate: [],
        distanceDate: [],
        contentHeaderDate: [],
        geothermalDate: [],
        tabs: ['镉元素等级', 'PH参数值', '肥力要素等级'],
        tabContents: ['馨厨S系列', '内容二', '内容三'],
        num: 0,
        cur: 0,
        // 规划区基础信息和地图上方基本信息
        basicInfo: '',
        // 景观数据
        sceneryInfo: '',
        // 饼图数据
        trInfo: '',
        // 饼图绑定数据
        doughChart: '',
        doughChartId: '',
        doughChartTitle: '',
        // 镉元素数据
        fertility: '',
        fertilityId: 'fertilityId',
        // ph数据
        ph: '',
        phId: 'phId',
        // 费力要素
        ceEle: '',
        ceEleId: 'ceEleId',
        mark: 0,
        wcInfo: '',
        onmouseoverIs: true,
        drinfo: '',
        drinfoTitle: ''
      }
    },
    mounted () {
      // 地热资源
      var player = new SVGA.Player('#geothermalImg')
      var parser = new SVGA.Parser('#geothermalImg')
      parser.load('/svga/geothermal/drzy.svga', function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
      // 安全区域
      var safetyPlayer = new SVGA.Player('#divbg1')
      var safetyParser = new SVGA.Parser('#divbg1')
      safetyParser.load('/svga/safetyZone/aqq_s.svga', function (videoItem) {
        safetyPlayer.setVideoItem(videoItem)
        safetyPlayer.startAnimation()
      })
      // 基本安全区
      var basicPlayer = new SVGA.Player('#divbg2')
      var basicParser = new SVGA.Parser('#divbg2')
      basicParser.load('/svga/safetyZone/jbaqq_s.svga', function (videoItem) {
        basicPlayer.setVideoItem(videoItem)
        basicPlayer.startAnimation()
      })
      // 安全较差区
      var poorPlayer = new SVGA.Player('#divbg3')
      var poorParser = new SVGA.Parser('#divbg3')
      poorParser.load('/svga/safetyZone/aqjcq_s.svga', function (videoItem) {
        poorPlayer.setVideoItem(videoItem)
        poorPlayer.startAnimation()
      })
      // 获取首页数据
      this.getInitData()
    },
    created () {
      this.play()
    },
    methods: {
      tab (index) {
        this.mark = index
        if (this.mark === 0) {
          this.doughChart = this.fertility
          this.doughChartId = this.fertilityId
          this.doughChartTitle = '土壤镉元素'
        }
        if (this.mark === 1) {
          this.doughChart = this.ph
          this.doughChartId = this.phId
          this.doughChartTitle = 'PH参数'
        }
        if (this.mark === 2) {
          this.doughChart = this.ceEle
          this.doughChartId = this.ceEleId
          this.doughChartTitle = '肥力要素'
        }
      },
      onmouseover (event) {
        this.onmouseoverIs = false
      },
      onmoseout (event) {
        this.onmouseoverIs = true
      },
      autoPlay () {
        if (this.onmouseoverIs) {
          this.mark++
          if (this.mark === 0) {
            this.doughChart = this.fertility
            this.doughChartId = this.fertilityId
            this.doughChartTitle = '土壤镉元素'
          }
          if (this.mark === 1) {
            // this.mark = 0
            this.doughChart = this.ph
            this.doughChartId = this.phId
            this.doughChartTitle = 'PH参数'
          }
          if (this.mark === 2) {
            this.doughChart = this.ceEle
            this.doughChartId = this.ceEleId
            this.doughChartTitle = '肥力要素'
          // this.mark = 0
          }
          if (this.mark === 3) {
            this.mark = 0
            this.doughChart = this.fertility
            this.doughChartId = this.fertilityId
            this.doughChartTitle = '土壤镉元素'
          }
        }
      },
      play () {
        setInterval(this.autoPlay, 3000)
      },
      change (i) {
        this.mark = i
      },
      async getInitData () {
        if (!this.queryIndexData) {
          console.log(11)
        // nothing todo
        } else {
          try {
            const data = await this.queryIndexData()
            // 地热资源统计
            this.drinfo = data.drInfo.distribution
            this.drinfoTitle = data.drInfo.type
            for (var j = 0; j < this.drinfo.length; j++) {
              var geoDataObj = {
                name: this.drinfo[j][0],
                item: [
                  {
                    itemNum: this.drinfo[j][1],
                    itemName: '热储厚度(m)'
                  },
                  {
                    itemNum: this.drinfo[j][2],
                    itemName: '热储厚度(m)'
                  }
                ]
              }
              this.geothermalDate.push(geoDataObj)
            }
            // 规划区基础信息和地图上方基本信息
            this.basicInfo = data.basicInfo

            // 规划区基础数据重组
            this.distanceDate = [
              {
                title: '双流国际机场',
                value: this.basicInfo.disShuangliuAirport,
                src: '/svga/planningArea/ju.svga',
                id: '1'
              },
              {
                title: '天府广场',
                value: this.basicInfo.disTianfuSquare,
                src: '/svga/planningArea/ju.svga',
                id: '2'
              },
              {
                title: '天府国际机场',
                value: this.basicInfo.disTianfuAirport,
                src: '/svga/planningArea/ju.svga',
                id: '3'
              }]
            // 地图上面的基础数据
            this.contentHeaderDate = [
              {
                id: '1',
                title: '年平均气温',
                value: `${this.basicInfo.annualAvgTemp}℃`,
                src: '/svga/planningArea/qw.svga'
              },
              {
                id: '2',
                title: '年平均湿度',
                value: this.basicInfo.annualAvgHmdt,
                src: '/svga/planningArea/sd.svga'
              },
              {
                id: '3',
                title: '年平均日照',
                value: this.basicInfo.annualAvgSunshine,
                src: '/svga/planningArea/rz.svga'
              },
              {
                id: '4',
                title: '年平均降水',
                value: this.basicInfo.annualAvgPpt,
                src: '/svga/planningArea/js.svga'
              },
              {
                id: '5',
                title: '最高海拔',
                value: this.basicInfo.maxAsl,
                src: '/svga/planningArea/zghb.svga'
              },
              {
                id: '6',
                title: '最低海拔',
                value: this.basicInfo.minAsl,
                src: '/svga/planningArea/zdhb.svga'
              }
            ]
            // 景观数据
            this.sceneryInfo = data.sceneryInfo
            // 景观数据赋值
            this.landscapeDate = [
              {
                id: '1',
                title: '生物景观',
                value: this.sceneryInfo[0],
                src: '/svga/landscape/swjg.svga'
              },
              {
                id: '2',
                title: '建筑与设施',
                value: this.sceneryInfo[1],
                src: '/svga/landscape/jzyss.svga'
              },
              {
                id: '3',
                title: '历史遗迹',
                value: this.sceneryInfo[2],
                src: '/svga/landscape/lsyj.svga'
              },
              {
                id: '4',
                title: '地质剖面',
                value: this.sceneryInfo[3],
                src: '/svga/landscape/dzpm.svga'
              },
              {
                id: '5',
                title: '地貌景观',
                value: this.sceneryInfo[4],
                src: '/svga/landscape/dmjg.svga'
              },
              {
                id: '6',
                title: '古生物',
                value: this.sceneryInfo[5],
                src: '/svga/landscape/gsw.svga'
              },
              {
                id: '7',
                title: '水体景观',
                value: this.sceneryInfo[6],
                src: '/svga/landscape/stjg.svga'
              },
              {
                id: '8',
                title: '矿物与矿床',
                value: this.sceneryInfo[7],
                src: '/svga/landscape/kwykc.svga'
              }
            ]
            const trInfo = data.trInfo
            // 镉元素数据
            this.fertility = trInfo.fertility
            this.doughChart = this.fertility
            this.doughChartId = this.fertilityId
            // ph数据
            this.ph = trInfo.ph
            // 费力要素
            this.ceEle = trInfo.ceEle
            // 水化学
            this.wcInfo = data.wcInfo
          } catch (err) {
            console.log('errrrr++++++++', err)
            if (err === 20003) {
              this.$message.error('登录过期')
              window.sessionStorage.token = ''
              this.$router.push('/')
            } else if (err === 20004) {
              this.$message.error('暂无权限')
              this.$router.push('/index')
            }
          }
        }
      },
      toGeology () {
        var id = 35
        this.$router.push({ path: '/geology', query: { id: id } })
      },
      doSomething () {
        if (this.isActive1) {
          this.isActive1 = false
          this.isActiveClick1 = true
        } else {
          this.isActive1 = true
          this.isActiveClick1 = false
        }
      },
      doSomething2 () {
        if (this.isActive2) {
          this.isActive2 = false
          this.isActiveClick2 = true
        } else {
          this.isActive2 = true
          this.isActiveClick2 = false
        }
      },
      doSomething3 () {
        if (this.isActive3) {
          this.isActive3 = false
          this.isActiveClick3 = true
        } else {
          this.isActive3 = true
          this.isActiveClick3 = false
        }
      }

    },
    components: {
      Header,
      LabelTitle,
      Distance,
      ShowOff,
      EchartsBar,
      LandscapeItem,
      DoughnutChart,
      ContentHeader,
      IndexMap
    }
  }
</script>

<style scoped>
/* .ol-attribution,
.ol-zoom {
  display: none;
} */
</style>
