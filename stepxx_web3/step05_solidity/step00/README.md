# SPDX-License-Identifier: MIT

The line "// SPDX-License-Identifier: MIT" in a Solidity file serves as a way to specify the license type for the code and acts as a form of copyright notice for the smart contract. It indicates that the code is released under the permissive MIT license, which allows users to freely use, modify, and distribute the code for any purpose. This line also helps to avoid any potential copyright issues that may arise when the source code of a smart contract is made available to the public.

# Remix ?

open source IDE - Develop, Deploy and Administer
language support - Solidity and Vyper
written in - Javascript
Modules - Testing, Debugging and Deploy

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
