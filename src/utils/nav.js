export default {
  index: {
    title: "首页",
    path: '/index/systemIndex',
    child: [
      {
        sub: "系统首页",
        menu: [
          {
            name: "系统首页",
            path: "/index/systemIndex"
          },
          {
            name: "账户设置",
            path: "/index/accountSetting"
          },
          {
            name: "系统信息",
            path: "/index/systemInfo"
          },
        ]
      }
    ]
  },
  goods: {
    title: "商品",
    path: '/goods/list',
    child: [
      {
        sub: "商品管理",
        menu: [
          {
            name: "商品列表",
            path: "/goods/list"
          },
          {
            name: "添加商品",
            path: "/goods/add"
          },
          {
            name: "商品回收站",
            path: "/goods/recycle"
          },
          {
            name: "商品评价",
            path: "/goods/comment"
          }
        ]
      },
      {
        sub: "商品配置",
        menu: [
          {
            name: "商品分类",
            path: "/goods/category"
          },
          {
            name: "商品类型",
            path: "/goods/type"
          },
          {
            name: "品牌管理",
            path: "/goods/brand"
          },
          {
            name: "商品图片库",
            path: "/goods/image"
          },
        ]
      }
    ]
  },
  order: {
    title: "订单",
    path: "/order/list",
    child: [
      {
        sub: "订单管理",
        menu: [
          {
            name: "订单列表",
            path: "/order/list"
          },
          {
            name: "确认收货",
            path: "/order/receipt"
          },
          {
            name: "订单设置",
            path: "/order/orderSeting"
          },
        ]
      },
      {
        sub: "退款及退货",
        menu: [
          {
            name: "退货申请处理",
            path: "/order/returnGoods"
          },
          {
            name: "退款申请处理",
            path: "/order/refund"
          },
          {
            name: "退货原因设置",
            path: "/order/returnCause"
          },
          {
            name: "发货点信息管理",
            path: "/order/address"
          }
        ]
      }
    ]
  },
  promotion: {
    title: "促销",
    path: '/promotion/header',
    child: [
      {
        sub: "头部类目",
        menu: [
          {
            name: "类目列表",
            path: "/promotion/header"
          },
          {
            name: "添加类目",
            path: "/promotion/addHeader"
          }
        ]
      },
      {
        sub: "拼团管理",
        menu: [
          {
            name: "拼团商品列表",
            path: "/promotion/list"
          },
          {
            name: "添加拼团商品",
            path: "/promotion/addGoods"
          },
          {
            name: "成团管理",
            path: "/promotion/groupList"
          },
          {
            name: "订单管理",
            path: "/promotion/groupOrder"
          },
        ]
      }
    ]
  },
  stock: {
    title: "库存",
    path: '/stock/in',
    child: [
      {
        sub: "库存记录",
        menu: [
          {
            name: "商品入库",
            path: "/stock/in"
          },
          {
            name: "商品出库",
            path: "/stock/out"
          }
        ]
      }
    ]
  },
  user: {
    title: "用户",
    path: '/user/list',
    child: [
      {
        sub: "用户管理",
        menu: [
          {
            name: "用户列表",
            path: "/user/list"
          },
        ]
      }
    ]
  },
  operate: {
    title: "运营",
    path: '/operate/advertising',
    child: [
      {
        sub: "广告管理",
        menu: [
          {
            name: "广告列表",
            path: "/operate/advertising"
          },
          {
            name: "添加广告",
            path: "/operate/addAdvertising"
          },
        ]
      }
    ]
  },
  statistics: {
    title: "统计",
    path: '/statistics/deal',
    child: [
      {
        sub: "统计分析",
        menu: [
          {
            name: "交易统计",
            path: "/statistics/deal"
          },
          // {
          //   name: "商品统计",
          //   path: "/statistics/goods"
          // },
          // {
          //   name: "搜索统计",
          //   path: "/statistics/search"
          // },
        ]
      }
    ]
  }, 
  authority: {
    title: "权限",
    path: '/authority/authority',
    module: 'authority',
    child: [
      {
        sub: "权限",
        menu: [
          {
            name: "操作日志",
            path: "/authority/authority"
          },
        ]
      }
    ]
  },
}
