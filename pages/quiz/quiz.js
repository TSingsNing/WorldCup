const { getQuiz } = require('../../utils/questions')

Page({
  data: {
    difficulty: 'easy',
    quiz: {},
    currentIndex: 0,
    currentQuestion: {},
    total: 0,
    progress: 0,
    score: 0,
    selectedIndex: -1,
    showAnswer: false,
    isCorrect: false,
    isLast: false,
    letters: ['A', 'B', 'C', 'D']
  },

  onLoad(options) {
    const difficulty = options.difficulty || 'easy'
    this.initQuiz(difficulty)
  },

  initQuiz(difficulty) {
    const quiz = getQuiz(difficulty)
    const total = quiz.questions.length
    this.setData({
      difficulty,
      quiz,
      currentIndex: 0,
      currentQuestion: quiz.questions[0],
      total,
      progress: Math.round((1 / total) * 100),
      score: 0,
      selectedIndex: -1,
      showAnswer: false,
      isCorrect: false,
      isLast: total === 1
    })
  },

  chooseOption(event) {
    if (this.data.showAnswer) return
    const selectedIndex = Number(event.currentTarget.dataset.index)
    const isCorrect = selectedIndex === this.data.currentQuestion.answer
    this.setData({
      selectedIndex,
      showAnswer: true,
      isCorrect,
      score: isCorrect ? this.data.score + 1 : this.data.score
    })
    wx.vibrateShort({ type: isCorrect ? 'light' : 'medium' })
  },

  nextQuestion() {
    const nextIndex = this.data.currentIndex + 1
    const currentQuestion = this.data.quiz.questions[nextIndex]
    this.setData({
      currentIndex: nextIndex,
      currentQuestion,
      progress: Math.round(((nextIndex + 1) / this.data.total) * 100),
      selectedIndex: -1,
      showAnswer: false,
      isCorrect: false,
      isLast: nextIndex === this.data.total - 1
    })
  },

  restart() {
    this.initQuiz(this.data.difficulty)
  },

  goCertificate() {
    const { difficulty, quiz, total } = this.data
    wx.navigateTo({
      url: `/pages/certificate/certificate?difficulty=${difficulty}&name=${encodeURIComponent(quiz.name)}&badge=${encodeURIComponent(quiz.badge)}&total=${total}`
    })
  }
})
