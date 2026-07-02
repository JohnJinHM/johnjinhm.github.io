import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allPhotos } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { isRoute, postsForRoute, routeMeta, Route } from '@/data/routes'
import { experiences } from '@/data/experiences'
import HomeLayout from '@/components/home/HomeLayout'

export default async function Page(props: { params: Promise<{ route: string }> }) {
  const { route } = await props.params
  if (!isRoute(route)) {
    return notFound()
  }
  const posts = allCoreContent(sortPosts(postsForRoute(allBlogs, route as Route)))
  const photos = allCoreContent(sortPosts(postsForRoute(allPhotos, route as Route)))

  return (
    <HomeLayout
      route={route as Route}
      experiences={experiences[route as Route]}
      intro={routeMeta[route as Route].homeIntro}
      posts={posts}
      photos={photos}
    />
  )
}
