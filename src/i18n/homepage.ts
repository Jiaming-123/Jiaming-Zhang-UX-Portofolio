import type { Project } from '../data/projects'
import type { Language } from './language-context'

import { chineseProjects } from './中文版'
export { chineseCoverDescriptions } from './中文版'

export function localizeHomepageProject(project: Project, language: Language): Project {
  return language === 'zh' ? { ...project, ...chineseProjects[project.slug] } : project
}
