// SPDX-License-Identifier: MIT

pragma solidity >=0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ERC20Claimable.sol";
import "./IExerciseSolution.sol";
import "./ExerciseSolutionToken.sol";

contract ExerciseSolution is IExerciseSolution {
    ERC20Claimable public teacherERC20;
    ExerciseSolutionToken public exerciseSolutionToken;
    mapping(address => uint256) public userTokensInCustody;

    constructor(address _teacherERC20) {
        teacherERC20 = ERC20Claimable(_teacherERC20);
        exerciseSolutionToken = new ExerciseSolutionToken();
        exerciseSolutionToken.setMinter(address(this), true);
    }

    function claimTokensOnBehalf() external override {
        uint256 amountClaimed = teacherERC20.claimTokens();
        userTokensInCustody[msg.sender] += amountClaimed;
    }

    function tokensInCustody(address callerAddress) external view override returns (uint256) {
        return userTokensInCustody[callerAddress];
    }

    function depositTokens(uint256 amountToDeposit) override external returns(uint256) {
        // Vérifiez que l'utilisateur a approuvé le transfert
        require(teacherERC20.transferFrom(msg.sender, address(this), amountToDeposit), "Transfer failed");
        
        // Mint des tokens dans ExerciseSolutionToken
        exerciseSolutionToken.mint(msg.sender, amountToDeposit);
        
        // Mettre à jour le solde de l'utilisateur
        userTokensInCustody[msg.sender] += amountToDeposit;
        
        return amountToDeposit;
    }

    function withdrawTokens(uint256 amountToWithdraw) external override returns (uint256) {
        require(userTokensInCustody[msg.sender] >= amountToWithdraw, "Not enough wrapper tokens");
        
        // Brûler les tokens de l'utilisateur dans ExerciseSolutionToken
        exerciseSolutionToken.burn(amountToWithdraw);
        
        // Mettre à jour le solde de l'utilisateur
        userTokensInCustody[msg.sender] -= amountToWithdraw;
        
        // Transférer les tokens originaux à l'utilisateur
        require(teacherERC20.transferFrom(address(this), msg.sender, amountToWithdraw), "Transfer of original tokens failed");
        
        return amountToWithdraw;
    }

    function getERC20DepositAddress() external view override returns (address) {
        return address(exerciseSolutionToken);
    }
}