const STORAGE_KEY = 'worldcup_quiz_rank_records'

const difficultyRank = {
  easy: { level: '青铜看球员', coefficient: 1, order: 1 },
  medium: { level: '黄金战术板', coefficient: 2, order: 2 },
  hard: { level: '钻石考古家', coefficient: 3, order: 3 },
  nightmare: { level: '王者球史怪', coefficient: 5, order: 4 }
}

// TODO: 接入云开发 / 自有后端后，把 mockFriends 与 getLeaderboard 替换为云数据库查询。
//       当前为本地可运行原型：本机成绩从缓存读，"好友"数据先用占位选手。
const mockFriends = [
  { nickname: '加时赛显眼包', difficulty: 'nightmare', level: '王者球史怪', score: 781, accuracy: 100, duration: 96, title: '冷门百科人柱力', certificateGrade: '满血封神版', isMine: false },
  { nickname: '越位线发明家', difficulty: 'hard', level: '钻石考古家', score: 526, accuracy: 86, duration: 88, title: 'VAR 预言家', certificateGrade: '带伤晋级版', isMine: false },
  { nickname: '点球不敢看', difficulty: 'medium', level: '黄金战术板', score: 311, accuracy: 67, duration: 64, title: '战术板涂鸦师', certificateGrade: '残血守门版', isMine: false },
  { nickname: '凌晨三点闹钟', difficulty: 'easy', level: '青铜看球员', score: 168, accuracy: 60, duration: 41, title: '气氛组队长', certificateGrade: '快乐参赛版', isMine: false }
]

function calcScore(difficulty, total, duration, correctCount) {
  const meta = difficultyRank[difficulty] || difficultyRank.easy
  const safeTotal = Math.max(1, Number(total || 1))
  const correct = Math.max(0, Number(correctCount || 0))
  const accuracy = correct / safeTotal
  const base = Math.round(correct * 42 * meta.coefficient)
  const accuracyBonus = Math.round(accuracy * 90 * meta.coefficient)
  const speedBonus = Math.max(0, 150 - Number(duration || 120))
  const difficultyBonus = meta.order * 22
  return base + accuracyBonus + speedBonus + difficultyBonus
}

function getLevel(difficulty) {
  return (difficultyRank[difficulty] || difficultyRank.easy).level
}

function getCertificateGrade(correctCount, total) {
  const safeTotal = Math.max(1, Number(total || 1))
  const correct = Math.max(0, Number(correctCount || 0))
  const accuracy = correct / safeTotal
  if (correct === safeTotal) {
    return {
      key: 'perfect',
      name: '满血封神版',
      shortName: '满血版',
      slogan: '全场零失误，今晚朋友圈可以站上领奖台。',
      seal: 'PERFECT',
      accent: '#FFD84D'
    }
  }
  if (accuracy >= 0.75) {
    return {
      key: 'strong',
      name: '带伤晋级版',
      shortName: '强势版',
      slogan: '偶尔脚滑，但大部分时间都像在踢淘汰赛。',
      seal: 'CLUTCH',
      accent: '#7CFF6B'
    }
  }
  if (accuracy >= 0.45) {
    return {
      key: 'survive',
      name: '残血守门版',
      shortName: '残血版',
      slogan: '门线前扑出几题，也被世界名画教育了几脚。',
      seal: 'SURVIVE',
      accent: '#FF7A59'
    }
  }
  return {
    key: 'fun',
    name: '快乐参赛版',
    shortName: '快乐版',
    slogan: '比分可以落后，姿势必须好看，下局继续追分。',
    seal: 'RETRY',
    accent: '#8BCBFF'
  }
}

function getRecords() {
  if (typeof wx === 'undefined') return []
  return wx.getStorageSync(STORAGE_KEY) || []
}

function saveRecord(record) {
  if (typeof wx === 'undefined') return record
  const records = getRecords()
  const next = [{ ...record, isMine: true, createdAt: Date.now() }, ...records]
    .sort((a, b) => b.score - a.score || b.accuracy - a.accuracy || a.duration - b.duration)
    .slice(0, 20)
  wx.setStorageSync(STORAGE_KEY, next)
  return record
}

function getLeaderboard() {
  const mine = getRecords()
  return [...mine, ...mockFriends]
    .sort((a, b) => b.score - a.score || b.accuracy - a.accuracy || a.duration - b.duration)
    .map((item, index) => ({ ...item, rank: index + 1 }))
}

module.exports = { calcScore, getLevel, getCertificateGrade, saveRecord, getLeaderboard }
