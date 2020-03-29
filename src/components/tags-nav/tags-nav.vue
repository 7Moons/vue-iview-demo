<template>
  <div style="margin:15px 15px 0px 15px;position: relative;">
    <ul
      v-show="visible"
      :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}"
      class="contextmenu"
    >
      <li v-for="(item, index) of menuList" @click="handleTagsOption(index)" :key="index">{{item}}</li>
    </ul>
    <draggable style="sort: false">
      <transition-group name="taglist-moving-animation">
        <Tag
          type="dot"
          v-for="(item, index) in list"
          ref="tagsPageOpened"
          :key="`tag-nav-${index}`"
          :name="item.name"
          :data-route-item="item"
          @on-close="handleClose(item)"
          @click.native="handleClick(item)"
          :closable="isCloseTag"
          :color="isCurrentTag(item) ? 'primary' : 'default'"
          @contextmenu.prevent.native="contextMenu(item, $event)"
        >{{ showTitleInside(item) }}</Tag>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { showTitle, routeEqual } from "@/libs/util";
import draggable from "vuedraggable";
import { mapMutations } from "vuex";
export default {
  name: "TagsNav",
  components: {
    draggable
  },
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: "关闭其他"
      },
      isCloseTag: true
    };
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value;
      return { name, params, query };
    }
  },
  methods: {
    handleTagsOption(type) {
      let res = this.list.filter(item => item.name === this.currentRouteObj.name)
      this.$emit('on-close', res)
    },
    handleClose(current) {
      if (
        current.meta &&
        current.meta.beforeCloseName &&
        current.meta.beforeCloseName in beforeClose
      ) {
        new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
          if (close) {
            this.close(current);
          }
        });
      } else {
        this.close(current);
      }
    },
    close(route) {
      let res = this.list.filter(item => !routeEqual(route, item));
      this.$emit("on-close", res, undefined, route);
    },
    handleClick(item) {
      this.$emit("input", item);
    },
    showTitleInside(item) {
      return showTitle(item, this);
    },
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item);
    },

    contextMenu(item, e) {
      if (this.list.length == 1) {
        return;
      }
      this.visible = true;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      this.contextMenuLeft = e.clientX - offsetLeft + 10;
      this.contextMenuTop = e.clientY - 64;
    },
    closeMenu() {
      this.visible = false;
    }
  },
  watch: {
    list(item) {
      if (item.length == 1) {
        this.isCloseTag = false;
      } else {
        this.isCloseTag = true;
      }
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.contextmenu {
  position: absolute;
  margin: 0;
  padding: 5px 0;
  background: #fff;
  z-index: 1000;
  list-style-type: none;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  li {
    margin: 0;
    padding: 5px 15px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>

