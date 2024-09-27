//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExerciseSolutionToken is IERC20Mintable,ERC20 {

    mapping(address => uint256) public userBalance;
    mapping(address => bool) private _minter;

    constructor() ERC20("ExerciseSolutionToken", "Sol") {}

    function setMinter(address minterAddress, bool isMinter) external{
        _minter[minterAddress] = isMinter;
    }

    function mint(address toAddress, uint256 amount) external{
        require(_minter[msg.sender], "Not a minter");
        _mint(toAddress, amount);
    }

    function isMinter(address minterAddress) external view returns (bool) {
        return _minter[minterAddress];
    }

    function burn(uint256 amount) external {
        require(_minter[msg.sender], "Not authorized to burn");
        _burn(msg.sender, amount);
    }

}