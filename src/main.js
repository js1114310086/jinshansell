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
// 这是 vue 的富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$http = axios;
Vue.use(plugin);
Vue.use(VueQuillEditor)

// 设置全局  前置导航守卫 beforeEach((to, from, next)
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