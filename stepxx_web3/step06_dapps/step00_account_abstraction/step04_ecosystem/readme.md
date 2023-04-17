# ERC-4337 Ecosystem

The whole point of ERC 4337 is that users from outside of the Ethereum can send transactions without having an account. You can send transaction-like objects to a separate mempool and someone else will make your transaction for you. This is helpful when users want to interact with blockchain without making an EOA from within an application.

These are the main components to ERC-4337:

1. UserOperations are pseudo-transaction objects that are used to execute transactions with contract accounts. These are created by your app.
2. Bundlers are actors that package UserOperations from a mempool and send them to the EntryPoint contract on the #blockchain network. Can receive UserOperations via a JSON RPC Client and submit them to the EntryPoint.
3. EntryPoint is a smart contract that handles the verification and execution logic for transactions.
4. Contract Accounts are smart contract accounts owned by a user.
5. [optional] Paymasters are smart contract accounts that can sponsor transactions for Contract Accounts, enabling gasless transactions in your apps.
6. [optional] Aggregators are smart contracts that can validate signatures for Contract Accounts.

The EntryPoint contract has been deployed on multiple chains, in the same address 0x0576a174D229E3cFA37253523E645A78A0C91B57 for: [Ethereum](https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57), [Polygon](https://polygonscan.com/address/0x0576a174D229E3cFA37253523E645A78A0C91B57), and other supported networks:

[Stackup](https://docs.stackup.sh/) was first to create a fully compliant bundler and a paymaster service.

[Alchemy](https://www.alchemy.com/account-abstraction) announced their first two products in the space: Bundler Services and Paymaster Services (wait list).

These ones have also built and deployed bundlers:

[Biconomy](https://biconomy.gitbook.io/sdk/additional-content/account-abstraction#erc-4337-account-abstraction-via-entry-point-contract)

[Blocknative](https://docs.blocknative.com/blocknative-auction/mev-bundle-rpc-endpoint)

[Etherspot](https://docs.etherspot.io/)

[Candide wallet](https://docs.candidewallet.com/bundler/intro/)