// connectWallet.js
// This script is responsible for connecting the user's MetaMask wallet to the website.

// Import necessary libraries
import { ethers } from 'ethers';

// Function to request account access
async function requestAccount() {
  // Check if MetaMask is installed
  if (window.ethereum) {
    console.log('MetaMask is installed!');
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0]; // Return the first account
    } catch (error) {
      console.error('User denied account access', error);
    }
  } else {
    alert('MetaMask is not installed. Please install it to use this feature.');
  }
}

// Function to connect the wallet
async function connectWallet() {
  try {
    const account = await requestAccount(); // Request account access
    if (account) {
      console.log('Connected:', account);
      // Update UI to show connected account
      document.getElementById('walletAddress').textContent = `Connected: ${account}`;
    }
  } catch (error) {
    console.error('Could not connect to wallet', error);
  }
}

// Add event listener to the connect button
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);

// Export the connectWallet function for use in other scripts
export { connectWallet };
