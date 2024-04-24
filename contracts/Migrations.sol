// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 < 0.9.0;

contract Migrations
{
    address public owner;
    uint public last_completed_migration;

    constructor()
    {
        owner = msg.sender;
    }

    function setCompleted(uint completed) public restricted
    {
        last_completed_migration = completed;
    }

    modifier restricted()
    {
        if (msg.sender == owner) _;
    }
}