// encryptionUtils.js
// This script provides utility functions for encrypting and decrypting data.

const crypto = require('crypto');

// Encryption and decryption settings
const algorithm = 'aes-256-cbc';
const secretKey = 'your_secret_key_here'; // Should be 32 bytes
const iv = crypto.randomBytes(16); // Initialization vector

// Function to encrypt text
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Function to decrypt text
function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt
};
