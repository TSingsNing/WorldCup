const { getLeaderboard } = require('../../utils/rank')

Page({
  data: { list: [] },
  onShow() { this.setData({ list: getLeaderboard() }) },
  backHome() { wx.reLaunch({ url: '/pages/index/index' }) }
})
