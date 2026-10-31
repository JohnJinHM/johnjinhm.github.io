'use client'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import TagSidebar from '@/components/TagSidebar'
import Pagination, { PaginationProps } from '@/components/Pagination'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import { Route } from '@/data/routes'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  route: Route
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export function ListHeader({ title, route }: { title: string; route: Route }) {
  return (
    <div className="flex items-end justify-between gap-4 pt-10 pb-8 md:pt-16">
      <PageTitle>{title}</PageTitle>
      <TagSidebar route={route} />
    </div>
  )
}

export function PostList({ posts, route }: { posts: CoreContent<Blog>[]; route: Route }) {
  if (posts.length === 0) return <p className="text-ink-2">No posts found.</p>
  return (
    <ul>
      {posts.map((post) => {
        const { path, date, title, summary, tags } = post
        return (
          <li
            key={path}
            className="border-rule grid gap-1 border-t py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-6"
          >
            <time dateTime={date} className="meta md:pt-1.5" suppressHydrationWarning>
              {formatDate(date, siteMetadata.locale)}
            </time>
            <article>
              <h2 className="font-display text-[length:var(--text-xl)] leading-[1.2] font-bold tracking-[-0.01em]">
                <Link
                  href={`/${path}`}
                  className="decoration-[var(--accent)] decoration-2 underline-offset-4 hover:underline"
                >
                  {title}
                </Link>
              </h2>
              {summary && <p className="text-ink-2 mt-2 max-w-[var(--measure)]">{summary}</p>}
              {tags && tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} route={route} />
                  ))}
                </div>
              )}
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  route,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="enter">
      <ListHeader title={title} route={route} />
      <PostList posts={displayPosts} route={route} />
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
