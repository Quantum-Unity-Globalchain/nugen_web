// transactionProcessor.js
// This script handles the exchange of Nugen Coins for Ethereum.

import { ethers } from 'ethers';
import { connectWallet } from './connectWallet.js';
import { verifyEmail } from './emailVerification.js';
import NugenCoinExchange from '../build/contracts/NugenCoinExchange.json';

// Function to initiate the exchange process
async function exchangeNugenForEth(email, nugenAmount) {
  try {
    // Verify email and user status
    const verificationResult = await verifyEmail(email);
    if (!verificationResult.exists || verificationResult.status !== 'UNPAID') {
      console.error('User does not exist or has already been processed.');
      return;
    }

    // Connect to the user's wallet
    const userAddress = await connectWallet();
    if (!userAddress) {
      console.error('Failed to connect to the user\'s wallet.');
      return;
    }

    // Setup provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Connect to the NugenCoinExchange contract
    const networkId = await provider.getNetwork().then(network => network.chainId);
    const deployedNetwork = NugenCoinExchange.networks[networkId];
    const nugenCoinExchange = new ethers.Contract(
      deployedNetwork.address,
      NugenCoinExchange.abi,
      signer
    );

    // Calculate the equivalent amount of Ethereum based on the current exchange rate
    const exchangeRate = await nugenCoinExchange.exchangeRate();
    const ethAmount = ethers.utils.parseUnits((nugenAmount * exchangeRate).toString(), 'ether');

    // Execute the exchange
    const tx = await nugenCoinExchange.exchangeNugenForEth(nugenAmount, { value: ethAmount });
    await tx.wait();

    console.log(`Exchange completed: ${nugenAmount} Nugen Coins for ${ethAmount} ETH`);

    // Update the user's status in the database
    // This part would require a backend API call to update the user's status to "PAID"
    // For simplicity, we'll log the action here
    console.log(`Updating user status to "PAID" for email: ${email}`);

    // Note: Implement the actual API call to your backend here to update the user's status
  } catch (error) {
    console.error('Failed to process the transaction:', error);
  }
}

// Export the exchange function for use in other scripts
export { exchangeNugenForEth };

