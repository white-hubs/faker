<template>
  <div :id="echartsTypeData.echartId" class="echartsBar"></div>
</template>

<script>
/**
 * @echartsTypeData 对象数据 回去值echartsTypeData.id
 * @echartId 设置动态id(echarts不会对相同的ID进行重新加载)
 * @startColor 柱形图渐变开始颜色
 * @endColor 柱形图渐变结束颜色
 * @thisColor 柱形图hover颜色
 * @legendData 图例数据(柱形图上面有折线图)如没有数据为空
 * @isLegend 是否显示图例
 * @titleOne 第一个title text
 * @titleTwo 第二个title text
 * @isTitleOne 第一个title是否显示 默认false
 * @isTitleTwo 第二个title 是否显示 默认false
 * @series 多柱形图数据
 */
  export default {
    name: 'EchartsBarLabel',
    data () {
      return {
      }
    },
    props: ['echartsTypeData'],
    mounted () {
      this.myChartBar()
    },
    methods: {
      myChartBar () {
        var echartsData = this.echartsTypeData
        var echarts = require('echarts')
        var myChart = this.$echarts.init(
          document.querySelector(`#${echartsData.echartId}`)
        )
        var option = {
          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          title: [
            {
              text: '灾害点数：次',
              show: true,
              textStyle: {
                // 文字颜色
                color: 'rgb(255,255,255,0.65)',
                fontWeight: '400',
                // 字体大小
                fontSize: 14
              },
              top: '15%',
              left: '2%'
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: 'rgba(1, 20, 55, 0.83)', // 背景颜色（此时为默认色）
            extraCssText: 'box-shadow: 0px 3px 6px rgba(8, 198, 244, 0.47);'
          },
          legend: {
            data: [
              {
                name: '大型',
                icon: 'rect'
              },
              {
                name: '中型',
                icon: 'rect'
              },
              {
                name: '小型',
                icon: 'rect'
              }
            ],
            left: '2%',
            top: '4%',
            textStyle: {
              // 图例文字的样式
              color: 'rgba(246, 255, 255, 0.65)',
              fontSize: 14
            },
            itemWidth: 24, // 图标宽
            itemHeight: 10, // 图标高
            itemGap: 40
          },
          grid: {
            left: '7.5%', // 默认10%，给24就挺合适的。
            top: '30%', // 默认60
            right: '3%', // 默认10%
            bottom: '10%'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
          },
          xAxis: [
            {
              // type: 'category',
              // axisTick: {show: false},
              // data: ['2012', '2013', '2014', '2015', '2016']
              // xAxis: {
              type: 'category',
              data: ['2012', '2013', '2014', '2015', '2016'],
              axisLabel: {
                interval: 0
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(255,255,255,0.65)'
                }
              }
            //     },
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#cdcdcd'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#315070'],
                  width: 1,
                  type: 'solid'
                }
              }
            }
          ],
          series: [
            {
              name: '大型',
              type: 'bar',
              barGap: '40%',
              // label: labelOption,
              data: [320, 332, 301, 334, 390],
              barWidth: 17,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(146,84,222, 0.11)',
                barBorderRadius: [8, 8, 0, 0]
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 30,
                  color: '#BE0DFF'
                },
                normal: {
                  barBorderRadius: [8, 8, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [
                      {
                        offset: 0,
                        color: '#522F7E' // 0% 处的颜色
                      },
                      {
                        offset: 0.9,
                        color: '#9254DE' // 90% 处的颜色0BBAC9
                      }
                    ],
                    false
                  )
                }
              }
            },
            {
              name: '中型',
              type: 'bar',
              // label: labelOption,
              data: [220, 182, 191, 234, 290],
              barWidth: 17,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(112,146,255, 0.11)',
                barBorderRadius: [8, 8, 0, 0]
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 30,
                  color: '#7092FF'
                },
                normal: {
                  barBorderRadius: [8, 8, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [
                      {
                        offset: 0,
                        color: '#30499E' // 0% 处的颜色
                      },
                      {
                        offset: 0.9,
                        color: '#597EF7' // 90% 处的颜色0BBAC9
                      }
                    ],
                    false
                  )
                }
              }
            },
            {
              name: '小型',
              type: 'bar',
              // label: labelOption,
              data: [150, 232, 201, 154, 190],
              barWidth: 17,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(6,243,252, 0.11)',
                barBorderRadius: [8, 8, 0, 0]
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 30,
                  color: '#06F3FC'
                },
                normal: {
                  barBorderRadius: [8, 8, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [
                      {
                        offset: 0,
                        color: '#017B88' // 0% 处的颜色
                      },
                      {
                        offset: 0.9,
                        color: '#0BBAC9' // 90% 处的颜色0BBAC9
                      }
                    ],
                    false
                  )
                }
              }
            }
          ]
        }
        myChart.setOption(option)
        window.addEventListener('resize', () => {
          if (myChart) {
            myChart.resize()
          }
        })
      }
    }
  }
</script>
