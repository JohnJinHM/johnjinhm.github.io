import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Arrow from '@/components/Arrow'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { Route, defaultRoute, isRoute, routeMeta } from '@/data/routes'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

type Neighbor = { path: string; title: string }

export function postRoute(content: { route?: string }): Route {
  return content.route && content.route !== 'shared' && isRoute(content.route)
    ? content.route
    : defaultRoute
}

export function PostHeader({ content, route }: { content: CoreContent<Blog>; route: Route }) {
  const { date, title, summary, tags, readingTime } = content
  return (
    <header className="border-rule border-b pt-10 pb-8 md:pt-16">
      <Link
        href={`/${route}/blog`}
        className="meta hover:text-ink transition-colors"
        aria-label={`Back to ${routeMeta[route].blogTitle}`}
      >
        <Arrow direction="left" /> {routeMeta[route].blogTitle}
      </Link>
      <p className="meta mt-6">
        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
        {readingTime?.text && <> · {readingTime.text}</>}
      </p>
      <div className="mt-3">
        <PageTitle>{title}</PageTitle>
      </div>
      {summary && (
        <p className="text-ink-2 mt-4 text-[length:var(--text-lg)] leading-[1.45]">{summary}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} route={route} />
          ))}
        </div>
      )}
    </header>
  )
}

export function PostNav({ prev, next }: { prev?: Neighbor; next?: Neighbor }) {
  if (!prev?.path && !next?.path) return null
  return (
    <nav
      aria-label="More articles"
      className="border-rule mt-12 grid gap-6 border-t pt-6 sm:grid-cols-2"
    >
      {prev?.path ? (
        <Link href={`/${prev.path}`} className="group">
          <span className="meta">
            <Arrow direction="left" /> Previous
          </span>
          <span className="font-display mt-1 block font-bold decoration-[var(--accent)] decoration-2 underline-offset-4 group-hover:underline">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next?.path && (
        <Link href={`/${next.path}`} className="group sm:text-right">
          <span className="meta">
            Next <Arrow direction="right" />
          </span>
          <span className="font-display mt-1 block font-bold decoration-[var(--accent)] decoration-2 underline-offset-4 group-hover:underline">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  )
}

export function PostComments({ slug }: { slug: string }) {
  if (!siteMetadata.comments) return null
  return (
    <div className="mt-12" id="comment">
      <Comments slug={slug} />
    </div>
  )
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: Neighbor
  prev?: Neighbor
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const route = postRoute(content)

  return (
    <>
      <ScrollTopAndComment />
      <article data-route={route} className="enter max-w-[var(--measure)]">
        <PostHeader content={content} route={route} />
        <div className="prose pt-8">{children}</div>
        <p className="meta mt-12">
          <Link href={editUrl(content.filePath)} className="hover:text-ink transition-colors">
            View source on GitHub <Arrow direction="external" />
          </Link>
        </p>
        <PostNav prev={prev} next={next} />
        <PostComments slug={content.slug} />
      </article>
    </>
  )
}
