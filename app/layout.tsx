import type { Metadata } from 'next'
import { Noto_Sans_HK } from 'next/font/google'
import './globals.css'

const notoSansHk = Noto_Sans_HK({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-hk',
})

export const metadata: Metadata = {
  title: 'EduPath AI',
  description: 'Multi-Agent 升學諮詢平台',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${notoSansHk.variable} antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  )
}
