const app = getApp()
const {
  complianceNotice,
  championTeams,
  goldenBootPlayers,
  getProfile,
  saveProfile,
  getShareLines
} = require('../../utils/worldcup.js')

Page({
  data: {
    notice: complianceNotice,
    teams: championTeams,
    players: goldenBootPlayers,
    profile: {},
    form: {
      nickname: '世界杯球迷',
      team: '阿根廷',
      champion: '法国',
      goldenBoot: '姆巴佩'
    },
    shareLines: []
  },

  onLoad() {
    app.playBgm('default')
    this.refresh()
  },

  onReady() {
    setTimeout(() => this.drawCard(), 300)
  },

  refresh() {
    const profile = getProfile()
    const form = {
      nickname: profile.nickname || '世界杯球迷',
      team: profile.team || '阿根廷',
      champion: profile.champion || '法国',
      goldenBoot: profile.goldenBoot || '姆巴佩'
    }
    this.setData({ profile, form, shareLines: getShareLines() })
  },

  onNicknameInput(event) {
    const form = Object.assign({}, this.data.form, { nickname: event.detail.value })
    this.setData({ form })
  },

  chooseTeam(event) { this.updateForm('team', event.currentTarget.dataset.value) },
  chooseChampion(event) { this.updateForm('champion', event.currentTarget.dataset.value) },
  chooseGoldenBoot(event) { this.updateForm('goldenBoot', event.currentTarget.dataset.value) },

  updateForm(key, value) {
    const form = Object.assign({}, this.data.form)
    form[key] = value
    this.setData({ form })
  },

  generateCard() {
    const profile = saveProfile(this.data.form)
    this.setData({ profile, shareLines: getShareLines() })
    this.drawCard()
    wx.showToast({ title: '身份卡已生成', icon: 'success' })
  },

  drawCard() {
    const p = this.data.profile && this.data.profile.name ? this.data.profile : getProfile()
    const ctx = wx.createCanvasContext('identityCanvas', this)
    ctx.setFillStyle('#07142f')
    ctx.fillRect(0, 0, 640, 900)
    ctx.setFillStyle('#0f2a55')
    ctx.fillRect(0, 0, 640, 210)
    ctx.setFillStyle('#08d9d6')
    ctx.fillRect(40, 54, 178, 8)
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(30)
    ctx.fillText('WORLD CUP PROPHET', 40, 112)
    ctx.setFontSize(58)
    ctx.fillText(p.name || '候补预言家', 40, 188)
    ctx.setFillStyle('#f6c453')
    ctx.setFontSize(32)
    ctx.fillText(p.nickname || '世界杯球迷', 40, 286)
    ctx.setFillStyle('rgba(255,255,255,0.82)')
    ctx.setFontSize(26)
    ctx.fillText('支持球队：' + (p.team || '暂未选择'), 40, 342)
    ctx.fillText('冠军预测：' + (p.champion || '法国'), 40, 390)
    ctx.fillText('金靴预测：' + (p.goldenBoot || '姆巴佩'), 40, 438)
    ctx.setFillStyle('#102b5a')
    ctx.fillRect(40, 486, 560, 150)
    ctx.setFillStyle('#08d9d6')
    ctx.setFontSize(26)
    ctx.fillText('预测热力积分', 70, 544)
    ctx.setFillStyle('#f6c453')
    ctx.setFontSize(54)
    ctx.fillText(String(p.totalPoints || 0), 70, 606)
    ctx.setFillStyle('#08d9d6')
    ctx.setFontSize(26)
    ctx.fillText('预言指数 ' + (p.accuracy || 0) + '%   连续参与 ' + (p.streak || 0) + ' 场', 240, 584)
    ctx.setFillStyle('rgba(255,255,255,0.78)')
    ctx.setFontSize(24)
    const slogan = p.slogan || '先站一次队，球迷身份卡马上开光。'
    ctx.fillText(slogan.slice(0, 20), 40, 704)
    ctx.fillText(slogan.slice(20, 40), 40, 742)
    ctx.setFillStyle('rgba(255,255,255,0.54)')
    ctx.setFontSize(20)
    ctx.fillText('仅限娱乐预测与社交展示，不涉及充值、提现、现金奖品或真实投注。', 40, 822)
    ctx.setStrokeStyle('#f6c453')
    ctx.setLineWidth(6)
    ctx.strokeRect(24, 24, 592, 852)
    ctx.draw()
  },

  saveCertificate() {
    wx.canvasToTempFilePath({
      canvasId: 'identityCanvas',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
          fail: () => wx.showToast({ title: '请授权相册后重试', icon: 'none' })
        })
      },
      fail: () => wx.showToast({ title: '生成图片失败', icon: 'none' })
    }, this)
  },

  goPredict() { wx.navigateTo({ url: '/pages/quiz/quiz' }) },
  goLeaderboard() { wx.navigateTo({ url: '/pages/leaderboard/leaderboard' }) },
  backHome() { wx.switchTab ? wx.navigateBack({ delta: 1 }) : wx.navigateBack({ delta: 1 }) },

  onShareAppMessage() {
    return { title: '我的世界杯预言家身份卡出炉了', path: '/pages/certificate/certificate' }
  },

  onShareTimeline() {
    return { title: '我的世界杯预言家身份卡出炉了', query: '' }
  }
})
