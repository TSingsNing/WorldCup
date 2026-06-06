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
  { nickname: '加时赛显眼包', difficulty: 'nightmare', level: '王者球史怪', score: 781, accuracy: 100, duration: 96, title: '冷门百科人柱力', hiddenPersona: 'FIFA 档案馆管理员', finalScoreText: '终场 10:0', certificateGrade: '满血封神版', isMine: false },
  { nickname: '越位线发明家', difficulty: 'hard', level: '钻石考古家', score: 526, accuracy: 86, duration: 88, title: 'VAR 预言家', hiddenPersona: '高速反击答题机', finalScoreText: '终场 6:1', certificateGrade: '带伤晋级版', isMine: false },
  { nickname: '点球不敢看', difficulty: 'medium', level: '黄金战术板', score: 311, accuracy: 67, duration: 64, title: '战术板涂鸦师', hiddenPersona: '逆风守门员', finalScoreText: '终场 4:2', certificateGrade: '残血守门版', isMine: false },
  { nickname: '凌晨三点闹钟', difficulty: 'easy', level: '青铜看球员', score: 168, accuracy: 60, duration: 41, title: '气氛组队长', hiddenPersona: '补时绝杀型球迷', finalScoreText: '终场 3:2', certificateGrade: '快乐参赛版', isMine: false }
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

function getMatchBroadcast({ isCorrect, currentIndex, total, score, wrongCount, correctStreak, wrongStreak, isLast }) {
  const minute = Math.min(90, Math.round(((Number(currentIndex || 0) + 1) / Math.max(1, Number(total || 1))) * 90))
  if (isCorrect) {
    if (isLast) return { title: `${minute}' 终场前破门`, line: '最后一脚稳稳打进，证书区已经开始铺红毯。' }
    if (correctStreak >= 3) return { title: `${minute}' 帽子戏法`, line: '连续命中三题，门将已经开始怀疑自己的职业选择。' }
    if (score === 0 && wrongCount > 0) return { title: `${minute}' 扳回一城`, line: '刚才的看台飞球不算白费，这脚终于压住了。' }
    return { title: `${minute}' 球进死角`, line: '这脚推射很稳，记分牌亮灯，继续压上。' }
  }
  if (wrongStreak >= 3) return { title: `${minute}' 门前连续险情`, line: '三连失误有点刺激，但主裁没吹停，下一题还能救场。' }
  if (isLast) return { title: `${minute}' 终场哨前打偏`, line: '最后一脚擦柱而出，不过比赛记录已经完整封存。' }
  return { title: `${minute}' 射门偏出`, line: '这球飞向看台第三排，但比赛继续，下一脚还能追回来。' }
}

function getFinalScoreReport({ correctCount, total, duration, difficulty, lastCorrect, maxCorrectStreak, maxWrongStreak }) {
  const safeTotal = Math.max(1, Number(total || 1))
  const correct = Math.max(0, Number(correctCount || 0))
  const wrong = Math.max(0, safeTotal - correct)
  const accuracy = correct / safeTotal
  let title = '常规时间完赛'
  let desc = '九十分钟踢满，比分牌已经给出本场判定。'

  if (correct === safeTotal) {
    title = difficulty === 'nightmare' ? '球史怪物局零封夺冠' : '零封夺冠'
    desc = '全场没有给对手任何机会，这张证书可以直接举过头顶。'
  } else if (lastCorrect && wrong >= 2 && accuracy >= 0.45) {
    title = '补时绝杀晋级'
    desc = '前面有点踉跄，最后一脚把悬念踢进了球门。'
  } else if (maxCorrectStreak >= 3 && accuracy >= 0.65) {
    title = '帽子戏法带队过关'
    desc = '连续进球撑起场面，偶尔丢球也挡不住攻势。'
  } else if (maxWrongStreak >= 3 && accuracy >= 0.45) {
    title = '逆风守门保住体面'
    desc = '后防线一度拉响警报，但你硬是把比分拖回能看的区间。'
  } else if (accuracy < 0.45) {
    title = '快乐完赛保留火种'
    desc = '比分不一定漂亮，但你至少把全场踢完了，下局还有复仇剧本。'
  }

  return {
    finalScoreText: `终场 ${correct}:${wrong}`,
    matchResultTitle: title,
    matchResultDesc: `${desc} 用时 ${duration}s。`
  }
}

function getHiddenPersona({ difficulty, correctCount, total, duration, lastCorrect, maxCorrectStreak, maxWrongStreak }) {
  const safeTotal = Math.max(1, Number(total || 1))
  const correct = Math.max(0, Number(correctCount || 0))
  const accuracy = correct / safeTotal
  const secondsPerQuestion = Number(duration || 0) / safeTotal

  if (difficulty === 'nightmare' && correct === safeTotal) {
    return { name: 'FIFA 档案馆管理员', slogan: '别人翻集锦，你像在翻赛事原始档案。' }
  }
  if (correct === safeTotal) {
    return { name: '九十分钟零封指挥官', slogan: '不冒进、不脚软，从第一题到最后一题都很稳。' }
  }
  if (lastCorrect && maxWrongStreak >= 2 && accuracy >= 0.45) {
    return { name: '补时绝杀型球迷', slogan: '前面可以制造悬念，最后必须把剧本写回来。' }
  }
  if (maxCorrectStreak >= 3) {
    return { name: '帽子戏法发动机', slogan: '一旦脚感来了，题目就像排队等你射门。' }
  }
  if (secondsPerQuestion <= 5 && accuracy >= 0.75) {
    return { name: '高速反击答题机', slogan: '脑子还没热身，答案已经冲到禁区了。' }
  }
  if (maxWrongStreak >= 3 && accuracy >= 0.45) {
    return { name: '逆风守门员', slogan: '场面很乱，但你总能在门线上捞回几球。' }
  }
  if (correct === 0) {
    return { name: '吉祥物候选人', slogan: '今天主要负责带气氛，技术统计先交给下一局。' }
  }
  if (accuracy < 0.45) {
    return { name: '看台气氛组领唱', slogan: '比分可以低，存在感必须拉满。' }
  }
  return { name: '战术板涂鸦师', slogan: '有些球像战术，有些球像灵感，拼起来还真能看。' }
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

module.exports = {
  calcScore,
  getLevel,
  getCertificateGrade,
  getMatchBroadcast,
  getFinalScoreReport,
  getHiddenPersona,
  saveRecord,
  getLeaderboard
}
