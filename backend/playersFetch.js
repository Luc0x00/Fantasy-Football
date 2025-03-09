const https = require("https");
const connection = require("./databaseConnection.js");

const options = {
    "method": "GET",
    "hostname": "www.sofascore.com",
    "port": null,
    "path": "/api/v1/team/45/players", // Modify this number to access different teams
    "headers": {
        "Content-Length": "0"
    }
};

const req = https.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        const data = JSON.parse(body.toString());

        if (data.players && data.players.length > 0) {
            data.players.forEach(playerObj => {
                const playerName = playerObj["player"]["name"];
                const playerClub = playerObj["player"]["team"]["name"];  // Adjust based on actual data structure
                const playerPosition = playerObj["player"]["position"];
                const playerPrice = playerObj["player"]["proposedMarketValue"] || 0; // Default if not provided
                const idSofaScore = playerObj["player"]["idsofascore"]; // Get SofaScore ID

                // SQL to insert player if not already in the database
                const sql = `
                    INSERT INTO Players (name, club, position, price, idSofaScore)
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (name, club, position, price) DO NOTHING
                `;

                connection.query(sql, [playerName, playerClub, playerPosition, playerPrice, idSofaScore], (error, results) => {
                    if (error) {
                        console.error(`Error inserting player ${playerName}:`, error);
                    } else {
                        if (results.rowCount > 0) {
                            console.log(`Player ${playerName} inserted with idSofaScore ${idSofaScore}.`);
                        } else {
                            console.log(`Player ${playerName} already exists in the database.`);
                        }
                    }
                });
            });
        } else {
            console.log("No players found in the response.");
        }
    });
});

req.end();
