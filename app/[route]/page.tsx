import { notFound } from 'next/navigation'
import { isRoute, Route } from '@/data/routes'
import HomeLayout from '@/components/home/HomeLayout'

export default async function Page(props: { params: Promise<{ route: string }> }) {
  const { route } = await props.params
  if (!isRoute(route)) {
    return notFound()
  }

  return <HomeLayout route={route as Route} />
}
