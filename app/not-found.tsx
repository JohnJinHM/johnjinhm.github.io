import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="enter pt-16 pb-8 md:pt-24">
      <p className="meta">404</p>
      <h1 className="font-display mt-3 text-[length:var(--text-3xl)] leading-[1.1] font-black tracking-[-0.03em]">
        This page isn’t here.
      </h1>
      <p className="text-ink-2 mt-4 max-w-[var(--measure)]">
        The link may be old, or the page may have moved.
      </p>
      <Link href="/" className="font-display link-fill mt-8 inline-block font-bold">
        Back to the home page
      </Link>
    </div>
  )
}
