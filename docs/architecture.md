# 世界杯答题互动微信小程序架构设计

作者：**Manus AI**

## 一、产品目标

本项目采用**原生微信小程序**实现一个可运行的世界杯答题互动原型。核心体验是用户进入首页后选择不同难度，完成一组世界杯知识题；若全部答对，则进入证书页面生成专属证书图片。项目第一版不依赖后端服务，题库以本地静态数据形式内置，证书通过小程序 Canvas 在端上绘制，从而降低注册和运行门槛。

## 二、页面结构

| 页面 | 路径 | 核心职责 | 关键交互 |
| --- | --- | --- | --- |
| 首页/难度选择 | `pages/index/index` | 展示产品氛围、难度卡片与规则说明 | 选择“球迷入门”“战术观察家”“传奇考古家”进入答题 |
| 答题页 | `pages/quiz/quiz` | 按难度加载题目、展示进度、判断正误、显示解释 | 单选答题、即时反馈、下一题、失败重来、全对进入证书 |
| 证书页 | `pages/certificate/certificate` | 根据难度、成绩和时间绘制证书 | Canvas 生成证书、保存到相册、返回首页 |

## 三、目录结构

| 目录/文件 | 说明 |
| --- | --- |
| `app.js`、`app.json`、`app.wxss` | 小程序全局入口、路由配置和全局样式 |
| `project.config.json` | 微信开发者工具项目配置，默认使用测试 AppID 占位 |
| `pages/index/*` | 首页 WXML/WXSS/JS/JSON |
| `pages/quiz/*` | 答题页 WXML/WXSS/JS/JSON |
| `pages/certificate/*` | 证书页 WXML/WXSS/JS/JSON |
| `utils/questions.js` | 三档难度题库，包含题目、选项、答案和解析 |
| `docs/registration-and-run.md` | 微信小程序注册、AppID 与本地运行说明 |

## 四、核心数据结构

题库按难度分组，每道题包含 `id`、`question`、`options`、`answer` 和 `explanation`。`answer` 使用选项数组的下标，便于页面中直接比较用户选择。

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| `name` | String | 难度展示名称 |
| `description` | String | 难度说明 |
| `badge` | String | 全对后证书上的称号 |
| `questions` | Array | 当前难度题目列表 |

## 五、交互流程

用户首先在首页选择难度，小程序将难度 key 通过路由参数传入答题页。答题页根据参数加载对应题目，并维护当前题序、得分、用户选择和反馈状态。用户选中答案后立即展示正确或错误反馈，并展示解析。如果答错，则提供“重新挑战”入口；如果全部答对，则跳转到证书页。证书页读取难度、题量和称号信息，使用 Canvas 绘制一张带世界杯视觉元素的证书图片，并支持保存到系统相册。

## 六、技术边界

第一版为**可运行原型**，不引入微信登录、云开发、支付、分享海报服务端生成等能力。这样做可以确保开发者只需微信开发者工具即可打开、编译和预览。后续如果需要排行榜、用户成长体系、题库运营后台或 AI 动态出题，可再接入微信云开发或自有后端。

## References

[1]: https://developers.weixin.qq.com/miniprogram/dev/framework/ "微信小程序开发指南"
[2]: https://developers.weixin.qq.com/miniprogram/introduction/ "微信小程序产品定位及功能介绍"
