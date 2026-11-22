'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from './Image'
import { useLocale } from './LocaleProvider'
import { experiencePage } from '@/data/experiencePage'
import { localizedExperiences, routeText, type Locale } from '@/data/i18n'
import { routeFromPathname, routeMeta } from '@/data/routes'
import navLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

type View = 'projects' | 'experience'
type Entry = {
  id: string
  view: View
  title: string
  category: string
  tags: string[]
  subtitle: string
  paragraphs: string[]
  note?: string
  href?: string
  downloadHref?: string
  flow?: string[]
  metric?: string
  metricLabel?: string
}
type DirectoryState = { selected: string; query: string; tag: string }
const initialDirectory: Record<View, DirectoryState> = {
  projects: { selected: 'BA-DeckEditor', query: '', tag: '' },
  experience: { selected: 'i2-program', query: '', tag: '' },
}

function entriesFor(locale: Locale): Entry[] {
  const text = experiencePage[locale]
  const zh = locale === 'zh'
  const projects: Entry[] = text.projects.map((project) => {
    const id = project.href.split('/').pop()!
    const voice = id === 'VLoid'
    const bax = id === 'BAX'
    return {
      id,
      view: 'projects',
      title: project.name,
      category: voice ? (zh ? '语音 AI' : 'Voice AI') : zh ? '游戏工具' : 'Game tools',
      tags: voice ? ['AI', 'Desktop'] : bax ? ['Desktop', 'Data', 'OCR'] : ['Web', 'Data'],
      subtitle: project.stack,
      paragraphs: project.bullets,
      note: project.note,
      href: project.href,
      downloadHref: project.downloadHref,
      flow: voice
        ? zh
          ? ['语音输入', '本地推理', '语音输出']
          : ['Voice input', 'Local inference', 'Speech output']
        : bax
          ? zh
            ? ['识别对局', '实时辅助', '战后分析']
            : ['Track matches', 'Live overlay', 'Review reports']
          : zh
            ? ['提取数据', '规则验证', '构建卡组']
            : ['Extract data', 'Validate rules', 'Build a deck'],
      metric: voice ? 'Local' : bax ? 'Full / Lite' : '16,687',
      metricLabel: voice
        ? zh
          ? '语音与推理'
          : 'VOICE & INFERENCE'
        : bax
          ? zh
            ? 'WINDOWS 版本'
            : 'WINDOWS EDITIONS'
          : zh
            ? '条数据记录'
            : 'DATA RECORDS',
    }
  })
  const roles: Entry[] = localizedExperiences[locale].official.map((role) => {
    const detail = [...text.work, ...text.research].find((item) => item.id === role.id)!
    return {
      id: role.id,
      view: 'experience',
      title: role.role,
      category: role.org,
      tags: text.work.some((item) => item.id === role.id) ? ['Engineering'] : ['Research'],
      subtitle: role.period,
      paragraphs: detail.paragraphs,
      note: detail.note,
    }
  })
  return [...projects, ...roles]
}

type PortfolioState = {
  directory: Record<View, DirectoryState>
  updateDirectory: (view: View, update: Partial<DirectoryState>) => void
  saved: string[]
  toggleSaved: (id: string) => void
  openSaved: (entry: Entry) => void
  focusDetail: View | null
  clearFocus: () => void
}
const PortfolioContext = createContext<PortfolioState | null>(null)

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().replace(/\/$/, '')
  const router = useRouter()
  const route = routeFromPathname(pathname)
  const { locale, setLocale } = useLocale()
  const t = (en: string, zh: string) => (locale === 'zh' ? zh : en)
  const [directory, setDirectory] = useState(initialDirectory)
  const [saved, setSaved] = useState<string[]>([])
  const [removed, setRemoved] = useState<{ id: string; index: number } | null>(null)
  const [notice, setNotice] = useState('')
  const [focusDetail, setFocusDetail] = useState<View | null>(null)
  const undoRef = useRef<HTMLButtonElement>(null)
  const shortlistRef = useRef<HTMLElement>(null)
  const all = entriesFor(locale)
  const isPortfolio = pathname === `/${route}` || pathname === `/${route}/experience`
  const view: View = pathname.endsWith('/experience') ? 'experience' : 'projects'
  const profile = routeText[locale][route]
  const education = experiencePage[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])
  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 6000)
    return () => window.clearTimeout(timeout)
  }, [notice])

  function updateDirectory(current: View, update: Partial<DirectoryState>) {
    setDirectory((old) => ({ ...old, [current]: { ...old[current], ...update } }))
  }
  function removeSaved(id: string, focusUndo = false) {
    setRemoved({ id, index: saved.indexOf(id) })
    setSaved(saved.filter((item) => item !== id))
    setNotice('')
    if (focusUndo) requestAnimationFrame(() => undoRef.current?.focus())
  }
  function toggleSaved(id: string) {
    if (saved.includes(id)) return removeSaved(id)
    if (saved.length >= 3) {
      setNotice(
        t(
          'Your shortlist has 3 entries. Remove one below, then add this entry.',
          '阅读清单已有 3 项，请先移除一项，再添加当前条目。'
        )
      )
      return
    }
    setSaved([...saved, id])
    setRemoved(null)
    setNotice('')
  }
  function openSaved(entry: Entry) {
    updateDirectory(entry.view, { selected: entry.id })
    setFocusDetail(entry.view)
    router.push(entry.view === 'projects' ? `/${route}` : `/${route}/experience`, { scroll: false })
  }
  function undo() {
    if (!removed) return
    if (saved.length >= 3) {
      setNotice(
        t('Remove an entry to make room before undoing.', '请先移除一项，为撤销操作腾出位置。')
      )
      return
    }
    const next = [...saved]
    next.splice(removed.index, 0, removed.id)
    setSaved(next)
    setRemoved(null)
    setNotice('')
    requestAnimationFrame(() => shortlistRef.current?.focus())
  }

  return (
    <PortfolioContext.Provider
      value={{
        directory,
        updateDirectory,
        saved,
        toggleSaved,
        openSaved,
        focusDetail,
        clearFocus: () => setFocusDetail(null),
      }}
    >
      <div className="ba-site">
        <a className="skip" href="#main-content">
          {t('Skip to content', '跳转到正文')}
        </a>
        <div
          className="landscape"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(90deg,#101214ef,#101214ac),url('${process.env.BASE_PATH || ''}/static/images/canada/mountains-1600w.jpg')`,
          }}
        />
        <header className="ba-header">
          <Link className="brand" href={`/${route}`}>
            <span className="mark" aria-hidden="true">
              JJ
            </span>
            <span>JOHN JIN</span>
          </Link>
          <nav aria-label={t('Primary', '主导航')}>
            {navLinks(route).map((link) => {
              const current =
                link.key === 'home' ? pathname === link.href : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={current ? 'active' : ''}
                  aria-current={current ? 'page' : undefined}
                >
                  {link.key === 'home' ? t('Projects', '项目') : t('Experience', '经历')}
                </Link>
              )
            })}
          </nav>
          <div className="switches">
            <button
              type="button"
              aria-label={t('Switch to Chinese', '切换到英文')}
              onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}
            >
              {locale === 'en' ? '中文' : 'EN'}
            </button>
          </div>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className={`ba-main ${isPortfolio ? '' : 'ba-archive'}`}
        >
          {isPortfolio && (
            <section id="identity" aria-label={t('About John', '个人简介')}>
              <Image
                className="portrait"
                src={routeMeta[route].avatar}
                alt={profile.name}
                width={140}
                height={156}
                priority
                unoptimized
              />
              <div className="identity-copy">
                <p className="kicker">{t('SOFTWARE ENGINEERING · RESEARCH', '软件工程 · 研究')}</p>
                <h1>{profile.name}</h1>
                <p>{profile.homeIntro}</p>
                <div className="social">
                  <a href={siteMetadata.github}>GitHub ↗</a>
                  <a href={siteMetadata.linkedin}>LinkedIn ↗</a>
                  <a href={`mailto:${siteMetadata.email}`}>{t('Contact', '联系')} ↗</a>
                </div>
              </div>
              <div className="identity-facts">
                <div>
                  <span>{t('EDUCATION', '教育')}</span>
                  <p>{education.school}</p>
                </div>
                <div>
                  <span>{t('EXPECTED GRADUATION', '预计毕业')}</span>
                  <p>{t('March 2027', '2027 年 3 月')}</p>
                </div>
              </div>
            </section>
          )}
          {children}
          {isPortfolio && (
            <section
              id="saved"
              ref={shortlistRef}
              tabIndex={-1}
              aria-label={t('Reading shortlist', '阅读清单')}
            >
              <span className="saved-label">
                {t('READING SHORTLIST', '阅读清单')} <b>{saved.length}/3</b>
              </span>
              {saved.length ? (
                saved.map((id) => {
                  const entry = all.find((item) => item.id === id)!
                  return (
                    <span className="saved-item" key={id}>
                      <button type="button" className="saved-open" onClick={() => openSaved(entry)}>
                        {entry.title}
                      </button>
                      <button
                        type="button"
                        className="remove"
                        onClick={() => removeSaved(id, true)}
                        aria-label={`${t('Remove', '移除')} ${entry.title}`}
                      >
                        ×
                      </button>
                    </span>
                  )
                })
              ) : (
                <p className="saved-hint">
                  {t(
                    'Keep up to three entries here while you explore.',
                    '浏览时可暂存最多三项内容。'
                  )}
                </p>
              )}
              {removed && (
                <button type="button" className="undo" ref={undoRef} onClick={undo}>
                  {t('Undo removal', '撤销移除')} ↶
                </button>
              )}
            </section>
          )}
        </main>
        <footer className="ba-footer">
          <span>JOHN JIN / SEATTLE</span>
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email} ↗</a>
          <span>{t('UNIVERSITY OF WASHINGTON', '华盛顿大学')}</span>
        </footer>
        <div id="notice" role="status" aria-live="polite">
          {notice}
        </div>
      </div>
    </PortfolioContext.Provider>
  )
}

export function PortfolioWorkspace({ view }: { view: View }) {
  const state = useContext(PortfolioContext)!
  const { locale } = useLocale()
  const t = (en: string, zh: string) => (locale === 'zh' ? zh : en)
  const detailRef = useRef<HTMLElement>(null)
  const { selected, query, tag } = state.directory[view]
  const entries = entriesFor(locale).filter((entry) => entry.view === view)
  const current = entries.find((entry) => entry.id === selected) || entries[0]
  const tags = [...new Set(entries.flatMap((entry) => entry.tags))]
  const visible = entries.filter(
    (entry) =>
      (!tag || entry.tags.includes(tag)) &&
      `${entry.title} ${entry.subtitle} ${entry.category} ${entry.paragraphs.join(' ')} ${entry.tags.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase())
  )
  const education = experiencePage[locale]
  const saved = state.saved.includes(current.id)

  useEffect(() => {
    if (state.focusDetail === view && current.id === selected) {
      detailRef.current?.focus({ preventScroll: true })
      detailRef.current?.scrollIntoView({ block: 'start' })
      state.clearFocus()
    }
  }, [state, current.id, selected, view])

  return (
    <section
      className="workspace"
      aria-label={view === 'projects' ? t('Projects', '项目') : t('Experience', '经历')}
    >
      <div className="directory">
        <div className="directory-title">
          <h2>
            {view === 'projects'
              ? t('Project directory', '项目目录')
              : t('Experience archive', '经历档案')}
          </h2>
          <span aria-live="polite">
            {String(visible.length).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}
          </span>
        </div>
        <label className="search-label" htmlFor="directory-search">
          {t('Find an entry', '查找条目')}
        </label>
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            id="directory-search"
            type="search"
            value={query}
            onChange={(event) => state.updateDirectory(view, { query: event.target.value })}
            placeholder={t('Search titles, tools, topics…', '搜索标题、工具、主题…')}
          />
        </div>
        <div id="filters" role="group" aria-label={t('Filter by topic', '按主题筛选')}>
          {['', ...tags].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={tag === value}
              onClick={() => state.updateDirectory(view, { tag: value })}
            >
              {value || t('All', '全部')}
            </button>
          ))}
        </div>
        <div id="collection">
          {visible.length ? (
            visible.map((entry, index) => (
              <button
                type="button"
                key={entry.id}
                className="object"
                aria-pressed={current.id === entry.id}
                aria-controls="inspector"
                onClick={() => state.updateDirectory(view, { selected: entry.id })}
              >
                <span className="meta">
                  <span>{entry.category}</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </span>
                <h3>{entry.title}</h3>
                <p>{entry.subtitle}</p>
                <span className="object-bottom">
                  <span>
                    {view === 'projects' ? entry.tags.join(' / ') : t('View role', '查看经历')}
                  </span>
                  <b aria-hidden="true">↗</b>
                </span>
              </button>
            ))
          ) : (
            <div className="empty" role="status">
              <p>
                {t(
                  'No entries match this search. Your selected entry stays open.',
                  '没有匹配条目。当前详情仍会保留。'
                )}
              </p>
              <button
                type="button"
                className="secondary"
                onClick={() => state.updateDirectory(view, { query: '', tag: '' })}
              >
                {t('Clear filters', '清空筛选')}
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          className="jump-detail"
          onClick={() => {
            detailRef.current?.focus({ preventScroll: true })
            detailRef.current?.scrollIntoView({ block: 'start' })
          }}
        >
          {t('View selected entry ↓', '查看当前条目详情 ↓')}
        </button>
      </div>
      <article id="inspector" ref={detailRef} tabIndex={-1} aria-labelledby="entry-title">
        <div className="detail-top">
          <span>{t('SELECTED ENTRY', '当前条目')}</span>
          <span>{view === 'projects' ? education.independent : current.category}</span>
        </div>
        <h2 id="entry-title">{current.title}</h2>
        <p className="detail-stack">
          {view === 'experience' && (
            <>
              {current.category}
              <br />
            </>
          )}
          {current.subtitle}
        </p>
        {current.flow && (
          <div className="detail-visual" aria-label={t('Project workflow', '项目流程')}>
            <div className="flow">
              {current.flow.map((step, index) => (
                <span className="flow-step" key={step}>
                  {index > 0 && <i aria-hidden="true">→</i>}
                  <span>{step}</span>
                </span>
              ))}
            </div>
            <div className="metric">
              <strong>{current.metric}</strong>
              <small>{current.metricLabel}</small>
            </div>
          </div>
        )}
        <div className="detail-copy">
          {view === 'projects' ? (
            <>
              <h3>{t('What I built', '项目内容')}</h3>
              <ul>
                {current.paragraphs.map((paragraph) => (
                  <li key={paragraph}>{paragraph}</li>
                ))}
              </ul>
            </>
          ) : (
            current.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          )}
        </div>
        {current.note && <p className="detail-note">{current.note}</p>}
        {view === 'experience' && (
          <div className="education">
            <strong>{education.school}</strong>
            <p>
              {education.degree}
              <br />
              {education.educationPeriod}
            </p>
          </div>
        )}
        <div className="actions">
          <a
            className="primary"
            href={current.href || `mailto:${siteMetadata.email}`}
            {...(current.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {current.href ? t('Open repository', '打开代码仓库') : t('Get in touch', '联系我')}{' '}
            <span aria-hidden="true">↗</span>
          </a>
          {current.downloadHref && (
            <a
              className="secondary"
              href={current.downloadHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Download for Windows', '下载 Windows 版')} <span aria-hidden="true">↗</span>
            </a>
          )}
          <button
            type="button"
            className="secondary"
            aria-pressed={saved}
            onClick={() => state.toggleSaved(current.id)}
          >
            {saved
              ? t('Remove from shortlist', '移出阅读清单')
              : t('Save for later', '加入阅读清单')}{' '}
            <span aria-hidden="true">{saved ? '−' : '+'}</span>
          </button>
        </div>
      </article>
    </section>
  )
}
