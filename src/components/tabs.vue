<template>
    <div class='tabss'>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick($event)">
            <el-tab-pane
                :key="item.name"
                v-for="item in editableTabs"
                :label="item.title"
                :name="item.name"
                @click="closeclick(item)"
            >
            </el-tab-pane>
        </el-tabs>
        <!-- <router-view/> -->
        <!-- 放入router-view -->
    </div>
</template>

<script>
// import { state } from 'vuex'
  export default {
    name: '',
    components: {},
    data () {
      return {

      }
    },
    mounted () {
      // 刷新加载sessionStorage存着地址
      if (sessionStorage.getItem('state.tabsPage')) {
        this.$store.state.tabs.tabsPage = JSON.parse(
          sessionStorage.getItem('tabsPage')
        )
        var TabsValue = sessionStorage.getItem('TabsValue')
        this.$store.state.tabs.TabsValue = TabsValue
        this.$router.push({ name: TabsValue })
      }
    },
    computed: {
      // 监听vuex保存的数据
      editableTabs: {
        get () {
          return this.$store.state.tabsPage
        },
        set (val) {
          this.$store.state.tabsPage = val
        }
      },
      editableTabsValue: {
        get () {
          return this.$store.state.TabsValue
        },
        set (val) {
          this.$store.state.TabsValue = val
        }
      }
    },
    methods: {
      removeTab (targetName) {
        const tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            // console.log('index', tabs[index])
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              console.log(nextTab)
              if (nextTab) {
                activeName = nextTab.name
              } else {
                activeName = 'information'
              }
            }
          })
        }
        this.editableTabsValue = activeName
        // 指定页面不可关闭
        if (targetName === 'information') {
          return 0
        } else {
          this.editableTabs = tabs.filter(tab => tab.name !== targetName)
        }
        // 解决刷新消失
        window.sessionStorage.setItem('tabsPage', JSON.stringify(this.newTabs))
        window.sessionStorage.setItem('TabsValue', activeName)
        // 删除时跳转不在停留被删除页
        this.$router.push({ name: activeName })
      },
      tabClick (event) {
        // 写一个点击tabs跳转
        this.$router.push({ name: event.name })
      }
    }
  }
</script>
