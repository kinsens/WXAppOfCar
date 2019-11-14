//index.js
//获取应用实例
const app = getApp()
var jsonData = require('../../data/json.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    dataList: jsonData.dataList
,
    nameList:[],
    typeList:[],
    ageList:[],
    nameIndex:0,
    typeIndex:0,
    ageIndex:0,
    selectNameShow: false,
    selectTypeShow: false,
    selectAgeShow:false,
    name:"奥迪",
    type:"A3",
    age:"2004-2008",
    imageUrl:"",
    showResult:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 点击下拉列表  品牌
  onNameTap(e) {
    this.setData({
      selectNameShow: !this.data.selectNameShow,
      selectTypeShow: false,
      selectAgeShow: false,
    });
  },
  // 点击下拉列表 型号
  onTypeTap(e) {
    this.setData({
      selectTypeShow: !this.data.selectTypeShow,
      selectNameShow: false,
      selectAgeShow: false,
    });
  },
  // 点击下拉列表 年份
  onAgeTap(e) {
    this.setData({
      selectAgeShow: !this.data.selectAgeShow,
      selectNameShow: false,
      selectTypeShow: false,
    });
  },
  // 点击下拉列表
  optionNameTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      nameIndex: Index,
      selectNameShow: !this.data.selectNameShow,

    });
    this.getTypeList();
  },
  // 点击下拉列表
  optionTypeTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      typeIndex: Index,
      selectTypeShow: !this.data.selectTypeShow,

    });
   this.getAgeList();
  },
  // 点击下拉列表
  optionAgeTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      ageIndex: Index,
      selectAgeShow: !this.data.selectAgeShow,

    });
    this.setShowResult();
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    }
  },
  onShow:function(){
    // this.setShowResult();
    this.getNameList();
    this.getTypeList();
    this.getAgeList();
    this.setShowResult();
    this.setBottomImageScale();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setShowResult(){
    var name = this.data.nameList[this.data.nameIndex];
    var type = this.data.typeList[this.data.typeIndex];
    var age = this.data.ageList[this.data.ageIndex];
    var list=this.data.dataList;
      for(var i=0;i<list.length;i++){
        if (list[i].brandName ==name&&list[i].carModel==type&&list[i].date==age){
          var imageName = '../../images/' + list[i].MultiFunction + '.jpg'; // list[i].MultiFunction 底部显示的图片命名
          console.log("imageName=" + imageName);

          this.setData({
            showResult: list[i],
            imageUrl: imageName
          })
        }
      }
  },
  getNameList() {
    var attr = [];
    var list = this.data.dataList;
    for (var i = 0; i < list.length; i++) {
      attr.push(list[i].brandName);
    }
    var array = [];
    for (var i = 0; i < attr.length; i++) {
      if (!array.includes(attr[i])) {//includes 检测数组是否有某个值
        array.push(attr[i]);
      }
    }
    this.setData({
      nameList: array
    })
  },
  getTypeList() {
    var attr = [];
    var name = this.data.nameList[this.data.nameIndex];
    var list = this.data.dataList;
    for (var i = 0; i < list.length; i++) {
      if (list[i].brandName == name) {
        attr.push(list[i].carModel);
      }
      
    }
    var array = [];
    for (var i = 0; i < attr.length; i++) {
      if (array.indexOf(attr[i]) === -1) {
        array.push(attr[i])
      }
    }
    this.setData({
      typeList: array,
      typeIndex:0
    })
    this.getAgeList();
  },

  getAgeList() {
    var attr = [];
    var name = this.data.nameList[this.data.nameIndex];
    var type =this.data.typeList[this.data.typeIndex];
    var list = this.data.dataList;
    for (var i = 0; i < list.length; i++) {
      if (list[i].brandName == name && list[i].carModel == type) {
        attr.push(list[i].date);
        console.log("获取age="+list[i].date);
      }

    }
    console.log("获取age的长度" + attr.length);
    // var array = [];
    for (var i = 0; i < attr.length; i++) {
      console.log("jieguo=" + attr[i]);
    }
    this.setData({
      ageList: attr,
      ageIndex:0,
    })
    this.setShowResult();
  },
  setBottomImageScale(){
    var that = this
    var query = wx.createSelectorQuery()
    query.select(".result-img").boundingClientRect(function (res) {
      console.log("result-image的长度" +res.width)
      that.setData({
        height: res.width * 1.4 + 'px'
      })
    }).exec()
  },
})
