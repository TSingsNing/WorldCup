Page({
  data: {
    difficultyName: '球迷入门',
    badge: '新晋球迷',
    total: 0,
    canvasWidth: 327,
    canvasHeight: 450
  },

  onLoad(options) {
    this.setData({
      difficultyName: decodeURIComponent(options.name || '球迷入门'),
      badge: decodeURIComponent(options.badge || '新晋球迷'),
      total: Number(options.total || 0)
    })
  },

  onReady() {
    this.drawCertificate()
  },

  drawCertificate() {
    const ctx = wx.createCanvasContext('certificateCanvas', this)
    const width = 327
    const height = 450
    const now = new Date()
    const dateText = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    ctx.setFillStyle('#07142f')
    ctx.fillRect(0, 0, width, height)

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#0b2b5c')
    gradient.addColorStop(0.48, '#07142f')
    gradient.addColorStop(1, '#120b2f')
    ctx.setFillStyle(gradient)
    ctx.fillRect(0, 0, width, height)

    ctx.setFillStyle('rgba(8,217,214,0.22)')
    ctx.beginPath(); ctx.arc(42, 60, 70, 0, Math.PI * 2); ctx.fill()
    ctx.setFillStyle('rgba(246,196,83,0.18)')
    ctx.beginPath(); ctx.arc(285, 48, 62, 0, Math.PI * 2); ctx.fill()

    ctx.setStrokeStyle('rgba(246,196,83,0.9)')
    ctx.setLineWidth(3)
    ctx.strokeRect(18, 18, width - 36, height - 36)
    ctx.setStrokeStyle('rgba(255,255,255,0.18)')
    ctx.setLineWidth(1)
    ctx.strokeRect(28, 28, width - 56, height - 56)

    ctx.setFillStyle('#f6c453')
    ctx.setFontSize(16)
    ctx.setTextAlign('center')
    ctx.fillText('FIFA WORLD CUP QUIZ', width / 2, 72)

    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(28)
    ctx.fillText('荣誉挑战证书', width / 2, 122)

    ctx.setFillStyle('#08d9d6')
    ctx.setFontSize(18)
    ctx.fillText(this.data.badge, width / 2, 168)

    ctx.setFillStyle('rgba(255,255,255,0.82)')
    ctx.setFontSize(14)
    ctx.fillText('你已完成世界杯知识挑战', width / 2, 214)
    ctx.fillText(`难度：${this.data.difficultyName}`, width / 2, 242)
    ctx.fillText(`成绩：${this.data.total}/${this.data.total} 全部答对`, width / 2, 270)

    ctx.setFillStyle('rgba(246,196,83,0.96)')
    ctx.beginPath(); ctx.arc(width / 2, 330, 44, 0, Math.PI * 2); ctx.fill()
    ctx.setFillStyle('#07142f')
    ctx.setFontSize(38)
    ctx.fillText('★', width / 2, 344)

    ctx.setFillStyle('rgba(255,255,255,0.68)')
    ctx.setFontSize(12)
    ctx.fillText(`颁发日期：${dateText}`, width / 2, 402)
    ctx.fillText('WorldCup · 互动答题小程序', width / 2, 424)

    ctx.draw()
  },

  saveCertificate() {
    wx.canvasToTempFilePath({
      canvasId: 'certificateCanvas',
      width: this.data.canvasWidth,
      height: this.data.canvasHeight,
      destWidth: 981,
      destHeight: 1350,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
          fail: () => wx.showModal({ title: '保存失败', content: '请在微信设置中允许保存到相册后重试。', showCancel: false })
        })
      },
      fail: () => wx.showToast({ title: '生成失败', icon: 'none' })
    }, this)
  },

  backHome() {
    wx.reLaunch({ url: '/pages/index/index' })
  }
})
