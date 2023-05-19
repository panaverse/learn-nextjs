// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address payable[] public participants;

    constructor() {
        // It will give full control of contract to manager. Deployment address of contract will assign to manager
        manager = msg.sender;
    }

    // it will recieve ethers from participants and this function can be called once and ust be external
    receive() external payable {
        require(msg.value == 2 ether); // if value send by participants must be 2 ether
        participants.push(payable(msg.sender));
    }

    function getBalance() public view returns (uint) {
        require(msg.sender == manager); // only manager can see the message
        return address(this).balance;
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.timestamp, participants.length)
                )
            );
    }

    function selectWinner() public returns (address) {
        require(msg.sender == manager);
        require(participants.length >= 3);
        uint r = random();
        uint index = r % participants.length;
        address payable winner;
        winner = participants[index];
        winner.transfer(getBalance());
        participants = new address payable[](0);
        return winner;
    }
}
