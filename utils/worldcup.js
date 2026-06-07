const STORAGE_KEYS = {
  predictions: 'worldcup_prophet_predictions',
  profile: 'worldcup_prophet_profile',
  room: 'worldcup_prophet_room'
}

const complianceNotice = '本产品仅提供世界杯娱乐预测、球迷互动与荣誉展示，不涉及充值、提现、现金奖品、真实投注、赔率、盘口或任何形式的博彩交易。'

const matches = [
  {
    id: 'm-001',
    date: '06月11日',
    time: '周四 09:00',
    stage: '揭幕战',
    group: 'A组',
    home: '东道主代表队',
    away: '晋级球队A',
    venue: '墨西哥城',
    heat: 98,
    tag: '全球开球',
    story: '揭幕战天然自带讨论度，适合做朋友圈第一张预测卡。',
    ai: {
      trend: '开局阶段双方都会更谨慎，前 30 分钟节奏可能偏慢。',
      key: '定位球和门将稳定性可能决定第一波舆论风向。',
      score: '娱乐倾向：1:0 或 1:1',
      upset: '爆冷观察：中等，揭幕战情绪波动通常更明显。'
    }
  },
  {
    id: 'm-002',
    date: '06月12日',
    time: '周五 08:00',
    stage: '小组赛',
    group: 'B组',
    home: '欧洲劲旅',
    away: '南美技术流',
    venue: '洛杉矶',
    heat: 92,
    tag: '强强对话',
    story: '技战术对抗清晰，适合引导用户选择站队理由。',
    ai: {
      trend: '欧洲球队更重视攻守距离，南美球队可能通过边路个人能力破局。',
      key: '中场二点球和反抢后的第一脚向前传递。',
      score: '娱乐倾向：2:1 或 1:1',
      upset: '爆冷观察：偏高，强强对话容易被早段进球改变。'
    }
  },
  {
    id: 'm-003',
    date: '06月13日',
    time: '周六 10:00',
    stage: '小组赛',
    group: 'C组',
    home: '非洲黑马',
    away: '亚洲之光',
    venue: '温哥华',
    heat: 88,
    tag: '黑马雷达',
    story: '两队都具备速度和冲击力，评论区天然容易形成阵营感。',
    ai: {
      trend: '比赛会更依赖转换速度，禁区前沿犯规数量可能增加。',
      key: '谁能把前场冲刺转化为高质量射门，谁就更接近胜利。',
      score: '娱乐倾向：1:2 或 2:2',
      upset: '爆冷观察：高，黑马叙事非常适合传播。'
    }
  },
  {
    id: 'm-004',
    date: '06月18日',
    time: '周四 09:30',
    stage: '小组赛次轮',
    group: 'D组',
    home: '卫冕热门',
    away: '北美冲击队',
    venue: '纽约/新泽西',
    heat: 95,
    tag: '冠军相检测',
    story: '热门球队每一次丢分都会制造巨大讨论，适合榜单冲刺。',
    ai: {
      trend: '热门球队大概率掌控球权，但需要警惕身后空间。',
      key: '边后卫压上后的回追质量，以及替补前锋的终结效率。',
      score: '娱乐倾向：2:0 或 2:1',
      upset: '爆冷观察：中低，除非开局出现红黄牌扰动。'
    }
  },
  {
    id: 'm-005',
    date: '06月28日',
    time: '周日 08:00',
    stage: '淘汰赛',
    group: '1/16决赛',
    home: '小组第一',
    away: '最佳第三名',
    venue: '达拉斯',
    heat: 96,
    tag: '一场定生死',
    story: '淘汰赛适合做连红徽章、反向明灯、天台杯群内PK。',
    ai: {
      trend: '淘汰赛容错更低，领先方可能更早进入风险控制模式。',
      key: '替补席深度、点球心理和加时体能储备。',
      score: '娱乐倾向：1:0 或 1:1后加时',
      upset: '爆冷观察：中高，单场淘汰天然提升不确定性。'
    }
  }
]

const championTeams = ['阿根廷', '法国', '巴西', '英格兰', '西班牙', '德国', '葡萄牙', '荷兰', '乌拉圭', '黑马球队']
const goldenBootPlayers = ['姆巴佩', '哈兰德', '维尼修斯', '贝林厄姆', '梅西', '凯恩', '劳塔罗', '黑马射手']

const mockFriends = [
  { nickname: '反向明灯老王', room: '天台杯', points: 286, accuracy: 76, streak: 5, title: '本群球王', badge: '连红 5 场' },
  { nickname: '玄学比分师', room: '天台杯', points: 241, accuracy: 68, streak: 3, title: '黄金预言家', badge: '比分命中过' },
  { nickname: 'VAR研究员', room: '战术板', points: 218, accuracy: 64, streak: 2, title: '数据派球迷', badge: '冷门雷达' },
  { nickname: '朋友圈毒奶王', room: '天台杯', points: 173, accuracy: 51, streak: 0, title: '反买之王', badge: '节目效果' }
]

function safeGet(key, fallback) {
  if (typeof wx === 'undefined') return fallback
  const value = wx.getStorageSync(key)
  return value || fallback
}

function safeSet(key, value) {
  if (typeof wx !== 'undefined') wx.setStorageSync(key, value)
}

function getMatchList() {
  return matches
}

function getMatchById(id) {
  return matches.find((item) => item.id === id) || matches[0]
}

function getPredictionMap() {
  return safeGet(STORAGE_KEYS.predictions, {})
}

function getPredictionList() {
  const map = getPredictionMap()
  return Object.keys(map).map((id) => map[id]).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
}

function calcPredictionPoints(prediction, match) {
  let points = 18
  if (prediction.result) points += 12
  if (prediction.score) points += 10
  if (prediction.goals) points += 6
  if (prediction.firstGoal) points += 4
  if (prediction.reason && prediction.reason.length >= 6) points += 8
  if (match && match.heat >= 95) points += 5
  if (prediction.result === '爆冷') points += 9
  return points
}

function savePrediction(prediction) {
  const match = getMatchById(prediction.matchId)
  const map = getPredictionMap()
  const payload = Object.assign({}, prediction, {
    match,
    points: calcPredictionPoints(prediction, match),
    updatedAt: Date.now(),
    statusText: '已锁定娱乐预测，赛后可由运营录入真实赛果结算。'
  })
  map[prediction.matchId] = payload
  safeSet(STORAGE_KEYS.predictions, map)
  return payload
}

function getStats() {
  const list = getPredictionList()
  const totalPoints = list.reduce((sum, item) => sum + Number(item.points || 0), 0)
  const hotPick = list.find((item) => item.match && item.match.heat >= 95)
  const streak = Math.min(list.length, 6)
  const accuracy = list.length ? Math.min(93, 48 + list.length * 7 + Math.floor(totalPoints / 80)) : 0
  return {
    count: list.length,
    totalPoints,
    streak,
    accuracy,
    hotPick: hotPick ? hotPick.match.tag : '等待首场预测',
    title: getPersona(totalPoints, list.length).name
  }
}

function getPersona(points, count) {
  if (count === 0) return { name: '候补预言家', slogan: '先站一次队，球迷身份卡马上开光。', tone: '#08d9d6' }
  if (points >= 220) return { name: '黄金预言家', slogan: '你不是在猜比赛，你是在提前写赛后热搜。', tone: '#f6c453' }
  if (points >= 150) return { name: '冷门雷达', slogan: '别人看热门，你专盯剧情反转。', tone: '#ff6b6b' }
  if (points >= 80) return { name: '战术板嘴强王者', slogan: '每一次站队都自带三段式分析。', tone: '#08d9d6' }
  return { name: '朋友圈反向明灯', slogan: '你负责制造节目效果，朋友负责反向参考。', tone: '#b06cff' }
}

function saveProfile(profile) {
  const stats = getStats()
  const persona = getPersona(stats.totalPoints, stats.count)
  const payload = Object.assign({}, profile, stats, persona, { updatedAt: Date.now() })
  safeSet(STORAGE_KEYS.profile, payload)
  return payload
}

function getProfile() {
  const saved = safeGet(STORAGE_KEYS.profile, null)
  if (saved) return saved
  const stats = getStats()
  return Object.assign({ nickname: '世界杯球迷', team: '暂未选择', champion: '法国', goldenBoot: '姆巴佩' }, stats, getPersona(stats.totalPoints, stats.count))
}

function getLeaderboard() {
  const stats = getStats()
  const mine = {
    nickname: '我',
    room: getRoom().name,
    points: stats.totalPoints,
    accuracy: stats.accuracy,
    streak: stats.streak,
    title: stats.title,
    badge: stats.count ? '已预测 ' + stats.count + ' 场' : '等待开球',
    isMine: true
  }
  return mockFriends.concat([mine]).sort((a, b) => b.points - a.points).map((item, index) => Object.assign({}, item, { rank: index + 1 }))
}

function getRoom() {
  return safeGet(STORAGE_KEYS.room, { name: '天台杯', slogan: '好友之间只比眼光，不碰现金与筹码。', members: 18 })
}

function saveRoom(room) {
  const payload = Object.assign({}, getRoom(), room)
  safeSet(STORAGE_KEYS.room, payload)
  return payload
}

function getShareLines() {
  const profile = getProfile()
  return [
    '我的世界杯身份：' + profile.name,
    '预测热力积分：' + profile.totalPoints,
    '我支持 ' + profile.team + '，冠军看好 ' + profile.champion,
    complianceNotice
  ]
}

module.exports = {
  complianceNotice,
  championTeams,
  goldenBootPlayers,
  getMatchList,
  getMatchById,
  getPredictionList,
  savePrediction,
  getStats,
  saveProfile,
  getProfile,
  getLeaderboard,
  getRoom,
  saveRoom,
  getShareLines
}
