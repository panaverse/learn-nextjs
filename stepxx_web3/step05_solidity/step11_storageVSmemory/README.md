# Sample Hardhat Project

<h1>Storage VS Memory</h1>
<h2>Storage: </h2>
1. Holds state variables.
2. Persistent (store in contract storage permanantly)
3. Cost gas fee
4. Like a computer HDD

<h2>Memory</h2>
1. Holds local variables defined inside a function if they are reference type.
2. Not persistent
3. No gas fee
4. Like a computer RAM

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
