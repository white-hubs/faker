<template>
  <div class="home_header">
    <div class="home_header_bg">
      <div id="homeHeaderBg"></div>
      <div class="headerr_a_list">
        <!-- exact严格模式 :active-class绑定匹配路由之后的样式-->
        <div @click="toPushIndex(0)" class="header_a_item" v-bind:class="{ header_active: toNum==0 }">首页</div>
        <div @click="toPushIndex(1)" class="header_a_item" v-bind:class="{ header_active: toNum==1 }">地质信息</div>
        <div @click="toPushIndex(2)" class="header_a_item" v-bind:class="{ header_active: toNum==2 }">决策管理</div>
        <div @click="toPushIndex(3)" class="header_a_item" v-bind:class="{ header_active: toNum==3 }">管理后台</div>
      </div>
      <div class="headerr_a_title">
        <!-- <div class="headerr_title"> -->
          龙泉山城市森林公园地质信息系统
        <!-- </div> -->
      </div>
      <div class="headerr_user_box">
        <div class="header_time">
          <div class="header_time_date">{{nowDate}}</div>
          <!-- <div class="header_time_week">{{nowWeek}}</div> -->
        </div>
        <div class="header_user" @click="handleClick">
          <img class="header_user_img" src="../assets/index/head_default.png" alt="">
          <div class="header_user_name">您好</div>
          <div class="header_user_code">{{logintext}}</div>
          <div class="header_user_down" v-bind:class="{ header_user_up: isActive }"></div>
        </div>
        <div class="header_user_logout" v-show="isActive" @click="handleLogout">
            <img class="logout_img" src="../assets/index/logout.png" alt="">
            <div class="logout_word" @click="loginout">退出登录</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SVGA from 'svgaplayerweb'
  export default {
    name: 'Header',
    data () {
      return {
        isActive: false,
        nowWeek: '',
        nowDate: '',
        isToActive: true,
        num: 0,
        logintext: window.sessionStorage.token
      }
    },
    props: [
      'toNum'
    ],
    mounted () {
      var player = new SVGA.Player('#homeHeaderBg')
      var parser = new SVGA.Parser('#homeHeaderBg')
      parser.load('/svga/head_bg.svga', function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
      this.currentTime()
    },
    // 销毁定时器
    beforeDestroy () {
      if (this.formatDate) {
        clearInterval(this.formatDate) // 在Vue实例销毁前，清除时间定时器
      }
    },
    methods: {
      toPushIndex (e) {
        if (e === 0) {
          this.$router.push('/index')
        } else if (e === 1) {
          this.$router.push('/geology')
        } else if (e === 2) {
          this.$router.push('/decisionMaking')
        } else if (e === 3) {
          this.$router.push('/console')
        }
      },
      // 点击切换页面样式
      handleClick () {
        if (this.isActive) {
          this.isActive = false
        } else {
          this.isActive = true
        }
      },
      // 退出登录
      handleLogout () {
      },
      currentTime () {
        setInterval(this.formatDate, 500)
      },
      formatDate () {
        const date = new Date()
        const year = date.getFullYear() // 年
        const month = date.getMonth() + 1 // 月
        const day = date.getDate() // 日
        const week = date.getDay() // 星期
        const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        let hour = date.getHours() // 时
        hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
        let minute = date.getMinutes() // 分
        minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
        let second = date.getSeconds() // 秒
        second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
        this.nowDate = `${year}年${month}月${day}日 ${hour}:${minute}:${second} ${weekArr[week]}`
      },
      loginout () {
        this.$router.push('/')
        window.sessionStorage.token = ''
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss">
  #homeHeaderBg{
  height: vh(115);
}
  /* .svga { */
    /* width: 200px;
    height: 200px; */
    /* margin: 100px auto; */
  /* } */
</style>
