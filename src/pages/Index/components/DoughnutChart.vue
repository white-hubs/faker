<template>
  <div class="doughnut_box">
    <img :src="shadowBg" class="doughnut_box_img" alt="">
    <div class="doughnut_chart" :id="id"></div>
  </div>

</template>

<script>
  import shadowBg from './../../../assets/index/shadow_bg.png'
  export default {
    name: 'DoughnutChart',
    data () {
      return {
        shadowBg: shadowBg,
        myChart: ''
      }
    },
    props: [
      'id',
      'data',
      'title'
    ],
    watch: {
      data: function (curlVla, oldVal) {
        this.$nextTick(() => {
          this.doughChart()
        })
      }
    },
    mounted () {
      if (this.id) {
        this.doughChart()
      }
    },
    methods: {
      doughChart () {
        var id = this.id
        var data = this.data
        var title = this.title
        // legend数据
        var legendData = []
        for (var i = 0; i < data.length; i++) {
          var obj = {}
          obj.name = data[i].name
          obj.icon = `image://chartIcon/${data[i].ic}`
          legendData.push(obj)
        }
        var echarts = require('echarts')
        this.myChart = this.$echarts.init(document.querySelector(`#${id}`))
        const option = {
          tooltip: {
            backgroundColor: 'rgba(1, 20, 55, 0.83)', // 背景颜色（此时为默认色）
            extraCssText: 'box-shadow: 0px 3px 6px rgba(8, 198, 244, 0.47);',
            trigger: 'item',
            textStyle: {
              align: 'left'
            },
            formatter: function (params, ticket, callback) {
              return '<div style="padding:5px;">' +
                '<p style="text-align: left;margin-top:10px;font-size: 14px;color: #fff;line-height:14px;margin:0;display:block;">' + params.data.name + '</p>' +
                '<div style="margin-top:12px;">' +
                '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;margin-bottom:8px;">面积' + params.data.value + 'km²</p>' +
                '<p style="text-align: left;font-size: 12px;color: #fff;line-height:12px;opacity:0.65;">占比' + params.data.pecent + '%</p>' +
                '</div>' +
                '</div>'
            }
          },
          color: [
            new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              {
                offset: 0,
                color: '#BE0DFF'
              },
              {
                offset: 0.9,
                color: '#6B0FB1'
              }]),
            new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              {
                offset: 0,
                color: '#08D4F4'
              },
              {
                offset: 0.9,
                color: '#1478C5'
              }]),
            new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              {
                offset: 0,
                color: '#16FAFA'
              },
              {
                offset: 0.9,
                color: '#0D9292'
              }]),
            new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              {
                offset: 0,
                color: '#24B446'
              },
              {
                offset: 0.9,
                color: '#125A23'
              }]),
            new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              {
                offset: 0,
                color: '#FCC83D'
              },
              {
                offset: 0.9,
                color: '#7E641F'
              }]),
            new echarts.graphic.LinearGradient(1, 1, 0, 0, [
              {
                offset: 0,
                color: '#F759AB'
              },
              {
                offset: 0.9,
                color: '#7C2D56'
              }])],
          legend: {
            orient: 'vertical', // horizontal
            x: '53%',
            y: 'center',
            align: 'left',
            itemHeight: 15, // icon高度
            itemWidth: 15, // icon宽度
            data: legendData,
            // data: [
            //   {
            //     name: '一等土壤',
            //     icon: `image://${chartPurple}`
            //   },
            //   {
            //     name: '二等土壤',
            //     icon: `image://${chartBlue}`
            //   },
            //   {
            //     name: '暂无数据',
            //     icon: 'image://chartIcon/chart_cyan.png'
            //   }
            // ],
            textStyle: { // 图例文字的样式
              color: 'rgb(255,255,255,0.65)',
              fontSize: 12
            },
            selectedMode: false
          },
          series: [{
            // name: '访问来源',
            type: 'pie',
            radius: ['60%', '75%'],
            center: ['28%', '50%'], // 圆形居中
            hoverAnimation: false,
            avoidLabelOverlap: false,
            // selectedMode: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                color: '#fff',
                font: '12 Microsoft YaHei',
                formatter: function (param) {
                  var res = title + '\n' + '\n' + '等级分布'
                  return res
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              borderWidth: 3, //
              borderColor: '#011339'
            },
            data: data
            // data: [
            //   {
            //     value: 300,
            //     name: '一等土壤',
            //     ddd: '1111'
            //   },
            //   {
            //     value: 200,
            //     name: '二等土壤',
            //     ddd: '1111'
            //   },
            //   {
            //     value: 250,
            //     name: '暂无数据'
            //   }
            // ]
          }]
        }
        this.myChart.setOption(option, true)
        // myChart.resize()
        window.addEventListener('resize', () => {
          if (this.myChart) {
            this.myChart.resize()
          }
        })
      }
    }
  }
</script>
