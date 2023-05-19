# SPDX-License-Identifier: MIT

The line "// SPDX-License-Identifier: MIT" in a Solidity file serves as a way to specify the license type for the code and acts as a form of copyright notice for the smart contract. It indicates that the code is released under the permissive MIT license, which allows users to freely use, modify, and distribute the code for any purpose. This line also helps to avoid any potential copyright issues that may arise when the source code of a smart contract is made available to the public.

# Smart Contract Compilation

Contract source.sol file --> Solidity Compiler
solidity compiler will split it into two parts:
1 - ABI
2 - Byte code -> Ethereum Blockchain

- ABI is abstract byte interface : other applications and smart contracts used this ABI to interact with this smart contract.
- In byte code: byte code convert into opcodes and opcodes is instruction which will run on EVM.
  [byte code to opcodes disassembler - https://etherscan.io/opcode-tool]
  [ethereum opcode github - https://github.com/crytic/evm-opcodes]

Some points to note:

1. Contract bytecode is public in readable form.
2. Contract doesn't have to be public.
3. Bytecode is immutable.
4. ABI act as a bridge between applications and smart contract.
5. ABI and Bytecode cannot be generated without source code.

# Mainnet vs Testnet

- mainnet

1. Used for actual transactions with value.
2. mainnet's network ID is 1.

- testnet

1. Used for testing smart contracts and decentralized applications.
2. Testnets have network IDs of 3,4 and 42.
3. Example Rinkeby Test Network

Rinkeby.io test network [https://www.rinkeby.io/#stats]

## Solidity

- high level statically typed programming language
- create contracts sunch as voting, crowdfunding, blind auctions and multi-signature wallets.
- case sensitive

Solidity compiler (solc) is used to convert solidity code into bytecode. EVM understands bytecode.

A Solidity file is composed of the following four high-level constructs:
• Pragma
• Comments
• Import
• Contract/library/interface

# Pragmas?

It specifies the target compiler version to be used for compiling the current Solidity file. The pragma keyword enables certain compiler features or checks and is always local to a source file. To enable it in the entire project, it needs to be added to all files, as it does not automatically apply to importing files.

# Comments?

There are the following three types of comments in Solidity:
• Single-line comments //
• Multiline comments /_multiline_/
• Ethereum Natural Specification (Natspec) /// for single line , /\*_ multiline_/

# Import?

import 'CommonLibrary.sol';

# Storage vs Memory

- stotage:
  1 - Holds state variables.
  2 - Persistent.
  3 - Cost gas.
  4 - Like a computer HDD

- Memory:
  1 - Holds local variables defined inside functions if they are reference types.
  2 - Not persistence.
  3 - No gas.
  4 - Like a computer RAM.

Storage: This is global memory available to all functions within a contract. This
storage is permanent storage that Ethereum stores on every node within its
environment.
• Memory: This is local memory available to every function within a contract. This is
short-lived and fleeting memory that gets torn down when a function completes its
execution.
• Calldata: Call data refers to the input data that is sent to a smart contract when a function is called. It includes the function's signature and any arguments that are passed to it. The call data is read by the contract and used to execute the function. To access the call data in Solidity, developers can use the "msg.data" variable.
• Stack: Stack is a temporary storage area in the Ethereum Virtual Machine (EVM) that is used to execute instructions in a smart contract. It operates like a Last-In-First-Out (LIFO) data structure, which means that the most recently added item is the first to be removed.
