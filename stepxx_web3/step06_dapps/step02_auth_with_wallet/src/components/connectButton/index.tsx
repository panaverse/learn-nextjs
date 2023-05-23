"use client";

import React, { useMemo, useState } from 'react'
import { getZeroDevSigner, getSocialWalletOwner, ZeroDevSigner } from '@zerodevapp/sdk'
import {
  SocialWallet,
} from '@zerodevapp/social-wallet';


declare global {
  interface Window {
    ethereum: any;
  }
}

interface PropType {
  user: any;
}

function ConnectButton({user}: PropType) {

  const [address, setAddress] = useState(user?.publicAddress);
  const [loading, setLoading] = useState(false);

  const socialWallet = useMemo(() => {
    return new SocialWallet()
  }, [])


  const fetchUser = async (address: string) => {
    const res = await fetch(`http://localhost:3000/api/auth/get-user-nonce/${address}`, {
      cache: 'no-cache'
    })
    return res.json();
  }

  const signUp = async (address: string) => {
    const newUser = await fetch("http://localhost:3000/api/auth/signup", {
            method: "post",
            body: JSON.stringify({publicAddress: address})
      })
    return newUser.json()
  }

  const logout = async () => {
    const res = await fetch(`http://localhost:3000/api/auth/logout`, {
      cache: 'no-cache'
    })
    return res.json();
  }

  const login = async (address: string, signature: string) => {
    const newUser = await fetch("http://localhost:3000/api/auth/login", {
          method: "post",
          body: JSON.stringify({publicAddress: address, signature})
    })
    return newUser.json()
  };

  const signUpFlow = async (address: string) => {
    let nonce;
    try {
      const user = await fetchUser(address)
      nonce = user.nonce;
    }
    catch(err){
      const newUser = await signUp(address)
      nonce = newUser.user.nonce
    }
    return nonce;
  };

  const createWallet = async () => {

    try {

      setLoading(true)
      const signer = await getZeroDevSigner({
        projectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
        owner: await getSocialWalletOwner('b5486fa4-e3d9-450b-8428-646e757c10f6', socialWallet)
      })


      const userAddress = await signer.getAddress();

      try{
        const nonce : string = await signUpFlow(userAddress)
        if(!nonce){
          throw new Error('No Nonce Found');
        }
        const message = `My App Auth Service Signing nonce: ${nonce}`;
        let signature = await signer.signMessage(message)
        
        console.log("signature ", signature)
        alert(`Your signed message: ${signature}`)

        await login(userAddress, signature)

        setAddress(userAddress)
      }
      catch(err){
        console.log("err", err)
        setAddress('')

      }

    }
    catch (e) {

      console.log(e)
      setAddress('')

    }
    finally {
      setLoading(false)
    }
  }

  const disconnect = async () => {
    await socialWallet.disconnect();
    await logout()
    setAddress('')
  }


  return (
    <div>

      <div>
        {!address && <button className={'bg-gray-300 p-3'} onClick={createWallet} disabled={loading}>{loading ? 'loading...' : 'Connect Wallet'}</button>}
        {!!address &&
          <button className={'bg-gray-300 p-3'} onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
      {!!address && 
        <div>
          <label> {`${address.substring(0, 6)}...${address.substring(address.length - 5, address.length)}`}</label>
        </div>
      }
    </div>
  )
}

export default ConnectButton
