'use client';

import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from './page.module.css'
import { use } from 'react'
import useSWR from 'swr'

const inter = Inter({ subsets: ['latin'] })

const url = 'https://api.quotable.io/random?tags=technology';

const fetcher = (url: any) => fetch(url).then((res) => res.json());


export default async function Home() {
  const {data, error} = useSWR(url, fetcher);
  const quote: any = use(data);
  
  return (
    <div>{quote.content}</div>
  )
}
