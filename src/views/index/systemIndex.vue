<template>
  <div>
    <sub-title :subTitle="'系统首页'"></sub-title>
    <div class="body">
      <div class="row-top flex between">
        <div>
          <img src="@/assets/index/icon-1.png" alt="">
          <div>
            <p class="font-18 gray">今日订单总数</p>
            <p class="font-18 red bold">{{ data.todayOrderNum }}</p>
          </div>
        </div>
        <div>
          <img src="@/assets/index/icon-2.png" alt>
          <div>
            <p class="font-18 gray">今日销售额</p>
            <p class="font-18 red bold">{{'¥' + data.todayOrderMoney }}</p>
          </div>
        </div>
        <div>
          <img src="@/assets/index/icon-3.png" alt>
          <div>
            <p class="font-18 gray">昨日销售额</p>
            <p class="font-18 red bold">{{'¥' + data.yesterdayOrderMoney }}</p>
          </div>
        </div>
        <div>
          <img src="@/assets/index/icon-4.png" alt>
          <div>
            <p class="font-18 gray">近七日销售总额</p>
            <p class="font-18 red bold">{{'¥' + data.nearlySevenDaysOrderMoney }}</p>
          </div>
        </div>

      </div>
      <table class="table-middle" border="1">
        <caption class="box-title">待处理事务</caption>
        <tbody>
          <tr>
            <td @click="linkOrder">
              待付款订单
              <em>({{ data.dfk }})</em>
            </td>
            <td @click="linkOrder">
              已完成订单
              <em>({{ data.ywc }})</em>
            </td>
            <td @click="linkOrder">
              待确认退货订单
              <em>({{ data.dqrth }})</em>
            </td>
          </tr>
          <tr>
            <td @click="linkOrder">
              待发货订单
              <em>({{ data.dfh }})</em>
            </td>
            <td @click="linkOrder">
              待处理退款申请
              <em>({{ data.dcltk }})</em>
            </td>
            <td @click="linkOrder">
              已发货订单
              <em>({{ data.dsh }})</em>
            </td>
          </tr>
          <tr>
            <!-- <td>待处理退货订单(<em></em>)</td> -->
            <td @click="linkAdvertising">
              广告位即将到期
              <em>(0)</em>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <div class="box-title">运营快捷入口</div>
        <ul class="list flex">
          <li class="flex-1" @click="linkUrl(item.path)" v-for="(item, index) in entryList" :key="index">
            <img class="list-icon" :src="item.icon" alt>
            <p class="font-18 gray text-center">{{ item.text }}</p>
          </li>
        </ul>
      </div>
      <div class="info">
        <el-row :gutter="50">
          <el-col :span="12">
            <div class="box-title">商品总览</div>
            <div class="flex">
              <div>
                <p class="font-22 red">{{ goodsData.notpull || 0 }}</p>
                <p class="font-18 gray">已下架</p>
              </div>
              <div>
                <p class="font-22 red">{{ goodsData.put || 0 }}</p>
                <p class="font-18 gray">已上架</p>
              </div>
              <div>
                <p class="font-22 red">{{ goodsData.all || 0 }}</p>
                <p class="font-18 gray">全部商品</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="box-title">用户总览</div>
            <div class="flex">
              <div>
                <p class="font-22 red">{{ userData.yesterdayAddUserCount || 0 }}</p>
                <p class="font-18 gray">昨日新增</p>
              </div>
              <div>
                <p class="font-22 red">{{ userData.monthAddUserCount || 0 }}</p>
                <p class="font-18 gray">本月新增</p>
              </div>
              <div>
                <p class="font-22 red">{{ userData.allUserCount || 0 }}</p>
                <p class="font-18 gray">会员总数</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import subTitle from "@/components/subTitle";
  export default {
    name: "systemIndex",
    components: {
      subTitle
    },
    data() {
      return {
        userData: {},
        goodsData: {},
        data: {
          todayOrderNum: 0,
          todayOrderMoney: 0,
          yesterdayOrderMoney: 0,
          nearlySevenDaysOrderMoney: 0
        },
        aUnpaid: 0, //待处理
        complate: 0, //已完成
        pending: 0, //待确认退货
        back_orders: 0, //代发货
        order: "",
        all_wei: "", //待处理退款
        all_shipped: "", //已发货
        todayOrderNum: 0,
        todayOrderMoney: 0,
        yesterdayOrderMoney: 0,
        nearlySevenDaysOrderMoney: 0,
        goods: "",
        entryList: [{
            icon: require("@/assets/index/icon-5.png"),
            text: "添加商品",
            path: "/goods/add"
          },
          {
            icon: require("@/assets/index/icon-6.png"),
            text: "订单列表",
            path: "/order/list"
          },
          {
            icon: require("@/assets/index/icon-7.png"),
            text: "用户管理",
            path: "/user/list"
          },
          {
            icon: require("@/assets/index/icon-8.png"),
            text: "交易统计",
            path: "/statistics/deal"
          },
          {
            icon: require("@/assets/index/icon-10.png"),
            text: "广告管理",
            path: "/operate/advertising"
          }
        ]
      };
    },
    methods: {
      linkUrl(path) {
        this.$router.push(path);
      },
      linkOrder() {
        this.$router.push("/order/list");
      },
      linkAdvertising() {
        this.$router.push("/operate/advertising");
      }
    },
    mounted() {
      this.$http
        .post("merchant_order/getOrderAllCount", {
          merchantId: JSON.parse(this.$store.getters.userInfo).merchantId
        })
        .then(res => {
          this.data = res;
        });
      this.$http.post("merchant/merchant_index").then(res => {
        this.userData = res;
      });
      this.$http.post("merchantGoods/goodsCountStatistics").then(res => {
        this.goodsData = res;
      });
    }
  };
</script>
<style scoped lang="scss">
  .row-top {
    >div {
      flex: 1;
      display: flex;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 30px;
      height: 105px;
      box-sizing: border-box;
      background-color: #f7f8f8;
      border: 1px solid #5bc0bf;

      img {
        margin: 0 15px;
      }

      div p {
        line-height: 28px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .box-title {
    line-height: 45px;
    color: #5a5a5a;
    font-weight: bold;
    font-size: 16px;
    background-color: #efefef;
    text-align: left;
    padding-left: 20px;
    border: 1px solid #b4b4b4;
    border-bottom-color: transparent;
  }

  .table-middle {
    width: 100%;
    margin-bottom: 30px;
    border-right: 1px solid #b4b4b4;
    border-bottom: 1px solid #b4b4b4;

    tr {
      height: 50px;
      background-color: #fff;
    }

    td {
      padding: 0 20px;
      border-left: 1px solid #b4b4b4;
      border-top: 1px solid #b4b4b4;
      color: #5a5a5a;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  em {
    font-style: normal;
    color: red;
    float: right;
  }

  .list {
    padding: 20px 0 35px;
    border: 1px solid #b4b4b4;
    margin-bottom: 30px;

    li:hover>p {
      cursor: pointer;
      color: #5ac2c0;
    }

    img {
      display: block;
      margin: 0 auto;
    }
  }

  .info {
    .flex {
      border: 1px solid #b4b4b4;

      div {
        flex: 1;
        text-align: center;
        padding: 20px 0;

        p {
          line-height: 36px;
        }
      }
    }
  }
</style>