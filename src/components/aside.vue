<template>
  <div class="menu">
    <el-row>
      <el-col :span="24">
        <!-- -->
        <el-menu :default-active="$route.name">
          <!-- 循环数据格式 -->
          <el-menu-item
            :index="item.routeName"
            v-for="item in menus"
            :key="item.index"
            @click="handleOpen2(item)"
          >
            <div class="bg"></div>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <el-submenu
            :index="`${index}`"
            v-for="(menu, index) in menuList"
            :key="index"
          >
            <template slot="title">
              <div class="bg"></div>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.routeName"
                v-for="item in menu.menuItem"
                :key="item.index"
                @click="handleOpen2(item)"
                >{{ item.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            :index="item.routeName"
            v-for="item in menulists"
            :key="item.index"
            @click="handleOpen2(item)"
          >
            <div class="bg"></div>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'zgz-admin-index-aside',
    components: {},
    data () {
      return {
        // 将所需submenu,menu和tabs所需参数写成数据格式
        menuList: [
          {
            name: '设备管理',
            menuItem: [
              {
                title: '摄像头列表',
                routeName: 'camera',
                name: '摄像头列表'
              },
              {
                title: '传感器列表',
                routeName: 'sensor',
                name: '传感器列表'
              }
            ]
          }
        ],
        menus: [
          {
            title: '信息管理',
            name: '信息管理',
            routeName: 'information',
            close: true
          },
          {
            title: '账号管理',
            name: '账号管理',
            routeName: 'user'
          }
        ],
        menulists: [
          // {
          //   title: '示范点管理',
          //   name: '示范点管理',
          //   routeName: 'demonstrations'
          // },
          {
            title: '操作日志',
            name: '操作日志',
            routeName: 'logs'
          }
        ]
      }
    },
    created () {
      this.handleOpen2(this.menus[0])
    },
    mounted () {},
    methods: {
      // 调用 注册vuex内注册的editableTabs方法
      ...mapActions({
        handleOpen2: 'editableTabs'
      })
    }
  }
</script>
