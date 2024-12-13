# Sample Hardhat Project

<h1>What is difference between mapping and array? </h1>
1. Mapping is based on hashing, so because of hashing data structure we don't have an order of key just like we have in array, a sequential order of index.
2. In mapping we can have value of key as 0, then 5 then 100 (random keys without any order) which we cannot have in array. To obtain this in array we have to create an array of 100 index which will take huge memory space and most of the memory will be blank and therefore, memory will get wasted.

<h2>NOTE</h2>
1. The data type of key can't be mapping, dynamic array, enum and struct.
2. The data type of value can be of any type.
3. Mappings are always stored in storage irrespect of whether they are declared in contract storage or not.


This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
