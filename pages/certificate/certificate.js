Page({
  data: {
    difficultyName: '球迷入门局',
    badge: '气氛组队长',
    total: 0,
    correct: 0,
    accuracy: 0,
    duration: 0,
    score: 0,
    level: '青铜看球员',
    type: '神棍预言家',
    slogan: '你不是猜答案，你是在给历史剧透。',
    grade: '满血封神版',
    gradeKey: 'perfect',
    gradeSlogan: '全场零失误，今晚朋友圈可以站上领奖台。',
    seal: 'PERFECT',
    accent: '#FFD84D',
    canvasWidth: 327,
    canvasHeight: 480
  },
  onLoad(options) {
    this.setData({
      difficultyName: decodeURIComponent(options.name || '球迷入门局'),
      badge: decodeURIComponent(options.badge || '气氛组队长'),
      total: Number(options.total || 0),
      correct: Number(options.correct || options.total || 0),
      accuracy: Number(options.accuracy || 100),
      duration: Number(options.duration || 0),
      score: Number(options.score || 0),
      level: decodeURIComponent(options.level || '青铜看球员'),
      type: decodeURIComponent(options.type || '神棍预言家'),
      slogan: decodeURIComponent(options.slogan || '你不是猜答案，你是在给历史剧透。'),
      grade: decodeURIComponent(options.grade || '满血封神版'),
      gradeKey: decodeURIComponent(options.gradeKey || 'perfect'),
      gradeSlogan: decodeURIComponent(options.gradeSlogan || '全场零失误，今晚朋友圈可以站上领奖台。'),
      seal: decodeURIComponent(options.seal || 'PERFECT'),
      accent: decodeURIComponent(options.accent || '#FFD84D')
    })
  },
  onReady() { this.drawCertificate() },
  drawCertificate() {
    const ctx = wx.createCanvasContext('certificateCanvas', this)
    const width = 327
    const height = 480
    const now = new Date()
    const dateText = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const accent = this.data.accent || '#FFD84D'

    ctx.setFillStyle('#0B2B18')
    ctx.fillRect(0, 0, width, height)
    ctx.setFillStyle('#123D22')
    for (let x = 0; x < width; x += 42) ctx.fillRect(x, 0, 21, height)
    ctx.setStrokeStyle('rgba(255,255,255,0.35)')
    ctx.setLineWidth(2)
    ctx.strokeRect(22, 28, width - 44, height - 56)
    ctx.beginPath(); ctx.moveTo(width / 2, 28); ctx.lineTo(width / 2, height - 28); ctx.stroke()
    ctx.beginPath(); ctx.arc(width / 2, height / 2, 42, 0, Math.PI * 2); ctx.stroke()

    ctx.setFillStyle('rgba(0,0,0,0.30)')
    ctx.fillRect(34, 46, width - 68, 388)
    ctx.setStrokeStyle(accent)
    ctx.setLineWidth(4)
    ctx.strokeRect(34, 46, width - 68, 388)

    ctx.setTextAlign('center')
    ctx.setFillStyle(accent)
    ctx.setFontSize(12)
    ctx.fillText('PIXEL WORLD CUP QUIZ', width / 2, 74)
    ctx.setFillStyle('#FFFFFF')
    ctx.setFontSize(24)
    ctx.fillText('球场人格证书', width / 2, 112)

    ctx.setFillStyle('#FFFFFF')
    ctx.setFontSize(18)
    ctx.fillText(this.data.grade, width / 2, 148)
    ctx.setFillStyle(accent)
    ctx.setFontSize(20)
    ctx.fillText(this.data.type, width / 2, 180)

    ctx.setFillStyle('rgba(255,255,255,0.86)')
    ctx.setFontSize(12)
    this.drawWrappedText(ctx, this.data.gradeSlogan, width / 2, 208, 238, 18)

    ctx.setFillStyle('rgba(255,255,255,0.10)')
    ctx.fillRect(54, 258, 219, 88)
    ctx.setFillStyle('#FFFFFF')
    ctx.setFontSize(13)
    ctx.fillText(`段位：${this.data.level}`, width / 2, 283)
    ctx.fillText(`副本：${this.data.difficultyName}`, width / 2, 307)
    ctx.fillText(`战绩：${this.data.correct}/${this.data.total} · ${this.data.accuracy}% · ${this.data.duration}s`, width / 2, 331)

    ctx.setFillStyle(accent)
    ctx.fillRect(103, 364, 121, 42)
    ctx.setFillStyle('#0B2B18')
    ctx.setFontSize(19)
    ctx.fillText(this.data.seal, width / 2, 392)

    ctx.setFillStyle('#FFFFFF')
    ctx.setFontSize(14)
    ctx.fillText(this.data.badge, width / 2, 430)
    ctx.setFillStyle('rgba(255,255,255,0.66)')
    ctx.setFontSize(10)
    ctx.fillText(`发证日期：${dateText} · 保存后邀请好友挑战`, width / 2, 452)
    ctx.draw()
  },
  drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    let line = ''
    let lineCount = 0
    for (let i = 0; i < text.length; i += 1) {
      const testLine = line + text[i]
      if (ctx.measureText(testLine).width > maxWidth && i > 0) {
        ctx.fillText(line, x, y + lineCount * lineHeight)
        line = text[i]
        lineCount += 1
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, y + lineCount * lineHeight)
  },
  saveCertificate() {
    wx.canvasToTempFilePath({
      canvasId: 'certificateCanvas',
      width: this.data.canvasWidth,
      height: this.data.canvasHeight,
      destWidth: 981,
      destHeight: 1440,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => wx.showToast({ title: '证书已保存', icon: 'success' }),
          fail: () => wx.showModal({ title: '保存失败', content: '请允许保存到相册后重试。', showCancel: false })
        })
      },
      fail: () => wx.showToast({ title: '生成失败', icon: 'none' })
    }, this)
  },
  goLeaderboard() { wx.navigateTo({ url: '/pages/leaderboard/leaderboard' }) },
  backHome() { wx.reLaunch({ url: '/pages/index/index' }) }
})
