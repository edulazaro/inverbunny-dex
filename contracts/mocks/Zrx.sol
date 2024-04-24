// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Zrx is ERC20
{
    constructor() ERC20('ZRX', '0x token') {}

    function faucet(address to, uint amount) external
    {
        _mint(to, amount);
    }
}