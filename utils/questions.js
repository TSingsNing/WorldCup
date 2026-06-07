// TODO: 后续接入运营后台 / 云开发后，将下方 questionBank 替换为远程题库拉取（按版本号缓存）。
//       当前为本地 hardcode 版，便于无后端跑通 MVP 体验。
const questionBank = {
  easy: {
    name: '球迷入门局',
    vibe: '热身开踢，先找脚感。',
    description: '基础常识局。',
    badge: '气氛组队长',
    accent: '#08d9d6',
    challengeCount: 5,
    questions: [
      { id: 'easy-1', question: '世界杯历史上夺冠次数最多的国家队是谁？', options: ['巴西', '德国', '阿根廷', '法国'], answer: 0, explanation: '巴西男足五次夺冠，是世界杯冠军数最多的国家队。' },
      { id: 'easy-2', question: '第一届男足世界杯在哪里举办？', options: ['意大利', '乌拉圭', '巴西', '英格兰'], answer: 1, explanation: '1930 年首届世界杯在乌拉圭举办，东道主最终夺冠。' },
      { id: 'easy-3', question: '2022 年卡塔尔世界杯冠军是谁？', options: ['法国', '克罗地亚', '阿根廷', '巴西'], answer: 2, explanation: '阿根廷在决赛点球大战击败法国，拿到队史第三冠。' },
      { id: 'easy-4', question: '世界杯通常每隔几年举办一次？', options: ['2 年', '3 年', '4 年', '5 年'], answer: 2, explanation: '男足世界杯通常四年一届。' },
      { id: 'easy-5', question: '2010 年南非世界杯冠军是哪支球队？', options: ['荷兰', '西班牙', '德国', '意大利'], answer: 1, explanation: '西班牙加时 1:0 击败荷兰，首次夺得世界杯。' },
      { id: 'easy-6', question: '一场世界杯淘汰赛常规时间是多少分钟？', options: ['60 分钟', '80 分钟', '90 分钟', '120 分钟'], answer: 2, explanation: '足球比赛常规时间为 90 分钟，淘汰赛平局才进入加时。' },
      { id: 'easy-7', question: '世界杯决赛若加时仍平局，通常如何决出冠军？', options: ['重赛', '抽签', '点球大战', '比控球率'], answer: 2, explanation: '加时仍平局时会进行点球大战。' },
      { id: 'easy-8', question: '“大力神杯”对应的是哪项赛事冠军奖杯？', options: ['欧洲杯', '世界杯', '美洲杯', '欧冠'], answer: 1, explanation: '大力神杯是 FIFA 世界杯冠军奖杯。' }
    ]
  },
  medium: {
    name: '战术观察局',
    vibe: '经典名场面，开始上强度。',
    description: '经典决赛与金靴。',
    badge: '战术板涂鸦师',
    accent: '#f6c453',
    challengeCount: 6,
    questions: [
      { id: 'medium-1', question: '单届世界杯进球最多的球员是哪位？', options: ['罗纳尔多', '朱斯特·方丹', '克洛泽', '盖德·穆勒'], answer: 1, explanation: '方丹在 1958 年世界杯打进 13 球，纪录至今未破。' },
      { id: 'medium-2', question: '1998 年世界杯决赛，法国击败了哪支球队？', options: ['巴西', '意大利', '德国', '阿根廷'], answer: 0, explanation: '法国 3:0 击败巴西，首次夺得世界杯。' },
      { id: 'medium-3', question: '2002 年世界杯由哪两个国家共同举办？', options: ['美国和加拿大', '韩国和日本', '德国和法国', '葡萄牙和西班牙'], answer: 1, explanation: '2002 年世界杯由韩国和日本联合举办。' },
      { id: 'medium-4', question: '世界杯历史总进球数最多的球员是谁？', options: ['贝利', '梅西', '克洛泽', 'C 罗'], answer: 2, explanation: '德国前锋克洛泽世界杯总进球数为 16 球。' },
      { id: 'medium-5', question: '2014 年世界杯决赛唯一进球者是谁？', options: ['托马斯·穆勒', '梅西', '马里奥·格策', '克罗斯'], answer: 2, explanation: '格策加时破门，德国 1:0 击败阿根廷。' },
      { id: 'medium-6', question: '1966 年世界杯冠军英格兰在决赛击败了谁？', options: ['西德', '葡萄牙', '巴西', '苏联'], answer: 0, explanation: '英格兰在温布利加时 4:2 击败西德。' },
      { id: 'medium-7', question: '2018 年世界杯决赛比分是？', options: ['法国 4:2 克罗地亚', '法国 2:0 克罗地亚', '克罗地亚 2:1 法国', '法国 3:3 克罗地亚'], answer: 0, explanation: '法国 4:2 击败克罗地亚，拿到队史第二冠。' },
      { id: 'medium-8', question: '2010 年世界杯官方用球常被球迷称为什么？', options: ['团队之星', '普天同庆', '飞火流星', '桑巴荣耀'], answer: 1, explanation: '2010 年南非世界杯官方用球中文常称“普天同庆”。' },
      { id: 'medium-9', question: '2006 年世界杯决赛齐达内被罚下的事件发生在对阵哪队？', options: ['德国', '巴西', '意大利', '葡萄牙'], answer: 2, explanation: '2006 年法国与意大利决赛中，齐达内加时被红牌罚下。' }
    ]
  },
  hard: {
    name: '传奇考古局',
    vibe: '纪录冷门，考古开挖。',
    description: '纪录、赛制和早期历史。',
    badge: 'VAR 预言家',
    accent: '#ff6b6b',
    challengeCount: 7,
    questions: [
      { id: 'hard-1', question: '1950 年世界杯决定冠军的关键战常被称为什么？', options: ['伯尔尼奇迹', '马拉卡纳打击', '世纪之战', '温布利之夜'], answer: 1, explanation: '乌拉圭在马拉卡纳击败巴西夺冠，这场比赛被称为“马拉卡纳打击”。' },
      { id: 'hard-2', question: '哪两支球队曾实现世界杯连续两届夺冠？', options: ['巴西和意大利', '德国和阿根廷', '法国和乌拉圭', '英格兰和西班牙'], answer: 0, explanation: '意大利 1934、1938 连冠；巴西 1958、1962 连冠。' },
      { id: 'hard-3', question: '世界杯单场总进球数最高的比赛是哪场？', options: ['巴西 7:1 德国', '奥地利 7:5 瑞士', '匈牙利 10:1 萨尔瓦多', '法国 4:3 阿根廷'], answer: 1, explanation: '1954 年奥地利 7:5 瑞士共 12 球，是世界杯单场总进球纪录。' },
      { id: 'hard-4', question: '2026 年世界杯将扩军到多少支球队？', options: ['32 支', '40 支', '48 支', '64 支'], answer: 2, explanation: '2026 年世界杯首次扩军至 48 队。' },
      { id: 'hard-5', question: '唯一参加过全部男足世界杯正赛的国家队是？', options: ['德国', '意大利', '阿根廷', '巴西'], answer: 3, explanation: '巴西是唯一从 1930 年至今每届都参赛的球队。' },
      { id: 'hard-6', question: '1986 年世界杯决赛举办城市是哪里？', options: ['布宜诺斯艾利斯', '墨西哥城', '罗马', '马德里'], answer: 1, explanation: '1986 年决赛在墨西哥城阿兹特克体育场举行。' },
      { id: 'hard-7', question: '德国队（含西德）截至 2022 年共进入过几次世界杯决赛？', options: ['6 次', '7 次', '8 次', '9 次'], answer: 2, explanation: '德国队（含西德）共 8 次进入世界杯决赛。' },
      { id: 'hard-8', question: '“伯尔尼奇迹”对应的是哪届世界杯决赛？', options: ['1950 年', '1954 年', '1958 年', '1962 年'], answer: 1, explanation: '1954 年西德在伯尔尼击败匈牙利，被称为“伯尔尼奇迹”。' },
      { id: 'hard-9', question: '1994 年世界杯决赛中，意大利哪位球星罚丢关键点球？', options: ['巴乔', '马尔蒂尼', '巴雷西', '托蒂'], answer: 0, explanation: '罗伯特·巴乔点球高出，巴西夺冠。' }
    ]
  },
  nightmare: {
    name: '球史怪物局',
    vibe: '冷知识压迫感拉满。',
    description: '资深球迷挑战。',
    badge: '冷门百科人柱力',
    accent: '#b06cff',
    challengeCount: 8,
    questions: [
      { id: 'night-1', question: '1934 年世界杯首次引入了哪类赛制特征？', options: ['小组循环赛', '全程淘汰赛', '金球制', '主客场两回合'], answer: 1, explanation: '1934 年世界杯采用全程淘汰赛形式，与 1930 年小组加淘汰不同。' },
      { id: 'night-2', question: '1938 年世界杯冠军意大利队的主教练是谁？', options: ['波佐', '埃雷拉', '贝阿尔佐特', '萨基'], answer: 0, explanation: '维托里奥·波佐率意大利 1934、1938 连续夺冠。' },
      { id: 'night-3', question: '1958 年世界杯决赛中，巴西击败瑞典的比分是？', options: ['2:1', '3:1', '4:2', '5:2'], answer: 3, explanation: '巴西 5:2 击败瑞典，贝利在决赛梅开二度。' },
      { id: 'night-4', question: '1974 年世界杯决赛，西德开场先被哪位荷兰球员点球破门？', options: ['克鲁伊夫', '内斯肯斯', '伦森布林克', '克洛尔'], answer: 1, explanation: '内斯肯斯开场点球命中，但西德最终 2:1 逆转荷兰。' },
      { id: 'night-5', question: '1982 年世界杯“保罗·罗西帽子戏法”淘汰巴西发生在哪个阶段？', options: ['小组第一阶段', '第二阶段小组赛', '半决赛', '决赛'], answer: 1, explanation: '1982 年特殊赛制下，意大利在第二阶段小组赛 3:2 击败巴西。' },
      { id: 'night-6', question: '1990 年世界杯决赛唯一进球来自什么方式？', options: ['头球', '远射', '点球', '乌龙球'], answer: 2, explanation: '布雷默点球破门，西德 1:0 击败阿根廷。' },
      { id: 'night-7', question: '2002 年世界杯土耳其获得第几名？', options: ['第 2 名', '第 3 名', '第 4 名', '第 8 名'], answer: 1, explanation: '土耳其击败韩国获得 2002 年世界杯季军。' },
      { id: 'night-8', question: '2010 年世界杯半决赛，西班牙 1:0 德国的进球者是谁？', options: ['普约尔', '伊涅斯塔', '比利亚', '哈维'], answer: 0, explanation: '普约尔头球破门，西班牙晋级决赛。' },
      { id: 'night-9', question: '2014 年世界杯德国 7:1 巴西的半场比分是？', options: ['2:0', '3:0', '4:0', '5:0'], answer: 3, explanation: '德国半场已经 5:0 领先巴西。' },
      { id: 'night-10', question: '2022 年世界杯摩洛哥成为首支进入四强的哪一区域球队？', options: ['亚洲', '非洲', '中北美及加勒比', '大洋洲'], answer: 1, explanation: '摩洛哥成为首支打进世界杯四强的非洲球队。' },
      { id: 'night-11', question: '1962 年世界杯决赛巴西击败的是哪支球队？', options: ['捷克斯洛伐克', '匈牙利', '意大利', '英格兰'], answer: 0, explanation: '巴西 3:1 击败捷克斯洛伐克，实现两连冠。' },
      { id: 'night-12', question: '1978 年世界杯决赛阿根廷击败荷兰，比赛进入加时前常规时间比分是？', options: ['0:0', '1:1', '2:2', '2:1'], answer: 1, explanation: '常规时间 1:1，阿根廷加时连入两球 3:1 夺冠。' }
    ]
  }
}

const archetypes = [
  { code: 'S', name: '神棍预言家', slogan: '你不是猜答案，你是在给历史剧透。' },
  { code: 'B', name: '板凳司令', slogan: '朋友圈排兵布阵第一名，上场另说。' },
  { code: 'T', name: '铁血考古人', slogan: '别人看集锦，你看 1954 年赛制。' },
  { code: 'I', name: '阴阳怪气型门将', slogan: '扑不出点球，但能扑灭全场自信。' }
]

function shuffle(array) {
  const copy = array.slice()
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function shuffleOptions(question) {
  const indexed = question.options.map((text, index) => ({ text, index }))
  const shuffled = shuffle(indexed)
  return {
    ...question,
    options: shuffled.map((item) => item.text),
    answer: shuffled.findIndex((item) => item.index === question.answer)
  }
}

function getRecentIds(difficulty) {
  if (typeof wx === 'undefined') return []
  return wx.getStorageSync(`recent_questions_${difficulty}`) || []
}

function setRecentIds(difficulty, ids) {
  if (typeof wx !== 'undefined') wx.setStorageSync(`recent_questions_${difficulty}`, ids.slice(-18))
}

function getDifficultyList() {
  return Object.keys(questionBank).map((key) => ({
    key,
    name: questionBank[key].name,
    vibe: questionBank[key].vibe,
    description: questionBank[key].description,
    badge: questionBank[key].badge,
    count: questionBank[key].challengeCount,
    poolCount: questionBank[key].questions.length,
    accent: questionBank[key].accent
  }))
}

function getQuizSession(difficulty) {
  const quiz = questionBank[difficulty] || questionBank.easy
  const recent = getRecentIds(difficulty)
  let pool = quiz.questions.filter((item) => !recent.includes(item.id))
  if (pool.length < quiz.challengeCount) pool = quiz.questions
  const selected = shuffle(pool).slice(0, quiz.challengeCount).map(shuffleOptions)
  setRecentIds(difficulty, selected.map((item) => item.id))
  return { ...quiz, questions: selected }
}

function getArchetype(seed) {
  return archetypes[Math.abs(Number(seed || 0)) % archetypes.length]
}

module.exports = { questionBank, getDifficultyList, getQuizSession, getArchetype }
