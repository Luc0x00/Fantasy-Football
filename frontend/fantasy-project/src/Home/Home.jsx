import React from 'react';

const Home = ({ user }) => {
    return (
        <div className="home-container">
            <h1>Welcome, {user?.username || "User"}!</h1>
            <p>You are logged in. Enjoy your Fantasy Football experience!</p>
        </div>
    );
};

export default Home;
