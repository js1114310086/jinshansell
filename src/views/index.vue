<template>
  <div class="container">
    <header class="header flex">
      <div class="logo"></div>
      <div @click="switchNav(item.path)" :class="index == activeNav ? 'active' : ''" class="nav-item"
        v-for="(item,index) in nav" :key="index">{{ item.title }}</div>
      <div class="flex-1">
        <img src="@/assets/icon-index.png" title="回到首页" @click="linkIndex">
        <img @click="loginOut" src="@/assets/icon-exit.png" title="退出">
      </div>
    </header>
    <div class="main" :style="{ 'height': mainHeight + 'px' }">
      <div class="menu">
        <ul v-for="(item,index) in menu" :key="index">
          <li class="menu-item menu-title">{{ item.sub }}</li>
          <router-link active-class="active" tag="li" class="menu-item" v-for="(child,idx) in item.menu" :key="idx"
            :to="child.path">{{ child.name }}</router-link>
        </ul>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import nav from '@/utils/nav'
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'index',
    computed: {
      // 计算属性，
      activeNav() {
        // 意思是将取到的store管理的数据中的activeNav数据赋值给data函数中的activeNav
        return this.$store.getters.activeNav;
      },
      menu() {
        // 将store中管理的 nav.js 当中的的第 x 个 的 子数据返回给meun
        return nav[this.$store.getters.activeNav].child;
      },
      userInfo() {
        return JSON.parse(this.$store.getters.userInfo);
      }
    },
    data() {
      return {
        mainHeight: window.innerHeight - 90,
        nav: nav,
        loginData: [{}, {}]
      }
    },
    // 是里挂载完毕后执行的
    mounted() {
      // 客户端请求(C->S)
      // 请求类型(post) [Content-Type:application/json]
      // 请求url ( /merchant_goods_brand/query_for_page)
      // 请求参数
      // {
      //     "currentPage":1, int 页码 必填
      //     "pageSize":10, int 页宽 必填
      //     "goodsName":"", String 商品名称
      //     "typeId":"", String 商品分类id
      //     "brandId":"" String 品牌id
      // }
      this.$http.post("merchant/get_merchant_login_info_list", {
        currentPage: 1,
        pageSize: 10,
        orderBy: "operate_time desc"
      }, {
        type: "form"
      }).then(res => {
        // 请求返回成功将 list 赋值给  loginData
        this.loginData = res.list;
      });
    },
    methods: {
      switchNav(path) {
        this.$router.push(path)
      },
      loginOut() {
        this.$router.push("/");
        // commit是提交store里面的方法 相当于调用了 CLEAR_USERINFO()函数
        this.$store.commit("CLEAR_USERINFO");
      },
      linkIndex() {
        // $router.push  意思将路由的路径设置为 "index"并去匹配对应的路由规则
        this.$router.push("/index")
      }
    },
  }
</script>
<style lang="scss">
  @import "~@/assets/css/common";

  .container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: auto;
  }

  .header {
    width: 100%;
    min-width: 1240px;
    height: 70px;
    background-color: #5bc0bf;

    .logo {
      width: 200px;
      height: 100%;
    }

    .nav-item {
      line-height: 70px;
      padding: 0 20px;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }

    .active {
      background-color: #7ccdcc;
    }

    .flex-1 {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 30px;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      * {
        margin-left: 20px;
      }

      span {
        color: #fff;
        font-size: 18px;
      }
    }
  }

  .main {
    display: flex;
    width: 100%;

    .menu {
      width: 200px;
      height: 100%;
      flex-shrink: 0;
      overflow: auto;
      background-color: #efefef;
      font-size: 15px;

      .menu-title {
        color: #b9b9ba !important;
        cursor: auto !important;
      }

      .menu-item {
        display: block;
        line-height: 50px;
        color: #595757;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
      }

      .active {
        color: #5bc0bf;
        border-bottom: 1px solid #5bc0bf;
        background-color: #fff;
        font-weight: bold;
      }
    }

    .content {
      position: relative;
      flex: 1;
      min-width: 1040px;
      overflow: auto;
      background-color: #fff;
    }
  }

  .el-menu {
    border: none;
  }

  .popover {
    padding-bottom: 20px;

    .title {
      padding: 10px;
      border-bottom: 1px solid #dddddd;

      .fr {
        color: $green;
        cursor: pointer;
      }
    }

    p:not(:first-child) {
      font-size: 14px;
      margin-top: 20px;
    }
  }
</style>