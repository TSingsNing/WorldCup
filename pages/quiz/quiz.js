const { getQuizSession, getArchetype } = require('../../utils/questions.js')
const { calcScore, getLevel, getCertificateGrade, saveRecord } = require('../../utils/rank.js')
const app = getApp()

Page({
  data: {
    difficulty: 'easy',
    quiz: {},
    currentIndex: 0,
    currentQuestion: {},
    total: 0,
    progress: 0,
    score: 0,
    wrongCount: 0,
    selectedIndex: -1,
    showAnswer: false,
    isCorrect: false,
    isLast: false,
    startTime: 0,
    roast: '别慌，先把球停住。',
    letters: ['A', 'B', 'C', 'D']
  },

  onLoad(options) {
    const difficulty = options.difficulty || 'easy'
    app.playBgm(difficulty)
    this.initQuiz(difficulty)
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
      wrongCount: 0,
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
      wrongCount: isCorrect ? this.data.wrongCount : this.data.wrongCount + 1,
      roast: isCorrect ? '这脚推射很稳，继续压上！' : '这球弹门柱了，别停，下一脚还能追回来。'
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
      roast: '哨声没响，继续冲刺。'
    })
  },

  restart() {
    app.playBgm(this.data.difficulty)
    this.initQuiz(this.data.difficulty)
  },

  goCertificate() {
    const { difficulty, quiz, total, startTime, score } = this.data
    const duration = Math.max(1, Math.round((Date.now() - startTime) / 1000))
    const finalScore = calcScore(difficulty, total, duration, score)
    const archetype = getArchetype(finalScore + duration + score)
    const level = getLevel(difficulty)
    const grade = getCertificateGrade(score, total)
    const accuracy = Math.round((score / Math.max(1, total)) * 100)
    const record = {
      nickname: '我',
      difficulty,
      level,
      score: finalScore,
      accuracy,
      duration,
      title: quiz.badge,
      archetype: archetype.name,
      certificateGrade: grade.name
    }
    saveRecord(record)
    // 把证书所需字段写入本地缓存，避免拼超长 URL；证书页 onLoad 直接读取
    const payload = {
      difficulty,
      difficultyName: quiz.name,
      badge: quiz.badge,
      total,
      correct: score,
      accuracy,
      duration,
      score: finalScore,
      level,
      type: archetype.name,
      slogan: archetype.slogan,
      grade: grade.name,
      gradeKey: grade.key,
      gradeSlogan: grade.slogan,
      seal: grade.seal,
      accent: grade.accent
    }
    wx.setStorageSync('cert_payload', payload)
    // 用 redirectTo 替代 navigateTo，避免返回栈一直累积
    wx.redirectTo({ url: '/pages/certificate/certificate' })
  },

  onShareAppMessage() {
    return {
      title: `我在【${this.data.quiz.name || '世界杯像素答题杯'}】挑战中，敢来比比段位吗？`,
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: '世界杯像素答题杯 · 来一局看看你的球格人格',
      query: ''
    }
  }
})
