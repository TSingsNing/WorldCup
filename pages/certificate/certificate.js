Page({
  data: {
    difficultyName: '球迷入门局',
    badge: '气氛组队长',
    total: 0,
    duration: 0,
    score: 0,
    level: '青铜看球员',
    type: '神棍预言家',
    slogan: '你不是猜答案，你是在给历史剧透。',
    canvasWidth: 327,
    canvasHeight: 480
  },

  onLoad(options) {
    this.setData({
      difficultyName: decodeURIComponent(options.name || '球迷入门局'),
      badge: decodeURIComponent(options.badge || '气氛组队长'),
      total: Number(options.total || 0),
      duration: Number(options.duration || 0),
      score: Number(options.score || 0),
      level: decodeURIComponent(options.level || '青铜看球员'),
      type: decodeURIComponent(options.type || '神棍预言家'),
      slogan: decodeURIComponent(options.slogan || '你不是猜答案，你是在给历史剧透。')
    })
  },

  onReady() { this.drawCertificate() },

  drawCertificate() {
    const ctx = wx.createCanvasContext('certificateCanvas', this)
    const width = 327
    const height = 480
    const now = new Date()
    const dateText = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#081b3d')
    gradient.addColorStop(0.52, '#07142f')
    gradient.addColorStop(1, '#2b114f')
    ctx.setFillStyle(gradient)
    ctx.fillRect(0, 0, width, height)

    ctx.setFillStyle('rgba(8,217,214,0.28)')
    ctx.beginPath(); ctx.arc(42, 56, 72, 0, Math.PI * 2); ctx.fill()
    ctx.setFillStyle('rgba(255,90,120,0.23)')
    ctx.beginPath(); ctx.arc(286, 70, 74, 0, Math.PI * 2); ctx.fill()
    ctx.setFillStyle('rgba(246,196,83,0.18)')
    ctx.beginPath(); ctx.arc(160, 430, 110, 0, Math.PI * 2); ctx.fill()

    ctx.setStrokeStyle('rgba(246,196,83,0.95)')
    ctx.setLineWidth(4)
    ctx.strokeRect(18, 18, width - 36, height - 36)
    ctx.setStrokeStyle('rgba(255,255,255,0.18)')
    ctx.setLineWidth(1)
    ctx.strokeRect(30, 30, width - 60, height - 60)

    ctx.setTextAlign('center')
    ctx.setFillStyle('#f6c453')
    ctx.setFontSize(13)
    ctx.fillText('WORLD CUP CHAOS QUIZ', width / 2, 62)

    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(25)
    ctx.fillText('球迷人格证书', width / 2, 106)

    ctx.setFillStyle('#08d9d6')
    ctx.setFontSize(21)
    ctx.fillText(this.data.type, width / 2, 146)

    ctx.setFillStyle('rgba(255,255,255,0.8)')
    ctx.setFontSize(12)
    this.drawWrappedText(ctx, this.data.slogan, width / 2, 178, 250, 18)

    ctx.setFillStyle('rgba(255,255,255,0.12)')
    ctx.fillRect(44, 226, 239, 92)
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(14)
    ctx.fillText(`段位：${this.data.level}`, width / 2, 252)
    ctx.fillText(`副本：${this.data.difficultyName}`, width / 2, 278)
    ctx.fillText(`战绩：${this.data.total}/${this.data.total} · ${this.data.duration}s · ${this.data.score} 分`, width / 2, 304)

    ctx.setFillStyle('#f6c453')
    ctx.beginPath(); ctx.arc(width / 2, 366, 42, 0, Math.PI * 2); ctx.fill()
    ctx.setFillStyle('#07142f')
    ctx.setFontSize(34)
    ctx.fillText('GOAT', width / 2, 378)

    ctx.setFillStyle('#ff5a78')
    ctx.setFontSize(17)
    ctx.fillText(this.data.badge, width / 2, 432)
    ctx.setFillStyle('rgba(255,255,255,0.62)')
    ctx.setFontSize(11)
    ctx.fillText(`发证日期：${dateText} · 截图发群，接受拷打`, width / 2, 454)

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
