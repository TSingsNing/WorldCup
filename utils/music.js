let audio = null
let playing = false

function ensureAudio() {
  if (audio || typeof wx === 'undefined') return audio
  audio = wx.createInnerAudioContext()
  audio.loop = true
  audio.obeyMuteSwitch = false
  audio.volume = 0.38
  audio.src = '/assets/audio/worldcup_quiz_bgm.mp3'
  audio.onError((err) => {
    console.warn('background music error', err)
  })
  return audio
}

function playBgm() {
  const instance = ensureAudio()
  if (!instance) return false
  instance.play()
  playing = true
  return true
}

function pauseBgm() {
  if (audio) audio.pause()
  playing = false
  return false
}

function toggleBgm() {
  return playing ? pauseBgm() : playBgm()
}

function isPlaying() {
  return playing
}

module.exports = { playBgm, pauseBgm, toggleBgm, isPlaying }
