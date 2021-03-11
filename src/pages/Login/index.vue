<template>
  <div class="positions" :style="{height:bodyheight}">
    <div class="title">
      <img src="../../assets/img/title.png" alt="">
    </div>
    <div class="login-content">
    <div class="pic" id="pic">
      <!-- <img src="../../assets/img/login_pic.png" alt=""> -->
    </div>
    <div class="loginbody">
      <div class="lefttop"></div>
      <div class="righttop"></div>
      <div class="rightbottom"></div>
      <div class="leftbottom"></div>
      <div class="logintext">欢迎登录</div>
      <el-form>
      <el-input type="text" id="name" class="name" placeholder="请输入用户名" v-model="ruleForm.username" @keyup.enter.native="enterClick"> </el-input>
      <el-input type="password" id="password" class="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="enterClick"></el-input>
      <div class="verification">
      <el-input type="text" id="verification"  placeholder="请输入验证码" v-model="ruleForm.code" @keyup.enter.native="enterClick"></el-input>
      <div class="verificationright" @click="chekimg">
        <img :src="imgUrl" alt="">
      </div>
      </div>
      <div class="cheboxwai" @click="shows">
      <div class="chebox"  v-show="isshow"> <div class="gou"></div></div>
      <div class="span">自动登录</div>
      </div>
      <el-button @click="login" >登录</el-button>
      </el-form>
    </div>
</div>
    <div class="technical">技术支持：成都汉康信息产业有限公司</div>
  </div>
</template>
<script>
  import { postQueryLogin, postQueryUser } from '../../api/login'
  import SVGA from 'svgaplayerweb'

  export default {
    data () {
      return {
        queryRequest: postQueryLogin,
        queryUserInfo: postQueryUser,
        isshow: true,
        imgUrl: '/backstage/visitor/imageCode?time=' + Date.now(),
        ruleForm: {
          username: '',
          password: '',
          code: ''
        }
      }
    },
    methods: {
      shows () {
        this.isshow = !this.isshow
      },
      enterClick: function () {
        this.login()
      },
      login () {
        //
        this.getTableData()
      // console.log(this.imgUrl)
      },
      chekimg () {
        this.imgUrl = '/backstage/visitor/imageCode?time=' + Date.now()
      },
      async getTableData () {
        if (!this.queryRequest) {
          console.log(11)
        // nothing todo
        } else {
          try {
            await this.queryRequest(this.ruleForm)
            // this.dataRows = data[this.tableDataKey]
            // this.total = data.total
            this.getUserData()
            // window.sessionStorage.token = data.userInfo.name
            // console.log(data)
            // console.log(this.ruleForm)
            this.open()
          // console.log('登录成功')
          } catch (err) {
            console.log(err)
            console.log(this.ruleForm)
            if (err === 20005) {
              this.open1('登陆失败')
            } else if (err === 200052) {
              this.open1('验证码不正确')
            } else if (err === 200051) {
              this.open1('用户名或密码错误')
            } else {
              this.open1('系统繁忙，请稍后重试')
            }
          }
        }
      },
      open1 (title) {
        this.$message.error(title)
      },
      open () {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push('./index')
      },
      userlogin () {
        if (window.sessionStorage.token) {
          this.$router.push('./index')
        } else {

        }
      },
      async getUserData () {
        if (!this.queryUserInfo) {
          console.log(11)
        // nothing todo
        } else {
          const data = await this.queryUserInfo()
          // this.dataRows = data[this.tableDataKey]
          // this.total = data.total
          // console.log(data)
          // console.log(data.userInfo.name)

          window.sessionStorage.token = data.userInfo.name
          // console.log('text', window.sessionStorage.token)
        }
      }
    },
    computed: {
      bodyheight () {
        console.log(document.documentElement.clientHeight)
        return document.documentElement.clientHeight + 'px'
      }
    },
    mounted () {
      this.userlogin()
      var player = new SVGA.Player('#pic')
      var parser = new SVGA.Parser('#pic')
      parser.load('/svga/login/dizhidongxiao.svga', function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
    }
  }
</script>
<style >
.positions{
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
  /* height: 1000px; */
  width: 100%;
  background: url(../../assets/img/login_bg.png);
  background-size: 100% 100%;
}
.chebox{
  height: 200px;
  width: 200px;
  border-radius: 200px;
  background-color:  khaki;
}
</style>
