## Overview

We will be using a developer framework called ZERODEV for creating, using, and extending smart wallets powered by account abstraction (ERC-4337). 
In this step we have used this framework to create ERC-4337 wallets using different thirdy-party social media logins.

[Zerodev docs](https://docs.zerodev.app/) 

### Required libraries 

```
yarn add @zerodevapp
yarn add @zerodevapp/social-wallet
```

### Understanding code

1) First create a project ID from zero dev's dashboard. The id being used in this step is a test id from zero dev, you can replace it with your own id.
2) Initialize the signer 
```
import { getZeroDevSigner, getSocialWalletOwner } from '@zerodevapp/sdk'
import {SocialWallet} from '@zerodevapp/social-wallet';

const signer = await getZeroDevSigner({
       projectId: 'Enter-your-projectId',
       owner: await getSocialWalletOwner('Enter-your-projectId', socialWallet)
      })
```
This piece of code with initialize the zerodev signer and prompt the user with a modal to login with one of their social media platforms.

3) Read & write data from the newly created wallet address using zerodev signer

You can interact with the wallet using zerodev signer to read, write or send transactions to blockchain. In this example we have simply read the address of the newly created wallet account

```
const userAddress = await signer.getAddress();
```

