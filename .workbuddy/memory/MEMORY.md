# Claw 项目长期记忆

## 项目概述
一个星空风格的 H5 网页应用，包含多个模块：
- **主页**：模块入口
- **智慧语录（毛选）**：有两个引导页 + 抽卡展示语录
- **塔罗牌**：选牌特效
- **名人对话**：聊天界面

## 技术栈
- 纯原生 HTML / CSS / JS，无框架
- 本地开发服务器运行在 `http://localhost:8080`

## 设计风格
- 统一黑色星空背景（深蓝紫渐变）
- CSS 变量：`--star-white`, `--star-silver`, `--star-gold`, `--star-bright`
- 星光、流星、漂浮粒子特效（canvas / DOM）

## 已知约定
- 用户偏好：改一个模块时不动其他模块（"其他先不变"）
- 卡片翻转用纯 CSS 3D（`rotateY`），正反面均用 `position:absolute` + `backface-visibility:hidden`
- `.quote-card.hidden` 用 `visibility:hidden`（不能用 `display:none`，否则破坏3D翻转）

## 修复记录（2026-03-28）
- 修复毛选卡片翻牌后内容下移的 bug：
  - 根本原因：`.card-back` 同时有两个 `position`（absolute + relative），`.quote-card.hidden` 用了 `display:none` 破坏3D结构
  - 修复：统一 `position:absolute`，`.hidden` 改为 `visibility:hidden`，`card-display-area` 改为固定高度 `height:480px`，transition 移到 `.card-container` 上
