'use client';


import './globals.css'

import {
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
  enhanceWalletWithAAConnector
} from '@zerodevapp/wagmi/rainbowkit'
import {
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { chains, provider } = configureChains(
    [polygonMumbai],
    [
      publicProvider()
    ]
  );

  // YOUR ZERODEV PROJECT ID
  const projectId = 'b5486fa4-e3d9-450b-8428-646e757c10f6'

  const connectors = connectorsForWallets([
    {
      groupName: 'Social',
      wallets: [
        googleWallet({ options: { projectId } }),
        facebookWallet({ options: { projectId } }),
        githubWallet({ options: { projectId } }),
        discordWallet({ options: { projectId } }),
        twitchWallet({ options: { projectId } }),
        twitterWallet({ options: { projectId } })
      ],
    },
    {
      groupName: 'AA Wallets',
      wallets: [
        enhanceWalletWithAAConnector(metaMaskWallet({ chains }), { projectId }),
        enhanceWalletWithAAConnector(walletConnectWallet({ chains }), { projectId }),
      ]
    },
  ])

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider
  })


  return (
    <html lang="en">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <body>{children}</body>
        </RainbowKitProvider>
      </WagmiConfig>
    </html>
  )
}
