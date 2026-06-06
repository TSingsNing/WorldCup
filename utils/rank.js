const STORAGE_KEY = 'worldcup_quiz_rank_records'

const difficultyRank = {
  easy: { level: '青铜看球员', coefficient: 1, order: 1 },
  medium: { level: '黄金战术板', coefficient: 2, order: 2 },
  hard: { level: '钻石考古家', coefficient: 3, order: 3 },
  nightmare: { level: '王者球史怪', coefficient: 5, order: 4 }
}

const mockFriends = [
  { nickname: '加时赛显眼包', difficulty: 'nightmare', level: '王者球史怪', score: 781, duration: 96, title: '冷门百科人柱力', isMine: false },
  { nickname: '越位线发明家', difficulty: 'hard', level: '钻石考古家', score: 562, duration: 88, title: 'VAR 预言家', isMine: false },
  { nickname: '点球不敢看', difficulty: 'medium', level: '黄金战术板', score: 351, duration: 64, title: '战术板涂鸦师', isMine: false },
  { nickname: '凌晨三点闹钟', difficulty: 'easy', level: '青铜看球员', score: 188, duration: 41, title: '气氛组队长', isMine: false }
]

function calcScore(difficulty, total, duration) {
  const meta = difficultyRank[difficulty] || difficultyRank.easy
  const speedBonus = Math.max(0, 160 - Number(duration || 120))
  return total * 30 * meta.coefficient + speedBonus + meta.order * 25
}

function getLevel(difficulty) {
  return (difficultyRank[difficulty] || difficultyRank.easy).level
}

function getRecords() {
  if (typeof wx === 'undefined') return []
  return wx.getStorageSync(STORAGE_KEY) || []
}

function saveRecord(record) {
  if (typeof wx === 'undefined') return record
  const records = getRecords()
  const next = [{ ...record, isMine: true, createdAt: Date.now() }, ...records]
    .sort((a, b) => b.score - a.score || a.duration - b.duration)
    .slice(0, 20)
  wx.setStorageSync(STORAGE_KEY, next)
  return record
}

function getLeaderboard() {
  const mine = getRecords()
  return [...mine, ...mockFriends]
    .sort((a, b) => b.score - a.score || a.duration - b.duration)
    .map((item, index) => ({ ...item, rank: index + 1 }))
}

module.exports = { calcScore, getLevel, saveRecord, getLeaderboard }
