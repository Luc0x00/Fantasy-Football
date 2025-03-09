const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
    host: process.env.host || 'localhost',
    user: process.env.user || 'postgres',
    password: process.env.password || 'lucacrisan',
    database: process.env.database || 'ffdatabase',
    port: process.env.PORTDB || 5432
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
    release();
});

module.exports = pool;
