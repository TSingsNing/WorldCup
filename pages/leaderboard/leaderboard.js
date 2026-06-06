const { getLeaderboard } = require('../../utils/rank.js')

Page({
  data: { list: [] },
  onShow() {
    this.setData({ list: getLeaderboard() })
  },
  backHome() {
    wx.reLaunch({ url: '/pages/index/index' })
  }
})
