# Sample Hardhat Project

1 byte = 8 bits (byte ranges from 1 to 32)
1 hexadecimal digit = 4 bits

Everything that will be store in the byte array will be in the form of hexadecimal digits.
Bytes array cannot be modified.
Padding of 0 is added at the end if the value(by which the array is initialized) doesnot occupy the entire space.


This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
