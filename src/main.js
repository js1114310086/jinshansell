import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Element from 'element-ui'
import {
  Message
} from 'element-ui'
import './assets/css/element-variables.scss'
import axios from './utils/axios'
import plugin from './utils/plugin'
Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$http = axios;
Vue.use(plugin);

// 设置全局前  置导航守卫 beforeEach((to, from, next)
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('userInfo') || JSON.stringify(store.getters.userInfo) === '{}') {
    if (to.name == 'login') {
      next();
    } else {
      Message.error("登录过期");
      router.replace('/');
    }
  } else {
    let module = to.path.split('/')[1] ? to.path.split('/')[1] : 'index';
    store.commit('ACTIVE_NAV', module);
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')