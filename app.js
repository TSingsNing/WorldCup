App({
  globalData: {
    appName: '世界杯整活答题局',
    theme: {
      primary: '#08d9d6',
      gold: '#f6c453',
      deep: '#07142f'
    },
    bgmAudio: null,
    bgmPlaying: false
  },

  ensureBgm() {
    if (this.globalData.bgmAudio || typeof wx === 'undefined') {
      return this.globalData.bgmAudio
    }

    const audio = wx.createInnerAudioContext()
    audio.loop = true
    audio.obeyMuteSwitch = false
    audio.volume = 0.38
    audio.src = '/assets/audio/worldcup_quiz_bgm.mp3'
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
    return audio
  },

  playBgm() {
    const audio = this.ensureBgm()
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

  toggleBgm() {
    return this.globalData.bgmPlaying ? this.pauseBgm() : this.playBgm()
  },

  isBgmPlaying() {
    return !!this.globalData.bgmPlaying
  }
})
