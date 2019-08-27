<template>
  <div class="container">
    <div class="login">
      {{ msg }}
    </div>
  </div>
</template>
<script>
  export default {
    name: "login",
    data() {
      return {
        msg: "我是login组件"
      }
    },
  }
</script>

<style lang="scss">
  .container {
    width: 100v;
    height: 100h;
    background-color: skyblue;
  }
</style>