// pages/classify/classify.js
const app = getApp();
const ajax = require('../../src/plugin/ajax.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pid:null,
    $imgIp: app.globalData.$imgIp,
    $ip: app.globalData.$ip,
    addBox: false, //购买商品模态框状态
    heightArr: [], //每个分类的高度
    containerH: 0, //分类容器高度
    contentActive: 'iphone', // 内容栏选中id
    navIndex: 0, //左侧导航栏激活下标
    phoneList: [], //手机分类
    androidList: [], //安卓分类
    padList: [], //平板分类
    pcList: [], //笔记本分类
    otherList: [], //配件分类
    ptype: [
      {
        id: "iphone",
        text: "iPhone"
      },
      {
        id: "android",
        text: "安卓"
      },
      {
        id: "pad",
        text: "平板"
      },
      {
        id: "pc",
        text: "笔记本"
      },
      {
        id: "other",
        text: "配件"
      },
    ],
    goodsList: []
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
  chooseType(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      contentActive: id,
      navIndex: index
    })
  },
  doClassify() {//商品分类展示
    var list = this.data.goodsList;
    var phoneList = [],
      androidList = [],
      padList = [],
      pcList = [],
      otherList = [];
    for (var i = 0; i < list.length; i++) {
      switch (parseInt(list[i].ptype)) {
        case 1:
          phoneList.push(list[i]);
          break;
        case 2:
          androidList.push(list[i]);
          break;
        case 3:
          padList.push(list[i]);
          break;
        case 4:
          pcList.push(list[i]);
          break;
        case 5:
          otherList.push(list[i]);
          break;
        default:
          break;
      }
    }
    this.setData({
      phoneList,
      androidList,
      padList,
      pcList,
      otherList,
    })
  },
  onScroll(e) { //监视右侧内容滚动页面
    var scrollTop = e.detail.scrollTop; //右侧内容滚动距离
    var scrollArr = this.data.heightArr; //获取分类容器高度
    if (scrollTop >= scrollArr[scrollArr.length - 1] - this.data.containerH) {
      return //如果滚动距离大于等于最后一个分类的减去容器高度，则退出函数
    } else {
      for (var i = 0; i < scrollArr.length; i++) {
        if (scrollTop < scrollArr[0]) {
          //如果滚动距离小于第一分类元素高度，则点亮左侧导航栏下标0的分类
          this.setData({
            navIndex: 0
          })
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]) {
          //如果滚动距离等于或者大于上一个分类元素高度，并且小于当前分类元素高度
          this.setData({
            //则点亮左侧导航栏当前下标的分类
            navIndex: i
          })
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    (() => {
      var httpCallback = (data) => { //回调函数，处理请求回来的数据
        this.setData({
          goodsList:data.data
        })
        this.doClassify()//调用商品分类函数
      }
      ajax.$toGet({
        Url:"php/products.php",
        callBack:httpCallback
      }); //发送ajax请求
    })();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    (() => {
      var query = wx.createSelectorQuery().in(this); //创建节点查询器
      var heightArr = []; //创建节点高度数组
      var s = 0;
      query.selectAll('.pBox').boundingClientRect((react) => {
        react.forEach((res) => { //遍历所有pBox节点
          s += res.height; //累加节点高度
          heightArr.push(s) //保存节点高度
        });
        this.setData({
          heightArr
        })
      })
      query.select('.content').boundingClientRect((res) => {
        this.setData({
          containerH: res.height //保存容器高度
        })
      }).exec()
    })()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})