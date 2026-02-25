import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};

// Mock player data
const mockPlayer = {
    uid: '8829-3920-1102',
    username: 'DragonSlayer99',
    email: 'test@playersupport.com',
    createdAt: '2025-01-15',
    lastLogin: '2025-12-25 14:30:00',
    status: 'Active'
};

export const PlayerProvider = ({ children }) => {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [searchError, setSearchError] = useState('');

    const searchPlayer = (query) => {
        const trimmedQuery = query.trim().toLowerCase();

        // Check if query matches any of the mock player's identifiers
        if (
            trimmedQuery === mockPlayer.uid.toLowerCase() ||
            trimmedQuery === mockPlayer.username.toLowerCase() ||
            trimmedQuery === mockPlayer.email.toLowerCase()
        ) {
            setCurrentPlayer(mockPlayer);
            setSearchError('');
            return true;
        } else {
            setSearchError('Player not found. Try: DragonSlayer99, test@playersupport.com, or 8829-3920-1102');
            return false;
        }
    };

    const clearPlayer = () => {
        setCurrentPlayer(null);
        setSearchError('');
    };

    const isPlayerLoaded = !!currentPlayer;

    return (
        <PlayerContext.Provider value={{
            currentPlayer,
            searchPlayer,
            clearPlayer,
            isPlayerLoaded,
            searchError,
            setSearchError
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
