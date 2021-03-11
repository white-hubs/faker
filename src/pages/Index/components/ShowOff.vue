<template>
  <div class="showoff_box">
    <div class="showoff_box_title">{{itemName}}</div>
    <div class="showoff_box_centent">
      <div class="showoff_centent_item" v-for="item in itemList" :key="item.itemNum">
        <div class="showoff_item_num">{{item.itemNum}}</div>
        <div class="showoff_item_name">{{item.itemName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShowOff',
    data () {
      return {
        msg: '首页'
      }
    },
    props: [
      'itemList',
      'itemName'
    ]
  }
</script>
