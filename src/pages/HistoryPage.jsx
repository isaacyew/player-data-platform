import React, { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle, Clock, Search, Filter, Download, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const HistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterColumn, setFilterColumn] = useState('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const logsPerPage = 50;

    // Generate mock transaction data for pagination demo
    const items = ['Gem Pack (500)', 'Starter Bundle', 'Gold Sack', 'Monthly Pass', 'Gem Pack (100)', 'Premium Bundle', 'Weekly Deal', 'Special Offer'];
    const sources = ['In-Game Store', 'Facebook Pay', 'App Store', 'Google Play', 'PayPal'];
    const statuses = ['success', 'success', 'success', 'success', 'failed', 'refunded', 'pending', 'success'];
    const amounts = ['$4.99', '$9.99', '$1.99', '$14.99', '$0.99', '$24.99', '$2.99', '$19.99'];

    const allTransactions = Array(125).fill(null).map((_, i) => {
        const day = 25 - (i % 25);
        const month = 10 - Math.floor(i / 25);
        return {
            id: `TXN-${1001 + i}`,
            date: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            time: `${(14 - (i % 12)).toString().padStart(2, '0')}:${(30 + (i % 30)).toString().padStart(2, '0')}:${(22 + (i % 38)).toString().padStart(2, '0')}`,
            item: items[i % items.length],
            amount: amounts[i % amounts.length],
            currency: 'USD',
            source: sources[i % sources.length],
            status: statuses[i % statuses.length]
        };
    });

    const filterOptions = [
        { value: 'all', label: 'All Columns' },
        { value: 'id', label: 'Transaction ID' },
        { value: 'date', label: 'Date' },
        { value: 'item', label: 'Item' },
        { value: 'amount', label: 'Amount' },
        { value: 'source', label: 'Source' },
        { value: 'status', label: 'Status' },
    ];

    // Filter transactions based on search and filter column
    const filteredTransactions = allTransactions.filter(tx => {
        if (searchQuery === '') return true;

        const query = searchQuery.toLowerCase();

        if (filterColumn === 'all') {
            return tx.id.toLowerCase().includes(query) ||
                tx.date.toLowerCase().includes(query) ||
                tx.item.toLowerCase().includes(query) ||
                tx.amount.toLowerCase().includes(query) ||
                tx.source.toLowerCase().includes(query) ||
                tx.status.toLowerCase().includes(query);
        }

        return tx[filterColumn]?.toLowerCase().includes(query);
    });

    const totalPages = Math.ceil(filteredTransactions.length / logsPerPage);
    const startIndex = (currentPage - 1) * logsPerPage;
    const currentTransactions = filteredTransactions.slice(startIndex, startIndex + logsPerPage);

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
                    <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400" />
                    Purchase & Payment History
                </h1>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Transaction History</h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {filteredTransactions.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + logsPerPage, filteredTransactions.length)} of {filteredTransactions.length} records
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
                            placeholder="Search transactions..."
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
                            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden text-slate-600 dark:text-slate-300">
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
                                <th className="px-6 py-4 font-medium">Date & Time</th>
                                <th className="px-6 py-4 font-medium">Transaction ID</th>
                                <th className="px-6 py-4 font-medium">Item</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Source</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {currentTransactions.map((tx) => (
                                <tr key={tx.id} className={`hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors ${tx.status === 'failed' ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                                    <td className="px-6 py-4 text-slate-900 dark:text-slate-200">
                                        <div>{tx.date}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">{tx.time}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{tx.id}</td>
                                    <td className="px-6 py-4 text-slate-900 dark:text-slate-200 font-medium">{tx.item}</td>
                                    <td className="px-6 py-4 text-slate-900 dark:text-slate-200">{tx.amount} <span className="text-xs text-slate-500 dark:text-slate-400">{tx.currency}</span></td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{tx.source}</td>
                                    <td className="px-6 py-4">
                                        {tx.status === 'success' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                                                <CheckCircle className="w-3 h-3" /> Success
                                            </span>
                                        )}
                                        {tx.status === 'failed' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                                                <AlertCircle className="w-3 h-3" /> Failed
                                            </span>
                                        )}
                                        {tx.status === 'pending' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20">
                                                <Clock className="w-3 h-3" /> Pending
                                            </span>
                                        )}
                                        {tx.status === 'refunded' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20">
                                                <Clock className="w-3 h-3" /> Refunded
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {currentTransactions.length === 0 && (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            No transactions match your search criteria
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

export default HistoryPage;
