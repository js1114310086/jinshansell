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
  import nav from "@/utils/nav";
  import {
    mapState
  } from "vuex";
  export default {
    name: "index",
    computed: {
      activeNav() {
        return this.$store.getters.activeNav;
      },
      menu() {
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
      };
    },
    mounted() {
      this.$http
        .post(
          "merchant/get_merchant_login_info_list", {
            currentPage: 1,
            pageSize: 10,
            orderBy: "operate_time desc"
          }, {
            type: "form"
          }
        )
        .then(res => {
          this.loginData = res.list;
        });
    },
    methods: {
      switchNav(path) {
        this.$router.push(path);
      },
      loginOut() {
        this.$router.push("/");
        this.$store.commit("CLEAR_USERINFO");
      },
      linkIndex() {
        this.$router.push("/index");
      }
    }
  };
</script>

<style lang="scss" scoped>
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