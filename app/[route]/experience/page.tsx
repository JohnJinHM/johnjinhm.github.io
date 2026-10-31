import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { isRoute, routeMeta, routes } from '@/data/routes'
import ExperiencePage from '@/components/ExperiencePage'

export const generateStaticParams = async () => routes.map((route) => ({ route }))

export async function generateMetadata(props: { params: Promise<{ route: string }> }) {
  const { route } = await props.params
  if (!isRoute(route)) return notFound()
  return genPageMetadata({
    title: `${routeMeta[route].label} Experience`,
    description:
      'John Jin’s education, software engineering work, research, teaching, and projects.',
  })
}

export default async function Page(props: { params: Promise<{ route: string }> }) {
  const { route } = await props.params
  if (!isRoute(route)) return notFound()
  return <ExperiencePage />
}
