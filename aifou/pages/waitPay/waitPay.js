// pages/waitPay/waitPay.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // $ip:app.globalData.$ip,
    $imgIp: app.globalData.$imgIp,
    user:{
      name:"",
      phone:"",
      address:""
    },
    goodsList: [],
    totalPrice:0
  },
  toPay(){
    if (!this.data.user.address){
      wx.showToast({
        title: '请选择收货地址',
        icon:'none'
      })
      return
    }
    wx.switchTab({
      url: '../home/home',
    })
    wx.showToast({
      title: '购买成功',
    })
  },
  chooseAddress(){
    var that = this;
    wx.chooseAddress({
      success(data) {
        var user = {};
        user.name = data.userName;
        user.phone = data.telNumber;
        user.address = data.provinceName + data.cityName + data.countyName + data.detailInfo
        console.log(data)
        that.setData({
          user
        })
      },
      fail() {
        wx: wx.showToast({
          title: '获取地址失败',
          icon: 'none',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var good=JSON.parse(options.data)
    var goodsList = JSON.parse(options.data);
    var totalPrice =0;
    // goodsList.push(good);
    for (var i = 0; i < goodsList.length; i++) {
      totalPrice += parseInt(goodsList[i].price) * parseInt(goodsList[i].count);//计算总价
    }
    this.setData({
      goodsList,
      totalPrice
    })
    // console.log(this.data.totalPrice)
    console.log(this.data.goodsList)
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