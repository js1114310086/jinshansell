<template>
  <div class="sub-title flex h-center between">
    <p>{{ subTitle }}</p>
    <div>
      <el-button v-if="isClose" @click="close">关闭</el-button>
      <el-button v-if="isRefresh" @click="refresh">刷新</el-button>
      <el-button v-if="isBack" @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "subTitle",
  props: {
    subTitle: String,
    isRefresh: {
      type: Boolean,
      default: false
    },
    isClose: {
      type: Boolean,
      default: false
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    },
    close() {
      this.$emit("close");
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/css/common";
.sub-title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #efefef;
  padding-right: 30px;
  box-sizing: border-box;
  p {
    color: #5a5a5a;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    padding-left: 22px;
    border-left: 5px solid #5bc0bf;
  }
  div {
    > button {
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
