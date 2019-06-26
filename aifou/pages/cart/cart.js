// pages/cart/cart.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // $ip: app.globalData.$ip,
    $imgIp: app.globalData.$imgIp,
    delBtn: false, //编辑按钮状态
    selectAll: false, //全选状态
    total: 0, //总价
    goodsList: []
  },
  jump(e) { //跳转判断及传参
    var where = e.currentTarget.dataset.where;
    if (where == 'classify') {
      wx.switchTab({
        url: '../classify/classify',
      })
    } else if (where == 'waitPay') {
      if (this.data.total == 0) {
        wx.showToast({
          title: '请选择商品',
          icon: 'none'
        })
        return
      }
      var goodsList = this.data.goodsList;
      var goods = [];
      for (var i = 0; i < goodsList.length; i++) { //遍历被选中的商品
        if (goodsList[i].selected) {
          goods.push(goodsList[i]);
        }
      }
      var data = JSON.stringify(goods);
      wx.navigateTo({
        url: '../waitPay/waitPay?data=' + data,
      })
    } else if (where == 'details') {
      var pid = e.currentTarget.dataset.pid;
      wx.navigateTo({
        url: '../goodDetails/goodDetails?pid=' + pid,
      })
    }

  },
  doDelAll() { //底部删除按钮
    var list = this.data.goodsList;
    var sel = 0;
    for (var i = 0; i < list.length; i++) { //获取选中数量
      if (list[i].selected) {
        sel += 1;
      }
    }
    wx.showModal({
      content: '你确定要删除这' + sel + '个商品吗？',
      success: (res) => {
        if (res.confirm) { //删除选中商品
          for (var i = 0; i < list.length;) {
            if (list[i].selected) {
              list.splice(i, 1)
            } else {
              i++
            }
          }
          this.setData({
            goodsList: list
          })
        }
      }
    })

  },
  doDel(e) { //删除单个商品
    wx.showModal({
      content: "确定要删除这个商品么?",
      success: (res) => { //回调
        if (res.confirm) {
          var index = e.currentTarget.dataset.index;
          var list = this.data.goodsList;
          list.splice(index, 1)
          this.setData({
            goodsList: list
          })
          this.doTotal()
        } else {
          return
        }
      },
    })

  },
  add(e) { //增加商品
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList;
    for (var i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].count = parseInt(list[i].count) + 1;
      }
    }
    this.setData({
      goodsList: list
    })
    this.doTotal()
  },
  sub(e) { //减少商品
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList;
    for (let i in list) {
      if (i == index) {
        list[i].count > 1 ? list[i].count = parseInt(list[i].count) - 1 : list[i].count = list[i].count;
      }
    }
    this.setData({
      goodsList: list
    })
    this.doTotal()
  },
  clickDone() { //完成按钮
    this.setData({
      delBtn: !this.data.delBtn
    })
    this.doTotal()
  },
  clickDle() { //编辑按钮
    this.setData({
      delBtn: !this.data.delBtn
    })
  },
  allCheck(e) { //全选
    // console.log("全选按钮", e.detail.value);
    var list = this.data.goodsList;
    if (!this.data.selectAll) {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = true;
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].selected = false;
      }
    }
    this.setData({
      goodsList: list,
      selectAll: !this.data.selectAll
    })
    this.doTotal()
  },
  oneCheck(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList;
    list[index].selected = !list[index].selected
    this.setData({
      goodsList: list
    })
    this.doTotal()
  },
  oneCheckChange(e) { //监视单选状态；
    // console.log("单选按钮", e.detail.value);
    var list = this.data.goodsList;
    var selectAll = false
    if (e.detail.value.length == list.length) { //如果选中的数量和list长度相同 则全选按钮为选中，否则不选中
      selectAll = true
    }
    this.setData({
      selectAll
    })
  },
  doTotal() { //计算总价
    var list = this.data.goodsList;
    var t = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].selected) { //只计算已被选中的
        t += list[i].price * list[i].count;
      }
    }
    this.setData({
      total: t
    })
  },
  checkRepeat() { //检查重复型号的商品，有则去重，并商品数量+1
    var goodsList = app.globalData.cartGoods;
    for (var i = 0; i < goodsList.length; i++) {
      for (var j = i + 1; j < goodsList.length; j++) {
        if (goodsList[i].pid == goodsList[j].pid && goodsList[i].spec == goodsList[j].spec) {
          // console.log("发现重复商品")
          goodsList[i].count++;
          goodsList.splice(j, 1);
        }
      }
    }
    this.setData({
      goodsList
    })
    app.globalData.cartGoods = goodsList;
    // console.log(goodsList)
    // console.log(app.globalData.cartGoods)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkRepeat()
    var goodsList = this.data.goodsList;
    for (var i = 0; i < goodsList.length; i++) {
      goodsList[i].selected = false;
    }
    this.setData({
      goodsList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.doTotal()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.checkRepeat()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.globalData.cartGoods = this.data.goodsList;

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