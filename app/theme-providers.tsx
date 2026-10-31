'use client'

import { ThemeProvider } from 'next-themes'

// The site is dark only. The provider stays so pliny components that read the
// theme (comments) resolve to dark.
export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
