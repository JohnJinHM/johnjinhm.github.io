import type { Route } from './routes'

export type Experience = {
  role: string
  org: string
  /** Display text, e.g. '2024 — 2025'. */
  period: string
  /** 'YYYY' or 'YYYY-MM'. Places the role on the home-page timeline. */
  start: string
  /** 'YYYY' or 'YYYY-MM' (inclusive); omit for a current role. */
  end?: string
  highlights: string[]
}

export const experiences: Record<Route, Experience[]> = {
  official: [
    {
      role: 'Software Engineer',
      org: 'Blaze Edu LLC',
      period: '2026 - ',
      start: '2026',
      highlights: ['Full-stack developer', 'TypeScript, PostgresSQL'],
    },
    {
      role: 'Software Engineer',
      org: 'Hedracam',
      period: '2024 — 2025',
      start: '2024',
      end: '2025',
      highlights: ['Cross-platform integration, graphics interface', 'C++, C#'],
    },
    {
      role: 'Leadership Member',
      org: 'Interactive Intelligence @ UW',
      period: '2025 — 2026',
      start: '2025',
      end: '2026',
      highlights: ['I2 Fellows TA, Research Room member'],
    },
  ],
  casual: [
    {
      role: 'Placeholder Side Project',
      org: 'Personal',
      period: '2025',
      start: '2025',
      end: '2025',
      highlights: ['Replace this with a hobby, side project, or anything you tinker with.'],
    },
    {
      role: 'Placeholder Interest',
      org: 'Off the clock',
      period: 'Ongoing',
      start: '2025',
      highlights: ['Replace this with something you enjoy outside of work.'],
    },
  ],
}
