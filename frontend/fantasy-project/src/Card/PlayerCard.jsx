import React from 'react';
import './CardStyle.css'

const PlayerCard = ({ currentPlayers }) => {
    return (
        <div className="player-cards">
            {currentPlayers.map(player => (
                <div key={player.id} className="player-card">
                    <div className="player-image-container">
                        <img
                            src={`https://api.sofascore.app/api/v1/player/${player.idsofascore}/image`}
                            alt={`${player.name}`}
                            className="player-image"
                        />
                    </div>
                    <div className="player-info">
                        <h3 className="player-name">{player.name}</h3>
                        <p className="player-position">{player.position}</p>
                        <p className="player-club">{player.club}</p>
                        <div className="player-price">€{player.price.toLocaleString()}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlayerCard;
