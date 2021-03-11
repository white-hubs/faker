<template>
  <div class="face_list_item_box">
    <div class="face_name">{{name}}</div>
    <div class="face_value">{{value}}</div>
  </div>
</template>
<script>

  export default {
    name: 'FaceListItem',
    data () {
      return {

      }
    },
    props: [
      'name',
      'value'
    ],
    methods: {
      closeClick () {
        this.$parent.formTableFlase()
      }
    }
  }
</script>
