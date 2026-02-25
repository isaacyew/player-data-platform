import React, { useState } from 'react';
import { Gamepad2, Star, Map, Clock, Search, Filter, ChevronDown, ChevronLeft, ChevronRight, BookOpen, Coins, Home, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';

const ProgressPage = () => {
    const { selectedGame, getGameInfo } = useGame();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterColumn, setFilterColumn] = useState('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    // SOLI: Generate 50 mock level history entries
    const generateSOLILevelHistory = () => {
        const statuses = ['Completed', 'Completed', 'Completed', 'Failed', 'Completed'];
        const history = [];
        for (let i = 0; i < 50; i++) {
            const level = 142 - i;
            const day = 25 - (i % 25);
            const month = 12 - Math.floor(i / 25);
            history.push({
                id: i + 1,
                level: level,
                status: statuses[i % statuses.length],
                stars: i % 5 === 3 ? 0 : Math.floor(Math.random() * 3) + 1,
                attempts: Math.floor(Math.random() * 5) + 1,
                date: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${(14 - (i % 12)).toString().padStart(2, '0')}:${(30 + (i % 30)).toString().padStart(2, '0')}`
            });
        }
        return history;
    };

    // SOHO: Generate 50 mock level history entries with coins
    const generateSOHOLevelHistory = () => {
        const history = [];
        for (let i = 0; i < 50; i++) {
            const level = 85 - i;
            const day = 25 - (i % 25);
            const month = 12 - Math.floor(i / 25);
            history.push({
                id: i + 1,
                level: level,
                coinsEarned: (Math.floor(Math.random() * 10) + 1) * 100,
                date: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${(14 - (i % 12)).toString().padStart(2, '0')}:${(30 + (i % 30)).toString().padStart(2, '0')}`
            });
        }
        return history;
    };

    // SOFA: Generate 50 mock level history entries with stars
    const generateSOFALevelHistory = () => {
        const statuses = ['Completed', 'Completed', 'Completed', 'Failed', 'Completed'];
        const history = [];
        for (let i = 0; i < 50; i++) {
            const level = 98 - i;
            const day = 25 - (i % 25);
            const month = 12 - Math.floor(i / 25);
            history.push({
                id: i + 1,
                level: level,
                status: statuses[i % statuses.length],
                stars: i % 5 === 3 ? 0 : Math.floor(Math.random() * 3) + 1,
                attempts: Math.floor(Math.random() * 5) + 1,
                date: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${(14 - (i % 12)).toString().padStart(2, '0')}:${(30 + (i % 30)).toString().padStart(2, '0')}`
            });
        }
        return history;
    };

    const soliLevelHistory = generateSOLILevelHistory();
    const sohoLevelHistory = generateSOHOLevelHistory();
    const sofaLevelHistory = generateSOFALevelHistory();

    // Get the appropriate history based on selected game
    const getLevelHistory = () => {
        switch (selectedGame) {
            case 'soho': return sohoLevelHistory;
            case 'sofa': return sofaLevelHistory;
            default: return soliLevelHistory;
        }
    };
    const levelHistory = getLevelHistory();

    // SOLI/SOFA filter options
    const soliFilterOptions = [
        { value: 'all', label: 'All Columns' },
        { value: 'level', label: 'Level' },
        { value: 'status', label: 'Status' },
        { value: 'stars', label: 'Stars' },
        { value: 'attempts', label: 'Attempts' },
        { value: 'date', label: 'Date' },
    ];

    // SOHO filter options
    const sohoFilterOptions = [
        { value: 'all', label: 'All Columns' },
        { value: 'level', label: 'Level' },
        { value: 'coinsEarned', label: 'Coins Earned' },
        { value: 'date', label: 'Date' },
    ];

    const getFilterOptions = () => {
        switch (selectedGame) {
            case 'soho': return sohoFilterOptions;
            default: return soliFilterOptions;
        }
    };
    const filterOptions = getFilterOptions();

    // Filter level history
    const filteredHistory = levelHistory.filter(entry => {
        if (searchQuery === '') return true;
        const query = searchQuery.toLowerCase();

        if (selectedGame === 'soho') {
            if (filterColumn === 'all') {
                return entry.level.toString().includes(query) ||
                    entry.coinsEarned.toString().includes(query) ||
                    entry.date.toLowerCase().includes(query);
            }
            return entry[filterColumn]?.toString().toLowerCase().includes(query);
        } else {
            if (filterColumn === 'all') {
                return entry.level.toString().includes(query) ||
                    entry.status.toLowerCase().includes(query) ||
                    entry.stars.toString().includes(query) ||
                    entry.attempts.toString().includes(query) ||
                    entry.date.toLowerCase().includes(query);
            }
            return entry[filterColumn]?.toString().toLowerCase().includes(query);
        }
    });

    // Pagination
    const totalPages = Math.ceil(filteredHistory.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedHistory = filteredHistory.slice(startIndex, startIndex + entriesPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    // SOLI specific data
    const soliData = {
        currentLevel: 142,
        totalStars: 386,
        worldLocation: 'Austria',
        timePlayed: '142h 30m'
    };

    // SOHO specific data
    const sohoData = {
        currentChapter: 12,
        totalChaptersLevels: 15,
        completedLevels: 85,
        totalLevelsInChapter: 100,
        chapterProgress: 85,
        currentLevel: 85,
        area: 'Front Yard'
    };

    // SOFA specific data
    const sofaData = {
        currentLevel: 98,
        totalStars: 267,
        timePlayed: '76h 45m',
        missions: [
            { name: 'Remove any cards', current: 2, target: 180 },
            { name: 'Remove Aces', current: 10, target: 30 },
            { name: 'Collected Star', current: 5, target: 20 }
        ]
    };

    // Render SOHO Progress
    const renderSOHOProgress = () => (
        <>
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Chapter Card with Level nested */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Current Chapter</div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">Chapter {sohoData.currentChapter}</div>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-2">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                            <span>Progress</span>
                            <span>{sohoData.chapterProgress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${sohoData.chapterProgress}%` }}
                            ></div>
                        </div>
                    </div>
                    {/* Current Level nested */}
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Current Level</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">{sohoData.currentLevel} / {sohoData.totalLevelsInChapter}</span>
                        </div>
                    </div>
                </div>

                {/* Area Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                            <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Area</div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white">{sohoData.area}</div>
                        </div>
                    </div>
                </div>

                {/* Time Played Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Time Played</div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white">98h 15m</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Level History */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        Recent Level History
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {filteredHistory.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + entriesPerPage, filteredHistory.length)} of {filteredHistory.length} entries
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search level history..."
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">{filterOptions.find(f => f.value === filterColumn)?.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                                {filterOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setFilterColumn(option.value);
                                            setShowFilterDropdown(false);
                                            setCurrentPage(1);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${filterColumn === option.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                <th className="px-4 py-3 font-medium">Level</th>
                                <th className="px-4 py-3 font-medium">Coins Earned</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {paginatedHistory.map((entry) => (
                                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-4 py-3 text-slate-900 dark:text-slate-200 font-bold">{entry.level}</td>
                                    <td className="px-4 py-3 text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                                        <Coins className="w-4 h-4" />
                                        +{entry.coinsEarned}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{entry.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {paginatedHistory.length === 0 && (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            No level history matches your search criteria
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                }`}
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );

    // Render SOLI Progress
    const renderSOLIProgress = () => (
        <>
            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Current Level Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current Level</div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{soliData.currentLevel}</div>
                </div>

                {/* Total Stars Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Stars</div>
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                        {soliData.totalStars} <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    </div>
                </div>

                {/* World Location Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">World Location</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Map className="w-4 h-4 text-green-600 dark:text-green-400" />
                        {soliData.worldLocation}
                    </div>
                </div>

                {/* Time Played Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time Played</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        {soliData.timePlayed}
                    </div>
                </div>
            </div>

            {/* Recent Level History */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        Recent Level History
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {filteredHistory.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + entriesPerPage, filteredHistory.length)} of {filteredHistory.length} entries
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search level history..."
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">{filterOptions.find(f => f.value === filterColumn)?.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                                {filterOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setFilterColumn(option.value);
                                            setShowFilterDropdown(false);
                                            setCurrentPage(1);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${filterColumn === option.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                <th className="px-4 py-3 font-medium">Level</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Stars</th>
                                <th className="px-4 py-3 font-medium">Attempts</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {paginatedHistory.map((entry) => (
                                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-4 py-3 text-slate-900 dark:text-slate-200 font-bold">{entry.level}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 text-xs rounded border ${entry.status === 'Completed'
                                            ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20'
                                            : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20'
                                            }`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-yellow-600 dark:text-yellow-400">
                                        <div className="flex gap-0.5">
                                            {entry.stars > 0 ? (
                                                [...Array(entry.stars)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                                ))
                                            ) : (
                                                <span className="text-slate-500 dark:text-slate-400">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{entry.attempts}</td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{entry.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {paginatedHistory.length === 0 && (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            No level history matches your search criteria
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                }`}
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );

    // Render SOFA Progress
    const renderSOFAProgress = () => (
        <>
            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Current Level Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current Level</div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{sofaData.currentLevel}</div>
                </div>

                {/* Total Stars Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Stars</div>
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                        {sofaData.totalStars} <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    </div>
                </div>

                {/* Time Played Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time Played</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        {sofaData.timePlayed}
                    </div>
                </div>
            </div>

            {/* Missions Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    Missions
                </h3>
                <div className="space-y-4">
                    {sofaData.missions.map((mission, index) => {
                        const progress = (mission.current / mission.target) * 100;
                        return (
                            <div key={index} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{mission.name}</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{mission.current}/{mission.target}</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Level History */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        Recent Level History
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {filteredHistory.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + entriesPerPage, filteredHistory.length)} of {filteredHistory.length} entries
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search level history..."
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">{filterOptions.find(f => f.value === filterColumn)?.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                                {filterOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setFilterColumn(option.value);
                                            setShowFilterDropdown(false);
                                            setCurrentPage(1);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${filterColumn === option.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                <th className="px-4 py-3 font-medium">Level</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Stars</th>
                                <th className="px-4 py-3 font-medium">Attempts</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {paginatedHistory.map((entry) => (
                                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-4 py-3 text-slate-900 dark:text-slate-200 font-bold">{entry.level}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 text-xs rounded border ${entry.status === 'Completed'
                                            ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20'
                                            : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20'
                                            }`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-yellow-600 dark:text-yellow-400">
                                        <div className="flex gap-0.5">
                                            {entry.stars > 0 ? (
                                                [...Array(entry.stars)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                                ))
                                            ) : (
                                                <span className="text-slate-500 dark:text-slate-400">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{entry.attempts}</td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{entry.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {paginatedHistory.length === 0 && (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            No level history matches your search criteria
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                                }`}
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );

    // Render placeholder for other games
    const renderOtherGameProgress = () => (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 shadow-sm text-center transition-colors">
            <Gamepad2 className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Game Progress Coming Soon</h3>
            <p className="text-slate-500 dark:text-slate-400">Game progress for {getGameInfo().name} is not yet configured.</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <Gamepad2 className="w-8 h-8 text-purple-600 dark:text-purple-500" />
                    Game Progress ({selectedGame})
                </h1>
            </div>

            {selectedGame === 'soli' && renderSOLIProgress()}
            {selectedGame === 'soho' && renderSOHOProgress()}
            {selectedGame === 'sofa' && renderSOFAProgress()}
            {(selectedGame !== 'soli' && selectedGame !== 'soho' && selectedGame !== 'sofa') && renderOtherGameProgress()}
        </div>
    );
};

export default ProgressPage;
