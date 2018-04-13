//index.js
//获取应用实例
const app = getApp()

const newsTypeLabel = [
  '国内',
  '国际',
  '财经',
  '娱乐',
  '军事',
  '体育',
  '其他' 
]

const newsType = [
  'gn',
  'gj',
  'cj',
  'yl',
  'js',
  'ty',
  'other'
]

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    newsList:[]
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
  showDetail:function (event) {
    var newsId = event.target.dataset.newsid;
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
  loadCurrentTabNews: function(callback){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType[this.data.currentTab]
      },
      success: res => {
        console.log(res.data.result)
        this.setData({
          newsList: res.data.result
        })
      },
      complete:()=>{
        wx.hideLoading()
        callback && callback()
      }
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.loadCurrentTabNews(()=>{
      wx.stopPullDownRefresh()
    })
  },
  footerTap: app.footerTap
})
