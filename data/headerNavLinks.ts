import { Route } from './routes'

export function navLinks(route: Route) {
  return [
    { href: `/${route}`, key: 'home' as const },
    { href: `/${route}/experience`, key: 'experience' as const },
    // Temporarily hidden from the header; the pages are still built and reachable.
    // { href: `/${route}/blog`, key: 'blog' as const },
    // { href: `/${route}/photos`, key: 'photos' as const },
    // { href: `/${route}/tags`, key: 'tags' as const },
  ]
}

export default navLinks
