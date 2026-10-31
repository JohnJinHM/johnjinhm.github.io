import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Photo } from 'contentlayer/generated'
import Arrow from '@/components/Arrow'
import Link from '@/components/Link'
import PhotoImage from '@/components/PhotoImage'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { Route, defaultRoute, isRoute, routeMeta } from '@/data/routes'
import { PostComments, PostNav } from './PostLayout'

interface LayoutProps {
  content: CoreContent<Photo>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PhotoLayout({ content, next, prev, children }: LayoutProps) {
  const {
    slug,
    title,
    date,
    summary,
    image,
    imageWidth,
    imageHeight,
    imageBlur,
    imageWidths,
    tags,
  } = content
  const route: Route = isRoute(content.route ?? '') ? (content.route as Route) : defaultRoute

  return (
    <article data-route={route} className="enter">
      <header className="pt-10 pb-8 md:pt-16">
        <Link
          href={`/${route}/photos`}
          className="meta hover:text-ink transition-colors"
          aria-label={`Back to ${routeMeta[route].photosTitle}`}
        >
          <Arrow direction="left" /> {routeMeta[route].photosTitle}
        </Link>
        <p className="meta mt-6">
          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
        </p>
        <div className="mt-3">
          <PageTitle>{title}</PageTitle>
        </div>
      </header>
      <div className="overflow-hidden rounded-[var(--radius)]">
        <PhotoImage
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          blur={imageBlur}
          widths={imageWidths}
          priority
          sizes="(min-width: 1152px) 1056px, 100vw"
        />
      </div>
      <div className="max-w-[var(--measure)]">
        {summary && (
          <p className="text-ink-2 mt-6 text-[length:var(--text-lg)] leading-[1.45]">{summary}</p>
        )}
        <div className="prose pt-6">{children}</div>
        {tags && tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} route={route} />
            ))}
          </div>
        )}
        <PostNav prev={prev} next={next} />
        <PostComments slug={slug} />
      </div>
    </article>
  )
}
