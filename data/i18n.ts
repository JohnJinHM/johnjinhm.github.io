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

type NavKey = 'home' | 'blog' | 'photos'

export type UIStrings = {
  nav: Record<NavKey, string>
  switchTo: (label: string) => string
  readMore: string
  allOf: (title: string) => string
  noPosts: string
  publishedOn: string
  localeSwitchLabel: string
}

export const ui: Record<Locale, UIStrings> = {
  en: {
    nav: { home: 'Home', blog: 'Blog', photos: 'Photos' },
    switchTo: (label) => `Switch to ${label}`,
    readMore: 'Read more',
    allOf: (title) => `All ${title}`,
    noPosts: 'No posts found.',
    publishedOn: 'Published on',
    localeSwitchLabel: 'Switch language',
  },
  zh: {
    nav: { home: '主页', blog: '博客', photos: '相册' },
    switchTo: (label) => `切换到${label}`,
    readMore: '阅读全文',
    allOf: (title) => `全部${title}`,
    noPosts: '暂无文章。',
    publishedOn: '发布于',
    localeSwitchLabel: '切换语言',
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
      homeIntro:
        '华盛顿大学（西雅图）本科在读，主修计算机科学与信息学，拥有丰富的软件工程与设计经验。',
      occupation: '软件开发工程师',
      company: "华盛顿大学 Allen School '27",
    },
    casual: {
      name: 'Starfall',
      label: '随笔',
      blogTitle: '随记',
      photosTitle: '快照',
      homeIntro:
        '工作之外，这里存放着我未成形的想法、随手拍下的照片和各种小项目——用更轻松的视角记录我平时的乐趣。',
      occupation: '内容创作者',
      company: '占位公司',
    },
  },
}

export const localizedExperiences: Record<Locale, Record<Route, Experience[]>> = {
  en: experiences,
  zh: {
    official: [
      {
        role: '软件工程师',
        org: 'Blaze Edu LLC',
        period: '2026 - ',
        highlights: ['全栈开发', 'TypeScript、PostgreSQL'],
      },
      {
        role: '软件工程师',
        org: 'Hedracam',
        period: '2024 — 2025',
        highlights: ['跨平台集成与图形界面开发', 'C++、C#'],
      },
      {
        role: '核心成员',
        org: 'Interactive Intelligence @ UW',
        period: '2025 — 2026',
        highlights: ['I2 Fellows 助教，Research Room 成员'],
      },
    ],
    casual: [
      {
        role: '占位side project',
        org: '个人',
        period: '2025',
        highlights: ['替换为你的爱好、side project 或任何折腾的东西。'],
      },
      {
        role: '占位兴趣',
        org: '业余时间',
        period: '进行中',
        highlights: ['替换为你工作之外喜欢做的事情。'],
      },
    ],
  },
}
