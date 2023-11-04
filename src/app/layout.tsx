import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/navbar/navbar'
import Footbar from './components/footbar/footbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'New Next.js Project',
  description: 'Next.js Project',
}

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black`}>
        <main className="min-h-screen min-w-mobile flex gap-4 flex-col pb-4 overflow-x-clip bg-slate-800/25">
        <NavBar/>
        {children}
        </main>
        <Footbar/>
      </body>
    </html>
  )
}