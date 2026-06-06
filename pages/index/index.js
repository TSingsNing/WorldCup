const { getDifficultyList } = require('../../utils/questions')

Page({
  data: {
    difficulties: []
  },

  onLoad() {
    this.setData({ difficulties: getDifficultyList() })
  },

  startQuiz(event) {
    const difficulty = event.currentTarget.dataset.key
    wx.navigateTo({
      url: `/pages/quiz/quiz?difficulty=${difficulty}`
    })
  }
})
