<template>
  <div class="labelTitle_box">
    <div class="label_title">{{labelTitle}}</div>
    <div class="label_icon_box">
      <div class="label_icon"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LabelTitle',
    data () {
      return {
        msg: '首页'
      }
    },
    props: [
      'labelTitle'
    ]
  }
</script>
