<template>
  <div>
    <sub-title :subTitle="'用户设置'" :isRefresh="false"></sub-title>
    <div class="body">
      <div class="div-middle">
        <el-upload class="upload-demo" action :http-request="uploadFile" accept="image/jpeg, image/png"
          :show-file-list="false">
          <img class="uploading-img-img" :src="avatar">
          <div slot="tip" class="el-upload__tip">上传头像</div>
        </el-upload>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" required>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确定密码" prop="twicePassword">
            <el-input type="password" v-model="ruleForm.twicePassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="update('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import subTitle from "@/components/subTitle";
  export default {
    name: "accountSetting",
    components: {
      subTitle
    },
    created() {
      this.userInfo = JSON.parse(this.$store.getters.userInfo);
      this.ruleForm.name = this.userInfo.merchantName;
      this.ruleForm.merchantLogo = this.userInfo.merchantLogo;
      this.avatar =
        "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1567011196&di=622ae621b2f3184f0d442526ea478120&src=http://s9.sinaimg.cn/bmiddle/937c1bb9gx6Dl0GKyRW88&690"
    },
    mounted() {

    },
    data() {
      // 表单验证  检查确认的密码是否与 初次修改的密码相同
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.ruleForm.twicePassword !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        avatar: "",
        ruleForm: {
          name: "",
          oldPassword: "",
          newPassword: "",
          twicePassword: "",
          merchantLogo: ""
        },
        rules: {
          name: [{
            // required  为是否必填
            required: true,
            message: "请输入用户名",
            tigger: "blur"
          }],
          oldPassword: [{
            required: true,
            message: "请输入旧密码",
            tigger: "blur"
          }],
          newPassword: [{
            required: true,
            message: "请输入新密码",
            tigger: "blur"
          }],
          twicePassword: [{
            required: true,
            tigger: "blur",
            // 这是校验规则
            validator: validatePass2
          }]
        }
      }
    },
    methods: {
      uploadFile(file) {
        let formData = new FormData();
        formData.append("file", file.file);
        this.$http.post("merchant/upload_file", formData, {
          type: "form",
          file: "image"
        }).then(res => {
          this.ruleForm.merchantLogo = res.image;
          this.avatar = this.userInfo.imgUrl = res.image;
        });
      },
      updated(formName) {
        // validate  对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post("/merchant/change_password", this.ruleForm, {
              type: "form"
            }).then(() => {
              this.userInfo.merchantName = this.ruleForm.name;
              this.userInfo.merchantLogo = this.ruleForm.merchantLogo;
              this.$msgSuc("修改成功");
              this.ruleForm.oldPassword = "",
                this.ruleForm.twicePassword = "",
                this.$store.commit(
                  "SET_USERINFO", JSON.stringify(this.userInfo)
                );
            });
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  .el-form-item__error {
    left: 26px;
  }

  .body {
    .div-middle {
      text-align: center;

      .el-form-item__label {
        float: none;
        clear: both;
      }

      .el-form-item {
        width: 400px;
        margin: 26px auto;
      }

      button {
        background: #5bc0bf;
        color: #fff;
      }

      .el-form-item__content {
        display: inline-block;

        .el-input {
          display: inline-block;

          input {
            width: 100%;
          }
        }
      }
    }
  }

  .uploading-img-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .demo-ruleForm {
    margin-left: -120px;
  }
</style>