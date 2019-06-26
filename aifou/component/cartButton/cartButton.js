// pages/cartButton/cartButton.js
// const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // cartGoods: app.globalData.cartGoods
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(){
      wx.switchTab({
        url: '../../pages/cart/cart',
      })
    }
  }
})
