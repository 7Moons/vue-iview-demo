import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import { getNextRoute, routeEqual, getMenuByRouter, getTagNavListFromLocalstorage, setTagNavListInLocalstorage, getRouteTitleHandled, routeHasExist } from '@/libs/util';
import routers from './router/routers';
Vue.use(Vuex);

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route);
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute);
}

export default new Vuex.Store({
  state: {
    tagNavList: []
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers)
  },
  mutations: {
    setTagNavList(state, list) {
      let tagList = [];
      if (list) {
        tagList = [...list];
      } else tagList = getTagNavListFromLocalstorage() || [];
      state.tagNavList = tagList;
      setTagNavListInLocalstorage([...tagList]);
    },
    closeTag(state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route));
      route = tag[0] ? tag[0] : null;
      if (!route) return
      closePage(state, route);
    },
    addTag(state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route);
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          state.tagNavList.splice(1, 0, router);
        }
        setTagNavListInLocalstorage([...state.tagNavList]);
      }
    }
  },
  actions: {
  }
})
