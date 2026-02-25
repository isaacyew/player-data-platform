import React, { useState } from 'react';
import { Search, User, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { usePlayer } from '../../context/PlayerContext';
import { useTheme } from '../../context/ThemeContext';

const TopBar = () => {
    const { selectedGame, setSelectedGame, games } = useGame();
    const { currentPlayer, searchPlayer, clearPlayer, isPlayerLoaded, searchError, setSearchError } = usePlayer();
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            searchPlayer(searchQuery);
        }
    };

    const handleClearPlayer = () => {
        clearPlayer();
        setSearchQuery('');
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        if (searchError) {
            setSearchError('');
        }
    };

    return (
        <div className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20 transition-colors duration-200">
            <div className="flex items-center gap-4">
                <button
                    onClick={handleClearPlayer}
                    className="text-xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                    <span className="text-orange-600">PDP</span>
                    <span className="text-slate-400">|</span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Player Data Platform</span>
                </button>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-200 transition-colors"
                >
                    {games.map(game => (
                        <option key={game.code} value={game.code}>{game.fullName}</option>
                    ))}
                </select>
            </div>

            <div className="flex-1 max-w-xl mx-8">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Search Player ID, Username, or Email..."
                        className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors ${searchError ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                            }`}
                    />
                    {isPlayerLoaded && (
                        <button
                            type="button"
                            onClick={handleClearPlayer}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            title="Clear search and return to home"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </form>
                {searchError && (
                    <div className="absolute mt-1 text-xs text-red-500">
                        {searchError}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 relative">
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 py-1 px-2 rounded-lg transition-colors"
                >
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-200">Support Agent</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Admin Role</div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden transform transition-all duration-200 origin-top-right">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Settings</h3>
                        </div>
                        <div className="p-2">
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <span className="text-sm text-slate-700 dark:text-slate-300">Dark Mode</span>
                                <button
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300'
                                        }`}
                                >
                                    <span
                                        className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="p-2 border-t border-slate-100 dark:border-slate-700">
                            <button className="w-full text-left p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
