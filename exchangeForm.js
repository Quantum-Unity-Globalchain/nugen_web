// exchangeForm.js
// This script handles the user input for exchanging Nugen Coins for Ethereum.

import { exchangeNugenForEth } from './transactionProcessor.js';

// Function to handle form submission
async function handleExchangeFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the email and Nugen Coin amount from the form
  const email = document.getElementById('emailInput').value;
  const nugenAmount = document.getElementById('nugenAmountInput').value;

  // Validate input
  if (!email || !nugenAmount) {
    alert('Please enter both your email and the amount of Nugen Coins you wish to exchange.');
    return;
  }

  // Call the exchange function
  try {
    await exchangeNugenForEth(email, nugenAmount);
    alert('Exchange initiated. Please check your wallet for the transaction.');
  } catch (error) {
    console.error('Exchange failed:', error);
    alert('Failed to initiate the exchange. Please try again.');
  }
}

// Add event listener to the exchange form
document.getElementById('exchangeForm').addEventListener('submit', handleExchangeFormSubmit);

