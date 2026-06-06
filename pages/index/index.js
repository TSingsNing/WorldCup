const { getDifficultyList } = require('../../utils/questions')
const music = require('../../utils/music')

Page({
  data: {
    difficulties: [],
    musicOn: false
  },

  onLoad() {
    this.setData({ difficulties: getDifficultyList(), musicOn: music.isPlaying() })
  },

  toggleMusic() {
    const musicOn = music.toggleBgm()
    this.setData({ musicOn })
  },

  startQuiz(event) {
    music.playBgm()
    this.setData({ musicOn: true })
    const difficulty = event.currentTarget.dataset.key
    wx.navigateTo({ url: `/pages/quiz/quiz?difficulty=${difficulty}` })
  },

  goLeaderboard() {
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' })
  }
})
