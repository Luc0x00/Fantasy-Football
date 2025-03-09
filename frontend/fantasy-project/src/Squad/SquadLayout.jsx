import React from 'react';
import './SquadStyle.css';

const positions = [
    { pos: 'F', row: 1, col: 2 }, { pos: 'F', row: 1, col: 3 },
    { pos: 'M', row: 2, col: 1 }, { pos: 'M', row: 2, col: 2 }, { pos: 'M', row: 2, col: 3 }, { pos: 'M', row: 2, col: 4 },
    { pos: 'D', row: 3, col: 1 }, { pos: 'D', row: 3, col: 2 }, { pos: 'D', row: 3, col: 3 }, { pos: 'D', row: 3, col: 4 },
    { pos: 'G', row: 4, col: 2.5 }
];

const SquadLayout = () => {
    return (
        <div className="squad-container">
            {positions.map((position, index) => (
                <div
                    key={index}
                    className={`player-slot position-${position.pos}`}
                    style={{ gridRow: position.row, gridColumn: position.col }}
                >
                    <span>{position.pos}</span>
                </div>
            ))}
        </div>
    );
};

export default SquadLayout;
