//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    videoPlay: null,
    userInfo: {},
    dataList: [],
  },
  onLoad: function () {
    // this.downloadVedioInfofile;
    // this.testGetRemoteData();
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
          console.log("获取用户信息=" + res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },
  // 点击cover播放，其它视频结束
  videoPlay: function (e) {
    var _index = e.currentTarget.dataset.id
    this.setData({
      _index: _index
    })
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(_index + "")
    videoContextPrev.stop();

    setTimeout(function () {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index + "")
      videoContext.play();
    }, 500)
  },
  //转发
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '分享',
      path: '/pages/vediolist/vediolist',
      success: function (res) { 
        
      }
    }
  },
  onShow: function () {
    this.getData();
    // wx.hideShareMenu();
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  testGetRemoteData:function(){
    this.setData({
      loadingHidden: false
    })
    let _that = this;
     wx.downloadFile({
       url:'http://vedio.vansy.cn/vedio_info.rtf',
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(res)
        //页面显示加载动画
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            _that.setData({
              loadingHidden: true
            })
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  downloadVedioInfofile: function() {
    // this.setData({
    //   loadingHidden: false
    // })
    // let _that = this;
    var url = e.currentTarget.dataset.url;
    //下载文件，生成临时地址
    wx.downloadFile({
      url: url,
      success(res) {
        // console.log(res)
        //保存到本地
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res) {
            const savedFilePath = res.savedFilePath;
            // 打开文件
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              },
            });
          },
          fail: function (err) {
            console.log('保存失败：', err)
          }
        });
      }
    })
  },
  // 模拟数据加载
  getData: function () {

    this.setData({
      dataList: [
        {
          "id": 6193654,
          "title": "   来自小象雨刷用户分享的视频",
          "content": "http://vedio.vansy.cn/liangzhixiaoxiang1.mp4",
          "cover": "http://vedio.vansy.cn/liangzhixiaoxiang1.jpg"
        }, 
        {
          "id": 6193715, 
          "title": "   来自小象雨刷用户分享的视频", 
          "content": "http://vedio.vansy.cn/liangzhixiaoxiang2.mp4",
          "cover": "http://vedio.vansy.cn/liangzhixiaoxiang2.jpg"
        },
         { 
           "id": 6193729,
           "title": "来自小象雨刷用户分享的视频",
           "content": "http://vedio.vansy.cn/liangzhixiaoxiang3.mp4",
           "cover": "http://vedio.vansy.cn/liangzhixiaoxiang4.jpg"
         }, 
         { 
           "id": 6193504, 
           "title": "来自小象雨刷用户分享的视频", 
           "content": "http://vedio.vansy.cn/liangzhixiaoxiang4.mp4",
           "cover": "http://vedio.vansy.cn/liangzhixiaoxiang4.jpg"
         }, 
         {
            "id": 6193932, 
            "title": "来自小象雨刷用户分享的视频", 
            "content": "http://vedio.vansy.cn/liangzhixiaoxiang5.mp4",
            "cover": "http://vedio.vansy.cn/liangzhixiaoxiang5.jpg"
         }, 
         {
            "id": 6193576, 
           "title": "来自小象雨刷用户分享的视频", 
            "content": "http://vedio.vansy.cn/liangzhixiaoxiang6.mp4",
            "cover": "http://vedio.vansy.cn/liangzhixiaoxiang6.jpg"
         }
        ]
    });

  }
})