<template>
  <div class="menu">
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="menuDefaultActive" router>
          <template v-for="(item, index) in menuData">
            <el-submenu v-if="item.children" :index="index + ''" :key="index">
              <template slot="title">
                <div class="bg"></div>
                <span style="">{{ item.menuItem }}</span>
              </template>
              <template v-for="(result, i) in item.children">
                <el-menu-item
                  :route="{ name: result.pathName }"
                  :index="result.pathName"
                  :key="i"
                  >{{ result.menuItem }}</el-menu-item
                >
              </template>
            </el-submenu>
            <el-menu-item
              v-else
              :route="{ name: item.pathName }"
              :index="item.pathName"
              :key="index"
            >
              <div class="bg"></div>
              <span slot="title">{{ item.menuItem }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "zgz-admin-index-aside",
  components: {},
  created() {
    // this.handleOpen2(this.menus[0])
  },
  data() {
    return {
      menuDefaultActive: "waterResources",
      // 将所需submenu,menu和tabs所需参数写成数据格式
      menuData: [
        {
          pathName: "waterResources",
          menuItem: "水资源板块",
          children: [
            {
              pathName: "waterResources",
              menuItem: "天然泉点"
            },
            {
              pathName: "waterSource",
              menuItem: "地下水水源地"
            }
          ]
        },
        {
          pathName: "geothermal",
          menuItem: "地热资源板块"
        },
        {
          pathName: "geological",
          menuItem: "地质灾害板块"
        },
        {
          // pathName: 'menu_node_1',
          menuItem: "旅游资源板块",
          children: [
            {
              pathName: "tourism",
              menuItem: "优质旅游资源"
            },
            {
              pathName: "remains",
              menuItem: "优质地质遗迹"
            }
          ]
        },
        {
          pathName: "drilling",
          menuItem: "钻孔板块"
        },
        {
          // pathName: 'menu_node_1',
          menuItem: "示范点",
          children: [
            {
              pathName: "demonstration",
              menuItem: "丹景台"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.toPush();
  },
  methods: {
    toPush() {
      this.$router.push("/waterResources");
    }
  }
};
</script>
