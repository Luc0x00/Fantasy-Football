import React, { useState } from 'react';
import axios from 'axios';
import './LoginStyle.css';
import { useNavigate } from 'react-router-dom'; // Importă useNavigate pentru redirecționare

const LoginForm = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inițializează useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Determinăm URL-ul pentru login sau signup
        const url = isSignUp ? 'http://localhost:3000/auth/signup' : 'http://localhost:3000/auth/login';

        // Pregătim datele de trimis, în funcție de formular
        const data = isSignUp ? { email, username, password } : { email, username, password }; // Folosim email și username

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Dacă serverul răspunde cu un mesaj de succes, redirecționăm utilizatorul pe Home
            if (response.data.message === 'Login successful') {
                // Dacă serverul returnează un token, îl poți salva local
                localStorage.setItem('authToken', response.data.token); // Salvează token-ul
                alert(response.data.message || 'Login successful!');

                // Apelăm onLogin pentru a actualiza starea în App.js
                onLogin({ email, username });

                // Redirecționăm către pagina Home
                navigate('/home');
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            if (err.response) {
                // Serverul a returnat un răspuns cu eroare
                setError(err.response.data.error || 'An error occurred');
            } else {
                // Eroare de rețea
                setError('Network error');
            }
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </>
                )}
                {!isSignUp && (
                    <>
                        <div className="form-group">
                            <label>Email or Username:</label>
                            <input
                                type="text"
                                name="emailOrUsername"
                                required
                                value={email || username}
                                onChange={(e) => {
                                    if (e.target.value.includes('@')) {
                                        setEmail(e.target.value); // Dacă este un email, setăm email
                                    } else {
                                        setUsername(e.target.value); // Dacă nu, setăm username
                                    }
                                }}
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
};

export default LoginForm;
