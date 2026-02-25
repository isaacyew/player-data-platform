import React, { useState } from 'react';
import { FileTerminal, Download, Search, Filter, ChevronDown } from 'lucide-react';

const LogsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterLevel, setFilterLevel] = useState('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const logs = [
        { time: '14:32:01', level: 'info', code: 'AUTH_SUCCESS', msg: 'Login successful (IP: 192.168.1.1)' },
        { time: '14:30:55', level: 'warn', code: 'SYNC_LATENCY', msg: 'Sync latency > 200ms (245ms)' },
        { time: '14:28:12', level: 'error', code: 'PURCHASE_TIMEOUT', msg: 'Purchase validation failed (Timeout)' },
        { time: '14:25:00', level: 'info', code: 'APP_INIT', msg: 'App launched v2.1.0' },
        { time: '14:24:58', level: 'info', code: 'DEVICE_INFO', msg: 'iPhone 14 Pro, iOS 17.1' },
        { time: '14:20:10', level: 'info', code: 'LEVEL_START', msg: 'Started Level 42' },
        { time: '14:15:30', level: 'info', code: 'APP_BACKGROUND', msg: 'App moved to background' },
        { time: '14:10:05', level: 'info', code: 'APP_FOREGROUND', msg: 'App moved to foreground' },
        { time: '14:05:22', level: 'warn', code: 'LOW_MEMORY', msg: 'Device memory low warning' },
        { time: '14:02:15', level: 'info', code: 'LEVEL_COMPLETE', msg: 'Completed Level 41 with 3 stars' },
        { time: '13:58:00', level: 'error', code: 'AD_LOAD_FAIL', msg: 'Failed to load rewarded ad' },
        { time: '13:55:30', level: 'info', code: 'PURCHASE_SUCCESS', msg: 'Purchase completed: Gem Pack 500' },
        { time: '13:50:10', level: 'debug', code: 'SYS_ACTION', msg: 'Player interaction event #4001' },
        { time: '13:45:00', level: 'debug', code: 'SYS_ACTION', msg: 'Player interaction event #4002' },
        { time: '13:40:30', level: 'info', code: 'SOCIAL_CONNECT', msg: 'Facebook account linked' },
    ];

    const filterOptions = [
        { value: 'all', label: 'All Levels' },
        { value: 'info', label: 'Info' },
        { value: 'warn', label: 'Warning' },
        { value: 'error', label: 'Error' },
        { value: 'debug', label: 'Debug' },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesSearch = searchQuery === '' ||
            log.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.msg.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterLevel === 'all' || log.level === filterLevel;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <FileTerminal className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                    Technical Logs
                </h1>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-2 shadow-sm">
                        <Download className="w-4 h-4" />
                        Download Full Log
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Logs Console */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 font-mono text-sm overflow-hidden flex flex-col h-[700px] shadow-sm transition-colors">
                    {/* Search and Filter Bar */}
                    <div className="flex items-center gap-4 mb-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search logs..."
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Filter className="w-4 h-4" />
                                <span className="text-sm">{filterOptions.find(f => f.value === filterLevel)?.label}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showFilterDropdown && (
                                <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden text-slate-600 dark:text-slate-300">
                                    {filterOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setFilterLevel(option.value);
                                                setShowFilterDropdown(false);
                                            }}
                                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${filterLevel === option.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            {filteredLogs.length} logs
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="flex gap-4 px-1 py-2 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                        <span className="w-20 shrink-0">Time</span>
                        <span className="w-16 shrink-0">Level</span>
                        <span className="w-40 shrink-0">Code</span>
                        <span className="flex-1">Message</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-2 mt-2">
                        {filteredLogs.map((log, idx) => (
                            <div key={idx} className="flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1 rounded border-b border-slate-100 dark:border-slate-700/50 last:border-0 transition-colors">
                                <span className="text-slate-500 dark:text-slate-400 select-none shrink-0 w-20">{log.time}</span>
                                <span className={`uppercase w-16 shrink-0 font-bold ${log.level === 'error' ? 'text-red-600 dark:text-red-400' :
                                    log.level === 'warn' ? 'text-yellow-600 dark:text-yellow-400' :
                                        log.level === 'debug' ? 'text-slate-400 dark:text-slate-500' : 'text-blue-600 dark:text-blue-400'
                                    }`}>
                                    {log.level}
                                </span>
                                <span className="text-slate-600 dark:text-slate-300 shrink-0 w-40">{log.code}</span>
                                <span className="text-slate-900 dark:text-slate-200 break-all flex-1">{log.msg}</span>
                            </div>
                        ))}
                        {filteredLogs.length === 0 && (
                            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                No logs match your search criteria
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogsPage;
