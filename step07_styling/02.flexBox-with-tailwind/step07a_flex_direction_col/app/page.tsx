import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <div className="wrapper flex flex-col justify-center">
        <a href="#" className="link login-link">Login</a>
        <a href="#" className="link signup-link">Create account</a>
      </div>
  )
}
