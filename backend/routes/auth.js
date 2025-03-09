const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../databaseConnection');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configurează Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Sau un alt serviciu de email
    auth: {
        user: process.env.EMAIL_USER, // Email-ul tău
        pass: process.env.EMAIL_PASS, // Parola sau App Password
    },
});

router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (email, username, password, is_verified) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, username, hashedPassword, false]
        );

        // Generează un token de verificare
        const verificationToken = jwt.sign(
            { userId: newUser.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Trimite email-ul de verificare
        const verificationUrl = `http://localhost:3000/auth/verify/${verificationToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            html: `<p>Click the link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
        });

        res.status(201).json({ message: 'User created successfully. Check your email for verification link.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/login', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2',
            [email, username] // sau username, în funcție de ce se primește în request
        );


        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (!user.rows[0].is_verified) {
            return res.status(403).json({ error: 'Please verify your email first' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/users', async (req, res) => {
    try {
        // Interoghează baza de date pentru a obține toți utilizatorii
        const result = await pool.query('SELECT id, email, username, password FROM users');

        // Verifică dacă există utilizatori
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Trimite utilizatorii în răspuns
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Verifică token-ul
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Actualizează utilizatorul în baza de date
        await pool.query(
            'UPDATE users SET is_verified = $1 WHERE id = $2',
            [true, decoded.userId]
        );

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
});


module.exports = router;
