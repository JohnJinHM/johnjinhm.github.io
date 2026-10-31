import { notFound } from 'next/navigation'
import Tag from '@/components/Tag'
import PageTitle from '@/components/PageTitle'
import { genPageMetadata } from 'app/seo'
import { isRoute, routeMeta, routes, Route } from '@/data/routes'
import tagData from 'app/tag-data.json'
import { Metadata } from 'next'

export const generateStaticParams = async () => routes.map((route) => ({ route }))

export async function generateMetadata(props: {
  params: Promise<{ route: string }>
}): Promise<Metadata> {
  const { route } = await props.params
  const label = isRoute(route) ? routeMeta[route].label : ''
  return genPageMetadata({ title: `${label} Tags`, description: `Things I write about` })
}

export default async function Page(props: { params: Promise<{ route: string }> }) {
  const { route } = await props.params
  if (!isRoute(route)) {
    return notFound()
  }
  const tagCounts = (tagData as Record<string, Record<string, number>>)[route] || {}
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="enter">
      <div className="pt-10 pb-8 md:pt-16">
        <PageTitle>Tags</PageTitle>
      </div>
      {sortedTags.length === 0 ? (
        <p className="text-ink-2">No tags found.</p>
      ) : (
        <ul className="border-rule flex flex-wrap gap-3 border-t pt-8">
          {sortedTags.map((t) => (
            <li key={t}>
              <Tag text={t} route={route as Route} count={tagCounts[t]} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
