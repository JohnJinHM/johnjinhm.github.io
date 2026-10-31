import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { PostComments, PostHeader, PostNav, postRoute } from './PostLayout'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

// PostLayout without the source link.
export default function PostSimple({ content, next, prev, children }: LayoutProps) {
  const route = postRoute(content)

  return (
    <>
      <ScrollTopAndComment />
      <article data-route={route} className="enter max-w-[var(--measure)]">
        <PostHeader content={content} route={route} />
        <div className="prose pt-8">{children}</div>
        <PostNav prev={prev} next={next} />
        <PostComments slug={content.slug} />
      </article>
    </>
  )
}
