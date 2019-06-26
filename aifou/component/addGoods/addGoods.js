// component/addGoods/addGoods.js
const app=getApp();
const ajax=require('../../src/plugin/ajax.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {//父组件传参用属性
    sendPid:Number,//定义传过来的属性为数字
    nextBtn: String//判断是否从详情页底部的哪一个按钮激活
  },
  /**
   * 组件的初始数据
   */
  data: {
    $imgIp: app.globalData.$imgIp,
    good: {
      title: "",
      minPrice: 0,
      maxPrice:0,
      price:null,
      spec:[],
      img: "",
    },
    chooseGood:{
      title:"",
      price:0,
      pid: null,
      spec:null,
      count: 1,//商品购买数量
      img:""
    },
    spec: [],//保存商品不同规格
    simg:[],//保存商品不同颜色的图片
    specIndex: null,//选中的规格，默认不选择
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(e){
      var where=e.currentTarget.dataset.where;
      if (this.data.chooseGood.spec==null){
        wx.showToast({
          title: '请选择规格',
          icon:'none'
        })
        return
      }
      // 判断用户是否已登入
      // if(){return}
      if (where == "cart" || this.data.nextBtn == "cart"){//加入购物车按钮
        // 修改购物车数据库
        app.globalData.cartGoods.push(this.data.chooseGood);
        console.log(app.globalData.cartGoods)
        //ajax.changeCart
        wx.showToast({
          title: '已加入购物车',
        })
        this.close();
      }else{//立即购买按钮
        var data = JSON.stringify([this.data.chooseGood]);
        wx.navigateTo({
          url: '../../pages/waitPay/waitPay?data='+data,
        })
      }
    },
    close(e){
      var data = {
        val: false,
      } // detail对象，提供给事件监听函数
      this.triggerEvent('doClose', data) //myevent自定义名称事件，父组件中使用
    },
    changeCount(e) { //改变商品数量事件
      var chooseGood = this.data.chooseGood;
      if (e.currentTarget.dataset.type == "add") {//判断，如果元素data-type为add则添加商品
        chooseGood.count++;
      } else {//否则减少商品
        if (chooseGood.count == 1) {
          return
        }
        chooseGood.count--;
      }
      this.setData({
        chooseGood
      })
    },
    chooseSpec(e) {
      var index = e.currentTarget.dataset.index;
      var spec = e.currentTarget.dataset.spec;
      var Spec = this.data.spec;
      var good=this.data.good;
      var chooseGood = this.data.chooseGood;
      chooseGood.pid = this.data.sendPid;
      chooseGood.spec = spec;
      chooseGood.title = good.title;
      if (parseInt(good.ptype)<3){
        this.chooseImg(spec)
      }
      chooseGood.img = this.data.good.img;
      for (var i = 0; i < Spec.length; i++){//获取该商品规格的价格
        if (Spec[i].spec == spec){
          chooseGood.price = Spec[i].price;
          good.price = Spec[i].price;
        }
      }
      this.setData({
        good,
        chooseGood,
        specIndex: index,
      })
      // console.log("选中商品的规格", this.data.chooseGood)
    },
    chooseImg(spec){//根据规格判断显示的图片
      var good = this.data.good;
      var simg=this.data.simg;
      if (spec > 2 || !spec){
        good.img = simg[0].white;
      }else {
        good.img = simg[0].black;
      }
      this.setData({
        good
      })
    },
  },
  attached() {//组件生命周期函数，在组件实例进入页面节点树时执行
    var pid = this.data.sendPid//得到pid
    var httpCallback=(data)=>{
      // console.log(data.data)
      var d=data.data;
      var spec = d.spec;
      var simg = d.simg;
      var good={};
      good.title = d.data.title;//保存商品标题
      good.ptype = d.data.ptype;//保存商品类型
      good.spec = [];
      for (var i = 0; i < d.spec.length; i++) {
        switch (i)//遍历出商品的最大和最小价格
        {
          case 0:
            good.minPrice = parseInt(d.spec[i].price);
            break;
          case 1:
            good.maxPrice = parseInt(d.spec[i].price);
            break;
          default:
            break;
        }
        good.spec.push(d.spec[i].spec);
      }
      this.setData({
        good,
        simg,
        spec
      })
      if (d.data.ptype < 3) {//判断商品类型
        this.chooseImg(d.simg[0].black)//指定默认选中的图片
      } else {
        good.img = d.pimg[0][1];
      }
      this.setData({
        good
      })
    };
    ajax.$toGet({
      Url:"php/productDetail.php",
      pid,
      callBack:httpCallback
    })//发送ajax请求
  }
})