//index.js
//获取应用实例
const app = getApp()
// var tt = require('../../utils/test.js')
Page({
  data: {
    motto: '',
    index: 0,
    timeID: 0,
    fontColor: 'black',
    userInfo: {},
    itemList: ['版本号:', '联系电话:', '联系地址:'],
    itemValue: [{}],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  print: function (words, inx) {
    this.setData({ motto: words.substring(0, inx++), index: inx })
    if (words.length < inx) {
      clearInterval(this.data.timeId)
    }
    // console.log(inx)
  },
  bindconfirm: function (res) {
    this.setData({ 'itemValue[0].screenBright': res.detail.value })
  },
  onLoad: function () {
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

  onShow: function () {

  },

  getUserInfo: function (e) {
    console.log("获取用户信息=" +e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getInfo: function (res) {
    var idx = res.currentTarget.dataset.id
  },

})

