import { ReactNode } from 'react'
import Image from '@/components/Image'
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

// PostLayout with the first frontmatter image as a banner above the title.
export default function PostBanner({ content, next, prev, children }: LayoutProps) {
  const { title, images } = content
  const displayImage = images && images.length > 0 ? images[0] : undefined
  const route = postRoute(content)

  return (
    <>
      <ScrollTopAndComment />
      <article data-route={route} className="enter">
        {displayImage && (
          <div className="relative mt-10 aspect-2/1 w-full overflow-hidden rounded-[var(--radius)] md:mt-16">
            <Image src={displayImage} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="max-w-[var(--measure)]">
          <PostHeader content={content} route={route} />
          <div className="prose pt-8">{children}</div>
          <PostNav prev={prev} next={next} />
          <PostComments slug={content.slug} />
        </div>
      </article>
    </>
  )
}
