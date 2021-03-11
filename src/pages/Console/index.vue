<template>
<div id='console'>
  <keep-alive>
    <Header :toNum="3"/>
  </keep-alive>
  <div class="console-home">
    <div class="console-menu">
      <!-- <NavMenu/> -->
      <navaside/>
    </div>
    <div class="console-contant">
      <div class="console-tags">
        <navtabs/>
      </div>
      <div class="console-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import Header from '../../components/Header'
  // import NavMenu from './components/NavMenu'
  import navaside from '../../components/aside'
  import navtabs from '../../components/tabs'
  export default {
    data () {
      return {

      }
    },
    components: {
      Header,
      // NavMenu,
      navaside,
      navtabs
    }
  }
</script>
