// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NugenCoinExchange is ReentrancyGuard {
    address public owner;
    IERC20 public nugenCoin;
    uint256 public exchangeRate;

    event Exchange(address indexed user, uint256 nugenAmount, uint256 ethAmount);
    event ExchangeRateUpdated(uint256 newRate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this operation");
        _;
    }

    constructor(address _nugenCoinAddress, uint256 _initialExchangeRate) {
        require(_nugenCoinAddress != address(0), "NugenCoin address cannot be the zero address");
        require(_initialExchangeRate > 0, "Exchange rate must be greater than zero");

        owner = msg.sender;
        nugenCoin = IERC20(_nugenCoinAddress);
        exchangeRate = _initialExchangeRate;
    }

    function updateExchangeRate(uint256 _newRate) external onlyOwner {
        require(_newRate > 0, "Exchange rate must be greater than zero");
        exchangeRate = _newRate;
        emit ExchangeRateUpdated(_newRate);
    }

    function exchangeNugenForEth(uint256 _nugenAmount) external nonReentrant {
        require(_nugenAmount > 0, "Nugen amount must be greater than zero");
        uint256 ethAmount = _nugenAmount * exchangeRate;

        require(address(this).balance >= ethAmount, "Contract does not have enough Ether");
        require(nugenCoin.transferFrom(msg.sender, address(this), _nugenAmount), "Failed to transfer Nugen Coins");

        (bool sent, ) = msg.sender.call{value: ethAmount}("");
        require(sent, "Failed to send Ether");

        emit Exchange(msg.sender, _nugenAmount, ethAmount);
    }

    // Allow the contract to receive Ether
    receive() external payable {}

    // Withdraw function for the contract owner to withdraw Ether
    function withdrawEther(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance in contract");
        (bool sent, ) = owner.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    // Withdraw function for the contract owner to withdraw Nugen Coins
    function withdrawNugenCoins(uint256 _amount) external onlyOwner {
        require(nugenCoin.balanceOf(address(this)) >= _amount, "Insufficient Nugen Coin balance in contract");
        require(nugenCoin.transfer(owner, _amount), "Failed to transfer Nugen Coins");
    }
}
