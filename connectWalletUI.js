// connectWalletUI.js
// This script is responsible for updating the UI after the user's MetaMask wallet is connected.

// Import the connectWallet function from connectWallet.js
import { connectWallet } from './connectWallet.js';

// Function to update the UI after wallet connection
function updateUIAfterWalletConnection() {
    // Get the connect button and wallet address paragraph
    const connectButton = document.getElementById('connectWalletButton');
    const walletAddressParagraph = document.getElementById('walletAddress');

    // When the connect button is clicked and the wallet is connected
    connectButton.addEventListener('click', async () => {
        // Disable the button to prevent multiple clicks
        connectButton.disabled = true;
        connectButton.textContent = 'Connecting...';

        try {
            // Call the connectWallet function to connect the wallet
            await connectWallet();

            // If the wallet is connected, change the button text
            connectButton.textContent = 'Wallet Connected';
            connectButton.style.backgroundColor = '#4CAF50'; // Change button color to green

            // Update the wallet address paragraph
            if (walletAddressParagraph.textContent.startsWith('Connected:')) {
                // If already connected, no need to change the text
                connectButton.disabled = false; // Re-enable the button
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            connectButton.textContent = 'Connect MetaMask Wallet';
            connectButton.disabled = false; // Re-enable the button if there was an error
        }
    });
}

// Call the function to update the UI after wallet connection
updateUIAfterWalletConnection();
