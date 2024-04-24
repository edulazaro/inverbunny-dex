// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Bat is ERC20
{
    constructor() ERC20('BAT', 'Brave browser token') {}

    function faucet(address to, uint amount) external
    {
        _mint(to, amount);
    }

}