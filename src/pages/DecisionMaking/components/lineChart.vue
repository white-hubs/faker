<template>
  <div id="lineChart"></div>
</template>
<script>

export default {
  name: 'LineChart',
  data () {
    return {
    }
  },
  props: [
  ],
  mounted () {
    this.initLine()
  },
  methods: {
    initLine () {
      var echarts = require('echarts')
      var myChart = echarts.init(document.getElementById('lineChart'))
      var option = {
        title: {
          text: '单位：处',
          textStyle: {
            // 文字颜色
            color: 'rgb(255,255,255,0.65)',
            fontWeight: '400',
            // 字体大小
            fontSize: 14
          },
          padding: [16, 0, 0, 20]
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(1, 20, 55, 0.83)', // 背景颜色（此时为默认色）
          extraCssText: 'box-shadow: 0px 3px 6px rgba(8, 198, 244, 0.47);'
        },
        legend: {
          data: ['上升泉', '下降泉'],
          textStyle: {
            fontSize: 14,
            color: 'rgb(255,255,255,0.65)'
          },
          padding: [16, 0, 0, 0],
          itemWidth: 24, // 图标宽
          itemHeight: 10 // 图标高
        },
        grid: {
          left: '3%',
          right: '3%',
          top: '20%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['<0.1', '0.1-0.5', '0.5-1', '>1'],
          axisLine: {
            lineStyle: {
              color: 'rgb(255,255,255,0.65)'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#315070'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#cdcdcd'
            }
          }
        },
        series: [
          {
            name: '上升泉',
            type: 'line',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#597EF7',
                lineStyle: {
                  color: '#597EF7'
                }
              }
            },
            data: [10, 15, 20, 20]
          },
          {
            name: '下降泉',
            type: 'line',
            stack: '总量',
            data: [20, 28, 15, 25],
            itemStyle: {
              normal: {
                color: '#13C2C2',
                lineStyle: {
                  color: '#13C2C2'
                }
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        if (myChart) {
          myChart.resize()
        }
      })
      // 处理点击事件并且跳转到相应的百度搜索页面
    //   myChart.on('click', function (params) {
    //     window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name))
    //   })
    }
  }
}
</script>
