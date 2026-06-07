const { getDifficultyList } = require('../../utils/questions.js')
const app = getApp()

Page({
  data: {
    difficulties: [],
    // 默认显示为"已开"，与 app.onLaunch 自动播放保持一致；若 iOS 实际未播放，
    // 用户首个点击会通过 onPageTouch 兜底再次尝试播放
    musicOn: true
  },
  onLoad() {
    // 进入首页再尝试播一次，覆盖 onLaunch 时音频上下文还没就绪的情况
    app.playBgm('default')
    this.setData({ difficulties: getDifficultyList(), musicOn: app.isBgmPlaying() || true })
  },
  onShow() {
    // 从人格测试、证书或排行榜返回首页时，把 BGM 切回大厅默认曲（用户主动暂停过则保持暂停）
    if (app.globalData.currentBgmKey !== 'default' && !app.globalData.userPaused) {
      app.playBgm('default')
    }
    this.setData({ musicOn: app.isBgmPlaying() })
  },
  // 兜底：iOS 偶尔会拒绝 onLaunch 自动播放，首页任意点击触发一次播放尝试
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
  startQuiz(event) {
    const difficulty = event.currentTarget.dataset.key
    app.playBgm(difficulty)
    this.setData({ musicOn: true })
    wx.navigateTo({ url: `/pages/quiz/quiz?difficulty=${difficulty}` })
  },
  goLeaderboard() {
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' })
  },

  onShareAppMessage() {
    return {
      title: 'WCTI · 测测你的世界杯人格',
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: 'WCTI · 测测你的世界杯人格',
      query: ''
    }
  }
})
