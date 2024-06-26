// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from 'solmate/tokens/ERC20.sol';

contract ERC20Mock is ERC20{

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20(_name, _symbol, _decimals){}

    function mint(address _to, uint256 _amount) external {
        _mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) external {
        _burn(_from, _amount);
    }
}