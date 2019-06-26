// pages/search/search.js
const app=getApp();
const ajax=require('../../src/plugin/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $imgIp: app.globalData.$imgIp,
    input:"",
    addBox: false, //购买商品模态框状态
    hisList:[],//搜索历史列表
    goodsList:[]//商品列表
  },
  close(){
    this.setData({
      input:"",
      goodsList:[]
    })
  },
  jumpDetails(e) {
    var pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../goodDetails/goodDetails?pid=' + pid,
    })
  },
  doShow(e) {
    var pid = e.currentTarget.dataset.pid;
    // console.log("pid"+pid)
    this.setData({
      addBox: true,
      pid
    })
  },
  doClose(e) { //关闭添加商品模态窗
    var addBox = e.detail.val
    this.setData({
      addBox
    })
  },
  search(e){
    var word=null;
    e.detail.value ? word = e.detail.value : word = e.currentTarget.dataset.kw;
    if (!word){return}
    var httpCallback=(data)=>{
      if(data.data.length<1){
        wx:wx.showToast({
          title: '请换一个关键词',
          icon: 'none',
          duration:3000
        })
      }
      var goodsList = data.data;
      console.log(data.data)

      this.setData({
        input: word,
        goodsList: data.data
      })
    }
    ajax.$toGet({
      Url: "php/products.php",
      kw: word,
      callBack: httpCallback
    })
    var hisList = this.data.hisList;//保存到搜索历史
    hisList.splice(0, 0, word);
    this.setData({
      hisList,
    })
  },
  clearHis(){
    this.setData({
      hisList:[],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ptype = parseInt(options.ptype);
    var httpCallback = (data) => {
      if(data.data.length<1){
        wx.showToast({
          title: '暂无此类商品',
          icon:'none',
          duration:2500
        })
        return
      }
      var goodsList = data.data;
      var word=null;
      console.log(data)
      switch (ptype){
        case 1:
          word="手机";
          break;
        case 3:
          word = "平板";
          break;
        case 4:
          word = "电脑";
          break;
        case 5:
          word = "配件";
          break;
      }
      this.setData({
        input: word,
        goodsList: data.data
      })
    }
    ajax.$toGet({
      Url: "php/products.php",
      ptype: ptype,
      callBack: httpCallback
    })
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
    // this.updateWord()
    this.setData({
      hisList: app.globalData.hisWord
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.hisWord=this.data.hisList;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.globalData.hisWord = this.data.hisList;
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