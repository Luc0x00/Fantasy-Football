const connection = require("./databaseConnection.js");

// Query the database to fetch all players
const sql = "SELECT name FROM Players";

connection.query(sql, (error, results) => {
    if (error) {
        console.error("Error fetching players from database:", error);
        return;
    }

    // Check if there are any players in the database
    if (results.length > 0) {
        console.log(`Total players: ${results.length}`);

        // Log the name of each player with an index
        results.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name}`);
        });
    } else {
        console.log("No players found in the database.");
    }
});
