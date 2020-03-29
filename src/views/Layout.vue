<template>
  <div class="layout">
    <Layout style="background: inherit !important;">
      <Header class="header">
        <Row type="flex">
          <Col style="flex: 1">
            <span class="title">Vue Interview Test</span>
          </Col>
          <Col>Admin</Col>
        </Row>
      </Header>
    </Layout>
    <Layout :style="{minHeight: '100vh'}">
      <Sider :collapsed-width="78">
        <Menu theme="dark" width="auto" :active-name="$route.name">
          <MenuItem
            class="menu-item"
            :name="menu.children[0].name"
            v-for="menu in menus"
            :key="menu.id"
          >
            <div class="p-submenu-title" @click="onClickMenu(menu)">
              <span v-for="item in menu.children" :key="item.name">{{item.meta.title}}</span>
            </div>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <div class="tag-nav-wrapper">
          <tags-nav
            :value="$route"
            @input="handleClick"
            :list="tagNavList"
            @on-close="handleCloseTag"
          />
        </div>
        <Card :style="{margin: '15px', minHeight: '500px',marginTop:'0px'}" dis-hover>
          <keep-alive :include="tabList">
            <router-view></router-view>
          </keep-alive>
        </Card>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import router from "../router";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getNewTagList, routeEqual } from "@/libs/util";
import TagsNav from "../components/tags-nav";

export default {
  name: "layout",
  components: {
    TagsNav
  },

  data() {
    return {};
  },
  watch: {
    $route(newRoute) {
      const { name, query, meta } = newRoute;
      this.addTag({
        route: { name, query, meta },
        type: "push"
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
    }
  },

  computed: {
    menus() {
      return this.$store.getters.menuList;
    },
    tagNavList() {
      return this.$store.state.tagNavList;
    },
    tabList() {
      const list = [
        ...(this.tagNavList.length
          ? this.tagNavList
              .filter(item => !(item.meta && item.meta.notCache))
              .map(item => item.name)
          : [])
      ];
      return list;
    }
  },

  mounted() {
    this.setTagNavList();
    const { name, query, meta } = this.$route;
    this.addTag({
      route: { name, query, meta }
    });
  },

  methods: {
    ...mapMutations(["setTagNavList", "addTag", "closeTag"]),

    onClickMenu(menu) {
      menu.children.forEach(item => {
        if (this.$route.path !== "/" + item.name) {
          this.$router.push(item.name);
        }
      });
    },

    turnToPage(route) {
      if (route.name == this.$route.name) {
        return;
      }
      let { name, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        query
      });
    },

    handleCloseTag(res, type, route) {
      delete this.tabList[route.name];
      if (res.length == 1) {
        res.forEach(item => {
          this.$router.push(item.name);
        });
      }
      this.turnToPage(res[0].name);
      this.setTagNavList(res);
    },

    handleClick(item) {
      this.turnToPage(item);
    }
  }
};
</script>

<style scoped lang="scss">
.layout-con {
  height: 100%;
  width: 100%;
}

.header {
  background-color: white;
  padding: 0 20px;
  z-index: 1;

  .ivu-row {
    height: 100%;
  }

  .title {
    font-size: 1.5rem;
  }
}

.menu-item {
  height: 50px;
}

.p-submenu-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-left: 42px;
  display: flex;
  align-items: center;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

/deep/ .collapsed-menu .ivu-menu-submenu-title-icon {
  display: none;
}
</style>
