<template>
  <div>
    <!-- 这是内容区域的公共头部组件 -->
    <sub-title :subTitle="'商品列表'"></sub-title>
    <div class="body">
      <div class="filter-wrap">
        <!-- 这是内容 的筛选栏 -->
        <div class="flex h-center between">
          <div>
            <span class="font-14 gray">
              <i class="el-icon-search"></i>
              筛选查询
            </span>
          </div>
          <div class="search-wrap">
            <span class="font-14 gray" @click="showSearch" v-show="!visibleSearch">
              <i class="el-icon-arrow-down"></i>
              打开筛选
            </span>
            <span class="font-14 gray" @click="showSearch" v-show="visibleSearch">
              <i class="el-icon-arrow-up"></i>
              收起筛选
            </span>
            <el-button class="search" @click="search">查询结果</el-button>
          </div>
        </div>
        <!-- 这是筛选的编辑弹窗 -->
        <div class="flex h-center" v-show="visibleSearch">
          <span class="font-14 gray">输入搜索:</span>
          <el-input v-model="goodsName" @clear="search" @keyup.enter.native="search" clearable placeholder="商品名称/商品货号"
            class="search-input"></el-input>
          <span class="font-14 gray">选择分类:</span>
          <el-select v-model="typeId" @change="search" placeholder="请选择商品分类" clearable class="search-input">
            <el-option :label="item.typeName" :value="item.id" v-for="item in categoryList"></el-option>
          </el-select>
          <span class="font-14 gray">选择品牌:</span>
          <el-select v-model="brandId" @change="search" placeholder="请选择商品品牌" clearable class="search-input">
            <el-option :label="item.name" :value="item.id" v-for="item in brandList"></el-option>
          </el-select>
        </div>
      </div>
      <!-- 表格头部 -->
      <div class="box-title flex between h-center">
        <span class="font-20">数据列表</span>
        <div class="flex h-center">
          <el-button @click="$router.push('/goods/add')">添加商品</el-button>
        </div>
      </div>
      <!-- 数据表格 table表格 -->
      <el-table class="mall-table" v-loading="loading" :data="tableData" ref="table" @selection-change="tableSelection"
        :header-cell-style="headerStyle" :cell-style="tdStyle">
        <!-- 这是每一列展示的内容  编号列 -->
        <el-table-column type="selection" width="55" prop="id"></el-table-column>
        <el-table-column label="编号">
          <!-- 这是每列的编号 -->
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>

        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="getGoodImg(scope.row.goodsImg)" alt>
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            <p>{{ scope.row.goodsName }}</p>
            <p>品牌{{ scope.row.brandName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号">
          <template slot-scope="scope">
            <p>价格：¥{{ scope.row.goodsPrice }}</p>
            <p>货号：{{ scope.row.goodsNo }}</p>
          </template>
        </el-table-column>
        <el-table-column label="SKU库存">
          <template slot-scope="scope">
            <img src="@/assets/icon-edit.png" alt @click="editStock(scope.row.id)">
          </template>
        </el-table-column>
        <el-table-column label="销量">
          <template slot-scope="scope">{{ scope.row.buyNum }}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{ scope.row.status == 0 ? '未上架' : '已上架' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="table-btn"
              @click="outGoods(scope.row.id, scope.row.status)">{{ scope.row.status == 0 ? '上架' : '下架'}}</span>
            <span class="table-btn" @click="$router.push('/goods/add?id=' + scope.row.id)">编辑</span>
            <span class="table-btn" @click="remove([scope.row.id])">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 这是分页器 -->
      <pagination @confirmBatch="confirmBatch" @handleChangeAll="handleChangeAll" @next="next"
        :optionsList="optionsList" :total="total" :pageSize="pageSize" ref="pagination"></pagination>
      <!-- 这是库存编辑弹窗 -->
      <el-dialog title="编辑货品信息" :visible.sync="dialogVisible" :append-to-body="true">
        <div v-loading="dialogLoading">
          <div class="flex h-center">
            <span>商品货号：{{ goodsNo }}</span>
          </div>
          <table class="mall-table dialog-table">
            <thead>
              <td width="80" v-for="item in stockHeader">{{ item }}</td>
              <td>销售价格</td>
              <td>商品库存</td>
              <td>库存预警值</td>
            </thead>
            <tbody>
              <tr v-for="item in stockList">
                <td v-for="prop in item.nameValue">{{ prop.value }}</td>
                <td>
                  <el-input v-model="item.goodsSalePrice" type="number"></el-input>
                </td>
                <td>
                  <el-input v-model="item.goodsStock" type="number"></el-input>
                </td>
                <td>
                  <el-input v-model="item.stockWarning" type="number"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateStock">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import subTitle from "@/components/subTitle";
  import pagination from "@/components/pagination";
  import mixin from "@/utils/mixin";
  export default {
    name: "list",
    mixins: [mixin],
    components: {
      subTitle,
      pagination
    },
    data() {
      return {
        goodsName: "",
        checkAll: false,
        tableData: [],
        dialogVisible: false,
        optionsList: {
          delete: "删除"
        },
        checkItemId: [],
        typeId: "",
        categoryList: [],
        brandList: [],
        brandId: "",
        dialogLoading: false,
        goodsId: "",
        goodsNo: "",
        stockHeader: [],
        stockList: []
      };
    },
    mounted() {
      this.$http.post("merchantGoodsType/query_goods_type_tree").then(res => {
        this.categoryList = res;
      });
      this.$http.post("merchant_goods_brand/query_list").then(res => {
        this.brandList = res;
      });
      this.getList();
    },
    methods: {
      getList() {
        this.loading = true;
        this.$http
          .post("merchantGoods/merchant_goods_list_page", {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            goodsName: this.goodsName,
            typeId: this.typeId,
            brandId: this.brandId
          })
          .then(
            res => {
              this.total = res.totalCount;
              this.tableData = res.list;
            },
            err => {
              this.$msgErr(err.msg);
            }
          )
          .finally(() => {
            this.loading = false;
          });
      },
      editStock(id) {
        this.stockHeader = [];
        this.dialogVisible = true;
        this.dialogLoading = true;
        this.$http
          .post("merchantGoods/merchant_goods_by_id", {
            id: id
          })
          .then(res => {
            this.dialogLoading = false;
            this.goodsNo = res.goodsNo;
            this.goodsId = id;
            this.stockList = res.merchantGoodsTypePropertyList;
            res.map.map(item => {
              this.stockHeader.push(item.name);
            });
          });
      },
      outGoods(id, status) {
        if (status == 0) {
          this.$http
            .post("merchantGoods/merchant_goods_put", {
              id: id
            })
            .then(
              () => {
                this.$msgSuc("上架成功");
                this.getList();
              },
              err => {
                this.$msgErr(err.msg);
              }
            );
        } else {
          this.$http
            .post("merchantGoods/merchant_goods_pull", {
              id: id
            })
            .then(
              () => {
                this.$msgSuc("下架成功");
                this.getList();
              },
              err => {
                this.$msgErr(err.msg);
              }
            );
        }
      },
      updateStock() {
        for (let i = 0; i < this.stockList.length; i++) {
          if (
            !this.stockList[i].goodsSalePrice ||
            !this.stockList[i].goodsStock ||
            !this.stockList[i].stockWarning
          ) {
            this.$msgWar("请完整填写信息");
            return;
          }
        }
        this.$http
          .post("merchantGoods/merchant_goods_update_sku", {
            merchantGoodsTypePropertyList: this.stockList,
            id: this.goodsId
          })
          .then(
            () => {
              this.$msgSuc("操作成功");
              this.dialogVisible = false;
            },
            err => {
              this.$msgErr(err.msg);
            }
          );
      },
      remove(id) {
        this.$confirm("确认删除吗?").then(() => {
          this.$http.post("merchantGoods/delete_batch", id).then(
            () => {
              this.getList();
              this.$msgSuc("删除成功");
            },
            err => {
              this.$msgErr(err.msg);
            }
          );
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "~@/assets/css/common";

  .filter-wrap {
    border: $border;
    margin-bottom: 24px;

    >div {
      padding: 0 22px;
      height: 56px;

      &:last-child {
        background-color: $bgColor;
      }
    }

    .search {
      margin-left: 20px;
      margin-right: 0;
    }
  }

  .search-input {
    width: 200px;
    margin: 0 15px;
  }

  .box-title {
    padding-right: 20px;

    .search-input {
      width: 150px;
      margin-left: 20px;
    }

    .mall-btn {
      margin-right: 0;
    }
  }
</style>