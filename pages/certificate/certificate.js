// 设计稿基准尺寸：所有绘制坐标都按 327 x 480 设计，渲染时按实际 canvas 宽度做等比缩放
const DESIGN_W = 327
const DESIGN_H = 480

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
    hiddenPersona: '九十分钟零封指挥官',
    hiddenPersonaSlogan: '不冒进、不脚软，从第一题到最后一题都很稳。',
    finalScoreText: '终场 0:0',
    matchResultTitle: '常规时间完赛',
    matchResultDesc: '九十分钟踢满，比分牌已经给出本场判定。'
  },

  // Canvas 2D 节点引用（非响应式数据，挂在实例上）
  canvasNode: null,
  canvasCtx: null,
  canvasLayoutW: 0,
  canvasLayoutH: 0,

  onLoad() {
    // 优先从 storage 读取本局成绩 payload，没有则使用默认 data 兜底
    const payload = wx.getStorageSync('cert_payload') || {}
    if (payload && payload.total) {
      this.setData({
        difficultyName: payload.difficultyName || this.data.difficultyName,
        badge: payload.badge || this.data.badge,
        total: Number(payload.total || 0),
        correct: Number(payload.correct || 0),
        accuracy: Number(payload.accuracy || 0),
        duration: Number(payload.duration || 0),
        score: Number(payload.score || 0),
        level: payload.level || this.data.level,
        type: payload.type || this.data.type,
        slogan: payload.slogan || this.data.slogan,
        grade: payload.grade || this.data.grade,
        gradeKey: payload.gradeKey || this.data.gradeKey,
        gradeSlogan: payload.gradeSlogan || this.data.gradeSlogan,
        seal: payload.seal || this.data.seal,
        accent: payload.accent || this.data.accent,
        hiddenPersona: payload.hiddenPersona || this.data.hiddenPersona,
        hiddenPersonaSlogan: payload.hiddenPersonaSlogan || this.data.hiddenPersonaSlogan,
        finalScoreText: payload.finalScoreText || this.data.finalScoreText,
        matchResultTitle: payload.matchResultTitle || this.data.matchResultTitle,
        matchResultDesc: payload.matchResultDesc || this.data.matchResultDesc
      })
    }
  },

  onReady() {
    this.initCanvas()
  },

  initCanvas() {
    const query = wx.createSelectorQuery().in(this)
    query.select('#certificateCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          wx.showToast({ title: '画布初始化失败', icon: 'none' })
          return
        }
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = (wx.getSystemInfoSync && wx.getSystemInfoSync().pixelRatio) || 2
        // 设置物理像素尺寸 + dpr 缩放，保证高清
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        this.canvasNode = canvas
        this.canvasCtx = ctx
        this.canvasLayoutW = res[0].width
        this.canvasLayoutH = res[0].height

        this.drawCertificate()
      })
  },

  drawCertificate() {
    const ctx = this.canvasCtx
    if (!ctx) return
    const layoutW = this.canvasLayoutW
    const layoutH = this.canvasLayoutH
    // 等比缩放：把所有按 327x480 设计的坐标转换为当前 canvas 实际尺寸
    const sx = layoutW / DESIGN_W
    const sy = layoutH / DESIGN_H
    const X = (v) => v * sx
    const Y = (v) => v * sy
    const F = (v) => Math.max(8, Math.round(v * sx)) // 字号按宽度缩放
    const accent = this.data.accent || '#FFD84D'
    const now = new Date()
    const dateText = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    ctx.clearRect(0, 0, layoutW, layoutH)

    // 背景：球场绿 + 像素竖条
    ctx.fillStyle = '#0B2B18'
    ctx.fillRect(0, 0, layoutW, layoutH)
    ctx.fillStyle = '#123D22'
    for (let x = 0; x < DESIGN_W; x += 42) {
      ctx.fillRect(X(x), 0, X(21), layoutH)
    }

    // 外框 + 中线 + 中圈
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'
    ctx.lineWidth = 2
    ctx.strokeRect(X(22), Y(28), X(DESIGN_W - 44), Y(DESIGN_H - 56))
    ctx.beginPath(); ctx.moveTo(X(DESIGN_W / 2), Y(28)); ctx.lineTo(X(DESIGN_W / 2), Y(DESIGN_H - 28)); ctx.stroke()
    ctx.beginPath(); ctx.arc(X(DESIGN_W / 2), Y(DESIGN_H / 2), X(42), 0, Math.PI * 2); ctx.stroke()

    // 内层证书底
    ctx.fillStyle = 'rgba(0,0,0,0.30)'
    ctx.fillRect(X(34), Y(46), X(DESIGN_W - 68), Y(388))
    ctx.strokeStyle = accent
    ctx.lineWidth = 4
    ctx.strokeRect(X(34), Y(46), X(DESIGN_W - 68), Y(388))

    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'

    ctx.fillStyle = accent
    ctx.font = `bold ${F(12)}px sans-serif`
    ctx.fillText('WORLD CUP TYPE INDICATOR', X(DESIGN_W / 2), Y(74))

    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${F(24)}px sans-serif`
    ctx.fillText('WCTI 球场人格证书', X(DESIGN_W / 2), Y(112))

    ctx.font = `bold ${F(18)}px sans-serif`
    ctx.fillText(this.data.grade, X(DESIGN_W / 2), Y(148))

    ctx.fillStyle = accent
    ctx.font = `bold ${F(20)}px sans-serif`
    ctx.fillText(this.data.hiddenPersona, X(DESIGN_W / 2), Y(180))

    ctx.fillStyle = 'rgba(255,255,255,0.86)'
    ctx.font = `${F(12)}px sans-serif`
    this.drawWrappedText(ctx, this.data.hiddenPersonaSlogan, X(DESIGN_W / 2), Y(208), X(238), Y(18))

    ctx.fillStyle = 'rgba(255,255,255,0.10)'
    ctx.fillRect(X(54), Y(258), X(219), Y(88))

    ctx.fillStyle = '#FFFFFF'
    ctx.font = `${F(13)}px sans-serif`
    ctx.fillText(this.data.finalScoreText, X(DESIGN_W / 2), Y(278))
    ctx.fillText(this.data.matchResultTitle, X(DESIGN_W / 2), Y(303))
    ctx.fillText(`段位：${this.data.level} · ${this.data.accuracy}% · ${this.data.duration}s`, X(DESIGN_W / 2), Y(329))

    ctx.fillStyle = accent
    ctx.fillRect(X(103), Y(364), X(121), Y(42))
    ctx.fillStyle = '#0B2B18'
    ctx.font = `bold ${F(19)}px sans-serif`
    ctx.fillText(this.data.seal, X(DESIGN_W / 2), Y(392))

    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${F(14)}px sans-serif`
    ctx.fillText(this.data.badge, X(DESIGN_W / 2), Y(430))

    ctx.fillStyle = 'rgba(255,255,255,0.66)'
    ctx.font = `${F(10)}px sans-serif`
    ctx.fillText(`发证日期：${dateText} · 保存后邀请好友挑战`, X(DESIGN_W / 2), Y(452))
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

  // 主动检查并申请相册写入权限，体验更好
  ensureAlbumAuth() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          const auth = res.authSetting && res.authSetting['scope.writePhotosAlbum']
          if (auth === false) {
            // 已被拒绝过，引导去设置
            wx.showModal({
              title: '需要相册权限',
              content: '保存证书需要授权写入相册，去设置开启吗？',
              confirmText: '去设置',
              success: (m) => {
                if (m.confirm) {
                  wx.openSetting({
                    success: (s) => {
                      if (s.authSetting && s.authSetting['scope.writePhotosAlbum']) {
                        resolve()
                      } else {
                        reject(new Error('user denied'))
                      }
                    },
                    fail: () => reject(new Error('open setting fail'))
                  })
                } else {
                  reject(new Error('user cancel'))
                }
              }
            })
          } else if (auth === true) {
            resolve()
          } else {
            // 未询问过，发起授权
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success: () => resolve(),
              fail: () => reject(new Error('authorize fail'))
            })
          }
        },
        fail: () => reject(new Error('getSetting fail'))
      })
    })
  },

  saveCertificate() {
    if (!this.canvasNode) {
      wx.showToast({ title: '画布尚未就绪', icon: 'none' })
      return
    }
    this.ensureAlbumAuth().then(() => {
      wx.canvasToTempFilePath({
        canvas: this.canvasNode,
        // Canvas 2D 模式下 width/height 可省略，由内部尺寸决定；这里指定输出尺寸保证高清
        destWidth: this.canvasLayoutW * 3,
        destHeight: this.canvasLayoutH * 3,
        success: (res) => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => wx.showToast({ title: '证书已保存', icon: 'success' }),
            fail: () => wx.showToast({ title: '保存失败', icon: 'none' })
          })
        },
        fail: () => wx.showToast({ title: '生成失败', icon: 'none' })
      }, this)
    }).catch(() => {
      // 已经做过提示或被用户取消，这里安静失败即可
    })
  },

  goLeaderboard() {
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' })
  },

  backHome() {
    wx.reLaunch({ url: '/pages/index/index' })
  },

  onShareAppMessage() {
    return {
      title: `${this.data.finalScoreText}｜${this.data.hiddenPersona}，敢来比比吗？`,
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: `WCTI · ${this.data.hiddenPersona}`,
      query: ''
    }
  }
})
