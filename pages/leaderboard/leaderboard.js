const { getLeaderboard } = require('../../utils/rank.js')

Page({
  data: {
    list: []
  },
  onLoad() {
    this.refreshLeaderboard()
  },
  onShow() {
    this.refreshLeaderboard()
  },
  refreshLeaderboard() {
    this.setData({ list: getLeaderboard() })
  },
  backHome() {
    wx.reLaunch({ url: '/pages/index/index' })
  }
})
