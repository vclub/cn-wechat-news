//index.js

const util = require('../../utils/util.js')

const newsType = [
  {
    'label': '国内',
    'type': 'gn',
    'news': []
  },
  {
    'label': '国际',
    'type': 'gj',
    'news': []
  },
  {
    'label': '财经',
    'type': 'cj',
    'news': []
  },
  {
    'label': '娱乐',
    'type': 'yl',
    'news': []
  },
  {
    'label': '军事',
    'type': 'js',
    'news': []
  },
  {
    'label': '体育',
    'type': 'ty',
    'news': []
  },
  {
    'label': '其他',
    'type': 'other',
    'news': []
  }
]

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    newsList: newsType,
    isRefresh: false
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.loadCurrentTabNews()
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      this.loadCurrentTabNews()
    }
  },
  showDetail: function (event) {
    var newsId = event.currentTarget.dataset.newsid;
    console.log(event)
    wx.navigateTo({
      url: `/pages/detail/detail?newsId=${newsId}`,
    })
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    this.loadCurrentTabNews()
  },
  loadCurrentTabNews: function (callback) {

    console.log(this.data.newsList[this.data.currentTab].news.length)
    if (this.data.newsList[this.data.currentTab].news.length === 0 ||
      this.data.isRefresh === true) {
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://test-miniprogram.com/api/news/list',
        data: {
          type: newsType[this.data.currentTab].type
        },
        success: res => {
          var newsResult = res.data.result.map(function (item) {
            item.date = util.formatTime(new Date(item.date))
            return item
          });

          var temp = this.data.newsList

          temp[this.data.currentTab].news = newsResult

          // console.log(this.data.newsList)

          this.setData({
            newsList: temp
          })
        },
        complete: () => {
          this.setData({
            isRefresh: false
          })
          wx.hideLoading()
          callback && callback()
        }
      })
    }

  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.setData({
      isRefresh: true
    })
    this.loadCurrentTabNews(() => {
      wx.stopPullDownRefresh()
    })
  }
})
