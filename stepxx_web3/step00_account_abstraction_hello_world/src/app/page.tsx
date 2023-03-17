'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='App'>
      <ConnectButton  />

    </div>
  )
}
