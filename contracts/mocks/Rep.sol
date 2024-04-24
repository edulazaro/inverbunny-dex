// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Rep is ERC20
{
    constructor() ERC20('REP', 'Augur token') {}

    function faucet(address to, uint amount) external
    {
        _mint(to, amount);
    }

}