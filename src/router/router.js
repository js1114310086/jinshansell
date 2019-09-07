import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      // @相当于..     <------>   @/views === ../
      component: () => import('@/views/login')
    },
    {
      // 如果用import引入的话，当项目打包时路由里的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对比较长。当你用require这种方式引入的时候， 会将你的component分别打包成不同的js， 加载的时候也是按需加载， 只用访问这个路由网址时才会加载这个js。你可以打包的时候看看目录结构就明白了
      path: '/index',
      name: 'index',
      component: resolve => {
        require(['@/views/index'], resolve)
      },
      redirect: '/index/systemIndex',
      children: [{
          path: '/index/systemIndex', //系统首页
          name: 'systemIndex',
          component: resolve => {
            require(['@/views/index/systemIndex'], resolve)
          },
        },
        {
          path: '/index/systemInfo',
          name: 'systemInfo',
          component: resolve => {
            require(['@/views/index/systemInfo'], resolve)
          }
        },
        {
          path: '/index/accountSetting',
          name: 'accountSetting',
          component: resolve => {
            require(['@/views/index/accountSetting'], resolve)
          }
        },
        {
          // 商品列表
          path: '/goods/list',
          name: 'goodsList',
          component: resolve => {
            require(['@/views/goods/list'], resolve)
          }
        },
        {
          // 添加商品
          path: '/goods/add',
          name: 'add',
          component: resolve => {
            require(['@/views/goods/add'], resolve)
          }
        },
        {
          // 商品回收
          path: '/goods/recycle',
          name: 'recycle',
          component: resolve => {
            require(['@/views/goods/recycle'], resolve)
          }
        },
        {
          // 订单管理
          path: '/order/list',
          name: 'orderList',
          component: resolve => {
            require(['@/views/order/list'], resolve)
          }
        },
        {
          // 订单管理
          path: '/promotion/header',
          name: 'header',
          component: resolve => {
            require(['@/views/promotion/header'], resolve)
          }
        },
      ]
    },
  ]
})