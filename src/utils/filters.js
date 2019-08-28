const adPositionList = {
  '1': 'APP首页轮播',
  '2': '分类轮播',
};

const propSelectList = {
  '0': '唯一属性',
  '1': '单选属性',
  '2': '复选属性',
};

const sexList = {
  '0': '女',
  '1': '男',
  '2': '未知',
};

const orderStatus = {
  '0': '已关闭',
  '1': '待付款',
  '2': '待发货',
  '3': '待收货',
  '4': '待评价',
  '5': '已完成',
};

const recommendStatus = {
  '0': '推荐中',
  '2': '未推荐',
};

const promotionStatus = {
  '1': '拼团成功',
  '2': '拼团失败',
  '3': '后台取消',
  '4': '拼团中',
};

const promotionOrderStatus = {
  '0': '已关闭',
  '1': '待付款',
  '2': '待发货',
  '3': '待收货',
  '4': '待评价',
  '5': '已完成',
  '6': '拼团中',
  '7': '拼团成功',
  '8': '拼团取消',
  '9': '拼团失败',
  '10': '后台取消',
  '20': '已删除',
};

function getAdPosition(param) {
  return adPositionList[param]
}

function getPropSelect(param) {
  return propSelectList[param]
}

function getSex(param) {
  return sexList[param]
}

function getOrderStatus(param) {
  return orderStatus[param]
}

function getRecommendStatus(param) {
  return recommendStatus[param]
}

function getPromotionOrderStatus(param) {
  return promotionOrderStatus[param]
}

function getPromotionStatus(param) {
  return promotionStatus[param]
}

export default {
  adPositionList: adPositionList,
  getAdPosition: getAdPosition,
  getPropSelect: getPropSelect,
  getSex: getSex,
  getOrderStatus: getOrderStatus,
  recommendStatus: recommendStatus,
  getRecommendStatus: getRecommendStatus,
  promotionOrderStatus: promotionOrderStatus,
  getPromotionOrderStatus: getPromotionOrderStatus,
  promotionStatus: promotionStatus,
  getPromotionStatus: getPromotionStatus,
}