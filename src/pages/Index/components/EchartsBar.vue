<template>
  <div id="main" style="height:100%;"></div>
</template>

<script>
  export default {
    name: 'EchartsBar',
    data () {
      return {
        msg: '首页'
      }
    },
    props: [
      'data'
    ],
    mounted () {
      this.echartBar()
    },
    methods: {
      echartBar () {
        // 柱形图文字数据
        var dataArr = this.data[0]
        // 柱形图数字数据
        var dataNum = this.data[1]
        var echarts = require('echarts')
        var myChart = echarts.init(document.getElementById('main'))
        // var app = {}
        // const option = null
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
            padding: [16, 20, 5, 10]
          },
          tooltip: {
            show: true,
            backgroundColor: 'rgba(1, 20, 55, 0.83)', // 背景颜色（此时为默认色）
            extraCssText: 'box-shadow: 0px 3px 6px rgba(8, 198, 244, 0.47);'
            // formatter: function (params, ticket, callback) {
            //   return '<div style="padding:8px;">' +
            //     '<p style="text-align: left;margin-top:10px;font-size: 14px;color: #fff;line-height:14px;margin:0;display:block;">' + dataArr[params.dataIndex] + '</p>' +
            //     '<div style="margin-top:12px;">' +
            //     '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;margin-bottom:8px;">重碳酸盐-钙型水：' + params.dataIndex + '</p>' +
            //     '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;margin-bottom:8px;">重碳酸盐-钙镁型水：' + params.dataIndex + '</p>' +
            //     '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;margin-bottom:8px;">重碳酸盐-钠钙型水：' + params.dataIndex + '</p>' +
            //     '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;margin-bottom:8px;">重碳酸盐硫酸盐-钙型水：' + params.dataIndex + '</p>' +
            //     '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;margin-bottom:8px;">重碳酸盐硫酸盐-钙镁型水：' + params.dataIndex + '</p>' +
            //     '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;">重碳酸盐氯化物-钙型水：' + params.dataIndex + '</p>' +
            //     '</div>' +
            //     '</div>'
            // }
          },
          grid: {
            left: '9%', // 默认10%，给24就挺合适的。
            top: '20%', // 默认60
            right: '9%', // 默认10%
            bottom: '17%'
          },
          color: ['#08C6F4'],
          xAxis: {
            type: 'category',
            // data: ['金堂县', '清白江区', '天府新区', '龙泉驿区', '简阳市', '高新区'],
            data: dataArr,
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
            // data: [51, 42, 36, 22, 33, 38],
            data: dataNum,
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
                color: '#06F3FC'
              },
              normal: {
                barBorderRadius: [8, 8, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#017B88' // 0% 处的颜色
                }, {
                  offset: 0.9,
                  color: '#0BBAC9' // 90% 处的颜色0BBAC9
                }], false)
              }
            }
          }]
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
