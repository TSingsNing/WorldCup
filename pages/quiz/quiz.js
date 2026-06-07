const { getQuizSession, getArchetype } = require('../../utils/questions.js')
const {
  calcScore,
  getLevel,
  getCertificateGrade,
  getMatchBroadcast,
  getFinalScoreReport,
  getHiddenPersona,
  saveRecord
} = require('../../utils/rank.js')
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
    correctStreak: 0,
    wrongStreak: 0,
    maxCorrectStreak: 0,
    maxWrongStreak: 0,
    lastCorrect: false,
    selectedIndex: -1,
    showAnswer: false,
    isCorrect: false,
    isLast: false,
    selectedLetter: '',
    correctLetter: '',
    selectedAnswerText: '',
    correctAnswerText: '',
    startTime: 0,
    roast: '别慌，先把球停住。',
    broadcastTitle: '赛前热身',
    broadcastLine: '主裁哨响前，先看看今天脚感如何。',
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
      correctStreak: 0,
      wrongStreak: 0,
      maxCorrectStreak: 0,
      maxWrongStreak: 0,
      lastCorrect: false,
      selectedIndex: -1,
      showAnswer: false,
      isCorrect: false,
      isLast: total === 1,
      selectedLetter: '',
      correctLetter: quiz.questions[0] ? this.data.letters[quiz.questions[0].answer] : '',
      selectedAnswerText: '',
      correctAnswerText: quiz.questions[0] ? quiz.questions[0].options[quiz.questions[0].answer] : '',
      startTime: Date.now(),
      roast: quiz.vibe,
      broadcastTitle: '赛前热身',
      broadcastLine: '主裁哨响前，先看看今天脚感如何。'
    })
  },

  chooseOption(event) {
    if (this.data.showAnswer) return
    const selectedIndex = Number(event.currentTarget.dataset.index)
    const isCorrect = selectedIndex === this.data.currentQuestion.answer
    const nextScore = isCorrect ? this.data.score + 1 : this.data.score
    const nextWrongCount = isCorrect ? this.data.wrongCount : this.data.wrongCount + 1
    const nextCorrectStreak = isCorrect ? this.data.correctStreak + 1 : 0
    const nextWrongStreak = isCorrect ? 0 : this.data.wrongStreak + 1
    const maxCorrectStreak = Math.max(this.data.maxCorrectStreak, nextCorrectStreak)
    const maxWrongStreak = Math.max(this.data.maxWrongStreak, nextWrongStreak)
    const broadcast = getMatchBroadcast({
      isCorrect,
      currentIndex: this.data.currentIndex,
      total: this.data.total,
      score: this.data.score,
      wrongCount: this.data.wrongCount,
      correctStreak: nextCorrectStreak,
      wrongStreak: nextWrongStreak,
      isLast: this.data.isLast
    })

    this.setData({
      selectedIndex,
      selectedLetter: this.data.letters[selectedIndex],
      correctLetter: this.data.letters[this.data.currentQuestion.answer],
      selectedAnswerText: this.data.currentQuestion.options[selectedIndex],
      correctAnswerText: this.data.currentQuestion.options[this.data.currentQuestion.answer],
      showAnswer: true,
      isCorrect,
      score: nextScore,
      wrongCount: nextWrongCount,
      correctStreak: nextCorrectStreak,
      wrongStreak: nextWrongStreak,
      maxCorrectStreak,
      maxWrongStreak,
      lastCorrect: isCorrect,
      roast: broadcast.line,
      broadcastTitle: broadcast.title,
      broadcastLine: broadcast.line
    })
    wx.vibrateShort({ type: isCorrect ? 'light' : 'medium' })

    // 答对：短暂展示赛况播报后自动推进，不打扰节奏。
    // 答错：保留在原页面展示解释和“下一脚”按钮，让用户阅读。
    if (isCorrect) {
      const isLast = this.data.isLast
      setTimeout(() => {
        if (isLast) {
          this.goCertificate()
        } else {
          this.nextQuestion()
        }
      }, 900)
    }
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
      selectedLetter: '',
      correctLetter: currentQuestion ? this.data.letters[currentQuestion.answer] : '',
      selectedAnswerText: '',
      correctAnswerText: currentQuestion ? currentQuestion.options[currentQuestion.answer] : '',
      roast: '哨声没响，继续冲刺。',
      broadcastTitle: `${Math.min(90, Math.round(((nextIndex + 1) / this.data.total) * 90))}' 继续开球`,
      broadcastLine: '镜头回到中圈，下一题已经摆好。'
    })
  },

  restart() {
    app.playBgm(this.data.difficulty)
    this.initQuiz(this.data.difficulty)
  },

  goCertificate() {
    const {
      difficulty,
      quiz,
      total,
      startTime,
      score,
      lastCorrect,
      maxCorrectStreak,
      maxWrongStreak
    } = this.data
    const duration = Math.max(1, Math.round((Date.now() - startTime) / 1000))
    const finalScore = calcScore(difficulty, total, duration, score)
    const archetype = getArchetype(finalScore + duration + score)
    const level = getLevel(difficulty)
    const grade = getCertificateGrade(score, total)
    const accuracy = Math.round((score / Math.max(1, total)) * 100)
    const matchReport = getFinalScoreReport({
      correctCount: score,
      total,
      duration,
      difficulty,
      lastCorrect,
      maxCorrectStreak,
      maxWrongStreak
    })
    const hiddenPersona = getHiddenPersona({
      difficulty,
      correctCount: score,
      total,
      duration,
      lastCorrect,
      maxCorrectStreak,
      maxWrongStreak
    })
    const record = {
      nickname: '我',
      difficulty,
      level,
      score: finalScore,
      accuracy,
      duration,
      title: quiz.badge,
      archetype: archetype.name,
      hiddenPersona: hiddenPersona.name,
      finalScoreText: matchReport.finalScoreText,
      certificateGrade: grade.name
    }
    saveRecord(record)
    // 把证书所需字段写入本地缓存，避免拼超长 URL；证书页 onLoad 直接读取。
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
      hiddenPersona: hiddenPersona.name,
      hiddenPersonaSlogan: hiddenPersona.slogan,
      finalScoreText: matchReport.finalScoreText,
      matchResultTitle: matchReport.matchResultTitle,
      matchResultDesc: matchReport.matchResultDesc,
      grade: grade.name,
      gradeKey: grade.key,
      gradeSlogan: grade.slogan,
      seal: grade.seal,
      accent: grade.accent
    }
    wx.setStorageSync('cert_payload', payload)
    // 用 redirectTo 替代 navigateTo，避免返回栈一直累积。
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
