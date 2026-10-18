import type { Project, ProjectSlug } from '../data/projects'

/**
 * 全站中文文案的唯一维护文件。
 * 后续新增页面翻译时，在这里添加对应分区，页面只引用文案，不内嵌中文。
 * 姓名、项目名、Hi! 和页脚英文大标题按要求保留英文。
 */
export const zh = {
  language: { label: '网站语言', name: '中文' },
  common: {
    skipToContent: '跳转到正文',
    viewCaseStudy: '查看项目案例',
    caseStudyLabel: (name: string) => `查看 ${name} 项目案例`,
  },
  navigation: {
    work: '作品', about: '关于', contact: '联系',
    primaryLabel: '主导航', homeLabel: 'Jiaming Zhang，首页', menuLabel: '主菜单',
    openMenu: '打开菜单', closeMenu: '关闭菜单', mobileMenu: '手机菜单',
    location: '澳大利亚 · 墨尔本',
  },
  hero: {
    locations: ['中国 · 深圳', '澳大利亚 · 墨尔本'],
    headline: '以设计连接人与产品和系统，创造有意义的互动体验。',
    portraitAlt: 'Jiaming Zhang 身穿毕业礼服，怀抱泰迪熊',
    intro: 'Hi! 我是墨尔本大学用户体验设计专业的学生，热衷于通过交互、系统与游戏，打造数字与实体体验。',
    keywords: ['产品', '服务', '人工智能', '交互', '体验'],
    designing: '设计领域', exploreWork: '探索作品', scrollLabel: '向下浏览精选作品',
  },
  home: {
    graduationProject: '毕业设计',
    featuredSummary: '一个以研究为基础的同伴支持平台，帮助初入大学的国际学生找到契合自身需求的社群与经过认证的高年级导师。',
    selectedLabel: '以设计贯通界面、系统与服务',
    selectedHeading: ['以设计贯通', '界面、', '系统', '与服务。'],
    selectedIntro: '这些精选项目探索如何通过研究、交互与视觉系统，让复杂的体验清晰易懂，并真正以人为本。',
  },
  footer: { email: '邮件', linkedIn: '领英', role: '用户体验／产品设计师', backToTop: '回到顶部' },
  mascot: { label: '让像素小人飞行五秒，然后回到右上角', title: '碰我一下，飞 5 秒！' },
}

export const chineseProjects: Record<ProjectSlug, Pick<Project, 'summary' | 'categories'>> = {
  unilink: {
    summary: '一个以研究为基础的同伴支持平台，帮助国际学生找到契合自身需求的社群与经过认证的高年级导师。',
    categories: ['用户体验研究', '产品设计', '服务设计'],
  },
  boardgamemate: {
    summary: '一个面向桌游玩家的社交平台，帮助玩家找到合拍的伙伴与社群。',
    categories: ['数字产品设计', '用户体验研究'],
  },
  furniture: {
    summary: '一次端到端的家具电商体验重设计——从界面评估、Figma 设计系统，到以代码实现完整的响应式购物体验。',
    categories: ['界面与用户体验设计', '响应式电商', 'React 前端开发'],
  },
  culturelens: {
    summary: '一个融合沉浸式技术与对话式人工智能的未来博物馆服务概念，为参观者打造个性化的参观旅程。',
    categories: ['服务设计', '对话式人工智能', '未来体验'],
  },
  crownlands: {
    summary: '一款围绕领土、协商与实体互动展开的中世纪策略桌游。',
    categories: ['游戏设计', '实体交互', '数字化开发'],
  },
}

export const chineseCoverDescriptions: Record<ProjectSlug, string> = {
  unilink: 'UniLink 同伴支持平台项目封面，包含人工智能生成图像的说明',
  boardgamemate: 'BoardGameMate 社交桌游助手应用项目封面',
  furniture: 'My Furniture Store 家具电商网站重设计项目封面',
  culturelens: 'CultureLens Concierge 个性化博物馆旅程项目封面，包含人工智能生成图像的说明',
  crownlands: 'Crownlands 实体策略桌游及浏览器游戏项目封面，包含人工智能生成图像的说明',
}
