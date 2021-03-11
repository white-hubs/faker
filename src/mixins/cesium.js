export const mixinCesium = {
created () {
// this.hello()
},
methods: {
getCounterData (data) {
  // 判断是否点击选点对比
  console.info('this.pickPoint', this.pickPoint)
  if (this.pickPoint) {
    // 判断点击是否重复
    this.switchs = false
    for (let i = 0; i < this.counterData.length; i++) {
      if (data.index === this.counterData[i].index) {
      this.switchs = true
      // 点击判断是否点重复并删除
      this.counterData.splice(i, 1)
      }
    }
    // 判断对比数量不可大于五
    if (this.counterData.length > 4) {
      this.$message('不可以多余5个')
      return false
    }
    // 判断数据点击是否重复
    if (!this.switchs) {
      this.switchs = false
      this.counterData.push(data)
    } else {
      this.cesiumItem = data.index
    }
    // 判断是否显示按钮
    if (this.counterData.length > 0) {
      this.pickItem = true
    } else {
      this.pickItem = false
    }
    // 判断是否显示按钮
    if (this.counterData.length > 1) {
      this.butShow = true
    } else {
      this.butShow = false
    }
  } else {
    this.$message('请点击选点对比')
    return false
  }
},
// 抽屉的箭头显示
tabIsshow () {
this.isshow = !this.isshow
},
// 抽屉盒子的显示隐藏
faceClick () {
this.facebox = !this.facebox
},
// 模型点击面获取数据
faceTitleData (data) {
  this.facetext = data
  if (!this.facebox) {
    this.facebox = true
  }
  // 判断抽屉的状态
  if (!this.isshow) {
    this.isshow = true
  }
},
endFormTable () {
this.counterData = []
this.pickItem = false
// this.pickPoint = false
this.pickPointFun()
},
formTable () {
// 清空对比数据
this.comparedData = []
this.isFormTable = true
// cesiumData 总数据   comparedData 选择的点id
var counterData = this.counterData
var cesiumData = this.cesiumData
for (var i = 0; i < counterData.length; i++) {
var id = counterData[i].id
for (var j = 0; j < cesiumData.length; j++) {
if (id === cesiumData[j].tybh) {
this.comparedData.push(cesiumData[j])
}
}
}
this.comparedData.unshift(this.tableKeyObj)
},
// 关闭选点对比数据框
formTableFlase () {
this.isFormTable = false
},
// 点击选点按钮切换显示
pickPointFun () {
if (this.pickPoint) {
this.pickPoint = false
} else {
this.pickPoint = true
}
},
dataViewDialogTrue () {
this.dataViewLog = true
},
dataViewDialogFalse () {
this.dataViewLog = false
}
  }
}
