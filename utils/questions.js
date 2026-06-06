const questionBank = {
  easy: {
    name: '球迷入门',
    description: '适合刚开始了解世界杯的用户，聚焦冠军、年份和基础常识。',
    badge: '新晋球迷',
    accent: '#08d9d6',
    questions: [
      { id: 'easy-1', question: '截至 2022 年男足世界杯结束，获得世界杯冠军次数最多的国家是哪个？', options: ['巴西', '德国', '阿根廷', '法国'], answer: 0, explanation: '巴西共获得 5 次世界杯冠军，是男足世界杯历史夺冠次数最多的球队。' },
      { id: 'easy-2', question: '第一届男足世界杯于 1930 年在哪个国家举办？', options: ['意大利', '乌拉圭', '巴西', '英格兰'], answer: 1, explanation: '1930 年第一届男足世界杯在乌拉圭举办，东道主乌拉圭最终夺冠。' },
      { id: 'easy-3', question: '2022 年卡塔尔世界杯冠军是哪支球队？', options: ['法国', '克罗地亚', '阿根廷', '巴西'], answer: 2, explanation: '阿根廷在 2022 年决赛中通过点球大战击败法国，获得队史第三座世界杯冠军。' },
      { id: 'easy-4', question: '通常情况下，男足世界杯每隔几年举办一次？', options: ['2 年', '3 年', '4 年', '5 年'], answer: 2, explanation: '男足世界杯通常每四年举办一次，1942 年和 1946 年因第二次世界大战停办。' },
      { id: 'easy-5', question: '2010 年南非世界杯冠军是哪支球队？', options: ['荷兰', '西班牙', '德国', '意大利'], answer: 1, explanation: '西班牙在 2010 年决赛中加时 1:0 击败荷兰，首次获得世界杯冠军。' }
    ]
  },
  medium: {
    name: '战术观察家',
    description: '适合熟悉世界杯主要历史节点的球迷，包含经典决赛、金靴和主办地。',
    badge: '战术观察家',
    accent: '#f6c453',
    questions: [
      { id: 'medium-1', question: '哪位球员保持着单届男足世界杯进球最多的纪录？', options: ['罗纳尔多', '方丹', '克洛泽', '盖德·穆勒'], answer: 1, explanation: '法国球员朱斯特·方丹在 1958 年世界杯打入 13 球，保持单届进球纪录。' },
      { id: 'medium-2', question: '1998 年法国世界杯决赛，法国队击败了哪支球队夺冠？', options: ['巴西', '意大利', '德国', '阿根廷'], answer: 0, explanation: '法国在 1998 年决赛中 3:0 击败巴西，首次获得世界杯冠军。' },
      { id: 'medium-3', question: '2002 年世界杯由哪两个国家共同举办？', options: ['美国和加拿大', '日本和韩国', '德国和法国', '葡萄牙和西班牙'], answer: 1, explanation: '2002 年世界杯由韩国和日本共同举办，这是世界杯首次由两个国家联合承办。' },
      { id: 'medium-4', question: '世界杯历史总进球数最多的球员是谁？', options: ['贝利', '梅西', '克洛泽', 'C 罗'], answer: 2, explanation: '德国前锋米洛斯拉夫·克洛泽在世界杯历史上共打入 16 球。' },
      { id: 'medium-5', question: '2014 年巴西世界杯决赛的唯一进球者是谁？', options: ['托马斯·穆勒', '梅西', '马里奥·格策', '克罗斯'], answer: 2, explanation: '马里奥·格策在加时赛破门，帮助德国 1:0 击败阿根廷。' },
      { id: 'medium-6', question: '1966 年世界杯冠军英格兰队是在决赛中击败了哪支球队？', options: ['西德', '葡萄牙', '巴西', '苏联'], answer: 0, explanation: '英格兰在温布利球场通过加时赛 4:2 击败西德夺冠。' }
    ]
  },
  hard: {
    name: '传奇考古家',
    description: '面向资深世界杯爱好者，覆盖冷门赛制、纪录和早期历史。',
    badge: '传奇考古家',
    accent: '#ff6b6b',
    questions: [
      { id: 'hard-1', question: '1950 年世界杯没有传统意义上的决赛，最终决定冠军归属的关键战常被称为什么？', options: ['伯尔尼奇迹', '马拉卡纳打击', '世纪之战', '温布利之夜'], answer: 1, explanation: '乌拉圭在马拉卡纳球场击败巴西夺冠，这场比赛被称为“马拉卡纳打击”。' },
      { id: 'hard-2', question: '哪两支球队曾实现男足世界杯连续两届夺冠？', options: ['巴西和意大利', '德国和阿根廷', '法国和乌拉圭', '英格兰和西班牙'], answer: 0, explanation: '意大利在 1934、1938 年连冠，巴西在 1958、1962 年连冠。' },
      { id: 'hard-3', question: '男足世界杯历史上单场总进球数最高的比赛是哪一场？', options: ['巴西 7:1 德国', '奥地利 7:5 瑞士', '匈牙利 10:1 萨尔瓦多', '法国 4:3 阿根廷'], answer: 1, explanation: '1954 年奥地利 7:5 瑞士的比赛共打入 12 球，是男足世界杯历史单场总进球数最高的比赛。' },
      { id: 'hard-4', question: '2026 年世界杯将首次扩军到多少支参赛球队？', options: ['32 支', '40 支', '48 支', '64 支'], answer: 2, explanation: '2026 年世界杯将由 48 支球队参加，并由美国、加拿大、墨西哥共同举办。' },
      { id: 'hard-5', question: '截至 2022 年，唯一参加过全部男足世界杯正赛的国家队是？', options: ['德国', '意大利', '阿根廷', '巴西'], answer: 3, explanation: '巴西是唯一参加过全部男足世界杯正赛的国家队。' },
      { id: 'hard-6', question: '1986 年世界杯决赛的举办城市是哪里？', options: ['布宜诺斯艾利斯', '墨西哥城', '罗马', '马德里'], answer: 1, explanation: '1986 年世界杯决赛在墨西哥城阿兹特克体育场举行，阿根廷 3:2 击败西德。' },
      { id: 'hard-7', question: '男足世界杯历史上，德国队（含西德）共进入过几次决赛？', options: ['6 次', '7 次', '8 次', '9 次'], answer: 2, explanation: '德国队（含西德）共 8 次进入男足世界杯决赛，是进入决赛次数最多的球队。' }
    ]
  }
}

function getDifficultyList() {
  return Object.keys(questionBank).map((key) => ({
    key,
    name: questionBank[key].name,
    description: questionBank[key].description,
    badge: questionBank[key].badge,
    count: questionBank[key].questions.length,
    accent: questionBank[key].accent
  }))
}

function getQuiz(difficulty) {
  return questionBank[difficulty] || questionBank.easy
}

module.exports = {
  questionBank,
  getDifficultyList,
  getQuiz
}
