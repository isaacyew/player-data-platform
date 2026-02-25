import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};

export const GameProvider = ({ children }) => {
    const [selectedGame, setSelectedGame] = useState('soli');

    const games = [
        { code: 'soli', name: 'Game A', fullName: 'Game A (soli)' },
        { code: 'soho', name: 'Game B', fullName: 'Game B (soho)' },
        { code: 'sofa', name: 'Game C', fullName: 'Game C (sofa)' },
        { code: 'meho', name: 'Game D', fullName: 'Game D (meho)' },
    ];

    const getGameInfo = () => games.find(g => g.code === selectedGame) || games[0];

    return (
        <GameContext.Provider value={{ selectedGame, setSelectedGame, games, getGameInfo }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
