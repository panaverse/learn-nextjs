## Step 6: Building a Front-End Interface

Now that we have our smart contract deployed, we can build a front-end interface to interact with it. We will be using Next.js 13 and React to build our front-end.

### Creating a New Next.js App

To create a new Next.js app, we can use the following command:

```
npx create-next-app dapp
```

This command will create a new Next.js app in a directory called `dapp`.

### Installing Dependencies

We need to install the following dependencies:

- `ethers`: A library for interacting with Ethereum.
- `wagmi`: A library for creating web3 providers.
- `react-bootstrap`: A UI library for React.

To install these dependencies, run the following command in the `dapp` directory:

```
npm install ethers wagmi react-bootstrap
```

### Implement the Front-End Functionality

First, we need to import the necessary libraries in our `pages/index.js` file:

```jsx
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { ethers } from "ethers";
import { getWagmiProvider } from "wagmi";
```

Next, we need to create a new state variable to hold the input value from the user:

```jsx
const [inputValue, setInputValue] = useState("");
```

Then, we need to create a new `submitHandler` function that will call our smart contract's `setMessage` function with the input value from the user:

```jsx
async function submitHandler() {
  const provider = getWagmiProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    signer
  );

  await contract.setMessage(inputValue);
  alert("Message set successfully!");
  setInputValue("");
}
```

Here, we first create a provider and signer using `wagmi`, and then create a new contract instance using `ethers`. We then call our contract's `setMessage` function with the input value from the user and display a success message to the user.

Finally, we need to create a basic UI for our DApp. We can use React Bootstrap to create a simple form with an input field and a submit button:

```jsx
<Container className="mt-4">
  <form
    onSubmit={(e) => {
      e.preventDefault();
      submitHandler();
    }}
  >
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="form-control"
      placeholder="Enter your message"
    />
    <Button type="submit" variant="primary" className="mt-2">
      Submit
    </Button>
  </form>
</Container>
```

Here, we use the `useState` hook to manage the input field's value and pass the `submitHandler` function to the form's `onSubmit` event handler.

### Running the DApp

To run the DApp, navigate to the `dapp` directory and run the following command:

```
npm run dev
```

This command will start the Next.js development server on `http://localhost:3000`. You should now be able to interact with your DApp through the web interface.
