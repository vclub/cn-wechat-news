//index.js
//获取应用实例
const app = getApp()

// const newsTypeMap = [
//   '国内' = 'gn',
//   '国际' = 'gj',
//   '财经' = 'cj',
//   '娱乐' = 'yl',
//   '军事' = 'js',
//   '体育' = 'ty',
//   '其他' = 'other'
// ]

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }],
    newsList:[]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
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
    }
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

    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        type:'gn'
      },
      success:res=>{
        console.log(res.data.result)
        this.setData({
          newsList:res.data.result
        })
      }
    })
  },  
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log("pull down refresh")
  },
  footerTap: app.footerTap
})
