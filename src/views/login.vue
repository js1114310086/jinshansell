<template>
  <div class="container">
    <div class="login">
      <h2>零售后台管理系统</h2>
      <span hidden>13932493200</span>
      <div class="login-form">
        <div class="form-item flex h-center">
          <img src="@/assets/icon-user.png" alt>
          <input v-model="form.loginName" class="flex-1" placeholder="请输入手机号">
        </div>
        <div class="form-item flex h-center">
          <img src="@/assets/icon-lock.png" alt>
          <input v-model="form.loginPassword" class="flex-1" placeholder="请输入密码" type="password">
        </div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from "../utils/config";
  export default {
    name: "login",
    data() {
      return {
        form: {
          loginName: "13932493200",
          loginPassword: "000000"
        },
        config: CONFIG,
        newMenu: {
          selectedparent: "",
          name: ""
        }
      };
    },
    methods: {
      login() {
        if (!this.form.loginName) {
          this.$msgWar("请输入手机号");
          return;
        }
        if (!CONFIG.reg.phone.test(this.form.loginName)) {
          this.$msgWar("请输入正确的手机号");
          return;
        }
        if (!this.form.loginPassword) {
          this.$msgWar("请输入密码");
          return;
        }
        this.$http
          .post("merchant/login", this.form, {
            type: "form"
          })
          .then(
            res => {
              this.$store.commit("SET_USERINFO", JSON.stringify(res));
              this.$msgSuc("登录成功");
              localStorage.userId = res.userId;
              localStorage.userMobile = res.merchantMobile;
              localStorage.merchantId_ID = res.merchantId;
              localStorage.moduleId = 300;
              setTimeout(() => {
                this.$router.push("/index");
              }, 500);
            },
            err => {
              this.$msgErr(err.msg);
            }
          );
      }
    }
  };
</script>

<style scoped lang="scss">
  .container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: url("../assets/background.png") repeat-y center / 100%;
  }

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    padding: 60px 40px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: 2;
    transform: translate(-50%, -50%);
    box-sizing: border-box;

    h2 {
      color: #1abc9c;
      text-align: center;
    }

    .login-form {
      margin-top: 40px;

      .form-item {
        padding-right: 20px;
        height: 50px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        margin-bottom: 30px;
      }

      input {
        height: 50px;
        font-size: 18px;
        border: none;
        border-radius: 4px;
      }

      img {
        margin: 0 20px;
      }

      button {
        width: 100%;
        height: 50px;
        background-color: #1abc9c;
        border-radius: 4px;
        border: none;
        color: #fff;
        font-size: 18px;
        cursor: pointer;

        &:focus {
          opacity: 0.8;
        }
      }
    }
  }
</style>