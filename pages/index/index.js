const app = getApp()
const {
  complianceNotice,
  getMatchList,
  getPredictionList,
  getStats,
  getProfile,
  getRoom,
  saveRoom
} = require('../../utils/worldcup.js')

Page({
  data: {
    musicOn: true,
    notice: complianceNotice,
    matches: [],
    recentPredictions: [],
    stats: {},
    profile: {},
    room: {},
    featureCards: [
      { title: '每日预测', desc: '胜平负、比分、进球区间与首球时间', value: '免费参与' },
      { title: '好友天台杯', desc: '微信群内比命中率、连红与荣誉称号', value: '荣誉PK' },
      { title: '身份卡传播', desc: '生成黄金预言家、反向明灯等球迷标签', value: '可分享' },
      { title: 'AI赛前分析', desc: '提供状态、看点、爆冷概率的娱乐解读', value: '无投注建议' }
    ]
  },

  onLoad() {
    app.playBgm('default')
    this.refreshPage()
  },

  onShow() {
    if (app.globalData.currentBgmKey !== 'default' && !app.globalData.userPaused) {
      app.playBgm('default')
    }
    this.refreshPage()
  },

  refreshPage() {
    this.setData({
      musicOn: app.isBgmPlaying(),
      matches: getMatchList().slice(0, 3),
      recentPredictions: getPredictionList().slice(0, 2),
      stats: getStats(),
      profile: getProfile(),
      room: getRoom()
    })
  },

  onPageTouch() {
    if (!app.isBgmPlaying() && !app.globalData.userPaused) {
      app.playBgm('default')
      this.setData({ musicOn: app.isBgmPlaying() })
    }
  },

  toggleMusic() {
    const musicOn = app.toggleBgm('default')
    this.setData({ musicOn })
  },

  goPredict(event) {
    const matchId = event.currentTarget.dataset.id || ''
    wx.navigateTo({ url: `/pages/quiz/quiz${matchId ? '?matchId=' + matchId : ''}` })
  },

  goCard() {
    wx.navigateTo({ url: '/pages/certificate/certificate' })
  },

  goLeaderboard() {
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' })
  },

  createRoom() {
    const next = saveRoom({
      name: this.data.room.name === '天台杯' ? '熬夜看球群' : '天台杯',
      members: this.data.room.name === '天台杯' ? 26 : 18
    })
    this.setData({ room: next })
    wx.showToast({ title: '已切换好友房间', icon: 'none' })
  },

  onShareAppMessage() {
    return {
      title: '世界杯预言家：只比眼光，不碰投注',
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: '我的世界杯预言家身份卡已生成',
      query: ''
    }
  }
})
