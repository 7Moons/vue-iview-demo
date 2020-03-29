import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Router from 'vue-router'

Vue.use(iView);
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
