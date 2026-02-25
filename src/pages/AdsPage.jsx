import React, { useState } from 'react';
import { Tv, AlertTriangle, CheckCircle, XCircle, Wifi, Smartphone, ChevronLeft, ChevronRight, Search, Filter, ChevronDown } from 'lucide-react';

const AdsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterColumn, setFilterColumn] = useState('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const logsPerPage = 50;

    // Generate 120 mock ad logs for pagination demo
    const allAdLogs = Array(120).fill(null).map((_, i) => {
        const platforms = ['Chrome', 'Firefox', 'Safari', 'iOS App', 'Android App', 'Edge', 'iOS App', 'Android App'];
        const networks = ['AdMob', 'UnityAds', 'AppLovin', 'IronSource', 'Vungle'];
        const results = ['completed', 'completed', 'completed', 'failed', 'closed_early', 'completed', 'completed'];
        const browserSupport = ['Supported', 'Supported', 'Supported', 'Limited', 'Supported', 'Not Supported'];

        return {
            id: `AD-${1000 + i}`,
            network: networks[i % networks.length],
            platform: platforms[i % platforms.length],
            browserSupport: browserSupport[i % browserSupport.length],
            result: results[i % results.length],
            reward: results[i % results.length] === 'completed' ? 'Yes' : 'No',
            time: i < 10 ? `${i * 5} mins ago` : i < 30 ? `${Math.floor(i / 2)} hours ago` : `${Math.floor(i / 24)} days ago`
        };
    });

    const filterOptions = [
        { value: 'all', label: 'All Columns' },
        { value: 'platform', label: 'Platform' },
        { value: 'browserSupport', label: 'Browser Support' },
        { value: 'network', label: 'Network' },
        { value: 'result', label: 'Result' },
        { value: 'reward', label: 'Reward' },
    ];

    // Filter logs based on search and filter column
    const filteredLogs = allAdLogs.filter(log => {
        if (searchQuery === '') return true;

        const query = searchQuery.toLowerCase();

        if (filterColumn === 'all') {
            return log.id.toLowerCase().includes(query) ||
                log.network.toLowerCase().includes(query) ||
                log.platform.toLowerCase().includes(query) ||
                log.browserSupport.toLowerCase().includes(query) ||
                log.result.toLowerCase().includes(query) ||
                log.reward.toLowerCase().includes(query) ||
                log.time.toLowerCase().includes(query);
        }

        return log[filterColumn]?.toLowerCase().includes(query);
    });

    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    const startIndex = (currentPage - 1) * logsPerPage;
    const currentLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Reset to page 1 when search changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <Tv className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                    Ads & Rewards Info
                </h1>
            </div>

            {/* Recent Ad Activity - Full width at bottom with pagination */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Ad Activity</h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {filteredLogs.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
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
                            placeholder="Search ad activity..."
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">{filterOptions.find(f => f.value === filterColumn)?.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden text-slate-600 dark:text-slate-300">
                                {filterOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setFilterColumn(option.value);
                                            setShowFilterDropdown(false);
                                            setCurrentPage(1);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${filterColumn === option.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
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
                                <th className="px-4 py-3 font-medium">Time</th>
                                <th className="px-4 py-3 font-medium">Platform</th>
                                <th className="px-4 py-3 font-medium">Browser Support</th>
                                <th className="px-4 py-3 font-medium">Network</th>
                                <th className="px-4 py-3 font-medium">Ad ID</th>
                                <th className="px-4 py-3 font-medium">Result</th>
                                <th className="px-4 py-3 font-medium">Reward</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {currentLogs.map((ad, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{ad.time}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${ad.platform.includes('App')
                                            ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20'
                                            : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                                            }`}>
                                            {ad.platform}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium ${ad.browserSupport === 'Supported' ? 'text-green-600 dark:text-green-400' :
                                            ad.browserSupport === 'Limited' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                                            }`}>
                                            {ad.browserSupport}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{ad.network}</td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-xs">{ad.id}</td>
                                    <td className="px-4 py-3">
                                        {ad.result === 'completed' && (
                                            <span className="text-green-600 dark:text-green-400 flex items-center gap-1 text-xs">
                                                <CheckCircle className="w-3 h-3" /> Completed
                                            </span>
                                        )}
                                        {ad.result === 'failed' && (
                                            <span className="text-red-600 dark:text-red-400 flex items-center gap-1 text-xs">
                                                <XCircle className="w-3 h-3" /> Failed
                                            </span>
                                        )}
                                        {ad.result === 'closed_early' && (
                                            <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1 text-xs">
                                                <AlertTriangle className="w-3 h-3" /> Closed Early
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {ad.reward === 'Yes' ? (
                                            <span className="px-2 py-0.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded border border-green-200 dark:border-green-500/20">Granted</span>
                                        ) : (
                                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded">None</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {currentLogs.length === 0 && (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            No logs match your search criteria
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
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
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
                                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
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
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdsPage;
