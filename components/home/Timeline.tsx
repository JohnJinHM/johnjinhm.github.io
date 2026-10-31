'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
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

// Vertical gap between rows that collide horizontally, and the horizontal
// clearance two rows need before one may rise beside the other (px).
const ROW_GAP = 8
const CLEARANCE = 16

type Packing = { tops: number[]; height: number }

/**
 * Places rows top to bottom, each as high as it can go without its label or
 * span sharing horizontal space with a row already above it.
 */
function pack(list: HTMLOListElement, spans: [number, number][]): Packing {
  const box = list.getBoundingClientRect()
  const placed: { left: number; right: number; bottom: number }[] = []
  const tops = Array.from(list.children, (li, i) => {
    const label = li.querySelector('.tl-label')!.getBoundingClientRect()
    const left = Math.min(label.left - box.left, spans[i][0] * box.width)
    const right = Math.max(label.right - box.left, spans[i][1] * box.width)
    const top = placed
      .filter((p) => p.left < right + CLEARANCE && left < p.right + CLEARANCE)
      .reduce((y, p) => Math.max(y, p.bottom + ROW_GAP), 0)
    placed.push({ left, right, bottom: top + (li as HTMLElement).offsetHeight })
    return top
  })
  return { tops, height: Math.max(...placed.map((p) => p.bottom)) }
}

interface Props {
  experiences: Experience[]
  label: string
  presentLabel: string
}

/**
 * Experiences on a year axis. Desktop: one lane per role, newest on top, each
 * with its span and a label above it. Small screens: a vertical list, current
 * role first. Styles in css/tailwind.css (.timeline).
 */
export default function Timeline({ experiences, label, presentLabel }: Props) {
  // "Now" is measured in the browser, not at build time, so current spans stay
  // true between deploys. Until then they render at zero width and grow in.
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => setNow(nowYear()), [])

  // Desktop rows share height where their content does not meet. Measured in
  // the browser; until then (and on small screens) rows simply stack.
  const listRef = useRef<HTMLOListElement>(null)
  const spansRef = useRef<[number, number][]>([])
  const [packing, setPacking] = useState<Packing | null>(null)
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const wide = window.matchMedia('(min-width: 1024px)')
    const update = () => setPacking(wide.matches ? pack(list, spansRef.current) : null)
    const observer = new ResizeObserver(update)
    observer.observe(list)
    list.querySelectorAll('.tl-label').forEach((label) => observer.observe(label))
    wide.addEventListener('change', update)
    return () => {
      observer.disconnect()
      wide.removeEventListener('change', update)
    }
  }, [experiences])

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
    .sort((a, b) => b.from - a.from)

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
  // A current span grows after load, so packing reserves it to the axis end.
  spansRef.current = items.map((i) => [at(i.from), i.current ? 1 : at(i.to)])

  return (
    <section className="timeline" aria-label={label}>
      <ol
        ref={listRef}
        data-packed={packing ? '' : undefined}
        style={packing ? { height: packing.height } : undefined}
      >
        {items.map(({ exp, from, to, current }, row) => (
          <li
            key={`${exp.role}-${exp.org}-${exp.start}`}
            data-current={current ? '' : undefined}
            data-flip={at(from) > 0.5 ? '' : undefined}
            style={
              {
                '--start': pct(at(from)),
                '--end': pct(at(to)),
                // Flipped labels end where the span ends; a current span grows
                // after load, so its label anchors to the axis end instead.
                '--anchor': pct(current ? 1 : at(to)),
                top: packing?.tops[row],
              } as CSSProperties
            }
          >
            <span className="tl-span" aria-hidden="true" />
            <span className="tl-point" aria-hidden="true" />
            <div className="tl-label">
              <b>{exp.role}</b>
              <span className="block">{exp.org}</span>
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
