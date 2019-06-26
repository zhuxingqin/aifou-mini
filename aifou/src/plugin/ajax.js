const app = getApp();

function httpFail() { //请求失败的函数
  wx.showModal({
    title: '加载失败',
    content: '网络连接失败',
    showCancel: false,
  })
}
function $toGet({Url, pageSize, pid, kw,ptype,callBack}) { //请求首页商品广告数据
  wx.request({
    url: app.globalData.$imgIp + Url,
    data: {
      pageSize,
      pid,
      kw,
      ptype
    },
    success(data) {
      callBack(data)
    },
    fail() {
      httpFail()
    }
  })
}
module.exports = {
  $toGet
}