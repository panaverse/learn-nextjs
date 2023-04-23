import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import React from 'react'
import ConnectButton from '@/components/connectButton'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main >
      <ConnectButton/>
    </main>
  )
}
