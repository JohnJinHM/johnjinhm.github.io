import { notFound } from 'next/navigation'
import { isRoute, Route } from '@/data/routes'
import { PortfolioWorkspace } from '@/components/Portfolio'

export default async function Page(props: { params: Promise<{ route: string }> }) {
  const { route } = await props.params
  if (!isRoute(route)) {
    return notFound()
  }

  return <PortfolioWorkspace view="projects" />
}
