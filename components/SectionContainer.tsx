import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function SectionContainer({ children, className = '' }: Props) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </section>
  )
}
