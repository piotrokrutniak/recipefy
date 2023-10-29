import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/navbar/navbar'
import Footbar from './components/footbar/footbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipefy',
  description: 'Website with the tastiest recipes!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className="bg-slate-600/20 min-h-screen pb-4">
        <NavBar/>
        {children}
        </div>
        <Footbar/>
      </body>
    </html>
  )
}
