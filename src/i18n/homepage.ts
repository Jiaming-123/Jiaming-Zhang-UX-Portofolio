import type { Project, ProjectSlug } from '../data/projects'
import type { Language } from './language-context'

// First translation pass: homepage and shared navigation / footer.
// Project names and the designer's name are intentionally not translated.
const chineseProjects: Record<ProjectSlug, Pick<Project, 'summary' | 'categories'>> = {
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

export function localizeHomepageProject(project: Project, language: Language): Project {
  return language === 'zh' ? { ...project, ...chineseProjects[project.slug] } : project
}
