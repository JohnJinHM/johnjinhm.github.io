import type { Route } from './routes'
import { routeMeta } from './routes'
import type { Experience } from './experiences'
import { experiences } from './experiences'

export const locales = ['en', 'zh'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function localeFromNavigator(languages: readonly string[]): Locale {
  for (const lang of languages) {
    const base = lang.toLowerCase().split('-')[0]
    if (isLocale(base)) return base
  }
  return defaultLocale
}

export const dateLocale: Record<Locale, string> = {
  en: 'en-US',
  zh: 'zh-CN',
}

type NavKey = 'home' | 'experience' | 'blog' | 'photos' | 'tags'

export type UIStrings = {
  nav: Record<NavKey, string>
  switchTo: (label: string) => string
  readMore: string
  allOf: (title: string) => string
  noPosts: string
  publishedOn: string
  localeSwitchLabel: string
  search: string
  openMenu: string
  closeMenu: string
  experience: string
  present: string
}

export const ui: Record<Locale, UIStrings> = {
  en: {
    nav: { home: 'Home', experience: 'Experience', blog: 'Blog', photos: 'Photos', tags: 'Tags' },
    switchTo: (label) => `Switch to ${label}`,
    readMore: 'Read more',
    allOf: (title) => `All ${title}`,
    noPosts: 'No posts found.',
    publishedOn: 'Published on',
    localeSwitchLabel: 'Switch language',
    search: 'Search',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    experience: 'Experience',
    present: 'now',
  },
  zh: {
    nav: { home: '主页', experience: '经历', blog: '博客', photos: '相册', tags: '标签' },
    switchTo: (label) => `切换到${label}`,
    readMore: '阅读全文',
    allOf: (title) => `全部${title}`,
    noPosts: '暂无文章。',
    publishedOn: '发布于',
    localeSwitchLabel: '切换语言',
    search: '搜索',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    experience: '经历',
    present: '至今',
  },
}

export type RouteText = {
  name: string
  label: string
  blogTitle: string
  photosTitle: string
  homeIntro: string
  occupation: string
  company: string
}

function routeTextFromMeta(route: Route): RouteText {
  const { name, label, blogTitle, photosTitle, homeIntro, occupation, company } = routeMeta[route]
  return { name, label, blogTitle, photosTitle, homeIntro, occupation, company }
}

export const routeText: Record<Locale, Record<Route, RouteText>> = {
  en: {
    official: routeTextFromMeta('official'),
    casual: routeTextFromMeta('casual'),
  },
  zh: {
    official: {
      name: 'John Jin',
      label: '官方',
      blogTitle: '文章',
      photosTitle: '摄影',
      homeIntro: '华盛顿大学计算机科学本科在读，辅修信息学，关注软件工程、全栈开发与 AI 应用。',
      occupation: '计算机科学本科生',
      company: '华盛顿大学 · 预计 2027 年 3 月毕业',
    },
    casual: {
      name: 'Starfall',
      label: '随笔',
      blogTitle: '随记',
      photosTitle: '快照',
      homeIntro:
        '工作之外，这里存放着我未成形的想法、随手拍下的照片和各种小项目——用更轻松的视角记录我平时的乐趣。',
      occupation: '内容创作者',
      company: '',
    },
  },
}

export const localizedExperiences: Record<Locale, Record<Route, Experience[]>> = {
  en: experiences,
  zh: {
    official: [
      {
        id: 'i2-program',
        role: 'Research Room 项目联合负责人',
        org: 'UW Interactive Intelligence（I2）',
        period: '2026 年 9 月 — 至今',
        start: '2026-09',
        highlights: [],
      },
      {
        id: 'ignite',
        role: '软件工程实习生',
        org: 'Ignite Robotics',
        period: '2026 年 6 月 — 9 月',
        start: '2026-06',
        end: '2026-09',
        highlights: [],
      },
      {
        id: 'i2-fellows',
        role: 'Fellows 助教',
        org: 'UW Interactive Intelligence（I2）',
        period: '2026 年 1 月 — 5 月',
        start: '2026-01',
        end: '2026-05',
        highlights: [],
      },
      {
        id: 'i2-team',
        role: 'Research Room 小组负责人',
        org: 'UW Interactive Intelligence（I2）',
        period: '2025 年 1 月 — 3 月',
        start: '2025-01',
        end: '2025-03',
        highlights: [],
      },
      {
        id: 'trustrobot',
        role: '软件工程实习生',
        org: 'Trustrobot Co., Ltd.',
        period: '2024 年 6 月 — 2025 年 9 月',
        start: '2024-06',
        end: '2025-09',
        highlights: [],
      },
    ],
    casual: [],
  },
}
