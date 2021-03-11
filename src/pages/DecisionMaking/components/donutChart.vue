<template>
  <div class="doughnut_boxq" style="display: flex;">
    <!-- <div class="doughnut_box_img" id="doughnut_box_img"></div> -->
    <!-- <div class="doughnut_box_div"> -->
      <!-- <img :src="shadowBg" class="doughnut_box_img" alt=""> -->
    <!-- </div> -->

    <div id="doughnut" style="height:310px;width:310px;margin-left: -25px;"></div>
    <div v-show="isData" class="donut_chart_data">
      <div class="chart_box">
        <div class="chart_header">
          <div class="header_icon" :style="{'border': `4px solid ${clickColor}`}"></div>
          <div class="header_name">{{clickData.name}}</div>
          <div class="header_num">共{{clickData.value}}个</div>
        </div>
        <div class="chart_center">
          <div v-for="(item,index) in clickData.data" :key="index" class="chart_item">
            <div class="chart_item_header">
              <div class="item_header_name">{{item.name}}</div>
              <div class="item_header_num">{{item.value}}</div>
            </div>
            <div v-for="(it,i) in item.arr" :key="i" class="chart_item_center">
              <div class="item_center_name">{{it.name}}</div>
              <div class="item_center_num">{{it.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import shadowBg from './../../../assets/index/shadow_bg.png'
  // import chartPurple from './../../../assets/index/chart_purple.png'
  // import chartBlue from './../../../assets/index/chart_blue.png'
  // import chartCyan from './../../../assets/index/chart_cyan.png'
  export default {
    name: 'DonutChart',
    data () {
      return {
        isData: false,
        clickData: '',
        clickColor: ''
      }
    },
    props: [
    ],
    mounted () {
      this.dddd()
    },
    methods: {
      dddd () {
        var that = this
        var echarts = require('echarts')
        var myChart = echarts.init(document.getElementById('doughnut'))
        var option = {
          color: ['#9254DE', '#597EF7', '#13C2C2', '#FCC83D', '#F759AB'],
          graphic: { // 这个属性可以在饼图内部填充图片,文字等
            elements: [{
              type: 'image', // 需要填充图片,配置image,如果不需要图片可以配置其他的, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
              style: {
                image: shadowBg, // 这里添加图片地址
                width: 220,
                height: 220
              },
              left: 'center', //
              // top: 'middle' // 配置图片居中
              top: '13%'
            }]
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['55%', '67%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              itemStyle: {
                borderWidth: 3, //
                borderColor: '#0E1F48'
              },
              labelLine: {
                show: false
              },
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  color: '#4c4a4a',
                  formatter: [
                    '{a|91}',
                    '{b|优质资源总计}'
                  ].join('\n'),

                  rich: {
                    a: {
                      color: '#ffffff',
                      lineHeight: 30,
                      fontWeight: 'normal',
                      fontSize: 32
                    },
                    b: {
                      fontSize: 14,
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontWeight: '400',
                      lineHeight: 35
                    }
                  }
                // formatter: '{a|91}' + '\n\r' + '{active|共发布活动}',
                // formatter: [`{x|91}`, `{y|啊手机打开}`].join('\n'),
                // rich: {
                //   x: {
                //     fontSize: 32,
                //     fontFamily: 'Design System 700R',
                //     fontWeight: 'normal',
                //     lineHeight: 38,
                //     color: 'red'
                //   },
                //   y: {
                //     fontSize: 14,
                //     fontFamily: 'Microsoft YaHei',
                //     fontWeight: '400',
                //     lineHeight: 40,
                //     color: 'rgba(255, 255, 255, 0.65)'
                //   }
                // }
                }
              // emphasis: {// 中间文字显示
              //   show: true
              // }
              },
              data: [
                {
                  value: 12,
                  name: '生物景观',
                  data: [
                    {
                      name: '非物质文化遗产',
                      value: '12',
                      arr: [
                        { name: '地方习俗', value: '1' },
                        { name: '传统演艺', value: '1' }
                      ]
                    }
                  ]
                },
                {
                  value: 53,
                  name: '建筑与设施',
                  data: [
                    {
                      name: '建筑与设施1',
                      value: '40',
                      arr: [{ name: '建筑遗迹', value: '10' }]
                    },
                    {
                      name: '建筑与设施2',
                      value: '13',
                      arr: [
                        { name: '地方习俗', value: '1' },
                        { name: '传统演艺', value: '1' }
                      ]
                    }, {
                      name: '建筑与设施1',
                      value: '40',
                      arr: [{ name: '建筑遗迹', value: '10' }]
                    },
                    {
                      name: '建筑与设施2',
                      value: '13',
                      arr: [
                        { name: '地方习俗', value: '1' },
                        { name: '传统演艺', value: '1' }
                      ]
                    }
                  ]
                },
                {
                  value: 12,
                  name: '历史遗迹',
                  data: [
                    {
                      name: '物质文化遗存',
                      value: '10',
                      arr: [{ name: '建筑遗迹', value: '10' }]
                    },
                    {
                      name: '非物质文化遗产',
                      value: '2',
                      arr: [
                        { name: '地方习俗', value: '1' },
                        { name: '传统演艺', value: '1' }
                      ]
                    }
                  ]
                },
                {
                  value: 4,
                  name: '视频广告',
                  data: [
                    {
                      name: '物质文化遗存',
                      value: '10',
                      arr: [{ name: '建筑遗迹', value: '10' }]
                    },
                    {
                      name: '非物质文化遗产',
                      value: '2',
                      arr: [
                        { name: '地方习俗', value: '1' },
                        { name: '传统演艺', value: '1' }
                      ]
                    }
                  ]
                },
                {
                  value: 12,
                  name: '搜索引擎',
                  data: [
                    {
                      name: '物质文化遗存',
                      value: '10',
                      arr: [{ name: '建筑遗迹', value: '10' }]
                    },
                    {
                      name: '非物质文化遗产',
                      value: '2',
                      arr: [
                        { name: '地方习俗', value: '1' },
                        { name: '传统演艺', value: '1' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
        that.clickData = option.series[0].data[0]
        that.isData = true // #9254DE
        that.clickColor = '#9254DE'
        myChart.setOption(option, true)
        myChart.on('click', function (params) {
          that.clickColor = params.color
          that.clickData = params.data
          that.isData = true
        })
        window.addEventListener('resize', () => {
          if (myChart) {
            myChart.resize()
          }
        })
      }
    }
  }
</script>
