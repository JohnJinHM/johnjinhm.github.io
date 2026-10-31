'use client'

import { useLocale } from './LocaleProvider'
import Link from './Link'
import { experiencePage } from '@/data/experiencePage'
import { localizedExperiences } from '@/data/i18n'

export default function ExperiencePage() {
  const { locale } = useLocale()
  const text = experiencePage[locale]
  const roles = localizedExperiences[locale].official
  const sections = [
    { id: 'education', label: text.educationTitle },
    { id: 'work', label: text.workTitle },
    { id: 'research', label: text.researchTitle },
    { id: 'projects', label: text.projectsTitle },
  ]

  return (
    <div lang={locale} className="py-10 md:py-16">
      <h1 className="font-display text-[length:var(--text-3xl)] font-black tracking-[-0.03em]">
        {text.title}
      </h1>
      <p className="text-ink-2 mt-4 max-w-[var(--measure)]">{text.intro}</p>
      <nav aria-label={text.title} className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="link-fill">
            {section.label}
          </a>
        ))}
      </nav>

      <section id="education" aria-labelledby="education-title" className="mt-16 scroll-mt-8">
        <h2 id="education-title" className="font-display text-[length:var(--text-xl)] font-bold">
          {text.educationTitle}
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
          <p className="text-ink-3 text-[length:var(--text-ui)]">{text.educationPeriod}</p>
          <div>
            <h3 className="font-display text-[length:var(--text-lg)] font-bold">{text.school}</h3>
            <p className="text-ink-2 mt-2">{text.degree}</p>
          </div>
        </div>
      </section>

      {[
        { id: 'work', title: text.workTitle, entries: text.work },
        { id: 'research', title: text.researchTitle, entries: text.research },
      ].map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className="mt-16 scroll-mt-8"
        >
          <h2
            id={`${section.id}-title`}
            className="font-display text-[length:var(--text-xl)] font-bold"
          >
            {section.title}
          </h2>
          <div className="mt-8 space-y-12">
            {section.entries.map((entry) => {
              const role = roles.find((role) => role.id === entry.id)!
              return (
                <article
                  key={entry.id}
                  className="grid gap-3 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8"
                >
                  <p className="text-ink-3 text-[length:var(--text-ui)]">{role.period}</p>
                  <div className="max-w-[var(--measure)] min-w-0">
                    <h3 className="font-display text-[length:var(--text-lg)] font-bold">
                      {role.role}
                    </h3>
                    <p className="text-ink-2 mt-1">
                      {entry.id.startsWith('i2-') ? (
                        <Link href="https://uw-i2.org/" className="link-fill">
                          {role.org}
                        </Link>
                      ) : (
                        role.org
                      )}
                    </p>
                    <ul className="mt-4 list-disc space-y-3 pl-5">
                      {entry.paragraphs.map((paragraph) => (
                        <li key={paragraph}>{paragraph}</li>
                      ))}
                    </ul>
                    {entry.note && <p className="text-ink-2 mt-4">{entry.note}</p>}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}

      <section id="projects" aria-labelledby="projects-title" className="mt-16 scroll-mt-8">
        <h2 id="projects-title" className="font-display text-[length:var(--text-xl)] font-bold">
          {text.projectsTitle}
        </h2>
        <div className="mt-8 space-y-12">
          {text.projects.map((project) => (
            <article
              key={project.href}
              className="grid gap-3 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8"
            >
              <div className="text-ink-3 text-[length:var(--text-ui)]">
                <p>{text.independent}</p>
                {project.period && <p className="mt-1">{project.period}</p>}
                <Link href={project.href} className="link-fill text-ink mt-3 inline-block">
                  {text.repository}
                </Link>
              </div>
              <div className="max-w-[var(--measure)] min-w-0">
                <h3 className="font-display text-[length:var(--text-lg)] font-bold">
                  {project.name}
                </h3>
                <p className="text-ink-2 mt-2 text-[length:var(--text-ui)]">{project.stack}</p>
                <ul className="mt-4 list-disc space-y-3 pl-5">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {project.note && <p className="text-ink-2 mt-4">{project.note}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
