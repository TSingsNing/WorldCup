App({
  globalData: {
    appName: '世界杯像素答题杯',
    theme: {
      primary: '#7CFF6B',
      gold: '#FFD84D',
      deep: '#0B2B18'
    },
    bgmAudio: null,
    bgmPlaying: false,
    currentBgmKey: '',
    bgmMap: {
      easy: '/assets/audio/bgm_easy.m4a',
      medium: '/assets/audio/bgm_medium.m4a',
      hard: '/assets/audio/bgm_hard.m4a',
      nightmare: '/assets/audio/bgm_legend.m4a',
      default: '/assets/audio/worldcup_quiz_bgm.m4a'
    }
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
    return true
  },

  pauseBgm() {
    const audio = this.globalData.bgmAudio
    if (audio) audio.pause()
    this.globalData.bgmPlaying = false
    return false
  },

  toggleBgm(difficulty = 'default') {
    if (this.globalData.bgmPlaying && (this.globalData.currentBgmKey === difficulty || difficulty === 'default')) {
      return this.pauseBgm()
    }
    return this.playBgm(difficulty)
  },

  isBgmPlaying() {
    return !!this.globalData.bgmPlaying
  }
})
