import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

const basePath = process.env.BASE_PATH || ''

export default function Footer() {
  const links = [
    { label: 'Email', href: `mailto:${siteMetadata.email}` },
    { label: 'GitHub', href: siteMetadata.github },
    { label: 'LinkedIn', href: siteMetadata.linkedin },
    { label: 'RSS', href: `${basePath}/feed.xml` },
  ].filter((link) => link.href)

  return (
    <footer className="border-rule mt-24 flex flex-col gap-4 border-t py-8 text-[length:var(--text-xs)] sm:flex-row sm:items-center sm:justify-between">
      <p className="meta">
        © {new Date().getFullYear()} {siteMetadata.author} · Built on{' '}
        <Link
          href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
          className="hover:text-ink underline decoration-[var(--rule)] underline-offset-4"
        >
          tailwind-nextjs-starter-blog
        </Link>
      </p>
      <ul className="font-display flex gap-6 font-bold">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-ink-2 hover:text-ink transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
