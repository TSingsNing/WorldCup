const { getLeaderboard } = require('../../utils/rank.js')

Page({
  data: { list: [] },
  onShow() {
    this.setData({ list: getLeaderboard() })
  },
  backHome() {
    wx.reLaunch({ url: '/pages/index/index' })
  },
  onShareAppMessage() {
    return {
      title: '看看我在世界杯像素答题杯的段位榜排名',
      path: '/pages/index/index'
    }
  },
  onShareTimeline() {
    return {
      title: '世界杯像素答题杯 · 好友段位榜',
      query: ''
    }
  }
})
