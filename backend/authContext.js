const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Aici ar trebui să ai modelul User

const SECRET_KEY = 'yourSecretKey'; // Cheia pentru semnătura JWT

// Crearea unui token JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware pentru a verifica token-ul
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Stocăm informațiile decodificate despre utilizator în req.user
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Exemplu de rută de login pentru a obține un token JWT
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ message: 'Login successful', token });
};

// Exportează funcțiile de autentificare
module.exports = { authenticateToken, login };
