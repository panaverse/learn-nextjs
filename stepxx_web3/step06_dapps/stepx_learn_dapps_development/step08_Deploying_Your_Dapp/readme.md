# Step 8: Deploying Your DApp with Goerli and Hardhat

Once you have tested your DApp thoroughly, it's time to deploy it on a live network. For this tutorial, we'll use the Goerli test network and Hardhat to deploy our DApp.

## Setting up the Goerli Test Network

Before we can deploy our DApp on the Goerli network, we need to set up our development environment to connect to it. Here are the steps to follow:

1. Open a new terminal window and navigate to your project folder.
2. Install the required packages by running the following command:

   ```
   npm i hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
   ```

3. Next, we need to create a `hardhat.config.js` file by running the following command:

   ```
   npx hardhat
   ```

4. Choose the `Create a sample hardhat.config.js` option.

5. Open the `hardhat.config.js` file and add the following code to it:

   ```javascript
   /**
    * @type import('hardhat/config').HardhatUserConfig
    */
   module.exports = {
     solidity: "0.8.0",
     networks: {
       goerli: {
         url: "https://goerli.infura.io/v3/your-infura-project-id",
         accounts: ["your-private-key"],
       },
     },
   };
   ```

   Note: Replace `your-infura-project-id` with your Infura project ID and `your-private-key` with your private key.

6. Save the file and exit.

## Deploying the DApp with Hardhat

Now that we've set up the Goerli test network, we can deploy our DApp using Hardhat. Here are the steps to follow:

1. Open a new terminal window and navigate to your project folder.

2. Compile your contracts by running the following command:

   ```
   npx hardhat compile
   ```

3. Deploy your contract by running the following command:

   ```
   npx hardhat run --network goerli scripts/deploy.js
   ```

   Note: Replace `deploy.js` with the name of your deployment script.

4. Wait for the deployment process to complete.

5. Once the deployment is complete, you will see the contract address in the console.

Congratulations! You have successfully deployed your DApp on the Goerli test network using Hardhat. You can now interact with your DApp by visiting its URL on the Goerli network.

## Final Thoughts

Deploying a DApp can be a challenging task, but with the right tools and knowledge, it becomes much easier. By following the steps outlined in this tutorial, you should now have a good understanding of how to deploy a DApp on the Goerli test network using Hardhat.
