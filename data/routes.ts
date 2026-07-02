import type { SocialIconKind } from '@/components/social-icons'

export const routes = ['official', 'casual'] as const

export type Route = (typeof routes)[number]

export const defaultRoute: Route = 'official'

export function isRoute(value: string): value is Route {
  return (routes as readonly string[]).includes(value)
}

export function otherRoute(route: Route): Route {
  return route === 'official' ? 'casual' : 'official'
}

export function routeFromPathname(pathname: string): Route {
  const segment = pathname.split('/')[1]
  return isRoute(segment) ? segment : defaultRoute
}

export type SocialLink = {
  kind: SocialIconKind
  href: string
}

export const routeMeta: Record<
  Route,
  {
    name: string
    label: string
    blogTitle: string
    photosTitle: string
    homeIntro: string
    avatar: string
    occupation: string
    company: string
    socials: SocialLink[]
  }
> = {
  official: {
    name: 'John Jin',
    label: 'Official',
    blogTitle: 'Articles',
    photosTitle: 'Photos',
    homeIntro:
      'Undergraduate in UW-Seattle. Abundant experience in Software Engineering and Designs. Major in Computer Science and Informatics.',
    avatar: '/static/images/avatar-official.jpg',
    occupation: 'Software Developer',
    company: 'UW Allen School \'27',
    socials: [
      { kind: 'mail', href: 'mailto:jinhaomin874@gmail.com' },
      { kind: 'github', href: 'https://github.com/JohnJinHM/Blog' },
      { kind: 'linkedin', href: 'https://linkedin.com/in/johnjinhm/' },
    ],
  },
  casual: {
    name: 'Starfall',
    label: 'Casual',
    blogTitle: 'Notes',
    photosTitle: 'Snapshots',
    homeIntro:
      'Off the clock, this is where I keep the half-formed notes, snapshots, and side projects. A more relaxed look at what I get up to for fun.',
    avatar: '/static/images/avatar.png',
    occupation: 'Content Creator',
    company: 'Placeholder Company',
    socials: [
      { kind: 'mail', href: 'mailto:jinhaomin874@gmail.com' },
      { kind: 'instagram', href: 'https://instagram.com/' },
      { kind: 'bluesky', href: 'https://bsky.app/' },
    ],
  },
}

export function postsForRoute<T extends { route?: string }>(items: T[], route: Route): T[] {
  return items.filter((item) => item.route === route || item.route === 'shared')
}
