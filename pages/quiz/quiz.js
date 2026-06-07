const app = getApp()
const {
  complianceNotice,
  getMatchList,
  getMatchById,
  savePrediction,
  championTeams,
  goldenBootPlayers
} = require('../../utils/worldcup.js')

Page({
  data: {
    notice: complianceNotice,
    matches: [],
    current: {},
    selectedMatchId: '',
    resultOptions: ['主胜', '平局', '客胜', '爆冷'],
    scoreOptions: ['1:0', '1:1', '2:1', '0:0', '2:2', '3:1'],
    goalOptions: ['0-1球', '2-3球', '4球以上'],
    firstGoalOptions: ['上半场前30分钟', '上半场后15分钟', '下半场', '无人进球'],
    championTeams,
    goldenBootPlayers,
    form: {
      result: '',
      score: '',
      goals: '',
      firstGoal: '',
      champion: '法国',
      goldenBoot: '姆巴佩',
      reason: '看好中场控制和边路速度。'
    },
    saved: null,
    musicOn: true
  },

  onLoad(options) {
    app.playBgm('medium')
    const matches = getMatchList()
    const selectedMatchId = options && options.matchId ? options.matchId : matches[0].id
    this.setData({ matches, selectedMatchId, current: getMatchById(selectedMatchId), musicOn: app.isBgmPlaying() })
  },

  selectMatch(event) {
    const selectedMatchId = event.currentTarget.dataset.id
    this.setData({ selectedMatchId, current: getMatchById(selectedMatchId), saved: null })
  },

  chooseResult(event) { this.updateForm('result', event.currentTarget.dataset.value) },
  chooseScore(event) { this.updateForm('score', event.currentTarget.dataset.value) },
  chooseGoals(event) { this.updateForm('goals', event.currentTarget.dataset.value) },
  chooseFirstGoal(event) { this.updateForm('firstGoal', event.currentTarget.dataset.value) },
  chooseChampion(event) { this.updateForm('champion', event.currentTarget.dataset.value) },
  chooseGoldenBoot(event) { this.updateForm('goldenBoot', event.currentTarget.dataset.value) },

  onReasonInput(event) {
    this.updateForm('reason', event.detail.value)
  },

  updateForm(key, value) {
    const form = Object.assign({}, this.data.form)
    form[key] = value
    this.setData({ form })
  },

  submitPrediction() {
    const form = this.data.form
    if (!form.result || !form.score || !form.goals) {
      wx.showToast({ title: '请至少完成赛果、比分和进球区间', icon: 'none' })
      return
    }
    const saved = savePrediction(Object.assign({}, form, { matchId: this.data.selectedMatchId }))
    this.setData({ saved })
    wx.showToast({ title: '娱乐预测已保存', icon: 'success' })
  },

  goCard() { wx.navigateTo({ url: '/pages/certificate/certificate' }) },
  goLeaderboard() { wx.navigateTo({ url: '/pages/leaderboard/leaderboard' }) },
  backHome() { wx.navigateBack({ delta: 1 }) },

  toggleMusic() {
    const musicOn = app.toggleBgm('medium')
    this.setData({ musicOn })
  },

  onShareAppMessage() {
    return {
      title: '我锁定了一场世界杯娱乐预测，来和我反着站队',
      path: '/pages/quiz/quiz?matchId=' + this.data.selectedMatchId
    }
  }
})
