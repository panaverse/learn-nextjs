1 - Install Node js. If your version of Node.js is older and not supported by Hardhat follow the instructions below to upgrade.
2 - Creating a new Hardhat project:

```
mkdir hardhat-tutorial
cd hardhat-tutorial
npm init
npm install --save-dev hardhat
npx hardhat
```

select typescript project

Tasks
Every time you're running Hardhat from the command-line, you're running a task. For example, npx hardhat compile is running the compile task. To see the currently available tasks in your project, run npx hardhat. Feel free to explore any task by running npx hardhat help [task].

```
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

3 - Compile project:

```
npx hardhat compile
```

It will convert your contract into byte code and Create ABI.

4 - Test your contract:

```
npx hardhat test
```

5 - Deploy your project:

```
npx hardhat run scripts/deploy.ts
```

--network localhost: (it is used to deploy)
gives all information about the node, contract deployment, address, eth, from, gas used, and block no
