const { getQuizSession, getArchetype } = require('../../utils/questions')
const { calcScore, getLevel, saveRecord } = require('../../utils/rank')
const music = require('../../utils/music')

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
    startTime: 0,
    roast: '别慌，先把球停住。',
    letters: ['A', 'B', 'C', 'D']
  },

  onLoad(options) {
    music.playBgm()
    this.initQuiz(options.difficulty || 'easy')
  },

  initQuiz(difficulty) {
    const quiz = getQuizSession(difficulty)
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
      isLast: total === 1,
      startTime: Date.now(),
      roast: quiz.vibe
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
      score: isCorrect ? this.data.score + 1 : this.data.score,
      roast: isCorrect ? '这脚射门有点东西，继续！' : 'VAR 提醒：这题你越位了。'
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
      isLast: nextIndex === this.data.total - 1,
      roast: '下一题来了，别让朋友看扁。'
    })
  },

  restart() {
    this.initQuiz(this.data.difficulty)
  },

  goCertificate() {
    const { difficulty, quiz, total, startTime } = this.data
    const duration = Math.max(1, Math.round((Date.now() - startTime) / 1000))
    const finalScore = calcScore(difficulty, total, duration)
    const archetype = getArchetype(finalScore + duration + total)
    const level = getLevel(difficulty)
    const record = {
      nickname: '我',
      difficulty,
      level,
      score: finalScore,
      duration,
      title: quiz.badge,
      archetype: archetype.name
    }
    saveRecord(record)
    wx.navigateTo({
      url: `/pages/certificate/certificate?difficulty=${difficulty}&name=${encodeURIComponent(quiz.name)}&badge=${encodeURIComponent(quiz.badge)}&total=${total}&duration=${duration}&score=${finalScore}&level=${encodeURIComponent(level)}&type=${encodeURIComponent(archetype.name)}&slogan=${encodeURIComponent(archetype.slogan)}`
    })
  }
})
