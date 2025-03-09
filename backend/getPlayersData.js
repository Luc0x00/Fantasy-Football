const pool = require("./databaseConnection.js");

// Function to get all players from the database
const getPlayersFromDB = (callback) => {
    // SQL query to get all players from the Players table
    const sql = 'SELECT * FROM Players';

    // Query the database
    pool.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching players from database:', error);
            return callback(error, null);  // Call the callback with the error
        }

        // Log the fetched results to check what is being returned
        console.log('Players fetched from DB:', results.rows);

        return callback(null, results.rows);  // Return the rows
    });
};

// Export the function to be used in other files
module.exports = getPlayersFromDB;
