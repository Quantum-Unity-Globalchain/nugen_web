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

// Function to update user status to "PAID"
async function updateUserStatusToPaid(email) {
  try {
    // Update the user's status in the database
    const updateResult = await query('UPDATE Users SET Status = ? WHERE Email = ?', ['PAID', email]);
    
    if (updateResult.affectedRows > 0) {
      console.log(`User status updated to "PAID" for email: ${email}`);
      return true;
    } else {
      console.error(`Failed to update user status for email: ${email}`);
      return false;
    }
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
}

module.exports = {
  updateUserStatusToPaid
};
