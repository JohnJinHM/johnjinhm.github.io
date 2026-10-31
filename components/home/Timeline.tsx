'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import type { Experience } from '@/data/experiences'

// 'YYYY' or 'YYYY-MM' as a fractional year; `end` makes the date inclusive.
function toYear(value: string, end = false) {
  const [year, month] = value.split('-').map(Number)
  if (!month) return year + (end ? 1 : 0)
  return year + (month - (end ? 0 : 1)) / 12
}

function nowYear() {
  const d = new Date()
  return d.getFullYear() + (d.getMonth() + 1) / 12
}

const pct = (v: number) => `${(v * 100).toFixed(2)}%`

interface Props {
  experiences: Experience[]
  label: string
  presentLabel: string
}

/**
 * Experiences on a year axis. Desktop: spans along a horizontal axis with labels
 * stepped above. Small screens: a vertical list, current role first. Styles in
 * css/tailwind.css (.timeline).
 */
export default function Timeline({ experiences, label, presentLabel }: Props) {
  // "Now" is measured in the browser, not at build time, so current spans stay
  // true between deploys. Until then they render at zero width and grow in.
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => setNow(nowYear()), [])

  if (experiences.length === 0) return null
  const items = experiences
    .map((exp) => {
      const from = toYear(exp.start)
      return {
        exp,
        from,
        to: exp.end ? toYear(exp.end, true) : (now ?? from),
        current: !exp.end,
      }
    })
    .sort((a, b) => a.from - b.from)

  // The axis runs to the end of the current year at least; only the calendar
  // year (not the exact date) affects it, so the layout does not shift on load.
  const min = Math.floor(Math.min(...items.map((i) => i.from)))
  const max = Math.max(
    min + 1,
    new Date().getFullYear() + 1,
    Math.ceil(Math.max(...items.map((i) => i.to)))
  )
  const at = (v: number) => (v - min) / (max - min)
  const years = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <section
      className="timeline"
      aria-label={label}
      style={{ '--rows': items.length } as CSSProperties}
    >
      <ol>
        {items.map(({ exp, from, to, current }, row) => (
          <li
            key={`${exp.role}-${exp.org}-${exp.start}`}
            data-current={current ? '' : undefined}
            data-flip={at(from) > 0.5 ? '' : undefined}
            style={
              { '--start': pct(at(from)), '--end': pct(at(to)), '--row': row } as CSSProperties
            }
          >
            <span className="tl-span" aria-hidden="true" />
            <span className="tl-point" aria-hidden="true" />
            <div className="tl-label">
              <b>
                {exp.role} · {exp.org}
              </b>
              <span>
                {current && exp.period.trim().match(/[-—–]$/)
                  ? `${exp.period.trim()} ${presentLabel}`
                  : exp.period}
                {exp.highlights.length > 0 && ` · ${exp.highlights.join(' · ')}`}
              </span>
            </div>
          </li>
        ))}
      </ol>
      <div className="tl-years" aria-hidden="true">
        {years.map((year) => (
          <span key={year} style={{ left: pct(at(year)) }}>
            {year}
          </span>
        ))}
      </div>
    </section>
  )
}
