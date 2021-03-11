<template>
  <div class="dataViewTitle_box">
      <div class="dataViewName">{{title}}</div>
      <div class="dataViewNum">
          <div class="viewUnit">{{total}}</div>
          <div class="viewNumN">{{num}}</div>
          <div class="viewUnit">{{unit}}</div>
      </div>
  </div>
</template>
<script>

export default {
  name: 'DataViewTitle',
  data () {
    return {
    }
  },
  props: [
    'title',
    'total',
    'num',
    'unit'
  ],
  methods: {

  }
}
</script>
