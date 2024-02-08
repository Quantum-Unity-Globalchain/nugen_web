const mysql = require('mysql');
const { promisify } = require('util');

// Database connection setup
const db = mysql.createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'NugenCoinExchange'
});

// Promisify query for async/await use
const query = promisify(db.query).bind(db);

// Function to verify email and check user status
async function verifyEmail(email) {
  try {
    // Check if the email exists in the database
    const user = await query('SELECT * FROM Users WHERE Email = ?', [email]);
    
    if (user.length > 0) {
      // Return user status if email exists
      return {
        exists: true,
        status: user[0].Status
      };
    } else {
      // Return false if email does not exist
      return {
        exists: false,
        status: null
      };
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}

module.exports = {
  verifyEmail
};
