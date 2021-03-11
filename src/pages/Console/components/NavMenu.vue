<template>
<div class="menu">
  <el-row class="tac">
  <el-col :span="24">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @select='handleClick'>
      <el-menu-item index="1">
        <div class="bg"></div>
        <span slot="title">1</span>
      </el-menu-item>
              <el-submenu index="1-4">
          <template slot="title">4
            <div class="bg"></div>
          </template>
          <el-menu-item index="1-4-1" style="width:10px">4-1</el-menu-item>
          <el-menu-item index="1-4-2">4-2</el-menu-item>
        </el-submenu>
      <el-menu-item index="2">
        <div class="bg"></div>
        <span slot="title">2</span>
      </el-menu-item>
      <el-menu-item index="3">
        <div class="bg"></div>
        <span slot="title">3</span>
      </el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">4
            <div class="bg"></div>
          </template>
          <el-menu-item index="1-4-1" style="width:10px">4-1</el-menu-item>
          <el-menu-item index="1-4-2">4-2</el-menu-item>
        </el-submenu>
    </el-menu>
  </el-col>
  </el-row>
  </div>
</template>
<script>
  export default {
    name: 'NavMenu',
    data () {
      return {

      }
    },
    methods: {
      handleClick (key, keypath) {
        console.log(key)
      }
    }
  }
</script>
<style lang="scss" scpoed>
</style>
