'use client'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Photo } from 'contentlayer/generated'
import Link from '@/components/Link'
import PhotoImage from '@/components/PhotoImage'
import Pagination, { PaginationProps } from '@/components/Pagination'
import siteMetadata from '@/data/siteMetadata'
import { Route } from '@/data/routes'
import { ListHeader } from './ListLayoutWithTags'

interface ListLayoutProps {
  photos: CoreContent<Photo>[]
  title: string
  route: Route
  initialDisplayPhotos?: CoreContent<Photo>[]
  pagination?: PaginationProps
}

export function PhotoGrid({ photos }: { photos: CoreContent<Photo>[] }) {
  return (
    <div className="gap-6 sm:columns-2 lg:columns-3">
      {photos.map((photo) => (
        <figure key={photo.path} className="group mb-8 break-inside-avoid">
          <Link href={`/${photo.path}`} aria-label={photo.title} className="block">
            <PhotoImage
              src={photo.image}
              alt={photo.title}
              width={photo.imageWidth}
              height={photo.imageHeight}
              blur={photo.imageBlur}
              widths={photo.imageWidths}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
              className="transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
            />
          </Link>
          <figcaption className="mt-3">
            <div className="flex items-baseline justify-between gap-3">
              <Link
                href={`/${photo.path}`}
                className="font-display text-[length:var(--text-ui)] font-bold decoration-[var(--accent)] decoration-2 underline-offset-4 hover:underline"
              >
                {photo.title}
              </Link>
              <time dateTime={photo.date} className="meta shrink-0" suppressHydrationWarning>
                {formatDate(photo.date, siteMetadata.locale)}
              </time>
            </div>
            {photo.summary && (
              <p className="text-ink-2 mt-1 text-[length:var(--text-sm)]">{photo.summary}</p>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function ListLayoutPhotos({
  photos,
  title,
  route,
  initialDisplayPhotos = [],
  pagination,
}: ListLayoutProps) {
  const displayPhotos = initialDisplayPhotos.length > 0 ? initialDisplayPhotos : photos

  return (
    <div className="enter">
      <ListHeader title={title} route={route} />
      {displayPhotos.length === 0 && <p className="text-ink-2">No photos found.</p>}
      <PhotoGrid photos={displayPhotos} />
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
