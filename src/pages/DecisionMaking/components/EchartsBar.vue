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
 * @lineColor 折现图颜色
 */
  export default {
    name: 'EchartsBar',
    data () {
      return {
      }
    },
    props: [
      'echartsTypeData'
    ],
    mounted () {
      this.myChartBar()
    },
    methods: {
      myChartBar () {
        var echartsData = this.echartsTypeData
        var dataArr = ['天然引用泉水开发', '旅游资源开发', '生态保育利用', '天然矿泉水开发']
        var echarts = require('echarts')
        var myChart = this.$echarts.init(document.querySelector(`#${echartsData.echartId}`))
        var option = {
          title: [{
            text: echartsData.titleOne,
            show: echartsData.isTitleOne,
            textStyle: {
              // 文字颜色
              color: 'rgb(255,255,255,0.65)',
              fontWeight: '400',
              // 字体大小
              fontSize: 14
            },
            // padding: [30, 0, 0, 20]
            top: '5%',
            left: '2.4%'
          }, {
            text: echartsData.titleTwo,
            show: echartsData.isTitleTwo,
            textStyle: {
              // 文字颜色
              color: 'rgb(255,255,255,0.65)',
              fontWeight: '400',
              // 字体大小
              fontSize: 14
            },
            top: '15%',
            right: '1%'
          }],
          tooltip: {
            show: true,
            backgroundColor: 'rgba(1, 20, 55, 0.83)', // 背景颜色（此时为默认色）
            extraCssText: 'box-shadow: 0px 3px 6px rgba(8, 198, 244, 0.47);',
            formatter: function (params, ticket, callback) {
              return '<div style="padding:8px;">' +
                '<p style="text-align: left;margin-top:10px;font-size: 14px;color: #fff;line-height:14px;margin:0;display:block;">' + dataArr[params.dataIndex] + '</p>' +
                '<div style="margin-top:12px;">' +
                '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;margin-bottom:8px;">数量：' + params.data + '处</p>' +
                '</div>' +
                '</div>'
            }
          },
          legend: {
            data: echartsData.legendData,
            show: echartsData.isLegend,
            // selected: {'不显示': false}, // 不需要显示的设置为false
            left: '2%',
            top: '4%',
            textStyle: { // 图例文字的样式
              color: 'rgba(246, 255, 255, 0.65)',
              fontSize: 14
            },
            itemWidth: 24, // 图标宽
            itemHeight: 10, // 图标高
            itemGap: 40
          },
          grid: {
            left: '6.8%', // 默认10%，给24就挺合适的。
            top: '22%', // 默认60
            right: '3%', // 默认10%
            bottom: '15%'
          },
          color: [echartsData.lineColor, ''],
          xAxis: {
            type: 'category',
            data: ['天然引用泉水开发', '旅游资源开发', '生态保育利用', '天然矿泉水开发'],
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
          },
          yAxis: {
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
          },
          series: [{
            name: echartsData.legendData[0].name,
            data: [51, 42, 36, 22],
            type: 'bar',
            barWidth: 17,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(110, 193, 244, 0.11)',
              barBorderRadius: [8, 8, 0, 0]
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 30,
                color: echartsData.thisColor
              },
              normal: {
                barBorderRadius: [8, 8, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: echartsData.startColor // 0% 处的颜色
                }, {
                  offset: 0.9,
                  color: echartsData.endColor // 90% 处的颜色0BBAC9
                }], false)
              }
            }
          }]
        }
        if (echartsData.isLegend) {
          option.grid = {
            left: '6.8%', // 默认10%，给24就挺合适的。
            top: '32%', // 默认60
            right: '3%', // 默认10%
            bottom: '15%'
          }
          option.title[0].top = '16%'
          option.title[0].left = '2.4%'
          option.title[1].top = '16%'
          option.title[1].right = '2.4%'
          var line = {
            name: echartsData.legendData[1].name,
            type: 'line',
            lineStyle: {
              normal: {
                color: echartsData.lineColor,
                width: '2'
              }
            },
            data: (function () {
              var res = []
              var len = 0
              while (len < 10) {
                res.push((Math.random() * 100 + 5).toFixed(1) - 0)
                len++
              }
              return res
            })()
          }
          option.series.push(line)
        } else {
          option.grid = {
            left: '6.8%', // 默认10%，给24就挺合适的。
            top: '22%', // 默认60
            right: '3%', // 默认10%
            bottom: '15%'
          }
          option.title[0].top = '5%'
          option.title[0].left = '2.4%'
          option.title[1].top = '5%'
          option.title[1].left = '2.4%'
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
