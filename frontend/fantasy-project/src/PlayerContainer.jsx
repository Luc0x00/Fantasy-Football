import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerFilters from './Filter/PlayerFilters.jsx';
import PlayerPagination from './PlayerPagination.jsx';
import PlayerCard from './Card/PlayerCard.jsx';

const PlayerContainer = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const playersPerPage = 10; // Number of players per page
    const [selectedPosition, setSelectedPosition] = useState(''); // State for selected position

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/players');
                setPlayers(response.data);
                setFilteredPlayers(response.data); // Initially, show all players
            } catch (err) {
                setError('Failed to fetch players');
            }
        };

        fetchPlayers();
    }, []);

    // Filter players by position whenever selectedPosition changes
    useEffect(() => {
        const filtered = selectedPosition
            ? players.filter(player => player.position === selectedPosition)
            : players;
        setFilteredPlayers(filtered);
        setCurrentPage(1); // Reset to first page whenever filter changes
    }, [selectedPosition, players]);

    // Calculate the slice of players to display based on the current page
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

    // Handle page change
    const goToNextPage = () => setCurrentPage(currentPage + 1);
    const goToPreviousPage = () => setCurrentPage(currentPage - 1);

    // Handle page selection from dropdown
    const handlePageSelect = (e) => {
        const selectedPage = parseInt(e.target.value, 10);
        setCurrentPage(selectedPage);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (currentPlayers.length === 0) {
        return <div>No players found.</div>;
    }

    const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

    return (
        <div className="player-container">

            {/* Filter Buttons Component */}
            <PlayerFilters setSelectedPosition={setSelectedPosition} />

            {/* Player List Component */}
            <PlayerCard currentPlayers={currentPlayers} />

            {/* PlayerPagination Controls Component */}
            <PlayerPagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                handlePageSelect={handlePageSelect}
            />
        </div>
    );
};

export default PlayerContainer;
