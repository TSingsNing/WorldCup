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
      title: '看看我的 WCTI 世界杯人格段位',
      path: '/pages/index/index'
    }
  },
  onShareTimeline() {
    return {
      title: 'WCTI · 好友人格榜',
      query: ''
    }
  }
})
