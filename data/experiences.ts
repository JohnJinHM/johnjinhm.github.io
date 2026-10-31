import type { Route } from './routes'

export type ExperienceId = 'i2-program' | 'ignite' | 'i2-fellows' | 'i2-team' | 'trustrobot'

export type Experience = {
  id: ExperienceId
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
      id: 'i2-program',
      role: 'Research Room Program Co-Lead',
      org: 'UW Interactive Intelligence (I2)',
      period: 'September 2026 — Present',
      start: '2026-09',
      highlights: [],
    },
    {
      id: 'ignite',
      role: 'Software Engineer Intern',
      org: 'Ignite Robotics',
      period: 'June — September 2026',
      start: '2026-06',
      end: '2026-09',
      highlights: [],
    },
    {
      id: 'i2-fellows',
      role: 'Fellows Teaching Assistant',
      org: 'UW Interactive Intelligence (I2)',
      period: 'January — May 2026',
      start: '2026-01',
      end: '2026-05',
      highlights: [],
    },
    {
      id: 'i2-team',
      role: 'Research Room Team Lead',
      org: 'UW Interactive Intelligence (I2)',
      period: 'January — March 2025',
      start: '2025-01',
      end: '2025-03',
      highlights: [],
    },
    {
      id: 'trustrobot',
      role: 'Software Engineer Intern',
      org: 'Trustrobot Co., Ltd.',
      period: 'June 2024 — September 2025',
      start: '2024-06',
      end: '2025-09',
      highlights: [],
    },
  ],
  casual: [],
}
