// pages/detail/detail.js

const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    newsId: '',
    nodes: '',
    newsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.newsId === '') {
      wx.navigateBack()
    } else {
      this.setData({
        newsId: options.newsId
      })
      this.onLoadDetailNews()
    }
  },
  onLoadDetailNews(callback) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsId
      },
      success: res => {
        res.data.result.date = util.formatTime(new Date(res.data.result.date))
        this.setData({
          newsInfo: res.data.result
        })
        this.buildContent(res.data.result.content)
      },
      complete: () => {
        wx.hideLoading()
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
          attrs: {
            style: 'font-size:12pt;opacity: 0.8;'
          },
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoadDetailNews(() => {
      wx.stopPullDownRefresh()
    })
  }
})