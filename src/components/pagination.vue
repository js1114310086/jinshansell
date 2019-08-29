<template>
  <div class="pagination-wrap flex h-center between">
    <div>
      <div class="batch-wrap flex h-center" v-if="isBatch">
        <el-checkbox-group v-model="checkAll" @change="handleChangeAll">全选</el-checkbox-group>
        <el-select @change="checkBatch" v-model="checkBatch" :clearable="isClear" placeholder="批量操作" size="mini"
          class="select">
          <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item.value">
          </el-option>
        </el-select>
        <el-button size="mini" @click="confirmBatch">确定</el-button>
      </div>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"
      :page-size="pageSize" backGround layout="total,prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    mame: "pagination",
    props: {
      isBatch: {
        type: Boolean,
        default: true
      },
      isClear: {
        type: Boolean,
        default: false
      },
      total: Number,
      pageCount: Number,
      pageSize: Number,
      optionsList: Object
    },
    data() {
      return {
        checkAll: false,
        checkBatch: "",
        currentPage: 1
      };
    },
    methods: {
      handleChangeAll(val) {
        this.$emit("handleChangeAll", val);
      },
      handleCurrentChange($event) {
        this.$emit("next", $event);
      },
      confirmBatch() {
        this.$emit("confirmBatch", this.checkBatch);
      },
      batchChange($event) {
        this.$emit("batchChange", $event);
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/css/common";

  .pagination-wrap {
    padding: 0 20px;
    height: 44px;
    background-color: $bgColor;
    border: $border;
    border-top-color: transparent;
  }

  .select {
    margin: 0 20px;
    width: 150px;
  }
</style>