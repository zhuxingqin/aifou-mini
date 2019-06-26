// pages/user/user.js
const app = getApp();//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[
      "我的会员卡",
      "我的返现",
      "我的礼品卡",
      "我的积分",
      "我的优惠卷",
      "我的优惠码",
      "我的礼物",
      "爱否科技中心",
      "我购买的专栏，内容"
    ]
  },
  jumpCart:function(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  jumpList:function(){
    wx.showToast({
      title: '功能未开发，敬请期待',
      icon: 'none',
      duration: 2000
    })
  },
  bindgetuserinfo(){
    wx.getUserInfo({
      lang: "zh_CN",
      withCredentials:true,
      success:(res)=>{
        console.log('成功获取用户信息')
        console.log(res)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo)
        console.log(this.data.hasUserInfo)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.userInfo)
    console.log(this.data.hasUserInfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})