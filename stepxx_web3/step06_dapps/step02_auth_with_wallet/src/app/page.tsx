import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import React from 'react'
import ConnectButton from '@/components/connectButton'
import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';

export const getUser = () => {
    const accessToken = cookies().get("accessToken")?.value;
    if(accessToken){
        const decodedToken: any = decode(accessToken);
        const payload = decodedToken.payload;
        return payload;
    }
    return;
}

export default function Home() {
  const user = getUser();

  console.log("user ", user)

  return (
    <main >
      <ConnectButton user={user}/>
    </main>
  )
}
