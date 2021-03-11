
// import TileWMS from 'ol/source/TileWMS'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Fill from 'ol/style/Fill'
import Circle from 'ol/style/Circle'
import Text from 'ol/style/Text'
import Icon from 'ol/style/Icon'
import { Geothermal } from './Geothermal'
// import * as olSize from 'ol/size'
// 显示层级： 点15 线10 面 5 乡镇名称100
export const GEOLOGY_LIST_DATA = {
  wmsSource: new VectorLayer({
    zIndex: 10,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_planningscope&maxFeatures=50&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: new Style({
      // zIndex: 5,
      stroke: new Stroke({ // 边界样式
        color: '#08C6F4',
        width: 3
      })
    })
  }),
  // 流域
  BasinSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Asx_basin&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      if (feature.values_.category === 1) {
        var style = new Style({
          // zIndex: 10,
          stroke: new Stroke({ // 边界样式
            color: '#08C6F4',
            width: 1
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#F1FFCD'
          })
        })
        feature.setStyle(style)
      }
      if (feature.values_.category === 2) {
        var style1 = new Style({
          zIndex: 10,
          stroke: new Stroke({ // 边界样式
            color: '#08C6F4',
            width: 1
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#CAFFE3'
          })
        })
        feature.setStyle(style1)
      }
    }
    // style: new Style({
    //   stroke: new Stroke({
    //     color: '#65FFFF',
    //     width: 3
    //   }),
    //   fill: new Fill({
    //     color: 'rgba(250, 250, 250, 0.85)'
    //   })
    // })
  }),
  // 湖泊
  LakeSource: new VectorLayer({
    zIndex: 10,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Asx_lakers&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: new Style({
      // zIndex: 1,
      stroke: new Stroke({
        color: '#65FFFF',
        width: 2
      })
    })
  }),
  // 河流
  RiversSource: new VectorLayer({
    zIndex: 15,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Asx_rivers&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: new Style({
      // zIndex: 10,
      stroke: new Stroke({
        color: '#65FFFF',
        width: 1
      })
    })
  }),

  // 行政区划
  // DivisionSource: new VectorLayer({
  //   zIndex: 10,
  //   source: new VectorSource({
  //     url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_countyboundary&outputFormat=application%2Fjson',
  //     format: new GeoJSON()
  //   }),
  //   style: new Style({
  //     // zIndex: 10,
  //     stroke: new Stroke({
  //       color: '#65FFFF',
  //       width: 3
  //     })
  //   })
  // }),

  // 行政区划
  AreaSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_countyboundary&maxFeatures=50&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.log(feature.id_, feature.values_)
      if (feature.id_ === 'lqs_countyboundary.1') {
        var style1 = new Style({
          stroke: new Stroke({ // 边界样式
            color: '#888888',
            width: 1,
            lineDash: [5],
            lineDashOffset: 10
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#F5FFCC'
          }),
          text: new Text({
            text: feature.get('名称'),
            font: '18px sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',
            overflow: false, // 超出面的部分不显示
            stroke: new Stroke({
              color: 'black',
              width: 2
            }),
            fill: new Fill({
              color: '#fff'
            })
          })
        })
        feature.setStyle(style1)
      } else if (feature.id_ === 'lqs_countyboundary.2') {
        var style2 = new Style({
          stroke: new Stroke({ // 边界样式
            color: '#888888',
            width: 1,
            lineDash: [5],
            lineDashOffset: 10
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#D7FFE6'
          }),
          text: new Text({
            text: feature.get('名称'),
            font: '18px sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',
            overflow: false, // 超出面的部分不显示
            stroke: new Stroke({
              color: 'black',
              width: 2
            }),
            fill: new Fill({
              color: '#fff'
            })
          })
        })
        feature.setStyle(style2)
      } else if (feature.id_ === 'lqs_countyboundary.3') {
        var style3 = new Style({
          stroke: new Stroke({ // 边界样式
            color: '#888888',
            width: 1,
            lineDash: [5],
            lineDashOffset: 10
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#FEF1E3'
          }),
          text: new Text({
            text: feature.get('名称'),
            font: '18px sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',
            overflow: false, // 超出面的部分不显示
            stroke: new Stroke({
              color: 'black',
              width: 2
            }),
            fill: new Fill({
              color: '#fff'
            })
          })
        })
        feature.setStyle(style3)
      } else if (feature.id_ === 'lqs_countyboundary.4') {
        var style4 = new Style({
          stroke: new Stroke({ // 边界样式
            color: '#888888',
            width: 1,
            lineDash: [5],
            lineDashOffset: 10
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#C9E5BE'
          }),
          text: new Text({
            text: feature.get('名称'),
            font: '18px sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',
            overflow: false, // 超出面的部分不显示
            stroke: new Stroke({
              color: 'black',
              width: 2
            }),
            fill: new Fill({
              color: '#fff'
            })
          })
        })
        feature.setStyle(style4)
      } else if (feature.id_ === 'lqs_countyboundary.5') {
        var style5 = new Style({
          stroke: new Stroke({ // 边界样式
            color: '#888888',
            width: 1,
            lineDash: [5],
            lineDashOffset: 10
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#F5FFCC'
          }),
          text: new Text({
            text: feature.get('名称'),
            font: '18px sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',
            overflow: false, // 超出面的部分不显示
            stroke: new Stroke({
              color: 'black',
              width: 2
            }),
            fill: new Fill({
              color: '#fff'
            })
          })
        })
        feature.setStyle(style5)
      } else if (feature.id_ === 'lqs_countyboundary.6') {
        var style6 = new Style({
          stroke: new Stroke({ // 边界样式
            color: '#888888',
            width: 1,
            lineDash: [5],
            lineDashOffset: 10
          }),
          fill: new Fill({ // 矢量图层填充颜色，以及透明度
            color: '#FEF1E3'
          }),
          text: new Text({
            text: feature.get('名称'),
            font: '18px sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',
            overflow: false, // 超出面的部分不显示
            stroke: new Stroke({
              color: 'black',
              width: 2
            }),
            fill: new Fill({
              color: '#fff'
            })
          })
        })
        feature.setStyle(style6)
      }
      // var style = new Style({
      //   stroke: new Stroke({ // 边界样式
      //     color: '#888888',
      //     width: 1,
      //     lineDash: [5],
      //     lineDashOffset: 10
      //   }),
      //   text: new Text({
      //     text: feature.get('名称'),
      //     font: '18px sans-serif',
      //     textAlign: 'center',
      //     textBaseline: 'middle',
      //     overflow: false, // 超出面的部分不显示
      //     stroke: new Stroke({
      //       color: 'black',
      //       width: 2
      //     }),
      //     fill: new Fill({
      //       color: '#fff'
      //     })
      //   })
      // })
      // feature.setStyle(style)
    }
  }),
  // 主题小镇
  ThemeSource: new VectorLayer({
    zIndex: 15,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aztgh_town&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature, resolution) {
      // console.log(feature)

      var style = new Style({
        image: new Icon({
          // anchor: [0.5, 0.5],
          // crossOrigin: 'anonymous',
          src: 'static/geologyIcon/ztxz_map.png',
          offset: [0, 0],
          size: [38, 77]
        })
        // image1: new Circle({
        //   radius: 4,
        //   fill: new Fill({
        //     // color: 'rgba(255, 255, 255, 0.5)'
        //   }),
        //   stroke: new Stroke({
        //     color: 'F759AB',
        //     width: 3
        //   })
        // })
      })
      feature.setStyle(style)
    }
  }),
  // 游憩单元
  RecreationSource: new VectorLayer({
    zIndex: 6,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aztgh_recreationcell&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#FF7A45',
          width: 1,
          lineDash: [5],
          lineDashOffset: 10
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgba(255, 122, 69, 0.5)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 核心保护区
  ReserveSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aztgh_corearea&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#C9E5BE'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 缓冲区
  BufferSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aztgh_bufferarea&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#D6FEE5'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 山前游憩区
  MountainSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aztgh_recreationarea&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#F5FFCC'
        })
      })
      feature.setStyle(style)
    }
  }),

  /// 平原地区

  // 平原河漫
  PlainRiverSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_plain_1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#F1FF98'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 条带状平坝
  DamSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_tableland_1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#8AD7C7'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 宽谷垄岗
  ValleyRidgeSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_tableland_2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#BFCBBE'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 中谷圆弧状、坪状低丘
  FlatLowHillSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_tableland_3&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#FFD865'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 平谷圆缓低丘
  GentleLowHillSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_hill_1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#F7EADC'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 宽谷圆顶中丘
  ParietalColliculusSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_hill_2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#F7E9C2'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 窄谷脊状低山
  LowMountainSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_lowmountain_1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#98B3D7'
        })
      })
      feature.setStyle(style)
    }
  }),
  // ”V“沟谷
  ValleySource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adm_lowmountain_2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // zIndex: 10,
        stroke: new Stroke({
          color: '#888888',
          width: 1,
          line: [5]
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#E92020'
        })
      })
      feature.setStyle(style)
    }
  }),

  // 地势图
  // 地势
  TerrainSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Ads_overview&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: Geothermal[feature.values_.min],
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: Geothermal[feature.values_.min]
        })
      })
      feature.setStyle(style)
    }
  }),
  // 最高最低点
  HighAndLowSource: new VectorLayer({
    zIndex: 15,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Ads_hl&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      // var style = new Style({
      //   stroke: new Stroke({
      //     color: 'red',
      //     width: 1,
      //     line: [0],
      //     visible: false
      //   }),
      //   fill: new Fill({ // 矢量图层填充颜色，以及透明度
      //     color: 'red'
      //   })
      // })
      if (feature.values_.hl === 1) {
        var style = new Style({
          // image: new Circle({
          //   radius: 4,
          //   fill: new Fill({
          //     color: 'red'
          //   })
          //   // stroke: new Stroke({
          //   //   color: '#fafafa',
          //   //   width: 1,
          //   //   lineDash: [5],
          //   //   lineDashOffset: 10
          //   // })
          // }),
          image: new Icon({
            // anchor: [0.5, 0.5],
            // crossOrigin: 'anonymous',
            src: 'static/geologyIcon/high.png',
            offset: [0, 0],
            size: [20, 20]
          }),
          text: new Text({
            text: feature.get('NAME'),
            font: '14px Microsoft YaHei',
            textAlign: 'right',
            textBaseline: 'middle',
            // textShadow: '10px 10px 0px #000',
            stroke: new Stroke({
              color: 'RED',
              width: 1
            }),
            fill: new Fill({
              color: 'red'
            }),
            offsetX: 26,
            offsetY: 15,
            placement: 'point', // point 则自动计算面的中心k点然后标注  line 则根据面要素的边进行标注
            overflow: false // 超出面的部分不显示
          })
        })
        feature.setStyle(style)
      } else if (feature.values_.hl === 2) {
        var style1 = new Style({
          image: new Icon({
            // anchor: [0.5, 0.5],
            // crossOrigin: 'anonymous',
            src: 'static/geologyIcon/low.png',
            offset: [0, 0],
            size: [20, 20]
          }),
          text: new Text({
            text: feature.get('NAME'),
            font: '14px Microsoft YaHei',
            textAlign: 'right',
            textBaseline: 'middle',
            // textShadow: '10px 10px 0px #000',
            stroke: new Stroke({
              color: 'red',
              width: 1
            }),
            fill: new Fill({
              color: 'red'
            }),
            offsetX: 16,
            offsetY: 15,
            placement: 'point', // point 则自动计算面的中心k点然后标注  line 则根据面要素的边进行标注
            overflow: false // 超出面的部分不显示
          })
        })
        feature.setStyle(style1)
      }
    }

  }),
  // 地热储层图
  // 中深层地热开发利用靶区
  GeothermalTargetSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adrdz_tar&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // stroke: new Stroke({
        //   color: Geothermal[feature.values_.min],
        //   width: 1,
        //   line: [0],
        //   visible: false
        // }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#FEE54C'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 中深层地热开发潜力前景区
  GeothermalForegroundtSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adrdz_potential&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // stroke: new Stroke({
        //   color: Geothermal[feature.values_.min],
        //   width: 1,
        //   line: [0],
        //   visible: false
        // }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: '#DBF6ED'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 水文地质图
  // 富水1000-3000
  HigherWaterSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_11&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // stroke: new Stroke({
        //   color: Geothermal[feature.values_.min],
        //   width: 1,
        //   line: [0],
        //   visible: false
        // }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(202,255,165)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 富水300-1000
  MediumWaterSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_12&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // stroke: new Stroke({
        //   color: Geothermal[feature.values_.min],
        //   width: 1,
        //   line: [0],
        //   visible: false
        // }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(216,255,190)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 其他
  // 河流
  HydrologyRiversSource: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_0&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(125,255,255)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(125,255,255)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 碎屑岩孔隙裂隙水21
  Swdz_21Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_21&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(177,149,99)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(177,149,99)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 碎屑岩孔隙裂隙水22
  Swdz_22Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_22&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(179,165,128)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(179,165,128)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 碎屑岩孔隙裂隙水23
  Swdz_23Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_23&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(215,199,137)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(215,199,137)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 碎屑岩孔隙裂隙水24
  Swdz_24Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_24&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(255,152,24)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(255,152,24)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 碎屑岩孔隙裂隙水25
  Swdz_25Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_25&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(255,175,50)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(255,175,50)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 碎屑岩孔隙裂隙水26
  Swdz_26Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_26&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(255,178,100)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(255,178,100)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 碎屑岩孔隙裂隙水31
  Swdz_51Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_31&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: 'rgb(48,240,241)',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(48,240,241)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 泉点5-1
  Aswdz_qdSource: new VectorLayer({
    zIndex: 15,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Aswdz_qd&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature, resolution) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        // image: new Icon({
        //   // anchor: [0.5, 0.5],
        //   // crossOrigin: 'anonymous',
        //   src: 'static/geologyIcon/layer_52.png',
        //   offset: [0, 0],
        //   size: [20, 40]
        // })
        image: new Circle({
          radius: 3,
          fill: new Fill({
            color: 'rgb(89,126,247)'
          })
          // stroke: new Stroke({
          //   color: '#fafafa',
          //   width: 1,
          //   lineDash: [5],
          //   lineDashOffset: 10
          // })
        })
        // text: new Text({
        //   // text: feature.get('flow'),
        //   font: '14px Microsoft YaHei',
        //   textAlign: 'right',
        //   textBaseline: 'middle',
        //   // textShadow: '10px 10px 0px #000',
        //   stroke: new Stroke({
        //     color: '#597EF7',
        //     width: 2
        //   }),
        //   fill: new Fill({
        //     color: '#597EF7'
        //   }),
        //   offsetX: -8,
        //   placement: 'point', // point 则自动计算面的中心k点然后标注  line 则根据面要素的边进行标注
        //   overflow: false // 超出面的部分不显示
        // })
      })
      // console.log(resolution)
      // if (feature.get('flow')) {
      //   style.getText().setText(resolution > 0.0009710633896909985 ? feature.get('flow') : '')
      // }
      feature.setStyle(style)
    }
  }),
  // 工程地质图
  // 4-1
  Gcdz_41Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Agcdz_I1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(241,255,205)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 4-2
  Gcdz_42Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Agcdz_I2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(245,255,177)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 4-3
  Gcdz_43Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Agcdz_II1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(255,216,255)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 4-4
  Gcdz_44Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Agcdz_II2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(255,179,255)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤资源图
  // 土壤5-1-1
  Trzy_511Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_ph_2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(0,177,241)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-1-2
  Trzy_512Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_ph_3&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(254,255,189)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-1-3
  Trzy_513Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_ph_4&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(228,102,0)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-2-1
  Trzy_521Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_gys_1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(0,178,76)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-2-2
  Trzy_522Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_gys_2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(152,204,77)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-3-1
  Trzy_531Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_fl_2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(152,204,77)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-3-2
  Trzy_532Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_fl_3&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(255,102,50)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-4-1
  Trzy_541Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_env_1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(0,178,76)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 土壤5-4-2
  Trzy_542Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Atr_env_2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(152,204,77)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 地质灾害
  // 崩塌
  Trzy_611Source: new VectorLayer({
    zIndex: 15,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_bt&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      if (feature.values_.GMDJ === '大型') {
        var style = new Style({
          image: new Icon({
            src: 'static/geologyIcon/btzhd.png'
            // img: new Image(),
            // // offset: [0, 0],
            // scale: 1.5
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style)
      } else if (feature.values_.GMDJ === '中型') {
        var style1 = new Style({
          image: new Icon({
            src: 'static/geologyIcon/btzhd.png',
            // img: new Image(),
            // // offset: [0, 0],
            scale: 0.75
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style1)
      } else if (feature.values_.GMDJ === '小型') {
        var style2 = new Style({
          image: new Icon({
            src: 'static/geologyIcon/btzhd.png',
            // img: new Image(),
            // // offset: [0, 0],
            scale: 0.5
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style2)
      }
    }
  }),
  // 不稳定斜坡
  Trzy_612Source: new VectorLayer({
    zIndex: 15,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_bwdxp&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      // var style = new Style({
      //   image: new Icon({
      //     src: 'static/dzxxTree/layer_72.png'
      //   })
      // })
      // feature.setStyle(style)
      if (feature.values_.GMDJ === '大型') {
        var style = new Style({
          image: new Icon({
            src: 'static/geologyIcon/bwdxp.png'
            // img: new Image(),
            // // offset: [0, 0],
            // scale: 1.5
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style)
      } else if (feature.values_.GMDJ === '中型') {
        var style1 = new Style({
          image: new Icon({
            src: 'static/geologyIcon/bwdxp.png',
            // img: new Image(),
            // // offset: [0, 0],
            scale: 0.75
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style1)
      } else if (feature.values_.GMDJ === '小型') {
        var style2 = new Style({
          image: new Icon({
            src: 'static/geologyIcon/bwdxp.png',
            // img: new Image(),
            // // offset: [0, 0],
            scale: 0.5
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style2)
      }
    }
  }),
  // 滑坡
  Trzy_613Source: new VectorLayer({
    zIndex: 15,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_hp&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      if (feature.values_.GMDJ === '大型') {
        var style = new Style({
          image: new Icon({
            src: 'static/geologyIcon/hpzhd.png'
            // img: new Image(),
            // // offset: [0, 0],
            // scale: 0.5
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style)
      } else if (feature.values_.GMDJ === '中型') {
        var style1 = new Style({
          image: new Icon({
            src: 'static/geologyIcon/hpzhd.png',
            // img: new Image(),
            // // offset: [0, 0],
            scale: 0.75
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style1)
      } else if (feature.values_.GMDJ === '小型') {
        var style2 = new Style({
          image: new Icon({
            src: 'static/geologyIcon/hpzhd.png',
            // img: new Image(),
            // // offset: [0, 0],
            scale: 0.5
            // imgSize: [64, 64]
          })
        })
        feature.setStyle(style2)
      }
      }
  }),
  // 地质灾害防治建议
  // 6-2-1
  Trzy_621Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_I1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(228,188,152)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-2
  Trzy_622Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_I2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(228,150,101)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-3
  Trzy_623Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_I3&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(228,150,0)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-4
  Trzy_624Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_I4&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(228,126,25)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-5
  Trzy_625Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_II1&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(247,238,209)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-6
  Trzy_626Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_II2&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(246,237,196)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-7
  Trzy_627Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_II3&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(246,237,170)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-8
  Trzy_628Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_II4&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(247,238,145)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 6-2-9
  Trzy_629Source: new VectorLayer({
    zIndex: 5,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Adzzh_III&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.info('featur111111111111111111111111111111111111e', feature)
      var style = new Style({
        stroke: new Stroke({
          color: '#888',
          width: 1,
          line: [0],
          visible: false
        }),
        fill: new Fill({ // 矢量图层填充颜色，以及透明度
          color: 'rgb(201,229,189)'
        })
      })
      feature.setStyle(style)
    }
  }),
  // 定义图层
  // this.AreaSource = AreaSource
  // // 是否显示图层
  // this.AreaSource.setVisible(this.isActive1)
  // 乡镇
  TownshipSource: new VectorLayer({
    zIndex: 102,
    source: new VectorSource({
      url: 'http://192.168.40.142:8080/geoserver/lqs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lqs%3Alqs_townname&maxFeatures=50&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // console.log(feature)
      var style = new Style({
        // zIndex: 1,
        image: new Circle({
          radius: 4,
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.5)'
          }),
          stroke: new Stroke({
            color: '#fafafa',
            width: 1,
            lineDash: [5],
            lineDashOffset: 10
          })
        }),
        text: new Text({
          test: feature.get('level'),
          text: feature.get('name'),
          font: '14px Microsoft YaHei',
          textAlign: 'right',
          textBaseline: 'middle',
          // textShadow: '10px 10px 0px #000',
          stroke: new Stroke({
            color: 'black',
            width: 2
          }),
          fill: new Fill({
            color: '#fff'
          }),
          offsetX: -8,
          placement: 'point', // point 则自动计算面的中心k点然后标注  line 则根据面要素的边进行标注
          overflow: false // 超出面的部分不显示
        })
      })
      feature.setStyle(style)
      // 区
      if (feature.values_.level === 4) {
        var style1 = new Style({
          image: new Circle({
            radius: 4,
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.5)'
            }),
            stroke: new Stroke({
              color: '#fafafa',
              width: 3
            })
          }),
          text: new Text({
            test: feature.get('level'),
            text: feature.get('name'),
            font: '16px Microsoft YaHei',
            textAlign: 'right',
            textBaseline: 'middle',
            // textShadow: '10px 10px 0px #000',
            stroke: new Stroke({
              color: 'black',
              width: 2
            }),
            fill: new Fill({
              color: '#fff'
            }),
            offsetX: -8,
            placement: 'point', // point 则自动计算面的中心k点然后标注  line 则根据面要素的边进行标注
            overflow: false // 超出面的部分不显示
          })
        })
        feature.setStyle(style1)
      }
    }
  })
}
