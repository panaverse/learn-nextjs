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

function ConnectButton() {



  const [address, setAddress] = useState<string>()
  const [loading, setLoading] = useState(false)


  console.log("user ", address)


  const socialWallet = useMemo(() => {
    return new SocialWallet()
  }, [])


  const createWallet = async () => {

    try {

      setLoading(true)

      const signer = await getZeroDevSigner({
        projectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
        owner: await getSocialWalletOwner('b5486fa4-e3d9-450b-8428-646e757c10f6', socialWallet)
      })


      const userAddress = await signer.getAddress();
      setAddress(userAddress)

    }
    catch (e) {

      console.log(e)
    }
    finally {
      setLoading(false)
    }

  }


  const disconnect = async () => {
    await socialWallet.disconnect();
    setAddress(undefined)


  }


  return (
    <div>

      <div>
        {!address && <button className='bg-gray-300 p-3' onClick={createWallet} disabled={loading}>{loading ? 'loading...' : 'Connect Wallet'}</button>}
        {!!address &&
          <button className='bg-gray-300 p-3' onClick={disconnect} disabled={loading}>Disconnect</button>
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
