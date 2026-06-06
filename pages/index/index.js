const { getDifficultyList } = require('../../utils/questions.js')
const app = getApp()

Page({
  data: {
    difficulties: [],
    musicOn: false
  },

  onLoad() {
    this.setData({ difficulties: getDifficultyList(), musicOn: app.isBgmPlaying() })
  },

  toggleMusic() {
    const musicOn = app.toggleBgm()
    this.setData({ musicOn })
  },

  startQuiz(event) {
    app.playBgm()
    this.setData({ musicOn: true })
    const difficulty = event.currentTarget.dataset.key
    wx.navigateTo({ url: `/pages/quiz/quiz?difficulty=${difficulty}` })
  },

  goLeaderboard() {
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' })
  }
})
