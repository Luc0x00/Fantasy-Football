const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const getPlayersFromDB = require('./getPlayersData');  // Import the function to get players from DB

// Initialize the Express app
const app = express();

// Enable CORS for all routes (or specify origins if needed)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.use('/auth', authRoutes);

// Route to fetch all players from the database using the imported function
app.get('/players', (req, res) => {
    getPlayersFromDB((error, players) => {
        if (error) {
            // Handle the error (e.g., database connection issue)
            return res.status(500).json({ error: 'Failed to fetch players from the database' });
        }

        if (players && players.length > 0) {
            // Send players as a JSON response
            res.json(players);
        } else {
            // If no players are found in the database
            res.status(404).json({ message: 'No players found in the database' });
        }
    });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
