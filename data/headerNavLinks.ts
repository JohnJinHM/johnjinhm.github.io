import { Route } from './routes'

export function navLinks(route: Route) {
  return [
    { href: `/${route}`, key: 'home' as const },
    { href: `/${route}/blog`, key: 'blog' as const },
    { href: `/${route}/photos`, key: 'photos' as const },
  ]
}

export default navLinks
