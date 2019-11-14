Page({
  data: {
    src: ''
  },
  /**
   * 打开本地视频test
   */
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  /**
   * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
   */
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})