const app = getApp()
const { complianceNotice, getLeaderboard, getRoom, saveRoom, getStats } = require('../../utils/worldcup.js')

Page({
  data: {
    notice: complianceNotice,
    list: [],
    room: {},
    stats: {},
    roomOptions: ['天台杯', '熬夜看球群', '战术板', '反向明灯联盟']
  },

  onLoad() {
    app.playBgm('default')
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    this.setData({ list: getLeaderboard(), room: getRoom(), stats: getStats() })
  },

  switchRoom(event) {
    const name = event.currentTarget.dataset.name
    saveRoom({ name, members: name === '天台杯' ? 18 : name === '熬夜看球群' ? 26 : 12 })
    this.refresh()
    wx.showToast({ title: '已进入' + name, icon: 'none' })
  },

  goPredict() { wx.navigateTo({ url: '/pages/quiz/quiz' }) },
  goCard() { wx.navigateTo({ url: '/pages/certificate/certificate' }) },
  backHome() { wx.navigateBack({ delta: 1 }) },

  onShareAppMessage() {
    return { title: '来我的世界杯好友房间比一比预言指数', path: '/pages/leaderboard/leaderboard' }
  },

  onShareTimeline() {
    return { title: '世界杯预言家好友榜：只比眼光，不碰投注', query: '' }
  }
})
