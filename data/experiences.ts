import type { Route } from './routes'

export type Experience = {
  role: string
  org: string
  period: string
  highlights: string[]
}

export const experiences: Record<Route, Experience[]> = {
  official: [
    {
      role: 'Software Engineer',
      org: 'Blaze Edu LLC',
      period: '2026 - ',
      highlights: [
        'Full-stack developer',
        'TypeScript, PostgresSQL',
      ],
    },
    {
      role: 'Software Engineer',
      org: 'Hedracam',
      period: '2024 — 2025',
      highlights: [
        'Cross-platform integration, graphics interface',
        'C++, C#',
      ],
    },
    {
      role: 'Leadership Member',
      org: 'Interactive Intelligence @ UW',
      period: '2025 — 2026',
      highlights: ["I2 Fellows TA, Research Room member"],
    },
  ],
  casual: [
    {
      role: 'Placeholder Side Project',
      org: 'Personal',
      period: '2025',
      highlights: ['Replace this with a hobby, side project, or anything you tinker with.'],
    },
    {
      role: 'Placeholder Interest',
      org: 'Off the clock',
      period: 'Ongoing',
      highlights: ['Replace this with something you enjoy outside of work.'],
    },
  ],
}
