// pages/home/home.js
const app=getApp();
const ajax=require('../../src/plugin/ajax.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,//加载动画
    recordCount:1,//总数据条数
    pageSize:5,//需请求的数据条数
    $ip: app.globalData.$ip,
    images: [//轮播图
      'img/swiper/1.jpg',
      'img/swiper/2.jpg',
      'img/swiper/3.jpg'
    ],
    goods:[],
    classify:[
      {
        img: "img/index/phone.png",
        text:"手机",
        ptype:1
      },
      {
        img: "img/index/ipad.png",
        text: "平板",
        ptype: 3
      },
      {
        img: "img/index/pc.png",
        text: "电脑",
        ptype: 4
      },
      {
        img: "img/index/other.png",
        text: "配件",
        ptype: 5
      }
    ]
  },
  search(e){//跳转到搜索页面
    var ptype=e.currentTarget.dataset.ptype;
    if (ptype){
      wx.navigateTo({
        url: '../search/search?ptype=' + ptype,
      })
    }else{
      wx.navigateTo({
        url: '../search/search',
      })
    }
  },
  jumpGoodDetail(e){
    var pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../goodDetails/goodDetails?pid='+pid,
    })
  },
  getData(){//获取宣传产品数据
    this.setData({
      isLoading: true
    })
    var httpCallback = (data) => {//回调函数 箭头函数改变this指向
      setTimeout(()=>{//故意延迟加载，为了加载更多功能明显一点
        this.setData({
          goods: data.data.data,//保存数据
          recordCount: data.data.recordCount,
          isLoading: false//结束加载动画
        })
      },500)
    }
    ajax.$toGet({
      Url: "php/ad_products.php",
      pageSize:this.data.pageSize,
      callBack:httpCallback
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    // console.log("触发下拉")
    setTimeout(()=>{
      this.getData()
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '商品已刷新',
        duration: 1500,
      })
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("触发上拉")
    if (this.data.pageSize >= this.data.recordCount) { return }//减轻服务器负担
    this.setData({
      pageSize: this.data.pageSize += 5
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})