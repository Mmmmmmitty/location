//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    search_val: '',
    list:[],
    lat:'',
    lng:''
  },
  inputVal(e) {
    console.log(e.detail.value)
    this.setData({
      search_val: e.detail.value
    })
    this.getAddressList(e.detail.value)
  },
  // 选择搜索出来的地址
  onClick(e){
    console.log(e.currentTarget.dataset.item)
    var item = e.currentTarget.dataset.item
    this.setData({
      lat: item.location.lat,
      lng: item.location.lng,
      place_title: item.title
    })
  },
  // 根据输入地址请求地址列表
  getAddressList(val) {
    var self = this
    qqmapsdk.search({
      keyword: val,
      page_size: 20,
      success: function(res) {
        console.log(res);
        if (res.status == 0) {
          self.setData({
            list: res.data
          })
        }
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },
  onLoad: function() {
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
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'VTZBZ-FAIWK-6DIJU-A2VHC-FW3MK-OQBCA'
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})