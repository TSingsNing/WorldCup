App({
  globalData: {
    appName: '世界杯预言家',
    theme: {
      primary: '#08d9d6',
      gold: '#f6c453',
      deep: '#07142f'
    },
    bgmAudio: null,
    bgmPlaying: false,
    currentBgmKey: '',
    // 记录用户是否主动按下了"暂停"。一旦为 true，后续 onShow 不再自动续播，避免打扰
    userPaused: false,
    bgmMap: {
      easy: '/assets/audio/bgm_easy.m4a',
      medium: '/assets/audio/bgm_medium.m4a',
      hard: '/assets/audio/bgm_hard.m4a',
      nightmare: '/assets/audio/bgm_legend.m4a',
      default: '/assets/audio/worldcup_quiz_bgm.m4a'
    }
  },

  onLaunch() {
    // 启动即尝试播放默认 BGM。Android 通常可直接播；iOS 受系统策略限制可能需要首个手势触发
    this.playBgm('default')
  },

  onShow() {
    // 从后台切回前台时，如果用户没有主动暂停过，则恢复播放
    if (!this.globalData.userPaused) {
      this.playBgm(this.globalData.currentBgmKey || 'default')
    }
  },

  onHide() {
    // 切到后台时暂停（不算用户主动暂停）
    const audio = this.globalData.bgmAudio
    if (audio) audio.pause()
    this.globalData.bgmPlaying = false
  },

  getBgmSrc(difficulty) {
    return this.globalData.bgmMap[difficulty] || this.globalData.bgmMap.default
  },

  ensureBgm(difficulty = 'default') {
    if (typeof wx === 'undefined') return null
    const src = this.getBgmSrc(difficulty)

    if (!this.globalData.bgmAudio) {
      const audio = wx.createInnerAudioContext()
      audio.loop = true
      audio.obeyMuteSwitch = false
      audio.volume = 0.36
      audio.onPlay(() => {
        this.globalData.bgmPlaying = true
      })
      audio.onPause(() => {
        this.globalData.bgmPlaying = false
      })
      audio.onStop(() => {
        this.globalData.bgmPlaying = false
      })
      audio.onError((err) => {
        this.globalData.bgmPlaying = false
        console.warn('background music error', err)
      })
      this.globalData.bgmAudio = audio
    }

    const audio = this.globalData.bgmAudio
    if (this.globalData.currentBgmKey !== difficulty || audio.src !== src) {
      audio.stop()
      audio.src = src
      this.globalData.currentBgmKey = difficulty
    }
    return audio
  },

  playBgm(difficulty = 'default') {
    const audio = this.ensureBgm(difficulty)
    if (!audio) return false
    audio.play()
    this.globalData.bgmPlaying = true
    // 任何主动 play 都视为用户重新开启，重置 userPaused
    this.globalData.userPaused = false
    return true
  },

  pauseBgm(byUser = true) {
    const audio = this.globalData.bgmAudio
    if (audio) audio.pause()
    this.globalData.bgmPlaying = false
    if (byUser) this.globalData.userPaused = true
    return false
  },

  toggleBgm(difficulty = 'default') {
    if (this.globalData.bgmPlaying && (this.globalData.currentBgmKey === difficulty || difficulty === 'default')) {
      return this.pauseBgm(true)
    }
    return this.playBgm(difficulty)
  },

  isBgmPlaying() {
    return !!this.globalData.bgmPlaying
  }
})
