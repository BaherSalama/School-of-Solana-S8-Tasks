'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from './react-query-provider'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { MarkdownProvider } from '@/components/markdown/markdown-provider'
import { HeadingProvider } from '@/components/markdown/heading-provider'
import React from 'react'

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MarkdownProvider>
      <HeadingProvider>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <SolanaProvider>
              {children}
            </SolanaProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </HeadingProvider>
    </MarkdownProvider>
  )
}
