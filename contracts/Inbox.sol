// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Inbox{
    string public message;

///this functional invoke automatically (string alsways used with memory)
    constructor(string memory innitialMessage) {
        message = innitialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}