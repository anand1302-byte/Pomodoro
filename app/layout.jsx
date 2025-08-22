import './globals.css'
import { Inter, Varela_Round } from 'next/font/google'
import { AuthProvider } from '../components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })
const varelaRound = Varela_Round({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-varela'
})

export const metadata = {
  title: 'Premium Pomodoro',
  description: 'A premium Pomodoro timer application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${varelaRound.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}