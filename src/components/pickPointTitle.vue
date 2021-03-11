<template>
  <div class="PickPointTitle_box">
      <p class="Pick_point_title">{{name}}</p>
      <div class="Pick_point_X" @click="closeClick"></div>
  </div>
</template>
<script>

  export default {
    name: 'PickPointTitle',
    data () {
      return {

      }
    },
    props: [
      'name',
      'item'
    ],
    methods: {
      closeClick () {
        this.$parent.getCounterData(this.item)
      }
    }
  }
</script>
