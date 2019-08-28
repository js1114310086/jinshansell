import axios from 'axios'
import qs from 'qs'
import CONFIG from './config'
import store from '../store/store'
import router from '../router/router'
import {
  Message
} from 'element-ui';
axios.defaults.baseURL = CONFIG.API;
axios.defaults.time = 5000;
// 设置请求拦截器
axios.interceptors.request.use((config) => {
  // 跨域为true
  config.withCredentials = true;
  if (config.type == 'form' && config.file != 'image') {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    config.headers['content-type'] = 'application/json; charset=UTF-8';
  }
  return config
}, (err) => {
  Message.error('请求超时');
  return Promise.reject(err);
});
// 设置响应拦截器
axios.interceptors.response.use((res) => {
  if (res.data.errno == 200) {
    return res.data.data
  } else if (res.data.errno == 416) {
    Message.error('登录失败');
    setTimeout(() => {
      store.commit('CLEAR_USERINFO');
      router.push('/');
    }, 500);
  } else if (res.data.errno === '0000') {
    return Promise.reject(res.data);
  } else {
    return Promise.reject(res.data);
  }
}, (err) => {
  return Promise.reject(err)
})
// 导出axios
export default axios;