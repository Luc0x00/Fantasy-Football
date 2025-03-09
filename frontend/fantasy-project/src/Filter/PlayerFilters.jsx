import React from 'react';

const PlayerFilters = ({ setSelectedPosition }) => {
    return (
        <div className="player-filters">
            <button onClick={() => setSelectedPosition('')}>All</button>
            <button onClick={() => setSelectedPosition('F')}>Forward (F)</button>
            <button onClick={() => setSelectedPosition('M')}>Midfielder (M)</button>
            <button onClick={() => setSelectedPosition('D')}>Defender (D)</button>
            <button onClick={() => setSelectedPosition('G')}>Goalkeeper (G)</button>
        </div>
    );
};

export default PlayerFilters;
