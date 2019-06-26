// pages/goodDetails/goodDetails.js
const app=getApp();
const ajax=require('../../src/plugin/ajax.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nextBtn:null,
    addBox: false,//购买商品模态框状态
    $ip: app.globalData.$ip,
    $imgIp: app.globalData.$imgIp,
    good:{
      title: "",//标题
      price: 0,//价格
      oldPrice:0,//原价
      img:[],//轮播图
      detailImg:""//详情图
    },
  },
  jumpCart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  jumpHome(){
    wx.switchTab({
      url: '../home/home',
    })
  },
  doShow(e) {
    var d=e.currentTarget.dataset.where;
    if (d=="cart"){//判断用户点击了哪一个按钮
      var nextBtn = "cart"
    } else if (d == "waitPay"){
      var nextBtn = "waitPay"
    }else{
      var nextBtn =null
    }
    this.setData({
      nextBtn,
      addBox: true
    })
  },
  doClose(e) {//关闭添加商品模态窗
    var addBox = e.detail.val
    this.setData({
      addBox
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    (()=>{
      var httpCallback = (data) => {//回调函数，处理请求回来的数据
        var d = data.data;
        var good = this.data.good;
        good.pid = d.data.pid;
        good.title = d.data.title;
        good.detailImg = d.data.content_img
        good.price = d.data.price;
        good.oldPrice = d.data.old_price;
        for (var i = 1; i < d.pimg[0].length; i++) {//遍历商品轮播图
          if (d.pimg[0][i]) {
            good.img.push(d.pimg[0][i])
          }
        }
        this.setData({
          good
        })
      }
      ajax.$toGet({
        Url:"php/productDetail.php",
        pid: options.pid,
        callBack:httpCallback,
      })//调用ajax请求函数
    })()
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