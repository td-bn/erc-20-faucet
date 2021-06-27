//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract LearnToken is ERC20 {
    
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 10000 * (10**18));
    }
    
    function drop(address recepient, uint amount) external {
        _mint(recepient, amount);
    }
}
