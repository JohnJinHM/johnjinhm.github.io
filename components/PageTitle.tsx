import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="font-display text-ink text-[length:var(--text-3xl)] leading-[1.1] font-black tracking-[-0.03em] text-balance">
      {children}
    </h1>
  )
}
