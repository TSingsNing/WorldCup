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
  }
})
