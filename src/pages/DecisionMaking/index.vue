<template>
  <div class="home">
      <keep-alive>
        <Header :toNum="2"/>
      </keep-alive>
      <div class="home_content">
        <div class="decisionMaking_aside">
          <navaside/>
        </div>
        <div class="home_map_box_c">
          <div class="home_map_bg">
            <router-view></router-view>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Header from './../../components/Header'
  import navaside from '../../components/decisionAside'
  export default {
    name: 'Geology',
    data () {
      return {
        msg: '决策管理'
      }
    },
    components: {
      Header,
      navaside
    }
  }
</script>
