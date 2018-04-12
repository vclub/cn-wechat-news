// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: 1523074607642,
    nodes: '',
    newsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsId: options.newsId
    })
    this.onLoadDetailNews()
  },
  onLoadDetailNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsId
      },
      success: res => {
        console.log(res.data.result)
        this.setData({
          newsInfo: res.data.result
        })
        this.buildContent(res.data.result.content)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  buildContent(content) {

    let contentList = []

    for (let i = 0; i < content.length; i += 1) {
      if (content[i].type === 'image') {
        contentList.push({
          name: 'img',
          attrs: {
            src: content[i].src,
            style: 'width:100%'
          }
        })
      } else {
        contentList.push({
          name: content[i].type,
          children: [{
            type: 'text',
            text: content[i].text
          }]
        })
      }
    }
    this.setData({
      nodes: contentList
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoadDetailNews(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})