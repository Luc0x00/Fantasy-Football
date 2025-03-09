import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PlayerContainer from './PlayerContainer.jsx';
import Navbar from "./Navbar/Navbar.jsx";
import LoginForm from "./Login/LoginForm.jsx";
import SquadLayout from "./Squad/SquadLayout.jsx";
import Home from './Home/Home.jsx'; // Importă pagina Home

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Starea de autentificare
    const [user, setUser] = useState(null); // Detaliile utilizatorului

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            // Poți adăuga și o verificare a validității token-ului aici
        }
    }, []);

    const handleLogin = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('authToken', 'yourTokenHere'); // Salvează token-ul
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('authToken'); // Îndepărtează token-ul
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <div className="App">
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />} />
                    <Route path="/home" element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />} />
                    <Route path="/team" element={isAuthenticated ? <SquadLayout /> : <Navigate to="/login" />} />
                    <Route path="/transfers" element={isAuthenticated ? <PlayerContainer /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
